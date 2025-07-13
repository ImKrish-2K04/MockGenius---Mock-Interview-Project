import CustomBreadCrumb from "@/components/custom-breadcrumb";
import InterviewPin from "@/components/interview-pin";
import LoaderPage from "@/components/loader";
import { Button } from "@/components/ui/button";
import { useInterview } from "@/hooks/useInterview";
import { Lightbulb, Sparkle, WebcamIcon } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import WebCam from "react-webcam";

const MockLoadPage = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const { interview, loading } = useInterview({ interviewId });
  const [isWebcamActive, setIsWebcamActive] = useState(false);

  if (loading) {
    return <LoaderPage className="w-full h-[70vh]" />;
  }

  return (
    <div className="flex flex-col w-full gap-8 py-5">
      <div className="flex items-center justify-between w-full gap-2">
        <CustomBreadCrumb
          breadCrumbPage={interview?.position || ""}
          breadCrumpItems={[{ label: "Mock Interview", link: "/generate" }]}
        />

        <Link to={`/generate/interview/${interview?.id}/start`}>
          <Button size={"sm"} className="cursor-pointer">
            Start <Sparkle />
          </Button>
        </Link>
      </div>

      {interview && <InterviewPin interview={interview} onMockPage />}

      <Alert className="bg-yellow-100/50 dark:bg-yellow-100 border border-yellow-200 p-4 rounded-lg">
        <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-black" />
        <div className="flex flex-col gap-2">
          <AlertTitle className="text-yellow-800 font-semibold">
            Important Information
          </AlertTitle>
          <AlertDescription className="text-sm text-yellow-700 mt-1 flex flex-col gap-2">
            <p>
              Please enable your webcam and microphone to start the AI-generated
              mock interview. The interview consists of five questions. Youll
              receive a personalized report based on your responses at the end.
            </p>
            <p>
              <span className="font-medium">Note:</span> your video is{" "}
              <strong>never recorded</strong>. You can disable your webcam at
              any time.
            </p>
          </AlertDescription>
        </div>
      </Alert>

      <div className="flex items-center justify-center w-full h-full">
        <div className="w-full h-[400px] md:w-96 flex flex-col items-center justify-center border p-4 bg-gray-50 dark:bg-gray-50/20 rounded-md">
          {isWebcamActive ? (
            <WebCam
              onUserMedia={() => setIsWebcamActive(true)}
              onUserMediaError={() => setIsWebcamActive(false)}
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <WebcamIcon className="min-w-24 min-h-24 text-muted-foreground animate-pulse" />
          )}
        </div>
      </div>

      <div className="flex items-center justify-center">
        <Button
          size={"sm"}
          onClick={() => setIsWebcamActive(!isWebcamActive)}
          className="cursor-pointer"
        >
          {isWebcamActive ? "Disable WebCam" : "Enable WebCam"}
        </Button>
      </div>
    </div>
  );
};

export default MockLoadPage;
