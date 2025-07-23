import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import VendorSidebar from "../components/VendorSidebar";
import { Outlet } from "react-router-dom";

const VendorLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-[85vw] mx-auto">
        <VendorSidebar />
        <SidebarInset>
          <div className="p-6">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default VendorLayout;
