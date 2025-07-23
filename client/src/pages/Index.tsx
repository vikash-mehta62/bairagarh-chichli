"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Search,
  MapPin,
  Home,
  Users,
  Award,
  Bath,
  Maximize,
  ChevronRight,
  Sparkles, // Added for a premium feel
  Building, // For property types section, if not already used
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { useState, useEffect } from "react";
import { getAllPropertyAPI } from "../service/operations/property";
import Service from "@/components/Service";
import Client from "@/components/Client";
import Review from "@/components/Review";
import VisionMissionSection from "@/components/VisionMissionSection";
import PropertyTypesSection from "@/components/PropertyTypesSection";
import { useNavigate } from "react-router-dom";



const Index = () => {
  const navigate = useNavigate();

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("all-types");
  const [priceRange, setPriceRange] = useState([0, 10]); // [min, max] in crores
  const [location, setLocation] = useState("all-locations");
  const [sortBy, setSortBy] = useState("newest"); // Unused in this context, but good to keep

  // Data states
  const [properties, setProperties] = useState([]);
  const [uniqueTypes, setUniqueTypes] = useState([]);
  const [uniqueLocations, setUniqueLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Convert price range to display text
  const getPriceRangeText = (range) => {
    const [min, max] = range;
    if (min === 0 && max === 10) return "Any Price";
    if (min === 0) return `Under ₹${max} Cr`;
    if (max === 10) return `₹${min} Cr & Above`;
    return `₹${min} Cr - ₹${max} Cr`;
  };

  // Format price range for URL query (as per your existing logic)
  const formatPriceRangeForUrl = (range) => {
    const [min, max] = range;
    if (min === 0 && max === 10) return "all-prices";
    if (min === 0) return `under-${max * 100}`;
    if (max === 10) return `above-${min * 100}`;
    return `${min * 100}-${max * 100}`;
  };

  // Extract unique property types and locations
  const extractUniqueValues = (fetchedProperties) => {
    const types = [
      ...new Set(fetchedProperties.map((property) => property.type).filter(Boolean)),
    ];
    const locations = [
      ...new Set(
        fetchedProperties
          .map((property) => {
            const locationParts = property.location?.split(",") || [];
            return locationParts[0]?.trim(); // Get the first part (area name)
          })
          .filter(Boolean)
      ),
    ];

    setUniqueTypes(types);
    setUniqueLocations(locations);
  };

  // Fetch properties and extract unique types
  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllPropertyAPI();
      setProperties(response || []); // Ensure it's always an array
      extractUniqueValues(response || []);
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError("Failed to load properties. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (searchTerm) searchParams.append("search", searchTerm);
    if (propertyType && propertyType !== "all-types")
      searchParams.append("type", propertyType);

    const priceRangeString = formatPriceRangeForUrl(priceRange);
    if (priceRangeString !== "all-prices")
      searchParams.append("price", priceRangeString);

    if (location && location !== "all-locations")
      searchParams.append("location", location);

    navigate(`/properties?${searchParams.toString()}`);
  };

  // Handle Enter key press for search
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handlePropertyClick = (propertyId) => {
    navigate(`/properties/${propertyId}`);
  };

  // Clear all filters function
  const clearFilters = () => {
    setSearchTerm("");
    setPropertyType("all-types");
    setPriceRange([0, 10]);
    setLocation("all-locations");
    setSortBy("newest");
  };

  // Stats for the "Why Choose Us" section
  const stats = [
    { icon: Home, value: "10,00,000+", label: "Sq. Ft. Sold" },
    { icon: Users, value: "5,000+", label: "Happy Clients" },
    { icon: Award, value: "25+", label: "Years Experience" },
    {
      icon: MapPin,
      value: `${properties.length > 0 ? properties.length : '0'}+`, // Dynamic count, handle 0
      label: "Properties Listed",
    },
  ];

  // Get 6 latest properties for featured section (not filtered by search bar)
  const featuredProperties = properties
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.date || 0).getTime() -
        new Date(a.createdAt || a.date || 0).getTime()
    )
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Hero Section */}
      <section className="relative h-[95vh] md:h-screen flex items-center justify-center text-white overflow-hidden shadow-xl">
        {/* Background Image with Parallax & Subtle Zoom */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out transform scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?fm=jpg&q=80&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D')`,
            backgroundAttachment: 'fixed', // Parallax effect
          }}
          aria-label="Beautiful modern real estate property"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 gradient-hero-overlay" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 drop-shadow-lg animated-fade-in-up">
            Your Journey to a <span className="text-accent-gold">Perfect Home</span> Starts Here
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-12 max-w-4xl mx-auto opacity-90 drop-shadow animated-fade-in-up delay-200">
            With over **25 years of proven excellence**, we seamlessly connect you with properties that fulfill your aspirations.
          </p>

       
        </div>
      </section>

      {/* Why Choose Us / Stats Section - Emphasizing Trust & Experience */}
      <section className="py-20 bg-primary-dark text-white -mt-20 relative z-0 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center p-4 animated-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="bg-accent-gold text-primary-dark p-5 rounded-full mb-4 shadow-xl transform hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-10 h-10" />
                </div>
                <div className="text-5xl font-extrabold mb-1 text-white">{stat.value}</div>
                <div className="text-lg md:text-xl font-medium opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

