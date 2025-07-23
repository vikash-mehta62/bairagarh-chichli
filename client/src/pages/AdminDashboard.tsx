"use client";

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllVendorAPI } from "../service/operations/vendor";
import { Users, Home, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getAllPropertyAPI } from "../service/operations/property";

const AdminDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVendor = async () => {
    const response = await getAllVendorAPI();
    console.log(response);
    if (response) {
      setVendors(response);
    }
  };
  const fetchAllProperty = async () => {
    try {
      setLoading(true);
      const response = await getAllPropertyAPI();
      setProperties(response);
      console.log("Fetched properties:", response);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setError("Failed to load properties. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProperty();

    fetchVendor();
  }, []);

  const stats = [
    {
      title: "Total Vendors",
      value: vendors.length,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Approved Vendors",
      value: vendors.filter((v) => v.status === "approved").length,
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      title: "Pending Approval",
      value: vendors.filter((v) => v.status === "pending").length,
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      title: "Total Properties",
      value: properties.length,
      icon: Home,
      color: "bg-purple-500",
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <SidebarInset>
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-6"></header>

          {/* Main Content */}
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
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
