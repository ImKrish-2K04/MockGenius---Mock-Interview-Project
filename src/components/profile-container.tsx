import { useAuth, UserButton } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";

const ProfileContainer = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <Loader className="min-w-4 min-h-4 animate-spin text-emerald-500" />;
  }

  return (
    <div className="flex items-center gap-6">
      {isSignedIn ? (
        <UserButton />
      ) : (
        <Link
          to="/signin"
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white transition-colors rounded-md cursor-pointer bg-primary hover:bg-primary/90 focus:outline-none dark:text-black"
        >
          Get started
        </Link>
      )}
    </div>
  );
};

export default ProfileContainer;
