import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ContactPopup from "./components/ContactPopup";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminVendors from "./pages/admin/AdminVendors";
import AdminProperties from "./pages/admin/AdminProperties";
import VendorLogin from "./pages/VendorLogin";
import VendorRegister from "./pages/VendorRegister";
import VendorDashboard from "./pages/VendorDashboard";
import VendorProperties from "./pages/vendor/VendorProperties";
import VendorAddProperty from "./pages/VendorAddProperty";
import OpenRoute from "./components/auth/OpenRoute";
import PrivateRoute from "./components/auth/PrivateRoute";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";
import { useEffect, useState } from "react";
import AdminLayout from "./pages/AdminLayout";
import VendorLayout from "./pages/VendorLayout";
import VendorGetInquiry from "./pages/VendorGetInquiry";
import GetInquiry from "./pages/GetInquiry";
import AddBlog from "./pages/admin/AddBlog";
import GetBlog from "./pages/admin/GetBlog";
import Blogs from "./pages/Blogs";
import SingleBlog from "./pages/SingleBlog";
import Careers from "./pages/Career";
import JobDetail from "./pages/JobDetails";
import AdminApplications from "./pages/admin/AdminApplications";
import JobCreate from "./pages/admin/JobCreate";
import GetAllJob from "./pages/admin/GetAllJob";
import VendorProfile from "./pages/vendor/VendorProfile";
import VendorRegisterByAdmin from "./pages/VendorRegisterByAdmin";
import VendorIntroForm from "./pages/VendorIntroForm";
import { AddRoles } from "./pages/admin/AddRoles";
import WhatsAppButton from "./pages/WhatsAppButton";
import CustomerSupport from "./pages/CustomerSupport";
import GetCustomerSupport from "./pages/admin/GetCustomerSupport";

const queryClient = new QueryClient();

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

const App = () => {
  const user = useSelector((state: RootState) => state.auth?.user ?? null);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  const isAdminOrVendor =
    path.startsWith("/admin") || path.startsWith("/vendor");

  useEffect(() => {
    if (user?.role !== "/admin" && user?.role !== "/vendor") {
      const timer = setTimeout(() => {
        setShowContactPopup(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleClosePopup = () => {
    setShowContactPopup(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {!isAdminOrVendor && (
          <ContactPopup isOpen={showContactPopup} onClose={handleClosePopup} />
        )}
        {!isAdminOrVendor && <WhatsAppButton />}
        <div className="min-h-screen flex flex-col">
          <Routes>
            {user?.role === "admin" && (
              <Route
                path="/admin"
                element={
                  <PrivateRoute>
                    <AdminLayout />
                  </PrivateRoute>
                }
              >
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="vendors" element={<AdminVendors />} />
                <Route path="properties" element={<AdminProperties />} />
                <Route path="inquiry" element={<GetInquiry />} />
                <Route path="add-blog" element={<AddBlog />} />
                <Route path="get-blog" element={<GetBlog />} />
                <Route path="add-job" element={<JobCreate />} />
                <Route path="add-vendor" element={<VendorRegisterByAdmin />} />
                <Route path="get-jobs" element={<GetAllJob />} />
                <Route path="get-support" element={<GetCustomerSupport />} />
                <Route
                  path="get-applications"
                  element={<AdminApplications />}
                />
                <Route path="crm" element={<AddRoles />} />
              </Route>
            )}
            {user?.role === "vendor" && (
              <Route
                path="/vendor"
                element={
                  <PrivateRoute>
                    <VendorLayout />
                  </PrivateRoute>
                }
              >
                <Route path="dashboard" element={<VendorDashboard />} />
                <Route path="my-profile" element={<VendorProfile />} />
                <Route path="properties" element={<VendorProperties />} />
                <Route path="add-property" element={<VendorAddProperty />} />
                <Route path="get-inquiry" element={<VendorGetInquiry />} />
                <Route path="inquiry" element={<GetInquiry />} />
              </Route>
            )}

            <Route
              path="/*"
              element={
                <>
                  <Navbar />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/services" element={<Services />} />
                      <Route path="/blogs" element={<Blogs />} />
                      <Route path="/careers" element={<Careers />} />
                      <Route path="/careers/:id" element={<JobDetail />} />
                      <Route path="/blog/:id" element={<SingleBlog />} />
                      <Route path="/properties" element={<Properties />} />
                      <Route path="/vendor" element={<VendorIntroForm />} />
                      <Route
                        path="/customer-support"
                        element={<CustomerSupport />}
                      />
                      <Route
                        path="/properties/:id"
                        element={<PropertyDetails />}
                      />
                      <Route path="/contact" element={<Contact />} />
                      <Route
                        path="/admin/login"
                        element={
                          <OpenRoute>
                            <AdminLogin />
                          </OpenRoute>
                        }
                      />
                      <Route
                        path="/vendor/login"
                        element={
                          <OpenRoute>
                            <VendorLogin />
                          </OpenRoute>
                        }
                      />
                      <Route
                        path="/vendor/register"
                        element={
                          <OpenRoute>
                            <VendorRegister />
                          </OpenRoute>
                        }
                      />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default AppWrapper;
