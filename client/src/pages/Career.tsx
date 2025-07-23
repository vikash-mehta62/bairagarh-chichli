"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
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
  Search,
  Briefcase,
  MapPin,
  Clock,
  Building,
  Calendar,
  ArrowRight,
  GraduationCap, // For Professional Growth
  Users, // For Collaborative Culture
  TrendingUp, // For Competitive Benefits
  Award, // For Hero icon (optional, if you want one)
} from "lucide-react";
import { getJobsAPI } from "../service/operations/job";

// This would be replaced with your actual API function
const getAllJobsAPI = async () => {
  // Placeholder - replace with actual API call
  return [
    {
      _id: "1",
      title: "Real Estate Sales Executive",
      location: "Bhopal, MP",
      type: "Full-time",
      department: "Sales",
      experience: "2-5 years",
      salary: "₹4L - ₹8L per annum",
      description:
        "We are looking for an experienced Real Estate Sales Executive to join our growing team. The ideal candidate will have a proven track record in property sales and excellent communication skills.",
      responsibilities: [
        "Generate and follow up on leads",
        "Conduct property viewings and presentations",
        "Negotiate deals and close sales",
        "Maintain client relationships",
        "Stay updated on market trends",
      ],
      requirements: [
        "2-5 years of experience in real estate sales",
        "Excellent communication and negotiation skills",
        "Valid real estate license",
        "Self-motivated with a positive attitude",
        "Knowledge of local property market",
      ],
      benefits: [
        "Competitive commission structure",
        "Health insurance",
        "Professional development opportunities",
        "Flexible working hours",
        "Team incentives and bonuses",
      ],
      postedDate: "2025-05-15T10:30:00.000Z",
      deadline: "2025-06-15T23:59:59.000Z",
    },
    {
      _id: "2",
      title: "Property Manager",
      location: "Bhopal, MP",
      type: "Full-time",
      department: "Operations",
      experience: "3+ years",
      salary: "₹5L - ₹7L per annum",
      description:
        "We are seeking a detail-oriented Property Manager to oversee our residential properties. The successful candidate will be responsible for maintaining property standards, tenant relations, and financial reporting.",
      responsibilities: [
        "Manage day-to-day operations of assigned properties",
        "Handle tenant inquiries and resolve issues",
        "Oversee maintenance and repair work",
        "Conduct regular property inspections",
        "Prepare financial reports and budgets",
      ],
      requirements: [
        "3+ years of experience in property management",
        "Strong organizational and problem-solving skills",
        "Knowledge of property management software",
        "Excellent customer service skills",
        "Basic understanding of building maintenance",
      ],
      benefits: [
        "Health and dental insurance",
        "Retirement plan",
        "Paid time off",
        "Professional development opportunities",
        "Performance bonuses",
      ],
      postedDate: "2025-05-10T09:15:00.000Z",
      deadline: "2025-06-10T23:59:59.000Z",
    },
    {
      _id: "3",
      title: "Digital Marketing Specialist",
      location: "Remote",
      type: "Full-time",
      department: "Marketing",
      experience: "2-4 years",
      salary: "₹4.5L - ₹6.5L per annum",
      description:
        "We are looking for a Digital Marketing Specialist to develop and implement marketing strategies for our real estate business. The ideal candidate will have experience in SEO, social media marketing, and content creation.",
      responsibilities: [
        "Develop and execute digital marketing campaigns",
        "Manage social media accounts and create engaging content",
        "Implement SEO strategies to improve website ranking",
        "Analyze campaign performance and prepare reports",
        "Collaborate with sales team to generate leads",
      ],
      requirements: [
        "2-4 years of experience in digital marketing",
        "Proficiency in SEO, SEM, and social media marketing",
        "Experience with Google Analytics and other marketing tools",
        "Strong analytical and creative skills",
        "Knowledge of real estate industry is a plus",
      ],
      benefits: [
        "Remote work flexibility",
        "Health insurance",
        "Paid time off",
        "Professional development budget",
        "Performance bonuses",
      ],
      postedDate: "2025-05-20T14:00:00.000Z",
      deadline: "2025-06-20T23:59:59.000Z",
    },
    {
      _id: "4",
      title: "Real Estate Photographer",
      location: "Bhopal, MP",
      type: "Part-time",
      department: "Creative",
      experience: "1-3 years",
      salary: "₹15K - ₹25K per month",
      description:
        "We are seeking a skilled photographer to capture high-quality images of our properties. The ideal candidate will have experience in real estate photography and attention to detail.",
      responsibilities: [
        "Photograph interior and exterior of properties",
        "Edit and enhance images for marketing materials",
        "Coordinate with property managers for scheduling",
        "Maintain photography equipment",
        "Deliver final images in a timely manner",
      ],
      requirements: [
        "1-3 years of experience in photography, preferably real estate",
        "Proficiency in photo editing software",
        "Own photography equipment",
        "Flexible schedule",
        "Eye for detail and composition",
      ],
      benefits: [
        "Flexible working hours",
        "Opportunity for full-time employment",
        "Portfolio development",
        "Travel allowance",
        "Performance bonuses",
      ],
      postedDate: "2025-05-18T11:45:00.000Z",
      deadline: "2025-06-18T23:59:59.000Z",
    },
  ];
};

