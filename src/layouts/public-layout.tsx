import Footer from "@/components/footer";
import Header from "@/components/header";
import AuthHandler from "@/handlers/auth-handler";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="w-full">
      {/* Handler to store the user-data */}
      <AuthHandler />

      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default PublicLayout;
