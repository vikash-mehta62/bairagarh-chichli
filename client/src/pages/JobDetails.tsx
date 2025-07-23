"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Building,
  MapPin,
  Clock,
  Briefcase,
  CheckCircle,
} from "lucide-react";
import JobApplicationForm from "./JobApplicationForm";
import { getJobByIdAPI } from "../service/operations/job";
// This would be replaced with your actual API function
const getSingleJobAPI = async (id) => {
  // Placeholder - replace with actual API call
  const jobs = [
    {
      _id: "1",
      title: "Real Estate Sales Executive",
      location: ", MP",
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
      location: ", MP",
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
      location: ", MP",
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

  return jobs.find((job) => job._id === id);
};

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate days remaining until deadline
  const calculateDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `${diffDays} days remaining` : "Deadline passed";
  };

  // Check if deadline has passed
  const isDeadlinePassed = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    return today > deadlineDate;
  };

  // Fetch job details
  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const response = await getJobByIdAPI(id);
      if (response) {
        setJob(response);
      } else {
        setError("Job not found");
      }
    } catch (error) {
      console.error("Error fetching job details:", error);
      setError("Failed to load job details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchJobDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Job not found"}</p>
          <Button onClick={() => navigate("/careers")}>Back to Careers</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="py-8 gradient-gold text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="outline"
            className="mb-6 text-black border-white hover:bg-white hover:text-amber-600"
            onClick={() => navigate("/careers")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to All Jobs
          </Button>
          <div className="mb-4">
            <Badge className="bg-white text-amber-600 mb-2">
              {job.department}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{job.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {job.location}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {job.type}
            </span>
            <span className="flex items-center">
              <Briefcase className="w-4 h-4 mr-1" />
              {job.experience}
            </span>
            <span className="flex items-center">
              <Building className="w-4 h-4 mr-1" />
              {job.salary}
            </span>
          </div>
        </div>
      </section>

      {/* Job Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          {/* Application Deadline */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b">
            <div>
              <p className="text-sm text-gray-600">
                Posted on {formatDate(job.postedDate)}
              </p>
              <p className="text-sm font-medium">
                Application Deadline:{" "}
                <span className="text-amber-600">
                  {formatDate(job.deadline)}
                </span>
              </p>
            </div>
            <Badge
              className={
                isDeadlinePassed(job.deadline)
                  ? "bg-red-100 text-red-800"
                  : "bg-green-100 text-green-800"
              }
            >
              {calculateDaysRemaining(job.deadline)}
            </Badge>
          </div>

          {/* Job Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Job Description
            </h2>
            <p className="text-gray-700 mb-6">{job.description}</p>
          </div>

          {/* Responsibilities */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Key Responsibilities
            </h2>
            <ul className="space-y-2">
              {job.responsibilities.map((responsibility, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-amber-600 mr-2 mt-0.5" />
                  <span className="text-gray-700">{responsibility}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Requirements
            </h2>
            <ul className="space-y-2">
              {job.requirements.map((requirement, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-amber-600 mr-2 mt-0.5" />
                  <span className="text-gray-700">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Benefits
            </h2>
            <ul className="space-y-2">
              {job.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-amber-600 mr-2 mt-0.5" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Apply Button */}
          <div className="mt-8 text-center">
            {isDeadlinePassed(job.deadline) ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-800">
                  The application deadline for this position has passed. Please
                  check our other open positions.
                </p>
              </div>
            ) : (
              <Button
                size="lg"
                className="gradient-gold text-white"
                onClick={() => setShowApplicationForm(true)}
              >
                Apply for this Position
              </Button>
            )}
          </div>
        </div>

        {/* Application Form */}
        {showApplicationForm && !isDeadlinePassed(job.deadline) && (
          <JobApplicationForm
            jobId={job._id}
            jobTitle={job.title}
            job={job}
            onClose={() => setShowApplicationForm(false)}
          />
        )}

        {/* Similar Jobs */}
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Explore Other Opportunities
          </h3>
          <Button
            onClick={() => navigate("/careers")}
            variant="outline"
            size="lg"
          >
            View All Jobs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
