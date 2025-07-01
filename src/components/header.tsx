import { cn } from "@/lib/utils";
import Container from "@/components/container";
import LogoComponent from "@/components/website-logo";
import NavigationRoutes from "@/components/navigation-routes";
import ProfileContainer from "@/components/profile-container";
import ToggleContainer from "@/components/toggle-container";

const Header = () => {
  return (
    <header
      className={cn("w-full border-b duration-150 transition-all ease-in-out")}
    >
      <Container>
        <div className="flex items-center w-full gap-4 ">
          {/* logo section */}
          <LogoComponent />

          {/* navigation section */}
          <nav className="items-center hidden gap-3 md:flex">
            <NavigationRoutes />
          </nav>

          {/* profile & menu-toggle section */}
          <div className="flex items-center gap-6 ml-auto">
            {/* profile-section */}
            <ProfileContainer />

            {/* menu-toggle-section */}
            <ToggleContainer />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
