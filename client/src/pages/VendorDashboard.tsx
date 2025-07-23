import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import VendorSidebar from "../components/VendorSidebar";
import { Outlet } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Home } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "react-toastify";
import { getVendorPropertyAPI } from "../service/operations/property";
const VendorDashboard = () => {
  const user = useSelector((state: RootState) => state.auth?.user ?? null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchProperties = async () => {
    if (!user?._id) return;

    try {
      setLoading(true);
      const vendorProperties = await getVendorPropertyAPI({ vendor: user._id });
      setProperties(vendorProperties);
    } catch (error) {
      console.error("Error fetching properties:", error);
      toast.error("Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };
  const stats = [
    {
      title: "Total Properties",
      value: properties.length,
      icon: Home,
      color: "bg-purple-500",
    },
  ];
  useEffect(() => {
    fetchProperties();
  }, [user]);
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-white flex w-[90vw] mx-auto">
        <VendorSidebar />

        <div className="flex flex-1 flex-col gap-4 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div
                      className={`${stat.color} p-3 rounded-full text-white mr-4 flex-shrink-0`}
                    >
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Outlet Content */}
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default VendorDashboard;
