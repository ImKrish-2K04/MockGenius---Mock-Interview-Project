import { cn } from "@/lib/utils";
import { MainRoutes } from "@/lib/helpers";
import { useAuth } from "@clerk/clerk-react";
import NavigationLink from "@/components/navigation-links";

interface NavigationRoutesProps {
  isMobile?: boolean;
}

const NavigationRoutes = ({ isMobile }: NavigationRoutesProps) => {
  const { userId } = useAuth();

  return (
    <ul
      className={cn(
        "flex items-center gap-6",
        isMobile && "flex-col items-start gap-8"
      )}
    >
      {MainRoutes.map((route) => (
        <NavigationLink
          key={route.href}
          navigationLink={route.href}
          linkText={route.label}
        />
      ))}
      {userId && (
        <NavigationLink
          navigationLink="/generate"
          linkText="Take an interview"
        />
      )}
    </ul>
  );
};

export default NavigationRoutes;
