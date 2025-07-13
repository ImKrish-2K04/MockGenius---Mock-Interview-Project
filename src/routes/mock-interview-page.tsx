import CustomBreadCrumb from "@/components/custom-breadcrumb";
import LoaderPage from "@/components/loader";
import { useInterview } from "@/hooks/useInterview";
import { useParams } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb } from "lucide-react";
import QuestionSection from "@/components/question-section";

const MockInterviewPage = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const { interview, loading } = useInterview({ interviewId });

  if (loading) {
    return <LoaderPage className="w-full h-[70vh]" />;
  }

  return (
    <div className="flex flex-col w-full gap-8 py-5">
      <CustomBreadCrumb
        breadCrumbPage={"Start Interview"}
        breadCrumpItems={[
          { label: "Mock Interview", link: "/generate" },
          {
            label: interview?.position || "",
            link: `/generate/interview/${interview?.id}`,
          },
        ]}
      />

      <div className="w-full">
        <Alert className="bg-sky-100/50 dark:bg-sky-100 border border-sky-200 p-4 rounded-lg">
          <Lightbulb className="h-5 w-5 text-sky-600 dark:text-black" />
          <div className="flex flex-col gap-2">
            <AlertTitle className="text-sky-800 font-semibold">
              Important Note
            </AlertTitle>
            <AlertDescription className="text-sm text-sky-700 mt-1 flex flex-col gap-2">
              <p>
                Press "Record Answer" to begin answering the question. Once you
                finish the interview, you&apos;ll receive feedback comparing
                your responses with the ideal answers.
              </p>
              <p>
                <span className="font-semibold">Note:</span> your video is{" "}
                <strong>never recorded</strong>. You can disable your webcam at
                any time.
              </p>
            </AlertDescription>
          </div>
        </Alert>

        {interview &&
          interview?.questions &&
          interview?.questions.length > 0 && (
            <div className="mt-4 w-full flex flex-col items-start gap-4">
              <QuestionSection questions={interview?.questions} />
            </div>
          )}
      </div>
    </div>
  );
};

export default MockInterviewPage;
