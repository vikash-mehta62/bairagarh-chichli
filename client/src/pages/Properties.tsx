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
import {
  Search,
  MapPin,
  Home,
  Bath,
  Maximize,
  Building,
  Car,
  TreePine,
  SlidersHorizontal,
  X,
  Filter,
} from "lucide-react";
import { getAllPropertyAPI } from "../service/operations/property";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define property types
type PropertyFeature = {
  name: string;
  value: boolean;
};

type PropertyLocation = {
  city: string;
  area: string;
  fullAddress: string;
};

type Property = {
  _id: string;
  id?: string;
  title: string;
  description: string;
  price: string;
  priceValue?: number;
  type: string;
  status: string;
  location: string;
  locationData?: PropertyLocation;
  area: string;
  areaValue?: number;
  areaUnit?: string;
  bedrooms?: number;
  bathrooms?: number;
  floors?: number;
  parking?: number;
  plotType?: string;
  features?: PropertyFeature[];
  amenities?: string[];
  images: { url: string }[];
  createdAt?: string;
  date?: string;
  vendor?: {
    name: string;
    status: string;
  };
};

const Properties = () => {
  const navigate = useNavigate();

  // Basic filters
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("all-types");
  const [priceRange, setPriceRange] = useState("all-prices");
  const [location, setLocation] = useState("all-locations");
  const [sortBy, setSortBy] = useState("newest");

  // Advanced filters
  const [bedroomFilter, setBedroomFilter] = useState<string[]>([]);
  const [bathroomFilter, setBathroomFilter] = useState<string[]>([]);
  const [areaRange, setAreaRange] = useState<[number, number]>([0, 10000]);
  const [maxAreaValue, setMaxAreaValue] = useState(10000);
  const [priceRangeSlider, setPriceRangeSlider] = useState<[number, number]>([
    0, 200000000000,
  ]); // 0 to 2000 Cr in rupees
  const [maxPriceValue] = useState(200000000000); // 2000 Cr in rupees
  const [priceInputMin, setPriceInputMin] = useState("0");
  const [priceInputMax, setPriceInputMax] = useState("2000");
  const [furnishingStatus, setFurnishingStatus] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [propertyAge, setPropertyAge] = useState<string[]>([]);
  const [facingDirection, setFacingDirection] = useState<string[]>([]);
  const [availabilityStatus, setAvailabilityStatus] = useState<string[]>([]);

  // Data states
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uniqueTypes, setUniqueTypes] = useState<string[]>([]);
  const [uniqueLocations, setUniqueLocations] = useState<
    { city: string; areas: string[] }[]
  >([]);
  const [uniqueAmenities, setUniqueAmenities] = useState<string[]>([]);
  const [isAdvancedFilterActive, setIsAdvancedFilterActive] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Read URL parameters and set initial filters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get("search");
    const typeParam = urlParams.get("type");
    const locationParam = urlParams.get("location");
    const priceParam = urlParams.get("price");
    const bedroomsParam = urlParams.get("bedrooms");
    const bathroomsParam = urlParams.get("bathrooms");
    const areaMinParam = urlParams.get("areaMin");
    const areaMaxParam = urlParams.get("areaMax");
    const priceMinParam = urlParams.get("priceMin");
    const priceMaxParam = urlParams.get("priceMax");
    if (priceMinParam && priceMaxParam) {
      setPriceRangeSlider([
        Number.parseInt(priceMinParam),
        Number.parseInt(priceMaxParam),
      ]);
      setPriceInputMin((Number.parseInt(priceMinParam) / 10000000).toString());
      setPriceInputMax((Number.parseInt(priceMaxParam) / 10000000).toString());
    }

    if (searchParam) setSearchTerm(searchParam);
    if (typeParam) setPropertyType(typeParam);
    if (locationParam) setLocation(locationParam);
    if (priceParam) setPriceRange(priceParam);
    if (bedroomsParam) setBedroomFilter(bedroomsParam.split(","));
    if (bathroomsParam) setBathroomFilter(bathroomsParam.split(","));
    if (areaMinParam && areaMaxParam) {
      setAreaRange([
        Number.parseInt(areaMinParam),
        Number.parseInt(areaMaxParam),
      ]);
    }
  }, []);

  // Process and enhance property data
  const processPropertyData = (properties: Property[]) => {
    return properties.map((property) => {
      // Extract and structure location data
      const locationParts = property.location
        .split(",")
        .map((part) => part.trim());
      const locationData = {
        area: locationParts[0] || "",
        city: locationParts.length > 1 ? locationParts[1] : "",
        fullAddress: property.location,
      };

      // Extract numeric area value and unit
      const areaMatch = property.area.match(/(\d+(?:\.\d+)?)\s*([a-zA-Z²]+)/);
      const areaValue = areaMatch ? Number.parseFloat(areaMatch[1]) : 0;
      const areaUnit = areaMatch ? areaMatch[2] : "sq ft";

      // Parse price value
      const priceValue = parsePriceValue(property);

      return {
        ...property,
        locationData,
        areaValue,
        areaUnit,
        priceValue,
      };
    });
  };

  // Extract unique values for filters
  const extractUniqueValues = (properties: Property[]) => {
    // Extract property types
    const types = [
      ...new Set(properties.map((property) => property.type).filter(Boolean)),
    ];

    // Extract and organize locations by city and area
    const locationMap = new Map<string, Set<string>>();

    properties.forEach((property) => {
      if (!property.locationData) return;

      const city = property.locationData.city || "Other";
      const area = property.locationData.area;

      if (!locationMap.has(city)) {
        locationMap.set(city, new Set<string>());
      }

      if (area) {
        locationMap.get(city)?.add(area);
      }
    });

    const locations = Array.from(locationMap)
      .map(([city, areas]) => ({
        city,
        areas: Array.from(areas).sort(),
      }))
      .sort((a, b) => a.city.localeCompare(b.city));

    // Extract amenities
    const allAmenities = properties
      .flatMap((property) => property.amenities || [])
      .filter(Boolean);

    const amenities = [...new Set(allAmenities)];

    // Find max area value for slider
    const maxArea = Math.max(
      ...properties.map((p) => p.areaValue || 0),
      10000 // Default max
    );

    setUniqueTypes(types);
    setUniqueLocations(locations);
    setUniqueAmenities(amenities);
    setMaxAreaValue(maxArea);
    setAreaRange([0, maxArea]);
  };

  const fetchAllProperty = async () => {
    try {
      setLoading(true);
      const response = await getAllPropertyAPI();

      // Process and enhance property data
      const processedProperties = processPropertyData(response);
      setProperties(processedProperties);

      // Extract filter options
      extractUniqueValues(processedProperties);
      console.log("Fetched and processed properties:", processedProperties);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setError("Failed to load properties. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProperty();
  }, []);

  // Update URL when filters change
  const updateURL = () => {
    const params = new URLSearchParams();

    // Basic filters
    if (searchTerm) params.set("search", searchTerm);
    if (propertyType && propertyType !== "all-types")
      params.set("type", propertyType);
    if (location && location !== "all-locations")
      params.set("location", location);
    if (priceRange && priceRange !== "all-prices")
      params.set("price", priceRange);

    // Advanced filters
    if (bedroomFilter.length > 0)
      params.set("bedrooms", bedroomFilter.join(","));
    if (bathroomFilter.length > 0)
      params.set("bathrooms", bathroomFilter.join(","));
    if (areaRange[0] > 0) params.set("areaMin", areaRange[0].toString());
    if (areaRange[1] < maxAreaValue)
      params.set("areaMax", areaRange[1].toString());
    if (priceRangeSlider[0] > 0)
      params.set("priceMin", priceRangeSlider[0].toString());
    if (priceRangeSlider[1] < maxPriceValue)
      params.set("priceMax", priceRangeSlider[1].toString());
    if (furnishingStatus.length > 0)
      params.set("furnishing", furnishingStatus.join(","));
    if (amenities.length > 0) params.set("amenities", amenities.join(","));
    if (propertyAge.length > 0) params.set("age", propertyAge.join(","));
    if (facingDirection.length > 0)
      params.set("facing", facingDirection.join(","));
    if (availabilityStatus.length > 0)
      params.set("availability", availabilityStatus.join(","));

    const newURL = `${window.location.pathname}${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    window.history.replaceState({}, "", newURL);
  };

  // Update URL whenever filters change
  useEffect(() => {
    updateURL();
    checkAdvancedFilterActive();
  }, [
    searchTerm,
    propertyType,
    location,
    priceRange,
    bedroomFilter,
    bathroomFilter,
    areaRange,
    priceRangeSlider,
    furnishingStatus,
    amenities,
    propertyAge,
    facingDirection,
    availabilityStatus,
  ]);

  // Check if any advanced filter is active
  const checkAdvancedFilterActive = () => {
    const isActive =
      bedroomFilter.length > 0 ||
      bathroomFilter.length > 0 ||
      areaRange[0] > 0 ||
      areaRange[1] < maxAreaValue ||
      priceRangeSlider[0] > 0 ||
      priceRangeSlider[1] < maxPriceValue ||
      furnishingStatus.length > 0 ||
      amenities.length > 0 ||
      propertyAge.length > 0 ||
      facingDirection.length > 0 ||
      availabilityStatus.length > 0;

    setIsAdvancedFilterActive(isActive);
  };

  // Helper function to parse price from string format to number
  const parsePriceValue = (property: Property) => {
    // If priceValue already exists and is a number, use it
    if (property.priceValue && typeof property.priceValue === "number") {
      return property.priceValue;
    }

    // Otherwise try to parse from price string
    if (!property.price) return 0;

    try {
      // Remove all non-numeric characters except decimal point
      const priceString = property.price.replace(/[^\d.]/g, "");

      // Check if price contains "Cr" or "Crore"
      const isCrore = property.price.toLowerCase().includes("cr");

      // Check if price contains "Lac" or "Lakh"
      const isLakh =
        property.price.toLowerCase().includes("lac") ||
        property.price.toLowerCase().includes("lakh");

      let numericValue = Number.parseFloat(priceString);

      // Convert to consistent value in rupees
      if (isCrore) {
        numericValue = numericValue * 10000000; // 1 Crore = 10,000,000
      } else if (isLakh) {
        numericValue = numericValue * 100000; // 1 Lakh = 100,000
      }

      return numericValue;
    } catch (error) {
      console.error("Error parsing price:", error);
      return 0;
    }
  };

  // Format price for display
  const formatPriceForDisplay = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(1)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)} L`;
    }
    return `₹${value.toLocaleString()}`;
  };

  // Handle price input changes
  const handlePriceInputChange = (type: "min" | "max", value: string) => {
    const numValue = Number.parseFloat(value) || 0;
    const rupeeValue = numValue * 10000000; // Convert Cr to rupees

    if (type === "min") {
      setPriceInputMin(value);
      setPriceRangeSlider([rupeeValue, priceRangeSlider[1]]);
    } else {
      setPriceInputMax(value);
      setPriceRangeSlider([priceRangeSlider[0], rupeeValue]);
    }
  };

  // Function to check if property type is residential
  const isResidentialType = (type?: string) => {
    return [
      "apartment",
      "villa",
      "buying-a-home",
      "renting-a-home",
      "house",
      "condo",
      "townhouse",
      "residential",
    ].includes(type?.toLowerCase() || "");
  };

  // Function to check if property type is commercial
  const isCommercialType = (type?: string) => {
    return ["commercial", "office", "retail", "warehouse"].includes(
      type?.toLowerCase() || ""
    );
  };

  // Function to check if property type is plot
  const isPlotType = (type?: string) => {
    return ["plot", "land"].includes(type?.toLowerCase() || "");
  };

  // Function to render property features based on type
  const renderPropertyFeatures = (property: Property) => {
    if (isResidentialType(property.type)) {
      return (
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          {property.bedrooms && property.bedrooms > 0 && (
            <span className="flex items-center">
              <Home className="w-4 h-4 mr-1" />
              {property.bedrooms} BHK
            </span>
          )}
          {property.bathrooms && property.bathrooms > 0 && (
            <span className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              {property.bathrooms} Bath
            </span>
          )}
          <span className="flex items-center">
            <Maximize className="w-4 h-4 mr-1" />
            {property.area}
          </span>
        </div>
      );
    } else if (isCommercialType(property.type)) {
      return (
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          {property.floors && property.floors > 0 && (
            <span className="flex items-center">
              <Building className="w-4 h-4 mr-1" />
              {property.floors} Floors
            </span>
          )}
          {property.parking && property.parking > 0 && (
            <span className="flex items-center">
              <Car className="w-4 h-4 mr-1" />
              {property.parking} Parking
            </span>
          )}
          <span className="flex items-center">
            <Maximize className="w-4 h-4 mr-1" />
            {property.area}
          </span>
        </div>
      );
    } else if (isPlotType(property.type)) {
      return (
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span className="flex items-center">
            <TreePine className="w-4 h-4 mr-1" />
            {property.plotType || "Residential"} Plot
          </span>
          <span className="flex items-center">
            <Maximize className="w-4 h-4 mr-1" />
            {property.area}
          </span>
        </div>
      );
    } else {
      // Default case for other property types
      return (
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span className="flex items-center">
            <Maximize className="w-4 h-4 mr-1" />
            {property.area}
          </span>
        </div>
      );
    }
  };

  // Advanced filtering logic
  const filteredAndSortedProperties = properties
    .filter((property) => {
      // Basic filters
      // Search term matching - improved to search in multiple fields
      const matchesSearch =
        searchTerm === "" ||
        property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.description
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        property.type?.toLowerCase().includes(searchTerm.toLowerCase());

      // Property type matching
      const matchesType =
        propertyType === "all-types" ||
        property.type?.toLowerCase() === propertyType.toLowerCase();

      // Location matching - improved logic with city/area structure
      const matchesLocation = () => {
        if (location === "all-locations") return true;

        // Check if location matches city or area
        if (property.locationData) {
          return (
            property.locationData.city
              .toLowerCase()
              .includes(location.toLowerCase()) ||
            property.locationData.area
              .toLowerCase()
              .includes(location.toLowerCase())
          );
        }

        // Fallback to simple string matching
        return property.location
          ?.toLowerCase()
          .includes(location.toLowerCase());
      };

      // Price range matching - improved logic with proper parsing
      const matchesPrice = () => {
        if (priceRange === "all-prices") return true;

        const priceValue = property.priceValue || 0;

        switch (priceRange) {
          case "under-50":
            return priceValue <= 5000000; // Under 50 Lakh (50 * 100,000)
          case "50-100":
            return priceValue >= 5000000 && priceValue <= 10000000; // 50 Lakh to 1 Crore
          case "100-200":
            return priceValue >= 10000000 && priceValue <= 20000000; // 1 Crore to 2 Crore
          case "200-500":
            return priceValue >= 20000000 && priceValue <= 50000000; // 2 Crore to 5 Crore
          case "above-500":
            return priceValue >= 50000000; // Above 5 Crore
          default:
            return true;
        }
      };

      // Price range slider matching
      const matchesPriceRange = () => {
        const priceValue = property.priceValue || 0;
        return (
          priceValue >= priceRangeSlider[0] && priceValue <= priceRangeSlider[1]
        );
      };

      // Advanced filters
      // Bedrooms filter
      const matchesBedrooms = () => {
        if (bedroomFilter.length === 0) return true;
        if (!property.bedrooms) return false;

        // Special case for "4+" option
        if (bedroomFilter.includes("4+") && property.bedrooms >= 4) return true;

        return bedroomFilter.includes(property.bedrooms.toString());
      };

      // Bathrooms filter
      const matchesBathrooms = () => {
        if (bathroomFilter.length === 0) return true;
        if (!property.bathrooms) return false;

        // Special case for "3+" option
        if (bathroomFilter.includes("3+") && property.bathrooms >= 3)
          return true;

        return bathroomFilter.includes(property.bathrooms.toString());
      };

      // Area range filter
      const matchesArea = () => {
        if (!property.areaValue) return true;
        return (
          property.areaValue >= areaRange[0] &&
          property.areaValue <= areaRange[1]
        );
      };

      // Furnishing status filter
      const matchesFurnishing = () => {
        if (furnishingStatus.length === 0) return true;

        // Extract furnishing status from description or features
        const description = property.description?.toLowerCase() || "";
        const hasFurnished =
          description.includes("furnished") ||
          property.features?.some((f) =>
            f.name.toLowerCase().includes("furnish")
          );
        const hasUnfurnished =
          description.includes("unfurnished") ||
          property.features?.some((f) =>
            f.name.toLowerCase().includes("unfurnish")
          );
        const hasSemiFurnished =
          description.includes("semi furnished") ||
          description.includes("semi-furnished") ||
          property.features?.some((f) => f.name.toLowerCase().includes("semi"));

        if (furnishingStatus.includes("furnished") && hasFurnished) return true;
        if (furnishingStatus.includes("unfurnished") && hasUnfurnished)
          return true;
        if (furnishingStatus.includes("semi-furnished") && hasSemiFurnished)
          return true;

        return false;
      };

      // Amenities filter
      const matchesAmenities = () => {
        if (amenities.length === 0) return true;

        // Check if property has all selected amenities
        return amenities.every(
          (amenity) =>
            property.amenities?.includes(amenity) ||
            property.description?.toLowerCase().includes(amenity.toLowerCase())
        );
      };

      // Property age filter
      const matchesPropertyAge = () => {
        if (propertyAge.length === 0) return true;

        // Extract age from description
        const description = property.description?.toLowerCase() || "";

        if (
          propertyAge.includes("under-construction") &&
          (description.includes("under construction") ||
            description.includes("upcoming"))
        ) {
          return true;
        }

        if (
          propertyAge.includes("new") &&
          (description.includes("new") ||
            description.includes("brand new") ||
            description.includes("newly built"))
        ) {
          return true;
        }

        if (
          propertyAge.includes("less-than-5") &&
          (description.includes("less than 5 years") ||
            description.includes("< 5 years"))
        ) {
          return true;
        }

        if (
          propertyAge.includes("5-10-years") &&
          (description.includes("5-10 years") ||
            description.includes("between 5 and 10 years"))
        ) {
          return true;
        }

        if (
          propertyAge.includes("10-plus-years") &&
          (description.includes("more than 10 years") ||
            description.includes("> 10 years") ||
            description.includes("old property"))
        ) {
          return true;
        }

        return false;
      };

      // Facing direction filter
      const matchesFacing = () => {
        if (facingDirection.length === 0) return true;

        // Extract facing direction from description or features
        const description = property.description?.toLowerCase() || "";

        return facingDirection.some(
          (direction) =>
            description.includes(`${direction.toLowerCase()} facing`) ||
            property.features?.some((f) =>
              f.name.toLowerCase().includes(`${direction.toLowerCase()} facing`)
            )
        );
      };

      // Availability status filter
      const matchesAvailability = () => {
        if (availabilityStatus.length === 0) return true;

        const status = property.status?.toLowerCase() || "";

        if (
          availabilityStatus.includes("ready-to-move") &&
          (status.includes("ready") || status.includes("available"))
        ) {
          return true;
        }

        if (
          availabilityStatus.includes("under-construction") &&
          status.includes("construction")
        ) {
          return true;
        }

        return false;
      };

      return (
        matchesSearch &&
        matchesType &&
        matchesLocation() &&
        matchesPrice() &&
        matchesPriceRange() &&
        matchesBedrooms() &&
        matchesBathrooms() &&
        matchesArea() &&
        matchesFurnishing() &&
        matchesAmenities() &&
        matchesPropertyAge() &&
        matchesFacing() &&
        matchesAvailability()
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt || b.date || 0).getTime() -
            new Date(a.createdAt || a.date || 0).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt || a.date || 0).getTime() -
            new Date(b.createdAt || b.date || 0).getTime()
          );
        case "price-low":
          return (a.priceValue || 0) - (b.priceValue || 0);
        case "price-high":
          return (b.priceValue || 0) - (a.priceValue || 0);
        case "area-low":
          return (a.areaValue || 0) - (b.areaValue || 0);
        case "area-high":
          return (b.areaValue || 0) - (a.areaValue || 0);
        default:
          return 0;
      }
    });

  // Clear all filters function
  const clearFilters = () => {
    setSearchTerm("");
    setPropertyType("all-types");
    setPriceRange("all-prices");
    setLocation("all-locations");
    setBedroomFilter([]);
    setBathroomFilter([]);
    setAreaRange([0, maxAreaValue]);
    setPriceRangeSlider([0, maxPriceValue]);
    setPriceInputMin("0");
    setPriceInputMax("2000");
    setFurnishingStatus([]);
    setAmenities([]);
    setPropertyAge([]);
    setFacingDirection([]);
    setAvailabilityStatus([]);

    // Clear URL parameters
    window.history.replaceState({}, "", window.location.pathname);
  };

  // Handle search button click
  const handleSearch = () => {
    // Force re-filter by updating a state or just log
    console.log("Search applied with current filters");
    setIsFilterDrawerOpen(false);
  };

  // Handle property click to navigate to details page
  const handlePropertyClick = (propertyId: string) => {
    navigate(`/properties/${propertyId}`);
  };

  // Toggle bedroom filter
  const toggleBedroomFilter = (value: string) => {
    setBedroomFilter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // Toggle bathroom filter
  const toggleBathroomFilter = (value: string) => {
    setBathroomFilter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // Toggle furnishing status filter
  const toggleFurnishingStatus = (value: string) => {
    setFurnishingStatus((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // Toggle amenity filter
  const toggleAmenity = (value: string) => {
    setAmenities((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // Toggle property age filter
  const togglePropertyAge = (value: string) => {
    setPropertyAge((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // Toggle facing direction filter
  const toggleFacingDirection = (value: string) => {
    setFacingDirection((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // Toggle availability status filter
  const toggleAvailabilityStatus = (value: string) => {
    setAvailabilityStatus((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // Count active filters
  const countActiveFilters = () => {
    let count = 0;
    if (searchTerm) count++;
    if (propertyType !== "all-types") count++;
    if (priceRange !== "all-prices") count++;
    if (location !== "all-locations") count++;
    if (bedroomFilter.length > 0) count++;
    if (bathroomFilter.length > 0) count++;
    if (areaRange[0] > 0 || areaRange[1] < maxAreaValue) count++;
    if (priceRangeSlider[0] > 0 || priceRangeSlider[1] < maxPriceValue) count++;
    if (furnishingStatus.length > 0) count++;
    if (amenities.length > 0) count++;
    if (propertyAge.length > 0) count++;
    if (facingDirection.length > 0) count++;
    if (availabilityStatus.length > 0) count++;
    return count;
  };

  // Format area range for display
  const formatAreaRange = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchAllProperty}>Try Again</Button>
        </div>
      </div>
    );
  }

  // Advanced filter component for desktop
  const AdvancedFilterDesktop = () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`flex items-center gap-2 ${
            isAdvancedFilterActive
              ? "border-amber-500 bg-amber-50 text-amber-700"
              : ""
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Advanced Filters
          {isAdvancedFilterActive && (
            <Badge className="h-5 w-5 p-0 flex items-center justify-center rounded-full bg-amber-500 text-white">
              {countActiveFilters() -
                (searchTerm ? 1 : 0) -
                (propertyType !== "all-types" ? 1 : 0) -
                (priceRange !== "all-prices" ? 1 : 0) -
                (location !== "all-locations" ? 1 : 0)}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-0" align="start">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Advanced Filters</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="h-8 px-2 text-xs"
            >
              Clear All
            </Button>
          </div>
        </div>
        <div className="p-4 max-h-[70vh] overflow-y-auto">
          <Accordion type="multiple" className="w-full">
            {/* Bedrooms Filter */}
            <AccordionItem value="bedrooms">
              <AccordionTrigger className="py-3">Bedrooms</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-2">
                  {["1", "2", "3", "4+"].map((value) => (
                    <Label
                      key={`bedroom-${value}`}
                      className={`px-4 py-2 border rounded-md cursor-pointer ${
                        bedroomFilter.includes(value)
                          ? "bg-amber-100 border-amber-500"
                          : ""
                      }`}
                      onClick={() => toggleBedroomFilter(value)}
                    >
                      {value} {value !== "4+" ? "BHK" : "+ BHK"}
                    </Label>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Bathrooms Filter */}
            <AccordionItem value="bathrooms">
              <AccordionTrigger className="py-3">Bathrooms</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-2">
                  {["1", "2", "3+"].map((value) => (
                    <Label
                      key={`bathroom-${value}`}
                      className={`px-4 py-2 border rounded-md cursor-pointer ${
                        bathroomFilter.includes(value)
                          ? "bg-amber-100 border-amber-500"
                          : ""
                      }`}
                      onClick={() => toggleBathroomFilter(value)}
                    >
                      {value} {value !== "3+" ? "Bath" : "+ Bath"}
                    </Label>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Furnishing Status */}
            <AccordionItem value="furnishing">
              <AccordionTrigger className="py-3">
                Furnishing Status
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2">
                  {["furnished", "semi-furnished", "unfurnished"].map(
                    (value) => (
                      <Label
                        key={`furnish-${value}`}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Checkbox
                          checked={furnishingStatus.includes(value)}
                          onCheckedChange={() => toggleFurnishingStatus(value)}
                        />
                        <span className="capitalize">
                          {value.replace("-", " ")}
                        </span>
                      </Label>
                    )
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Amenities */}
            <AccordionItem value="amenities">
              <AccordionTrigger className="py-3">Amenities</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Parking",
                    "Gym",
                    "Swimming Pool",
                    "Lift",
                    "Security",
                    "Garden",
                    "Power Backup",
                    "Club House",
                    "Children's Play Area",
                    "Sports Facility",
                  ].map((value) => (
                    <Label
                      key={`amenity-${value}`}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={amenities.includes(value)}
                        onCheckedChange={() => toggleAmenity(value)}
                      />
                      <span>{value}</span>
                    </Label>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Property Age */}
            <AccordionItem value="age">
              <AccordionTrigger className="py-3">Property Age</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2">
                  {[
                    { id: "under-construction", label: "Under Construction" },
                    { id: "new", label: "New Property" },
                    { id: "less-than-5", label: "Less than 5 years" },
                    { id: "5-10-years", label: "5-10 years" },
                    { id: "10-plus-years", label: "10+ years" },
                  ].map((item) => (
                    <Label
                      key={`age-${item.id}`}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={propertyAge.includes(item.id)}
                        onCheckedChange={() => togglePropertyAge(item.id)}
                      />
                      <span>{item.label}</span>
                    </Label>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Facing Direction */}
            <AccordionItem value="facing">
              <AccordionTrigger className="py-3">
                Facing Direction
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "North",
                    "South",
                    "East",
                    "West",
                    "North East",
                    "North West",
                    "South East",
                    "South West",
                  ].map((value) => (
                    <Label
                      key={`facing-${value}`}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={facingDirection.includes(value)}
                        onCheckedChange={() => toggleFacingDirection(value)}
                      />
                      <span>{value}</span>
                    </Label>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Availability Status */}
            <AccordionItem value="availability">
              <AccordionTrigger className="py-3">Availability</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2">
                  {[
                    { id: "ready-to-move", label: "Ready to Move" },
                    { id: "under-construction", label: "Under Construction" },
                  ].map((item) => (
                    <Label
                      key={`availability-${item.id}`}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        checked={availabilityStatus.includes(item.id)}
                        onCheckedChange={() =>
                          toggleAvailabilityStatus(item.id)
                        }
                      />
                      <span>{item.label}</span>
                    </Label>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="p-4 border-t">
          <Button
            className="w-full gradient-gold text-white"
            onClick={handleSearch}
          >
            Apply Filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );

  // Mobile filter drawer
  const FilterDrawer = () => (
    <Drawer open={isFilterDrawerOpen} onOpenChange={setIsFilterDrawerOpen}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader>
          <DrawerTitle>Filters</DrawerTitle>
          <DrawerDescription>
            Apply filters to find your perfect property
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 overflow-y-auto max-h-[calc(90vh-10rem)]">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="basic">Basic Filters</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Filters</TabsTrigger>
            </TabsList>
            <TabsContent value="basic" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label
                    htmlFor="mobile-search"
                    className="text-sm font-medium"
                  >
                    Search
                  </Label>
                  <Input
                    id="mobile-search"
                    placeholder="Search properties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="mobile-property-type"
                    className="text-sm font-medium"
                  >
                    Property Type
                  </Label>
                  <Select value={propertyType} onValueChange={setPropertyType}>
                    <SelectTrigger id="mobile-property-type" className="mt-1">
                      <SelectValue placeholder="Property Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-types">All Types</SelectItem>
                      {uniqueTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor="mobile-price-range"
                    className="text-sm font-medium"
                  >
                    Price Range
                  </Label>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger id="mobile-price-range" className="mt-1">
                      <SelectValue placeholder="Price Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-prices">All Prices</SelectItem>
                      <SelectItem value="under-50">Under ₹50 Lakh</SelectItem>
                      <SelectItem value="50-100">₹50 Lakh - ₹1 Cr</SelectItem>
                      <SelectItem value="100-200">₹1 Cr - ₹2 Cr</SelectItem>
                      <SelectItem value="200-500">₹2 Cr - ₹5 Cr</SelectItem>
                      <SelectItem value="above-500">Above ₹5 Cr</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor="mobile-location"
                    className="text-sm font-medium"
                  >
                    Location
                  </Label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger id="mobile-location" className="mt-1">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-locations">
                        All Locations
                      </SelectItem>
                      {uniqueLocations.map((loc) => (
                        <SelectItem key={loc.city} value={loc.city}>
                          {loc.city}
                        </SelectItem>
                      ))}
                      {uniqueLocations.flatMap((loc) =>
                        loc.areas.map((area) => (
                          <SelectItem key={`${loc.city}-${area}`} value={area}>
                            {area}, {loc.city}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <Accordion type="multiple" className="w-full">
                {/* Bedrooms Filter */}
                <AccordionItem value="bedrooms">
                  <AccordionTrigger className="py-3">Bedrooms</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-wrap gap-2">
                      {["1", "2", "3", "4+"].map((value) => (
                        <Label
                          key={`bedroom-mobile-${value}`}
                          className={`px-4 py-2 border rounded-md cursor-pointer ${
                            bedroomFilter.includes(value)
                              ? "bg-amber-100 border-amber-500"
                              : ""
                          }`}
                          onClick={() => toggleBedroomFilter(value)}
                        >
                          {value} {value !== "4+" ? "BHK" : "+ BHK"}
                        </Label>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Bathrooms Filter */}
                <AccordionItem value="bathrooms">
                  <AccordionTrigger className="py-3">
                    Bathrooms
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-wrap gap-2">
                      {["1", "2", "3+"].map((value) => (
                        <Label
                          key={`bathroom-mobile-${value}`}
                          className={`px-4 py-2 border rounded-md cursor-pointer ${
                            bathroomFilter.includes(value)
                              ? "bg-amber-100 border-amber-500"
                              : ""
                          }`}
                          onClick={() => toggleBathroomFilter(value)}
                        >
                          {value} {value !== "3+" ? "Bath" : "+ Bath"}
                        </Label>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Area Range Filter */}
                <AccordionItem value="area">
                  <AccordionTrigger className="py-3">
                    Area (sq ft)
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="px-2 pt-2 pb-6">
                      <Slider
                        value={areaRange}
                        min={0}
                        max={maxAreaValue}
                        step={100}
                        onValueChange={setAreaRange}
                      />
                      <div className="flex justify-between mt-2 text-sm text-gray-500">
                        <span>{formatAreaRange(areaRange[0])} sq ft</span>
                        <span>{formatAreaRange(areaRange[1])} sq ft</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Price Range Filter */}
                <AccordionItem value="price-range">
                  <AccordionTrigger className="py-3">
                    Price Range (₹ Crores)
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label className="text-xs text-gray-500">
                            Min (Cr)
                          </Label>
                          <Input
                            type="number"
                            value={priceInputMin}
                            onChange={(e) =>
                              handlePriceInputChange("min", e.target.value)
                            }
                            placeholder="0"
                            className="h-8"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">
                            Max (Cr)
                          </Label>
                          <Input
                            type="number"
                            value={priceInputMax}
                            onChange={(e) =>
                              handlePriceInputChange("max", e.target.value)
                            }
                            placeholder="2000"
                            className="h-8"
                          />
                        </div>
                      </div>
                      <div className="px-2 pt-2 pb-6">
                        <Slider
                          value={priceRangeSlider}
                          min={0}
                          max={maxPriceValue}
                          step={1000000}
                          onValueChange={setPriceRangeSlider}
                        />
                        <div className="flex justify-between mt-2 text-sm text-gray-500">
                          <span>
                            {formatPriceForDisplay(priceRangeSlider[0])}
                          </span>
                          <span>
                            {formatPriceForDisplay(priceRangeSlider[1])}
                          </span>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Furnishing Status */}
                <AccordionItem value="furnishing">
                  <AccordionTrigger className="py-3">
                    Furnishing Status
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-2">
                      {["furnished", "semi-furnished", "unfurnished"].map(
                        (value) => (
                          <Label
                            key={`furnish-mobile-${value}`}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <Checkbox
                              checked={furnishingStatus.includes(value)}
                              onCheckedChange={() =>
                                toggleFurnishingStatus(value)
                              }
                            />
                            <span className="capitalize">
                              {value.replace("-", " ")}
                            </span>
                          </Label>
                        )
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Amenities */}
                <AccordionItem value="amenities">
                  <AccordionTrigger className="py-3">
                    Amenities
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        "Parking",
                        "Gym",
                        "Swimming Pool",
                        "Lift",
                        "Security",
                        "Garden",
                        "Power Backup",
                        "Club House",
                        "Children's Play Area",
                        "Sports Facility",
                      ].map((value) => (
                        <Label
                          key={`amenity-mobile-${value}`}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Checkbox
                            checked={amenities.includes(value)}
                            onCheckedChange={() => toggleAmenity(value)}
                          />
                          <span>{value}</span>
                        </Label>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Property Age */}
                <AccordionItem value="age">
                  <AccordionTrigger className="py-3">
                    Property Age
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-2">
                      {[
                        {
                          id: "under-construction",
                          label: "Under Construction",
                        },
                        { id: "new", label: "New Property" },
                        { id: "less-than-5", label: "Less than 5 years" },
                        { id: "5-10-years", label: "5-10 years" },
                        { id: "10-plus-years", label: "10+ years" },
                      ].map((item) => (
                        <Label
                          key={`age-mobile-${item.id}`}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Checkbox
                            checked={propertyAge.includes(item.id)}
                            onCheckedChange={() => togglePropertyAge(item.id)}
                          />
                          <span>{item.label}</span>
                        </Label>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Facing Direction */}
                <AccordionItem value="facing">
                  <AccordionTrigger className="py-3">
                    Facing Direction
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "North",
                        "South",
                        "East",
                        "West",
                        "North East",
                        "North West",
                        "South East",
                        "South West",
                      ].map((value) => (
                        <Label
                          key={`facing-mobile-${value}`}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Checkbox
                            checked={facingDirection.includes(value)}
                            onCheckedChange={() => toggleFacingDirection(value)}
                          />
                          <span>{value}</span>
                        </Label>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Availability Status */}
                <AccordionItem value="availability">
                  <AccordionTrigger className="py-3">
                    Availability
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid gap-2">
                      {[
                        { id: "ready-to-move", label: "Ready to Move" },
                        {
                          id: "under-construction",
                          label: "Under Construction",
                        },
                      ].map((item) => (
                        <Label
                          key={`availability-mobile-${item.id}`}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <Checkbox
                            checked={availabilityStatus.includes(item.id)}
                            onCheckedChange={() =>
                              toggleAvailabilityStatus(item.id)
                            }
                          />
                          <span>{item.label}</span>
                        </Label>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </Tabs>
        </div>
        <DrawerFooter>
          <Button className="gradient-gold text-white" onClick={handleSearch}>
            Apply Filters ({countActiveFilters()})
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
    {/* Hero Section */}
      <section className="relative pt-28 pb-10 bg-gradient-to-br from-indigo-100 to-indigo-300 text-indigo-900 overflow-hidden shadow-md">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.08\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 6V5zM6 5v1H5z\'/%3E%3C/g%3E%3C/svg%3E")'}}></div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-sm leading-tight animate-fade-in-up">
            Discover Your <span className="text-orange-700">Perfect Property</span> in Bhopal
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto opacity-90 leading-relaxed animate-fade-in delay-200">
            Explore a curated selection of homes, commercial spaces, and plots tailored to your dreams.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters - Desktop */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
            {/* Search Input */}
            <div className="md:col-span-2">
              <Input
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 text-black placeholder:text-gray-500 w-full"
              />
            </div>

            {/* Property Type Dropdown */}
            <div className="w-full">
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="h-12 w-full">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-types">All Types</SelectItem>
                  {uniqueTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location Dropdown */}
            <div className="w-full">
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="h-12 w-full">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-locations">All Locations</SelectItem>
                  {uniqueLocations.map((loc) => (
                    <SelectItem key={loc.city} value={loc.city}>
                      {loc.city}
                    </SelectItem>
                  ))}
                  {uniqueLocations.flatMap((loc) =>
                    loc.areas.map((area) => (
                      <SelectItem key={`${loc.city}-${area}`} value={area}>
                        {area}, {loc.city}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Advanced Filters */}
            <div className="md:col-span-5 w-full">
              <Accordion type="multiple" className="w-full">
                {/* Area Filter */}
                <AccordionItem value="area">
                  <AccordionTrigger className="py-3">
                    Area (sq ft)
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="px-2 pt-2 pb-6">
                      <Slider
                        value={areaRange}
                        min={0}
                        max={maxAreaValue}
                        step={100}
                        onValueChange={setAreaRange}
                      />
                      <div className="flex justify-between mt-2 text-sm text-gray-500">
                        <span>{formatAreaRange(areaRange[0])} sq ft</span>
                        <span>{formatAreaRange(areaRange[1])} sq ft</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Price Filter */}
                <AccordionItem value="price-range">
                  <AccordionTrigger className="py-3">
                    Price Range (₹ Crores)
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label className="text-xs text-gray-500">
                            Min (Cr)
                          </Label>
                          <Input
                            type="number"
                            value={priceInputMin}
                            onChange={(e) =>
                              handlePriceInputChange("min", e.target.value)
                            }
                            placeholder="0"
                            className="h-8 w-full"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">
                            Max (Cr)
                          </Label>
                          <Input
                            type="number"
                            value={priceInputMax}
                            onChange={(e) =>
                              handlePriceInputChange("max", e.target.value)
                            }
                            placeholder="2000"
                            className="h-8 w-full"
                          />
                        </div>
                      </div>
                      <div className="px-2 pt-2 pb-6">
                        <Slider
                          value={priceRangeSlider}
                          min={0}
                          max={maxPriceValue}
                          step={1000000}
                          onValueChange={setPriceRangeSlider}
                        />
                        <div className="flex justify-between mt-2 text-sm text-gray-500">
                          <span>
                            {formatPriceForDisplay(priceRangeSlider[0])}
                          </span>
                          <span>
                            {formatPriceForDisplay(priceRangeSlider[1])}
                          </span>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Optional Advanced Filter Button or Popover */}
            <div className="md:col-span-5 w-full">
              <AdvancedFilterDesktop />
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4 mt-4">
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-prices">All Prices</SelectItem>
                <SelectItem value="under-50">Under ₹50 Lakh</SelectItem>
                <SelectItem value="50-100">₹50 Lakh - ₹1 Cr</SelectItem>
                <SelectItem value="100-200">₹1 Cr - ₹2 Cr</SelectItem>
                <SelectItem value="200-500">₹2 Cr - ₹5 Cr</SelectItem>
                <SelectItem value="above-500">Above ₹5 Cr</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-2 col-span-2">
              <Button
                className="h-12 flex-1 gradient-gold text-white"
                onClick={handleSearch}
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>

              {(searchTerm ||
                propertyType !== "all-types" ||
                priceRange !== "all-prices" ||
                location !== "all-locations" ||
                isAdvancedFilterActive) && (
                <Button
                  variant="outline"
                  className="h-12"
                  onClick={clearFilters}
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              )}
            </div>

            <Select
              value={sortBy}
              onValueChange={setSortBy}
              className="col-span-2"
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="area-low">Area: Small to Large</SelectItem>
                <SelectItem value="area-high">Area: Large to Small</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Search and Filters - Mobile */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6 md:hidden">
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button
              variant="outline"
              className="shrink-0"
              onClick={() => setIsFilterDrawerOpen(true)}
            >
              <Filter className="w-4 h-4 mr-2" />
              {countActiveFilters() > 0 && (
                <Badge className="h-5 w-5 p-0 flex items-center justify-center rounded-full bg-amber-500 text-white">
                  {countActiveFilters()}
                </Badge>
              )}
            </Button>
          </div>

          <div className="flex justify-between">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="area-low">Area: Small to Large</SelectItem>
                <SelectItem value="area-high">Area: Large to Small</SelectItem>
              </SelectContent>
            </Select>

            {countActiveFilters() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-xs"
              >
                Clear All
              </Button>
            )}
          </div>

          <FilterDrawer />
        </div>

        {/* Active Filters Display */}
        {(searchTerm ||
          propertyType !== "all-types" ||
          priceRange !== "all-prices" ||
          location !== "all-locations" ||
          isAdvancedFilterActive) && (
          <div className="mb-6 hidden md:block">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Active Filters:
            </h3>
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-800"
                >
                  Search: {searchTerm}
                  <button className="ml-1" onClick={() => setSearchTerm("")}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {propertyType !== "all-types" && (
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-800"
                >
                  Type: {propertyType}
                  <button
                    className="ml-1"
                    onClick={() => setPropertyType("all-types")}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {priceRange !== "all-prices" && (
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-800"
                >
                  Price:{" "}
                  {priceRange
                    .replace("-", " - ")
                    .split("-")
                    .map((part) => {
                      if (part === "under") return "Under";
                      if (part === "above") return "Above";
                      if (part === "50") return "₹50 Lakh";
                      if (part === "100") return "₹1 Cr";
                      if (part === "200") return "₹2 Cr";
                      if (part === "500") return "₹5 Cr";
                      return part;
                    })
                    .join("")}
                  <button
                    className="ml-1"
                    onClick={() => setPriceRange("all-prices")}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {location !== "all-locations" && (
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-800"
                >
                  Location: {location}
                  <button
                    className="ml-1"
                    onClick={() => setLocation("all-locations")}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {bedroomFilter.length > 0 && (
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-800"
                >
                  Bedrooms: {bedroomFilter.join(", ")}
                  <button className="ml-1" onClick={() => setBedroomFilter([])}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {bathroomFilter.length > 0 && (
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-800"
                >
                  Bathrooms: {bathroomFilter.join(", ")}
                  <button
                    className="ml-1"
                    onClick={() => setBathroomFilter([])}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {(areaRange[0] > 0 || areaRange[1] < maxAreaValue) && (
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-800"
                >
                  Area: {formatAreaRange(areaRange[0])} -{" "}
                  {formatAreaRange(areaRange[1])} sq ft
                  <button
                    className="ml-1"
                    onClick={() => setAreaRange([0, maxAreaValue])}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {(priceRangeSlider[0] > 0 ||
                priceRangeSlider[1] < maxPriceValue) && (
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-800"
                >
                  Price Range: {formatPriceForDisplay(priceRangeSlider[0])} -{" "}
                  {formatPriceForDisplay(priceRangeSlider[1])}
                  <button
                    className="ml-1"
                    onClick={() => {
                      setPriceRangeSlider([0, maxPriceValue]);
                      setPriceInputMin("0");
                      setPriceInputMax("2000");
                    }}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {furnishingStatus.length > 0 && (
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-800"
                >
                  Furnishing: {furnishingStatus.join(", ")}
                  <button
                    className="ml-1"
                    onClick={() => setFurnishingStatus([])}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {amenities.length > 0 && (
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-800"
                >
                  Amenities: {amenities.slice(0, 2).join(", ")}
                  {amenities.length > 2 && ` +${amenities.length - 2}`}
                  <button className="ml-1" onClick={() => setAmenities([])}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {propertyAge.length > 0 && (
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-800"
                >
                  Age: {propertyAge.join(", ")}
                  <button className="ml-1" onClick={() => setPropertyAge([])}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {facingDirection.length > 0 && (
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-800"
                >
                  Facing: {facingDirection.join(", ")}
                  <button
                    className="ml-1"
                    onClick={() => setFacingDirection([])}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {availabilityStatus.length > 0 && (
                <Badge
                  variant="secondary"
                  className="bg-amber-100 text-amber-800"
                >
                  Availability: {availabilityStatus.join(", ")}
                  <button
                    className="ml-1"
                    onClick={() => setAvailabilityStatus([])}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredAndSortedProperties.length} Properties Found
          </h2>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedProperties.map((property) => (
            <Card
              key={property.id || property._id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 group bg-white cursor-pointer"
              onClick={() => handlePropertyClick(property._id)}
            >
              <div className="relative">
                <div className="relative group w-full h-64 overflow-hidden">
                  {/* Default image */}
                  <img
                    src={
                      property.images[0]?.url ||
                      "/placeholder.svg?height=300&width=400" ||
                      "/placeholder.svg"
                    }
                    alt={property.title}
                    className="w-full h-64 object-cover transition-opacity duration-300 group-hover:opacity-0"
                  />

                  {/* Hover image */}
                  {property.images[1]?.url && (
                    <img
                      src={property.images[1].url || "/placeholder.svg"}
                      alt={property.title}
                      className="absolute top-0 left-0 w-full h-64 object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  )}
                </div>

                <div className="absolute top-4 left-4">
                  <Badge
                    className={`${
                      property.status === "For Sale"
                        ? "bg-green-500"
                        : "bg-blue-500"
                    } text-white`}
                  >
                    Available
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 capitalize">
                    {property.type}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
                    {property.title}
                  </h3>
                  <span className="text-xl font-bold text-amber-600">
                    {property.price}
                  </span>
                </div>

                <p className="text-gray-600 mb-3 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.location}
                </p>

                {/* Conditional property features based on type */}
                {renderPropertyFeatures(property)}

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {property.description}
                </p>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 gradient-gold rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {property.vendor?.name?.charAt(0) || "V"}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {property.vendor?.name || "Vendor"}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center">
                          {property.vendor?.status === "approved" && (
                            <>
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                              Verified Vendor
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {filteredAndSortedProperties.length > 0 && (
          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              Load More Properties
            </Button>
          </div>
        )}

        {filteredAndSortedProperties.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No properties found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria
            </p>
            <Button onClick={clearFilters} variant="outline">
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;
