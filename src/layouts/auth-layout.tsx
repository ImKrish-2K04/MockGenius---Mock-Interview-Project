import { Outlet } from "react-router-dom";
import bgImg from "/assets/img/bg.png";

const AuthenticationLayout = () => {
  return (
    <div className="w-screen min-h-screen flex justify-center items-center overflow-hidden">
      <img
        src={bgImg}
        alt="background image for the landing page"
        className="w-full h-full opacity-40 object-cover absolute"
      />
      <Outlet />
    </div>
  );
};

export default AuthenticationLayout;
