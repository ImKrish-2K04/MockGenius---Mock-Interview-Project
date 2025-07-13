import LoaderPage from "@/components/loader";
import useSyncUserToFirestore from "@/hooks/useSyncUserToFirestore";

const AuthHandler = () => {
  const { loading } = useSyncUserToFirestore();

  if (loading) return <LoaderPage />;

  return null;
};

export default AuthHandler;
