import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return <SignUp path="/signup" signInUrl="/signin" />;
};

export default SignUpPage;
