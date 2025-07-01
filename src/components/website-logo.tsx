import { Link } from "react-router-dom";

const LogoComponent = () => {
  return (
    <Link to={"/"}>
      <img
        src="\assets\svg\logo.svg"
        alt="logo"
        className="min-w-10 min-h-10"
      />
    </Link>
  );
};
export default LogoComponent;
