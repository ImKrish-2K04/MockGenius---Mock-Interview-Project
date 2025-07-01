import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavigationRoutes from "@/components/navigation-routes";
import { MenuIcon } from "lucide-react";

const ToggleContainer = () => {
  return (
    <div className="flex items-center">
      <Sheet>
        <SheetTrigger className="block md:hidden">
          <MenuIcon className="cursor-pointer" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle />
            <NavigationRoutes isMobile />
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ToggleContainer;
