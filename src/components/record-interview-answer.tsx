interface RecordAnswerProps {
  question: {
    question: string;
    answer: string;
  };
  isWebcamActive: boolean;
  setIsWebcamActive: (value: boolean) => void;
}

interface AIResponse {
  ratings: number;
  feedback: string;
}

import { SaveModal } from "@/components/save-modal";
import { TooltipButton } from "@/components/tooltip-btn";
import { db } from "@/config/firebase.config";
import { callGemini } from "@/scripts";
import { useAuth } from "@clerk/clerk-react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  CircleStop,
  Loader,
  Mic,
  RefreshCw,
  Save,
  Video,
  VideoOff,
  WebcamIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import useSpeechToText, { type ResultType } from "react-hook-speech-to-text";
import { useParams } from "react-router-dom";
import Webcam from "react-webcam";
import { toast } from "sonner";

const RecordAnswer = ({
  question,
  isWebcamActive,
  setIsWebcamActive,
}: RecordAnswerProps) => {
  // .............

  const {
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const [userAnswer, setUserAnswer] = useState("");
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<AIResponse | null>(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { userId } = useAuth();
  const { interviewId } = useParams<{ interviewId: string }>();

  const recordUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText();

      if (userAnswer?.length < 30) {
        toast.error("Error", {
          description: "Your answer should be more than 30 characters",
        });

        return;
      }

      const aiResult = await generateResult(
        question.question,
        question.answer,
        userAnswer
      );

      console.log(aiResult);
      setAiResult(aiResult);
    } else {
      startSpeechToText();
    }
  };

  // response cleaner!

  const cleanAIResponse = (responseText: string) => {
    // step1 : trim if there is any unwanted whitespace
    let cleanResponse = responseText.trim();
    // step2 : remove any occurence of 'json' or ``` or `
    cleanResponse = cleanResponse.replace(/(json|```|`)/g, "");
    // step3: Parse the clean JSON text into an array of objects
    try {
      return JSON.parse(cleanResponse);
    } catch (error) {
      throw new Error("Invalid JSON format: " + (error as Error)?.message);
    }
  };

  const generateResult = async (
    qst: string,
    qstAns: string,
    userAns: string
  ): Promise<AIResponse> => {
    setIsAiGenerating(true);
    const prompt = `
      Question: "${qst}"
      User Answer: "${userAns}"
      Correct Answer: "${qstAns}"
      Please compare the user's answer to the correct answer, and provide a rating (from 1 to 10) based on answer quality, and offer feedback for improvement.
      Return the result in JSON format with the fields "ratings" (number) and "feedback" (string).
    `;

    try {
      const aiResult = await callGemini(prompt);
      return aiResult && cleanAIResponse(aiResult);
    } catch (err) {
      console.log("Error:", err);
      toast.error("Error..", {
        description: "An error occured while generating the feedback.",
      });
      return { ratings: 0, feedback: "Unable to generate feedback" };
    } finally {
      setIsAiGenerating(false);
    }
  };

  const recordNewAnswer = () => {
    setUserAnswer("");
    stopSpeechToText();
    startSpeechToText();
  };

  useEffect(() => {
    // combining all the transcripts into a single answers
    const combinedTranscripts = results
      .filter((result): result is ResultType => typeof result !== "string")
      .map((result) => result.transcript)
      .join(" ");

    setUserAnswer(combinedTranscripts);
  }, [results]);

  const saveUserAnswer = async () => {
    setIsLoading(true);
    if (!aiResult) {
      return;
    }
    const currentQuestion = question.question;
    try {
      const userAnswerQuery = query(
        collection(db, "userAnswers"),
        where("userId", "==", userId),
        where("question", "==", currentQuestion)
      );

      const querySnap = await getDocs(userAnswerQuery);

      // if user have already answered the question:
      if (!querySnap.empty) {
        console.log("Query snap size:", querySnap.size);
        toast.info("Already answered", {
          description: "You have already answered the question",
        });
        return;
      } else {
        const questionAnswerRef = await addDoc(collection(db, "userAnswers"), {
          mockIdRef: interviewId,
          question: question.question,
          correct_ans: question.answer,
          user_ans: userAnswer,
          feedback: aiResult.feedback,
          rating: aiResult.ratings,
          userId,
          createdAt: serverTimestamp(),
        });

        const id = questionAnswerRef.id;

        await updateDoc(doc(db, "userAnswers", id), {
          id,
          updatedAt: serverTimestamp(),
        });

        toast("Saved", { description: "Your answer has been saved.." });
      }
    } catch (e) {
      console.log("Error:", e);
      toast.error("Error..", {
        description: "An error occured while generating feedback",
      });
    } finally {
      setIsLoading(false);
      setOpen(!open);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-8 mt-4">
      {/* save modal */}
      <SaveModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={saveUserAnswer}
        loading={isLoading}
      />

      <div className="w-full h-[400px] md:w-96 flex flex-col items-center justify-center border p-4 bg-gray-50 dark:bg-gray-50/20 rounded-md">
        {isWebcamActive ? (
          <Webcam
            onUserMedia={() => setIsWebcamActive(true)}
            onUserMediaError={() => setIsWebcamActive(false)}
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <WebcamIcon className="min-w-24 min-h-24 text-muted-foreground animate-pulse" />
        )}
      </div>

      <div className="flex justify-center items-center gap-3">
        <TooltipButton
          content={isWebcamActive ? "turn off" : "turn on"}
          icon={
            isWebcamActive ? (
              <VideoOff className="min-w-5 min-h-5" />
            ) : (
              <Video className="min-w-5 min-h-5" />
            )
          }
          onClick={() => setIsWebcamActive(!isWebcamActive)}
        />

        <TooltipButton
          content={isRecording ? "Stop Recording" : "Start Recording"}
          icon={
            isRecording ? (
              <CircleStop className="min-w-5 min-h-5" />
            ) : (
              <Mic className="min-w-5 min-h-5" />
            )
          }
          onClick={recordUserAnswer}
        />

        <TooltipButton
          content="Record again"
          icon={<RefreshCw className="min-w-5 min-h-5" />}
          onClick={recordNewAnswer}
        />

        <TooltipButton
          content="Save Result"
          icon={
            isAiGenerating ? (
              <Loader className="min-h-5 min-w-5 text-muted-foreground animate-spin" />
            ) : (
              <Save className="min-h-5 min-w-5" />
            )
          }
          onClick={() => setOpen(!open)}
          disbaled={!aiResult}
        />
      </div>

      <div className="w-full mt-4 p-4 border rounded-md bg-gray-50 dark:bg-neutral-800">
        <h2 className="text-lg font-semibold text-black/80 dark:text-white/80">
          Your Answer:
        </h2>
        <p className="text-sm mt-2 text-muted-foreground whitespace-normal">
          {userAnswer || "Start recording to see your answer here"}
        </p>
        {interimResult && (
          <p className="text-sm text-muted-foreground mt-2">
            <strong>Current speech:</strong>
            {interimResult}
          </p>
        )}
      </div>
    </div>
  );
};

export default RecordAnswer;
