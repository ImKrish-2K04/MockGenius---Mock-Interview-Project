import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Interview } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "@/utils/formatDate";
import { TooltipButton } from "@/components/tooltip-btn";
import { Newspaper, Pencil, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { toast } from "sonner";

interface InterviewPinProps {
  interview: Interview;
  onMockPage?: boolean;
}

const InterviewPin = ({ interview, onMockPage = false }: InterviewPinProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();

  const onDelete = async () => {
    setLoading(true);

    try {
      const interviewRef = doc(db, "interviews", interview.id);
      const userAnswerQuery = query(
        collection(db, "userAnswers"),
        where("userId", "==", userId),
        where("mockIdRef", "==", interview.id)
      );

      // get all matching user answer
      const querySnap = await getDocs(userAnswerQuery);

      // initialize the firebase batch

      const batch = writeBatch(db);

      // add delete -> interview batch

      batch.delete(interviewRef);

      querySnap.forEach((docRef) => batch.delete(docRef.ref));

      // commit

      await batch.commit();

      toast("Success", { description: "Your interview has been removed" });
    } catch (error) {
      console.log(error);
      toast("Error", {
        description: "Something went wrong!. Please try again later",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 rounded-md shadow-none hover:shadow-md shadow-gray-100 cursor-pointer transition-all dark:shadow-neutral-800">
      <CardTitle className="text-lg flex justify-between">
        {interview?.position}

        <TooltipButton
          content="Delete"
          buttonVariant={"ghost"}
          onClick={onDelete}
          disbaled={false}
          buttonClassName="hover:text-red-500"
          icon={<Trash2 />}
          loading={loading}
        />
      </CardTitle>
      <CardDescription>{interview?.description}</CardDescription>
      <div className="w-full flex items-center gap-2 flex-wrap">
        {interview?.techStack.split(",").map((word, index) => (
          <Badge
            key={index}
            variant={"outline"}
            className="text-xs text-muted-foreground hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-900 dark:hover:border-neutral-400/80 dark:hover:bg-emerald-900 dark:hover:text-emerald-50"
          >
            {word?.trim()}
          </Badge>
        ))}
      </div>
      <CardFooter
        className={cn(
          "w-full flex items-center p-0",
          onMockPage ? "justify-end" : "justify-between"
        )}
      >
        <p className="text-[12px] text-muted-foreground truncate">
          {`${formatDate(interview?.createdAt, "date")} - ${formatDate(
            interview?.createdAt,
            "time"
          )}`}
        </p>

        {!onMockPage && (
          <div className="flex items-center justify-center">
            <TooltipButton
              content="Edit"
              buttonVariant={"ghost"}
              onClick={() => {
                navigate(`/generate/${interview.id}`, { replace: true });
              }}
              disbaled={false}
              buttonClassName="hover:text-emerald-500"
              icon={<Pencil />}
              loading={false}
            />
            <TooltipButton
              content="Feedback"
              buttonVariant={"ghost"}
              onClick={() => {
                navigate(`/generate/feedback/${interview.id}`, {
                  replace: true,
                });
              }}
              disbaled={false}
              buttonClassName="hover:text-yellow-500"
              icon={<Newspaper />}
              loading={false}
            />
            <TooltipButton
              content="Start"
              buttonVariant={"ghost"}
              onClick={() => {
                navigate(`/generate/interview/${interview?.id}`, {
                  replace: true,
                });
              }}
              disbaled={false}
              buttonClassName="hover:text-sky-500"
              icon={<Sparkles />}
              loading={false}
            />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default InterviewPin;
