import type { Timestamp } from "firebase/firestore";

export const formatDate = (
  createdAt: unknown,
  type: "date" | "time"
): string => {
  if (
    createdAt &&
    typeof createdAt === "object" &&
    "toDate" in createdAt &&
    typeof (createdAt as Timestamp).toDate === "function"
  ) {
    const dateObj = (createdAt as Timestamp).toDate();

    if (type === "date") {
      return dateObj.toLocaleDateString("en-US", {
        dateStyle: "long",
      });
    } else {
      return dateObj.toLocaleTimeString("en-US", {
        timeStyle: "short",
      });
    }
  }

  return "Invalid Date";
};
