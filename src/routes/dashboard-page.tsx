import Heading from "@/components/headings";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/config/firebase.config";
import type { Interview } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import InterviewPin from "@/components/interview-pin";

const Dashboard = () => {
  // State variables for managing interview data and loading state.
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(false);

  // Use the useAuth hook to get the current user's ID.
  const { userId } = useAuth();

  // useEffect hook to fetch and update interview data when the userId changes.
  useEffect(() => {
    setLoading(true);

    // Create a query to fetch interviews for the current user.
    const interviewQuery = query(
      collection(db, "interviews"),
      where("userId", "==", userId)
    );

    // Function to unsubscribe from the onSnapshot listener to prevent memory leaks.
    const unsubscribe = onSnapshot(
      interviewQuery,
      (snapshot) => {
        // Map the snapshot data to create an array of Interview objects.
        const interviewList: Interview[] = snapshot.docs.map((doc) => {
          const id = doc.id;
          return {
            id,
            ...doc.data(),
          };
        }) as Interview[];

        // Update the state with the fetched interview data.
        setInterviews(interviewList);
        // Set loading to false, indicating that the data has been loaded.
        setLoading(false);
      },
      (error) => {
        // Handle errors during the data fetching process.
        console.error("Error on fetching:", error);
        // Display an error toast message using Sonner.
        toast.error("Error..", {
          description: "Something went wrong.. Try again later..",
        });
        // Set loading to false even on error
        setLoading(false);
      }
    );

    // Return a cleanup function to unsubscribe when the component unmounts or when userId changes.
    return () => unsubscribe();
  }, [userId]); // Dependency array:  re-run effect only if userId changes.

  return (
    <>
      {/* Dashboard Section */}
      <div className="flex items-center justify-between">
        {/* Headings */}
        <Heading
          title="Dashboard"
          description="Create and start your AI Mock Interview"
        />
        {/* Generate new interview */}
        <Link to={"/generate/create"}>
          <Button size={"sm"} className="cursor-pointer ml-4">
            <Plus /> add new
          </Button>
        </Link>
      </div>
      {/* Content Section */}

      <Separator className="my-8" />

      <div className="md:grid md:grid-cols-3 gap-3 py-4 space-y-4 md:space-y-0">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-24 md:h-32 rounded-md" />
          ))
        ) : interviews.length > 0 ? (
          interviews.map((interview) => (
            <InterviewPin key={interview.id} interview={interview} />
          ))
        ) : (
          <div className="md:col-span-3 w-full flex grow items-center justify-center h-96 flex-col">
            <img
              src="/assets/svg/not-found.svg"
              alt=""
              className="w-44 object-contain"
            />

            <h2 className="text-lg font-semibold text-muted-foreground">
              No data found!
            </h2>

            <p className="w-full md:w-96 text-center text-sm text-neutral-400 mt-4">
              There is no available data to show, Please add some mock
              interview!
            </p>

            <Link to={"/generate/create"} className="mt-4">
              <Button size={"sm"}>
                <Plus className="min-w-5 min-h-5 mr-1" />
                Add new
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
