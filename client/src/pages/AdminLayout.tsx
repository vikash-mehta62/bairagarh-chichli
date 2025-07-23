"use client";

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AdminSidebar from "../components/AdminSidebar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllVendorAPI } from "../service/operations/vendor";
import { Users, Home, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const AdminLayout = () => {
  const [vendors, setVendors] = useState([]);

  const fetchVendor = async () => {
    const response = await getAllVendorAPI();
    console.log(response);
    if (response) {
      setVendors(response);
    }
  };

  useEffect(() => {
    fetchVendor();
  }, []);

  const [properties, setProperties] = useState([
    {
      id: 1,
      title: "Luxury Villa in Awadhpuri",
      price: "₹2.5 Cr",
      location: "Awadhpuri, ",
      type: "Villa",
      vendorName: "Rajesh Kumar",
      vendorCompany: "Kumar Properties",
      status: "active",
      views: 45,
      createdDate: "2024-01-20",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
    },
    {
      id: 2,
      title: "Modern Apartment Complex",
      price: "₹85 Lakh",
      location: "New Market, ",
      type: "Apartment",
      vendorName: "Priya Sharma",
      vendorCompany: "Sharma Realty",
      status: "pending",
      views: 23,
      createdDate: "2024-01-22",
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840",
    },
    {
      id: 3,
      title: "Commercial Space",
      price: "₹1.2 Cr",
      location: "MP Nagar, ",
      type: "Commercial",
      vendorName: "Amit Patel",
      vendorCompany: "Patel Builders",
      status: "inactive",
      views: 12,
      createdDate: "2024-01-18",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    },
  ]);

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
      <div className="min-h-screen flex w-[90vw] mx-auto">
        <AdminSidebar />

        <div className="flex flex-1 flex-col gap-4 p-6">
          {/* Stats Cards */}

          {/* Outlet Content */}
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
