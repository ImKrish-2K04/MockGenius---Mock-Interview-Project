import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return <SignIn path="/signin" signUpUrl="/signup" />;
};

export default SignInPage;
