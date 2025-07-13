import { useAuth, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";
import type { User } from "@/types";

const useSyncUserToFirestore = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storeUserData = async () => {
      if (isSignedIn && user) {
        setLoading(true);
        try {
          const userRef = doc(db, "users", user.id);
          const userSnap = await getDoc(userRef);

          if (!userSnap.exists()) {
            const userData: User = {
              id: user.id,
              name: user.fullName || user.firstName || "Anonymous",
              email: user.primaryEmailAddress?.emailAddress || "N/A",
              imageUrl: user.imageUrl,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            };
            await setDoc(userRef, userData);
          } else {
            await updateDoc(userRef, {
              name: user.fullName || user.firstName || "Anonymous",
              imageUrl: user.imageUrl,
              updatedAt: serverTimestamp(),
            });
          }
        } catch (error) {
          console.log("Error syncing user to Firestore:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    storeUserData();
  }, [isSignedIn, user]);

  return { loading };
};

export default useSyncUserToFirestore;
