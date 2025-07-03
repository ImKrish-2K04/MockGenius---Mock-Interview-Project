import LoaderPage from "@/components/loader";
import { db } from "@/config/firebase.config";
import type { User } from "@/types";
import { useAuth, useUser } from "@clerk/clerk-react";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// AuthHandler manages user authentication and Firestore user data sync
const AuthHandler = () => {
  // Auth and user info
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  // Routing and state
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Store user data in Firestore if not already present
    const storeUserData = async () => {
      if (isSignedIn && user) {
        setLoading(true);
        try {
          // Check if user document exists (should use "users" collection for both read/write)
          const userSnap = await getDoc(doc(db, "users", user.id));
          if (!userSnap.exists()) {
            const userData: User = {
              id: user.id,
              name: user.fullName || user.firstName || "Anonymous",
              email: user.primaryEmailAddress?.emailAddress || "N/A",
              imageUrl: user.imageUrl,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            };
            await setDoc(doc(db, "users", user.id), userData);
          }
        } catch (error) {
          // Log Firestore errors
          console.log("Error on storing the user data:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    storeUserData();
  }, [isSignedIn, user, pathname, navigate]);

  // Show loader while processing
  if (loading) {
    return <LoaderPage />;
  }

  return null;
};

export default AuthHandler;