const Careers = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [uniqueDepartments, setUniqueDepartments] = useState([]);
  const [uniqueTypes, setUniqueTypes] = useState([]);
  const [uniqueLocations, setUniqueLocations] = useState([]);

  // Extract unique values for filters
  const extractUniqueValues = (jobs) => {
    const departments = [
      ...new Set(jobs.map((job) => job.department).filter(Boolean)),
    ];
    const types = [...new Set(jobs.map((job) => job.type).filter(Boolean))];
    const locations = [
      ...new Set(jobs.map((job) => job.location).filter(Boolean)),
    ];

    setUniqueDepartments(departments);
    setUniqueTypes(types);
    setUniqueLocations(locations);
  };

  // Fetch all jobs
  const fetchAllJobs = async () => {
    try {
      setLoading(true);
      // Using the placeholder getAllJobsAPI for demonstration
      const response = await getAllJobsAPI();
      setJobs(response);
      extractUniqueValues(response);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setError("Failed to load job listings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate days remaining until deadline
  const calculateDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime(); // Use getTime() for numeric comparison
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `${diffDays} days remaining` : "Deadline passed";
  };

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      searchTerm === "" ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      selectedDepartment === "all" || job.department === selectedDepartment;
    const matchesType = selectedType === "all" || job.type === selectedType;
    const matchesLocation =
      selectedLocation === "all" || job.location === selectedLocation;

    return matchesSearch && matchesDepartment && matchesType && matchesLocation;
  });

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedDepartment("all");
    setSelectedType("all");
    setSelectedLocation("all");
  };

  // Handle job click
  const handleJobClick = (jobId) => {
    navigate(`/careers/${jobId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent mx-auto mb-4"></div>
          <p className="mt-4 text-gray-600 text-lg">
            Loading job opportunities...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4 text-lg">{error}</p>
          <Button onClick={fetchAllJobs} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Header (Hero Section) */}
      <section className="relative py-28 md:py-36 bg-gradient-to-br from-indigo-100 to-indigo-300 text-indigo-900 overflow-hidden shadow-md">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.08\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 6V5zM6 5v1H5z\'/%3E%3C/g%3E%3C/svg%3E")'}}></div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-sm leading-tight animate-fade-in-up">
            Join Our <span className="text-orange-700">Dynamic Team</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto opacity-90 leading-relaxed animate-fade-in delay-200">
            Discover exciting career opportunities and be part of our mission to transform the real estate industry.
          </p>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-20 md:py-32 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-orange-500 pb-3 inline-block leading-tight">
              Why <span className="text-indigo-600">Choose</span> PropEdge Solutions?
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We offer a dynamic work environment with unparalleled opportunities for growth, competitive benefits, and a chance to make a real impact in the real estate industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-md">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                Professional Growth
              </h3>
              <p className="text-gray-700 text-base leading-relaxed">
                We invest in our team's continuous development through comprehensive training programs, dedicated mentorship, and clear pathways for career advancement.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-md">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                Collaborative Culture
              </h3>
              <p className="text-gray-700 text-base leading-relaxed">
                Join a vibrant team that thrives on collaboration, fosters innovation, and is passionately committed to creating exceptional experiences for our clients.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg text-center transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-md">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                Competitive Benefits
              </h3>
              <p className="text-gray-700 text-base leading-relaxed">
                We offer a comprehensive package including competitive salaries, robust health benefits, flexible work arrangements, and rewarding performance incentives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-orange-500 pb-3 inline-block leading-tight">
              Current <span className="text-indigo-600">Openings</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Explore our current job opportunities and find the perfect role that aligns with your skills and career aspirations.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-12 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Search Input */}
              <div>
                <div className="relative">
                  <Input
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-12 pl-10 pr-4 text-gray-900 placeholder:text-gray-500 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Department Filter */}
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="h-12 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg text-gray-700">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent className="rounded-lg shadow-lg border border-gray-100">
                  <SelectItem value="all" className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">All Departments</SelectItem>
                  {uniqueDepartments.map((department) => (
                    <SelectItem key={department} value={department} className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                      {department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Job Type Filter */}
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="h-12 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg text-gray-700">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent className="rounded-lg shadow-lg border border-gray-100">
                  <SelectItem value="all" className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">All Types</SelectItem>
                  {uniqueTypes.map((type) => (
                    <SelectItem key={type} value={type} className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Location Filter */}
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="h-12 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg text-gray-700">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent className="rounded-lg shadow-lg border border-gray-100">
                  <SelectItem value="all" className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">All Locations</SelectItem>
                  {uniqueLocations.map((location) => (
                    <SelectItem key={location} value={location} className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Clear Filters Button */}
            {(searchTerm ||
              selectedDepartment !== "all" ||
              selectedType !== "all" ||
              selectedLocation !== "all") && (
              <div className="mt-6 flex justify-center">
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-300 rounded-full px-6 py-2"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>

          {/* Active Filters Display */}
          {(searchTerm ||
            selectedDepartment !== "all" ||
            selectedType !== "all" ||
            selectedLocation !== "all") && (
            <div className="mb-10">
              <h3 className="text-base font-semibold text-gray-700 mb-3">
                Active Filters:
              </h3>
              <div className="flex flex-wrap gap-3">
                {searchTerm && (
                  <Badge
                    variant="secondary"
                    className="bg-indigo-100 text-indigo-800 border border-indigo-200 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    Search: "{searchTerm}"
                  </Badge>
                )}
                {selectedDepartment !== "all" && (
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-800 border border-orange-200 px-3 py-1 rounded-full text-sm font-medium capitalize"
                  >
                    Department: {selectedDepartment}
                  </Badge>
                )}
                {selectedType !== "all" && (
                  <Badge
                    variant="secondary"
                    className="bg-indigo-100 text-indigo-800 border border-indigo-200 px-3 py-1 rounded-full text-sm font-medium capitalize"
                  >
                    Type: {selectedType}
                  </Badge>
                )}
                {selectedLocation !== "all" && (
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-800 border border-orange-200 px-3 py-1 rounded-full text-sm font-medium capitalize"
                  >
                    Location: {selectedLocation}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900">
              {filteredJobs.length} Jobs Found
            </h3>
          </div>

          {/* Job Cards */}
          {filteredJobs.length > 0 ? (
            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <Card
                  key={job._id}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => handleJobClick(job._id)}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-grow">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 mb-4">
                          <span className="flex items-center gap-1">
                            <Building className="w-4 h-4 text-indigo-500" />
                            {job.department}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-indigo-500" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-indigo-500" />
                            {job.type}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4 text-indigo-500" />
                            {job.experience}
                          </span>
                        </div>
                        <p className="text-gray-700 line-clamp-2 mb-4 leading-relaxed">
                          {job.description}
                        </p>
                        <div className="flex items-center text-sm">
                          <Calendar className="w-4 h-4 mr-1 text-orange-500" />
                          <span className="text-gray-600 mr-2">
                            Posted: {formatDate(job.postedDate)}
                          </span>
                          <span className="text-orange-600 font-semibold">
                            {calculateDaysRemaining(job.deadline)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-6 md:mt-0 md:ml-6 flex-shrink-0">
                        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full px-6 py-3 shadow-md flex items-center justify-center gap-2 transition-all duration-300">
                          View Details
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-12 h-12 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No Job Openings Found
              </h3>
              <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                We couldn't find any job opportunities matching your current criteria. Try adjusting your filters.
              </p>
              <Button
                onClick={clearFilters}
                variant="outline"
                className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-300 rounded-full px-6 py-2"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-indigo-700 to-indigo-900 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Don't See the <span className="text-orange-300">Right Fit?</span>
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90">
            We're always looking for talented individuals to join our team. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <Button
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full px-8 py-3 shadow-lg transition-all duration-300 flex items-center justify-center mx-auto"
            onClick={() => navigate("/careers/general-application")}
          >
            Submit General Application
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Careers;