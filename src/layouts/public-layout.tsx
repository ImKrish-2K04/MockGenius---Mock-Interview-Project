import Footer from "@/components/footer";
import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="w-full">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default PublicLayout;
