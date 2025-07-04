import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

interface NavigationLinkProps {
  navigationLink: string;
  linkText: string;
}

const NavigationLink = ({ navigationLink, linkText }: NavigationLinkProps) => {
  return (
    <NavLink
      to={navigationLink}
      className={({ isActive }) =>
        cn(
          "nav-underline text-base text-neutral-600 hover:text-neutral-800 transition-colors delay-150 ease-linear",
          isActive && "text-neutral-900 font-semibold"
        )
      }
    >
      {linkText}
    </NavLink>
  );
};

export default NavigationLink;
