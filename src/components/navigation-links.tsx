import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

interface NavigationLinkProps {
  navigationLink: string;
  linkText: string;
}

const NavigationLink = ({
  navigationLink,
  linkText,
}: NavigationLinkProps) => {
  return (
    <NavLink
      to={navigationLink}
      className={({ isActive }) =>
        cn(
          "text-base text-neutral-600",
          isActive && "text-neutral-900 font-semibold"
        )
      }
    >
      {linkText}
    </NavLink>
  );
};

export default NavigationLink;