<section className="pt-10">
     {/* Advanced Search Bar - Elevated and Interactive */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-6xl mx-auto shadow-2xl backdrop-blur-md bg-opacity-95 transform -translate-y-20 animated-fade-in-up delay-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Label htmlFor="search-input" className="sr-only">
                  Search by keyword
                </Label>
                <Input
                  id="search-input"
                  placeholder="Area, project, builder..."
                  className="h-14 pl-10 text-gray-800 placeholder:text-gray-500 border-gray-300 focus:border-primary-light focus:ring-2 focus:ring-primary-light/30 transition-all duration-200 text-base rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>

              {/* Property Type Select */}
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Label htmlFor="property-type-select" className="sr-only">
                  Property Type
                </Label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger id="property-type-select" className="h-14 pl-10 text-gray-800 border-gray-300 focus:border-primary-light focus:ring-2 focus:ring-primary-light/30 transition-all duration-200 text-base rounded-lg">
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg shadow-lg">
                    <SelectItem value="all-types">All Types</SelectItem>
                    {uniqueTypes.map((type) => (
                      <SelectItem key={type} value={type} className="hover:bg-gray-100">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location Select */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Label htmlFor="location-select" className="sr-only">
                  Location
                </Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger id="location-select" className="h-14 pl-10 text-gray-800 border-gray-300 focus:border-primary-light focus:ring-2 focus:ring-primary-light/30 transition-all duration-200 text-base rounded-lg">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg shadow-lg">
                    <SelectItem value="all-locations">All Locations</SelectItem>
                    {uniqueLocations.map((loc) => (
                      <SelectItem key={loc} value={loc} className="hover:bg-gray-100">
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Search Button */}
              <div>
                <Button
                  className="h-14 w-full bg-primary-dark hover:bg-primary-light text-white font-semibold text-lg shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 rounded-lg flex items-center justify-center"
                  onClick={handleSearch}
                >
                  <Search className="w-5 h-5 mr-2" />
                  Find Properties
                </Button>
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <Label className="text-base font-semibold text-gray-800">
                  Price Range
                </Label>
                <span className="text-base font-semibold text-primary-dark">
                  {getPriceRangeText(priceRange)}
                </span>
              </div>
              <div className="px-1 mb-2">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={10}
                  min={0}
                  step={0.5}
                  className="w-full [&>span:first-child]:bg-primary-dark [&>span:first-child]:h-2 [&>span:first-child]:rounded-full [&>span:last-child]:w-5 [&>span:last-child]:h-5 [&>span:last-child]:bg-primary-dark [&>span:last-child]:ring-2 [&>span:last-child]:ring-offset-2 [&>span:last-child]:ring-primary-dark/50"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>₹0 Cr</span>
                  <span>₹5 Cr</span>
                  <span>₹10+ Cr</span>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(searchTerm ||
              propertyType !== "all-types" ||
              priceRange[0] !== 0 ||
              priceRange[1] !== 10 ||
              location !== "all-locations") && (
              <div className="mt-6 flex flex-wrap gap-3 items-center pt-4 border-t border-gray-100">
                <span className="text-sm font-medium text-gray-700">
                  Active Filters:
                </span>
                {searchTerm && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 px-3 py-1 text-sm rounded-full">
                    Keyword: {searchTerm}
                  </Badge>
                )}
                {propertyType !== "all-types" && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 px-3 py-1 capitalize text-sm rounded-full">
                    Type: {propertyType}
                  </Badge>
                )}
                {(priceRange[0] !== 0 || priceRange[1] !== 10) && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 px-3 py-1 text-sm rounded-full">
                    Price: {getPriceRangeText(priceRange)}
                  </Badge>
                )}
                {location !== "all-locations" && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 px-3 py-1 text-sm rounded-full">
                    Location: {location}
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="ml-auto text-primary-dark hover:bg-gray-100 hover:text-primary-light transition-colors duration-200"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
</section>

      {/* Property Types Section - Assuming this component is well-designed with a modern look */}
      <PropertyTypesSection />

      {/* Vision & Mission Section - Assuming this component is well-designed with a professional feel */}
      <VisionMissionSection />

      {/* Featured Properties Section - Premium Listings */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary-dark mb-4 animated-fade-in-up">
              <Sparkles className="inline-block w-10 h-10 text-accent-gold mr-3 transform -translate-y-1" />
              Our Exclusive Listings
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto animated-fade-in-up delay-100">
              Discover a curated selection of premium properties, meticulously chosen to meet your distinct needs.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-dark"></div>
            </div>
          ) : error ? (
            <div className="text-center py-20 bg-white rounded-xl shadow-md p-8">
              <p className="text-red-600 text-lg mb-4">{error}</p>
              <Button onClick={fetchProperties} className="bg-primary-dark hover:bg-primary-light text-white font-semibold">
                <Search className="w-4 h-4 mr-2" /> Try Again
              </Button>
            </div>
          ) : featuredProperties.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProperties.map((property) => (
                  <Card
                    key={property._id}
                    className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-gray-200 transform hover:-translate-y-1 animated-fade-in-up"
                  >
                    <div className="relative">
                      {/* Image container with aspect ratio for consistent sizing */}
                      <div className="relative w-full aspect-video overflow-hidden bg-gray-100">
                        {/* Default image */}
                        <img
                          src={
                            property.images && property.images.length > 0 && property.images[0]?.url
                              ? property.images[0].url
                              : "/placeholder.svg" // Fallback placeholder
                          }
                          alt={property.title || "Property image"}
                          className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                          onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
                        />

                        {/* Hover image */}
                        {property.images && property.images.length > 1 && property.images[1]?.url && (
                          <img
                            src={property.images[1].url}
                            alt={`${property.title} - Hover`}
                            className="absolute top-0 left-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
                          />
                        )}
                      </div>

                      <div className="absolute top-4 left-4">
                        <Badge
                          className={`${
                            property.status === "For Sale"
                              ? "bg-green-600" // Indicating availability
                              : property.status === "For Rent"
                              ? "bg-primary-light"
                              : "bg-gray-700"
                          } text-white font-semibold px-4 py-1.5 rounded-full shadow-md`}
                        >
                          {property.status || "Available"}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <Badge
                          variant="secondary"
                          className="bg-white/95 text-gray-800 font-semibold px-4 py-1.5 rounded-full shadow-md capitalize"
                        >
                          {property.type || "Property"}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-bold text-gray-900 line-clamp-1 pr-2">
                          {property.title || "Untitled Property"}
                        </h3>
                        <span className="text-2xl font-extrabold text-accent-gold whitespace-nowrap">
                          {property.price || "Price on Request"}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4 flex items-center text-base">
                        <MapPin className="w-4 h-4 mr-2 text-primary-light" />
                        {property.location || "Location Unknown"}
                      </p>
                      <div className="flex flex-wrap justify-between text-sm text-gray-500 mb-5 gap-2">
                        {property.bedrooms > 0 && (
                          <span className="flex items-center bg-gray-100 px-3 py-1.5 rounded-md">
                            <Home className="w-4 h-4 mr-1 text-gray-700" />
                            {property.bedrooms} Bed
                          </span>
                        )}
                        {property.bathrooms > 0 && (
                          <span className="flex items-center bg-gray-100 px-3 py-1.5 rounded-md">
                            <Bath className="w-4 h-4 mr-1 text-gray-700" />
                            {property.bathrooms} Bath
                          </span>
                        )}
                        {property.area && (
                          <span className="flex items-center bg-gray-100 px-3 py-1.5 rounded-md">
                            <Maximize className="w-4 h-4 mr-1 text-gray-700" />
                            {property.area} Sq.Ft.
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 text-sm mb-6 line-clamp-3 leading-relaxed">
                        {property.description || "A beautifully designed property offering comfort and convenience."}
                      </p>
                      <Button
                        className="w-full bg-primary-dark hover:bg-primary-light text-white font-semibold py-3.5 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center text-base"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePropertyClick(property._id);
                        }}
                      >
                        View Details <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-16">
                <a href="/properties">
                  <Button size="lg" className="bg-accent-gold hover:bg-accent-dark-gold text-primary-dark font-bold py-3.5 px-8 rounded-lg shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-lg">
                    View All Properties <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
              </div>
            </>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl shadow-md p-8">
              <div className="w-28 h-28 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-14 h-14 text-primary-light" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No Exclusive Properties Found Yet!
              </h3>
              <p className="text-gray-700 mb-6 max-w-sm mx-auto">
                We're continuously updating our listings. Please adjust your filters or contact us directly.
              </p>
              <Button onClick={clearFilters} variant="outline" className="text-primary-dark border-primary-dark hover:bg-primary-light hover:text-white">
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Client Testimonials Section - Assuming this component is well-designed */}
      <Client />

      {/* Call to Action Section - Stronger, more direct */}
      <section className="py-20 bg-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 animated-fade-in-up">
            Ready to Find Your <span className="text-accent-gold">Ideal Property</span>?
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90 animated-fade-in-up delay-100">
            Connect with our dedicated team of real estate experts today. We're here to make your property dreams a reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a href="/contact">
              <Button size="lg" className="bg-accent-gold hover:bg-accent-dark-gold text-primary-dark font-bold py-3.5 px-8 rounded-lg shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-lg">
                <Sparkles className="w-5 h-5 mr-2" /> Get a Free Consultation
              </Button>
            </a>
            <a href="/properties">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-dark font-bold py-3.5 px-8 rounded-lg shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-lg"
              >
                Explore All Properties
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Review Section - Assuming this component is well-designed */}
      <Review />

      {/* Service Section - Assuming this component is well-designed */}
      <Service />
    </div>
  );
};

export default Index;