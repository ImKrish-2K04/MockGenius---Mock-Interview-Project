import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useAuth } from "@clerk/clerk-react";
import { CircleCheck, Star, FileText } from "lucide-react";

import LoaderPage from "@/components/loader";
import CustomBreadCrumb from "@/components/custom-breadcrumb";
import Heading from "@/components/headings";
import InterviewPin from "@/components/interview-pin";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

import { db } from "@/config/firebase.config";
import type { Interview, UserAnswer } from "@/types";
import { cn } from "@/lib/utils";

interface FeedbackStats {
  overallRating: string;
  hasFeedback: boolean;
}

const FeedbackCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  content: string;
  className?: string;
}> = ({ title, icon, content, className }) => (
  <Card
    className={cn("border-none space-y-3 p-4 rounded-lg shadow-md", className)}
  >
    <CardTitle className="flex items-center">
      {icon}
      {title}
    </CardTitle>
    <CardDescription className="font-medium text-gray-700">
      {content}
    </CardDescription>
  </Card>
);

const FeedbackAccordionItem: React.FC<{
  feed: UserAnswer;
  activeFeed: string;
  onSelect: (id: string) => void;
}> = ({ feed, activeFeed, onSelect }) => (
  <AccordionItem value={feed.id} className="border rounded-lg shadow-md">
    <AccordionTrigger
      onClick={() => onSelect(feed.id)}
      className={cn(
        "px-5 py-3 flex items-center justify-between text-base rounded-t-lg transition-colors hover:no-underline",
        activeFeed === feed.id
          ? "bg-gradient-to-r from-purple-50 to-blue-50"
          : "hover:bg-gray-50"
      )}
    >
      <span>{feed.question}</span>
    </AccordionTrigger>

    <AccordionContent className="px-5 py-6 bg-white rounded-b-lg space-y-5 shadow-inner">
      <div className="text-lg font-semibold to-gray-700">
        <Star className="inline mr-2 text-yellow-400" />
        Rating: {feed.rating}/10
      </div>

      <FeedbackCard
        title="Expected Answer"
        icon={<CircleCheck className="mr-2 text-green-600" />}
        content={feed.correct_ans}
        className="bg-green-50"
      />

      <FeedbackCard
        title="Your Answer"
        icon={<CircleCheck className="mr-2 text-blue-600" />}
        content={feed.user_ans}
        className="bg-blue-50"
      />

      <FeedbackCard
        title="Feedback"
        icon={<CircleCheck className="mr-2 text-red-600" />}
        content={feed.feedback}
        className="bg-red-50"
      />
    </AccordionContent>
  </AccordionItem>
);

const EmptyFeedbackState: React.FC<{ interviewId?: string }> = ({
  interviewId,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <FileText className="w-12 h-12 text-gray-400" />
      <h3 className="text-xl font-medium">No feedback available</h3>
      <p className="text-muted-foreground">
        Complete an interview to see your feedback here.
      </p>
      {interviewId && (
        <Button onClick={() => navigate(`/generate/interview/${interviewId}`)}>
          Start Interview
        </Button>
      )}
    </div>
  );
};

const Feedback = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState<UserAnswer[]>([]);
  const [activeFeed, setActiveFeed] = useState("");
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!interviewId) {
      toast.error("Invalid interview ID");
      navigate("/generate", { replace: true });
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [interviewDoc, feedbackQuery] = await Promise.all([
          getDoc(doc(db, "interviews", interviewId)),
          getDocs(
            query(
              collection(db, "userAnswers"),
              where("userId", "==", userId),
              where("mockIdRef", "==", interviewId)
            )
          ),
        ]);

        if (!interviewDoc.exists()) {
          toast.error("Interview not found");
          navigate("/generate", { replace: true });
          return;
        }

        setInterview(interviewDoc.data() as Interview);
        setFeedbacks(feedbackQuery.docs.map((doc) => doc.data() as UserAnswer));
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to load interview data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [interviewId, navigate, userId]);

  const { overallRating, hasFeedback } = useMemo<FeedbackStats>(() => {
    if (feedbacks.length === 0)
      return { overallRating: "0.0", hasFeedback: false };

    const totalRatings = feedbacks.reduce(
      (acc, feedback) => acc + feedback.rating,
      0
    );
    return {
      overallRating: (totalRatings / feedbacks.length).toFixed(1),
      hasFeedback: true,
    };
  }, [feedbacks]);

  const feedbackItems = useMemo(
    () =>
      feedbacks.map((feed) => (
        <FeedbackAccordionItem
          key={feed.id}
          feed={feed}
          activeFeed={activeFeed}
          onSelect={setActiveFeed}
        />
      )),
    [feedbacks, activeFeed]
  );

  if (isLoading) {
    return (
      <div className="flex flex-col w-full gap-8 py-5">
        <CustomBreadCrumb breadCrumbPage="" breadCrumpItems={[]} />
        <Heading title="" description="" />
        <LoaderPage className="w-full h-[70vh]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-8 py-5">
      <div className="flex items-center justify-between w-full gap-2">
        <CustomBreadCrumb
          breadCrumbPage={"Feedback"}
          breadCrumpItems={[
            { label: "Mock Interviews", link: "/generate" },
            {
              label: `${interview?.position}`,
              link: `/generate/interview/${interview?.id}`,
            },
          ]}
        />
      </div>

      <Heading
        title={!hasFeedback ? "Your Interview Feedback" : "Congratulations!"}
        description="Your personalized feedback is now available. Dive in to see your strengths, areas for improvement, and tips to help you ace your next interview."
      />

      {hasFeedback && (
        <p className="text-base text-muted-foreground">
          Your overall interview ratings:&nbsp;
          <span className="text-emerald-500 font-semibold text-xl">
            {overallRating} / 10
          </span>
        </p>
      )}

      {interview && <InterviewPin interview={interview} onMockPage />}

      <Heading title="Interview Feedback" isSubHeading />

      {hasFeedback ? (
        <Accordion type="single" collapsible className="space-y-6">
          {feedbackItems}
        </Accordion>
      ) : (
        <EmptyFeedbackState interviewId={interviewId} />
      )}
    </div>
  );
};

export default Feedback;
