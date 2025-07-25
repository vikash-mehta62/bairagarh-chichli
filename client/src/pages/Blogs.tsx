"use client";

import { useEffect, useState } from "react";
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
import { Search, Calendar, ArrowRight, Clock, BookOpenText } from "lucide-react"; // Added BookOpenText for hero
import { getAllBlogsAPI } from "../service/operations/blog";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all-types");
  const [sortBy, setSortBy] = useState("newest");
  const [uniqueTypes, setUniqueTypes] = useState([]);

  // Extract unique blog types
  const extractUniqueTypes = (blogs) => {
    const types = [...new Set(blogs.map((blog) => blog.type).filter(Boolean))];
    setUniqueTypes(types);
  };

  const getAllBlogs = async () => {
    try {
      setLoading(true);
      const response = await getAllBlogsAPI();
      if (response) {
        setBlogs(response);
        extractUniqueTypes(response);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("Failed to load blogs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate reading time (approximate)
  const calculateReadingTime = (text) => {
    const wordsPerMinute = 200;
    const words = text.split(" ").length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Filter and sort blogs
  const filteredAndSortedBlogs = blogs
    .filter((blog) => {
      const matchesSearch =
        searchTerm === "" ||
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.desc?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType =
        selectedType === "all-types" ||
        blog.type?.toLowerCase() === selectedType.toLowerCase();

      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  // Handle blog click
  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setSelectedType("all-types");
    setSortBy("newest");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent mx-auto mb-4"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading blogs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 mb-4 text-lg">{error}</p>
          <Button onClick={getAllBlogs} className="bg-indigo-600 hover:bg-indigo-700 text-white">
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
            Our <span className="text-orange-700">Insights</span> & Blog
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto opacity-90 leading-relaxed animate-fade-in delay-200">
            Stay updated with the latest real estate trends, expert advice, and market insights from CompanyName Solutions.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16 md:py-24">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search Input */}
            <div>
              <div className="relative">
                <Input
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-12 pl-10 pr-4 text-gray-900 placeholder:text-gray-500 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Blog Type Filter */}
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="h-12 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg text-gray-700">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent className="rounded-lg shadow-lg border border-gray-100">
                <SelectItem value="all-types" className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">All Types</SelectItem>
                {uniqueTypes.map((type) => (
                  <SelectItem key={type} value={type.toLowerCase()} className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort By Select */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-12 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg text-gray-700">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="rounded-lg shadow-lg border border-gray-100">
                <SelectItem value="newest" className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Newest First</SelectItem>
                <SelectItem value="oldest" className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Oldest First</SelectItem>
                <SelectItem value="title" className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Title A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Clear Filters Button */}
          {(searchTerm || selectedType !== "all-types") && (
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
        {(searchTerm || selectedType !== "all-types") && (
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
              {selectedType !== "all-types" && (
                <Badge
                  variant="secondary"
                  className="bg-orange-100 text-orange-800 border border-orange-200 px-3 py-1 rounded-full text-sm font-medium capitalize"
                >
                  Type: {selectedType}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredAndSortedBlogs.length} Blogs Found
          </h2>
        </div>

        {/* Blog Grid */}
        {filteredAndSortedBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredAndSortedBlogs.map((blog) => (
              <Card
                key={blog._id}
                className="overflow-hidden rounded-xl shadow-lg border border-gray-100 transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group bg-white cursor-pointer"
                onClick={() => handleBlogClick(blog._id)}
              >
                <div className="relative h-56"> {/* Fixed height for consistent image size */}
                  <img
                    src={blog.image || "https://placehold.co/600x400/E0E7FF/312E81?text=Blog+Image"} // Updated placeholder
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/600x400/E0E7FF/312E81?text=Blog+Image";
                    }}
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold capitalize shadow-sm">
                      {blog.type}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6 flex flex-col justify-between h-[calc(100%-14rem)]"> {/* Adjust height based on image height */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2 mb-2 leading-tight">
                      {blog.title}
                    </h3>
                    <p className="text-gray-700 text-sm line-clamp-3 mb-4 leading-relaxed">
                      {blog.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-indigo-500" />
                      {formatDate(blog.createdAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-indigo-500" />
                      {calculateReadingTime(blog.desc)}
                    </span>
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <Button
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full flex items-center justify-center gap-2 transition-all duration-300 shadow-md"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBlogClick(blog._id);
                      }}
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpenText className="w-12 h-12 text-indigo-400" /> {/* Changed icon */}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No Blogs Found
            </h3>
            <p className="text-gray-600 mb-6 max-w-sm mx-auto">
              We couldn't find any blog posts matching your current criteria. Try adjusting your filters.
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

        {/* Load More */}
        {filteredAndSortedBlogs.length > 0 && (
          <div className="text-center mt-16">
            <Button
              size="lg"
              variant="outline"
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-300 rounded-full px-8 py-3 shadow-sm hover:shadow-md"
            >
              Load More Blogs
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;