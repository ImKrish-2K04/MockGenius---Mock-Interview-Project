import { cn } from "@/lib/utils";
import Container from "@/components/container";
import LogoComponent from "@/components/website-logo";
import NavigationRoutes from "@/components/navigation-routes";
import ProfileContainer from "@/components/profile-container";
import ToggleContainer from "@/components/toggle-container";
import { useTheme } from "@/provider/theme-context";
import { Moon, Sun } from "lucide-react";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className={cn("w-full border-b duration-150 transition-all ease-in-out sticky top-0 left-0 backdrop-blur-3xl z-20")}
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
            {/* theme toggler */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border bg-background hover:bg-accent"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

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
