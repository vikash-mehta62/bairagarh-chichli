"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  Eye,
  Download,
  Filter,
  Calendar,
  User,
  Briefcase,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { getApplicationAPI } from "../../service/operations/career";
import { toast } from "react-toastify";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

// This would be replaced with your actual API function for updating status
const updateApplicationStatusAPI = async (applicationId, status) => {
  // Replace with your actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Updated application ${applicationId} to status: ${status}`);
      resolve({ success: true });
    }, 500);
  });
};

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [uniqueDepartments, setUniqueDepartments] = useState([]);
  const [uniqueSources, setUniqueSources] = useState([]);
  const user = useSelector((state: RootState) => state.auth?.user ?? null);

  // Extract unique values for filters
  const extractUniqueValues = (applications) => {
    const departments = [
      ...new Set(
        applications
          .filter((app) => app.job && Object.keys(app.job).length > 0)
          .map((app) => app.job.department)
          .filter(Boolean)
      ),
    ];
    const sources = [
      ...new Set(applications.map((app) => app.source).filter(Boolean)),
    ];

    setUniqueDepartments(departments);
    setUniqueSources(sources);
  };

  // Fetch all applications
  const fetchAllApplications = async () => {
    try {
      setLoading(true);
      const response = await getApplicationAPI();

      // Add default status if not present
      const applicationsWithStatus = response.map((app) => ({
        ...app,
        status: app.status || "pending", // Default status if not present in data
      }));

      setApplications(applicationsWithStatus);
      extractUniqueValues(applicationsWithStatus);
    } catch (error) {
      console.error("Error fetching applications:", error);
      setError("Failed to load applications. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllApplications();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "reviewed":
        return "bg-blue-100 text-blue-800";
      case "shortlisted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "hired":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Update application status
  const updateStatus = async (applicationId, newStatus) => {
    try {
      await updateApplicationStatusAPI(applicationId, newStatus);
      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId ? { ...app, status: newStatus } : app
        )
      );
      toast.success("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  // Check if job object is empty or null
  const isGeneralApplication = (job) => {
    return !job || Object.keys(job).length === 0 || job.jobId === "general";
  };

  // Filter applications
  const filteredApplications = applications.filter((application) => {
    const matchesSearch =
      searchTerm === "" ||
      `${application.firstName} ${application.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      application.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (application.job?.title &&
        application.job.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" || application.status === statusFilter;

    const matchesDepartment =
      departmentFilter === "all" ||
      (application.job && application.job.department === departmentFilter) ||
      (departmentFilter === "general" && isGeneralApplication(application.job));

    const matchesSource =
      sourceFilter === "all" || application.source === sourceFilter;

    return matchesSearch && matchesStatus && matchesDepartment && matchesSource;
  });

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setDepartmentFilter("all");
    setSourceFilter("all");
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Job Title",
      "Department",
      "Experience",
      "Education",
      "Status",
      "Applied Date",
      "Source",
    ];

    const csvData = filteredApplications.map((app) => [
      `${app.firstName} ${app.lastName}`,
      app.email,
      app.phone,
      app.job?.title || "General Application",
      app.job?.department || "N/A",
      app.experience,
      app.education,
      app.status,
      formatDate(app.createdAt),
      app.source,
    ]);

    const csvContent = [headers, ...csvData]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "job_applications.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchAllApplications}>Try Again</Button>
        </div>
      </div>
    );
  }

  if (!user?.isAppicatoin) {
    return (
      <div className="text-red-600 text-center p-4 font-semibold">
        You do not have permission to view this page.
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="py-8 gradient-gold text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Job Applications
              </h1>
              <p className="text-lg">Manage and review all job applications</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">{applications.length}</div>
                <div className="text-sm">Total Applications</div>
              </div>
              <div className="bg-white/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold">
                  {
                    applications.filter((app) => app.status === "pending")
                      .length
                  }
                </div>
                <div className="text-sm">Pending Review</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <Input
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-10"
                />
              </div>

              <Select
                value={departmentFilter}
                onValueChange={setDepartmentFilter}
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="general">General Application</SelectItem>
                  {uniqueDepartments.map((department) => (
                    <SelectItem key={department} value={department}>
                      {department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  {uniqueSources.map((source) => (
                    <SelectItem key={source} value={source}>
                      {source.charAt(0).toUpperCase() + source.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="flex-1"
                >
                  Clear
                </Button>
                <Button onClick={exportToCSV} className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              {filteredApplications.length} Applications Found
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Job Position</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.length > 0 ? (
                    filteredApplications.map((application) => (
                      <TableRow key={application._id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {application.firstName} {application.lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {application.email}
                            </div>
                            <div className="text-sm text-gray-500">
                              {application.phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {isGeneralApplication(application.job)
                                ? "General Application"
                                : application.job?.title}
                            </div>
                            {!isGeneralApplication(application.job) && (
                              <>
                                <div className="text-sm text-gray-500">
                                  {application.job?.department}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {application.job?.location}
                                </div>
                              </>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {application.experience} years
                            </div>
                            <div className="text-sm text-gray-500 capitalize">
                              {application.education}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {formatDate(application.createdAt)}
                          </div>
                        </TableCell>

                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {application.source}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  setSelectedApplication(application)
                                }
                              >
                                <Eye className="w-4 h-4 mr-2" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>
                                  Application Details - {application.firstName}{" "}
                                  {application.lastName}
                                </DialogTitle>
                                <DialogDescription>
                                  Applied for:{" "}
                                  {isGeneralApplication(application.job)
                                    ? "General Application"
                                    : application.job?.title}
                                </DialogDescription>
                              </DialogHeader>
                              {selectedApplication && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  {/* Personal Information */}
                                  <div className="space-y-4">
                                    <h3 className="text-lg font-semibold flex items-center">
                                      <User className="w-5 h-5 mr-2" />
                                      Personal Information
                                    </h3>
                                    <div className="space-y-2">
                                      <div>
                                        <label className="text-sm font-medium text-gray-500">
                                          Full Name
                                        </label>
                                        <p>
                                          {selectedApplication.firstName}{" "}
                                          {selectedApplication.lastName}
                                        </p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-gray-500">
                                          Email
                                        </label>
                                        <p className="flex items-center">
                                          <Mail className="w-4 h-4 mr-2" />
                                          {selectedApplication.email}
                                        </p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-gray-500">
                                          Phone
                                        </label>
                                        <p className="flex items-center">
                                          <Phone className="w-4 h-4 mr-2" />
                                          {selectedApplication.phone}
                                        </p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-gray-500">
                                          Address
                                        </label>
                                        <p>{selectedApplication.address}</p>
                                      </div>
                                      {selectedApplication.portfolioLink && (
                                        <div>
                                          <label className="text-sm font-medium text-gray-500">
                                            Portfolio/LinkedIn
                                          </label>
                                          <p>
                                            <a
                                              href={
                                                selectedApplication.portfolioLink
                                              }
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-blue-600 hover:underline"
                                            >
                                              {
                                                selectedApplication.portfolioLink
                                              }
                                            </a>
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Professional Information */}
                                  <div className="space-y-4">
                                    <h3 className="text-lg font-semibold flex items-center">
                                      <Briefcase className="w-5 h-5 mr-2" />
                                      Professional Information
                                    </h3>
                                    <div className="space-y-2">
                                      <div>
                                        <label className="text-sm font-medium text-gray-500">
                                          Experience
                                        </label>
                                        <p>
                                          {selectedApplication.experience} years
                                        </p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-gray-500">
                                          Education
                                        </label>
                                        <p className="capitalize">
                                          {selectedApplication.education}
                                        </p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-gray-500">
                                          Source
                                        </label>
                                        <p className="capitalize">
                                          {selectedApplication.source}
                                        </p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-gray-500">
                                          Applied Date
                                        </label>
                                        <p className="flex items-center">
                                          <Calendar className="w-4 h-4 mr-2" />
                                          {formatDate(
                                            selectedApplication.createdAt
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Job Information */}
                                  {!isGeneralApplication(
                                    selectedApplication.job
                                  ) && (
                                    <div className="md:col-span-2 space-y-4">
                                      <h3 className="text-lg font-semibold flex items-center">
                                        <MapPin className="w-5 h-5 mr-2" />
                                        Job Information
                                      </h3>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                          <label className="text-sm font-medium text-gray-500">
                                            Job Title
                                          </label>
                                          <p>
                                            {selectedApplication.job?.title}
                                          </p>
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium text-gray-500">
                                            Department
                                          </label>
                                          <p>
                                            {
                                              selectedApplication.job
                                                ?.department
                                            }
                                          </p>
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium text-gray-500">
                                            Location
                                          </label>
                                          <p>
                                            {selectedApplication.job?.location}
                                          </p>
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium text-gray-500">
                                            Job Type
                                          </label>
                                          <p>{selectedApplication.job?.type}</p>
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium text-gray-500">
                                            Required Experience
                                          </label>
                                          <p>
                                            {
                                              selectedApplication.job
                                                ?.experience
                                            }
                                          </p>
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium text-gray-500">
                                            Salary
                                          </label>
                                          <p>
                                            {selectedApplication.job?.salary}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="text-gray-500">
                          <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                          <p>No applications found matching your criteria</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminApplications;
