"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Home, Building, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import {
  getVendorPropertyAPI,
  deletePropertyAPI,
} from "../../service/operations/property";
import { toast } from "sonner";
import { EditPropertyModal } from "@/components/edit-property-modal";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface Property {
  _id: string;
  title: string;
  location: string;
  price: string;
  status: string;
  images: Array<{ url: string }>;
  views: number;
  description?: string;
  type?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: string;
  floors?: number;
  parking?: number;
  furnished?: string;
  plotType?: string;
}

const VendorProperties = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth?.user ?? null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  const fetchProperties = async () => {
    if (!user?._id) return;

    try {
      setLoading(true);
      const vendorProperties = await getVendorPropertyAPI({ vendor: user._id });
      console.log(vendorProperties);
      setProperties(vendorProperties);
    } catch (error) {
      console.error("Error fetching properties:", error);
      toast.error("Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [user]);

  const handleDelete = async (propertyId: string) => {
    setProperties(properties.filter((p) => p._id !== propertyId));
    await deletePropertyAPI(propertyId);
    toast.success("Property deleted successfully!");
  };

  const handleEditProperty = (property: Property) => {
    setSelectedProperty(property);
    setEditModalOpen(true);
  };

  const handleSaveProperty = (updatedProperty: Property) => {
    setProperties(
      properties.map((p) =>
        p._id === updatedProperty._id ? updatedProperty : p
      )
    );
  };

  // Function to check if property type is residential
  const isResidentialType = (type?: string) => {
    return ["apartment", "villa", "buying-a-home", "renting-a-home"].includes(
      type || ""
    );
  };

  // Function to check if property type is commercial
  const isCommercialType = (type?: string) => {
    return ["commercial"].includes(type || "");
  };

  // Function to check if property type is plot
  const isPlotType = (type?: string) => {
    return ["plot"].includes(type || "");
  };

  // Function to render property features based on type
  const renderPropertyFeatures = (property: Property) => {
    if (isResidentialType(property.type)) {
      return (
        <div className="flex space-x-4 text-sm text-gray-500">
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            {property.bedrooms || 0} BHK
          </span>
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {property.bathrooms || 0} Baths
          </span>
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
              />
            </svg>
            {property.area} sq ft
          </span>
        </div>
      );
    } else if (isCommercialType(property.type)) {
      return (
        <div className="flex space-x-4 text-sm text-gray-500">
          <span className="flex items-center">
            <Building className="h-4 w-4 mr-1" />
            {property.floors || 0} Floors
          </span>
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            {property.parking || 0} Parking
          </span>
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
              />
            </svg>
            {property.area} sq ft
          </span>
        </div>
      );
    } else if (isPlotType(property.type)) {
      return (
        <div className="flex space-x-4 text-sm text-gray-500">
          <span className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {property.plotType || "Residential"} Plot
          </span>
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
              />
            </svg>
            {property.area} sq ft
          </span>
        </div>
      );
    } else {
      // Default case for other property types
      return (
        <div className="flex space-x-4 text-sm text-gray-500">
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"
              />
            </svg>
            {property.area} sq ft
          </span>
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Properties</h1>
            <p className="text-gray-600">Loading your properties...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex h-16 items-center border-b px-6">
        <SidebarTrigger />
        <h1 className="ml-4 text-lg font-semibold">Vendor Dashboard</h1>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Properties</h1>
          <p className="text-gray-600">Manage your property listings</p>
        </div>
        <Button
          onClick={() => navigate("/vendor/add-property")}
          className="gradient-gold text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Property
        </Button>
      </div>

      {properties.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <Home className="w-16 h-16 mx-auto text-gray-400" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  No properties yet
                </h3>
                <p className="text-gray-500">
                  Start by adding your first property listing
                </p>
              </div>
              <Button
                onClick={() => navigate("/vendor/add-property")}
                className="gradient-gold text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Property
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Card key={property._id} className="overflow-hidden">
              {property.images && property.images.length > 0 && (
                <div className="aspect-video relative">
                  <img
                    src={property.images[0]?.url || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-green-100 text-green-800">
                    Active
                  </Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-lg">{property.title}</CardTitle>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">
                    {property.price}
                  </span>
                  <span className="text-sm text-gray-500 capitalize">
                    {property.type}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600">{property.location}</p>
                  {renderPropertyFeatures(property)}
                  {property.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {property.description}
                    </p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEditProperty(property)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(property._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <EditPropertyModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        property={selectedProperty}
        onSave={handleSaveProperty}
        fetchProperties={fetchProperties}
      />
    </div>
  );
};

export default VendorProperties;
