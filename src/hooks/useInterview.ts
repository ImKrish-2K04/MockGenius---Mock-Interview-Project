import { db } from "@/config/firebase.config";
import type { Interview } from "@/types";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

interface UseInterviewProps {
  interviewId?: string;
}

export const useInterview = ({ interviewId }: UseInterviewProps) => {
  const [loading, setLoading] = useState(true);
  const [interview, setInterview] = useState<Interview | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchInterview() {
      if (interviewId && interviewId !== "create") {
        try {
          const ref = doc(db, "interviews", interviewId);
          const interviewDoc = await getDoc(ref);
          if (interviewDoc.exists() && isMounted) {
            setInterview({
              id: interviewDoc.id,
              ...interviewDoc.data(),
            } as Interview);
          }
        } catch (error) {
          console.log("Error:", error);
        } finally {
          if (isMounted) setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }

    fetchInterview();

    return () => {
      isMounted = false;
    };
  }, [interviewId]);

  return { interview, loading };
};
