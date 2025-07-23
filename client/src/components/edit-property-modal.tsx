"use client";

import { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { updatePropertyAPI } from "../service/operations/property";
import { imageUpload } from "../service/operations/image";

interface Image {
  public_id: string;
  url: string;
}

interface Property {
  _id: string;
  title: string;
  location: string;
  price: string;
  status: string;
  image?: string | File;
  images?: Image[];
  views: number;
  description?: string;
  type?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: string;
  // Commercial specific fields
  floors?: number;
  parking?: number;
  furnished?: string;
  // Plot specific fields
  plotType?: string;
}

interface EditPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
  onSave: (updatedProperty: Property) => void;
  fetchProperties: () => void;
}

export const EditPropertyModal = ({
  isOpen,
  onClose,
  property,
  onSave,
  fetchProperties,
}: EditPropertyModalProps) => {
  const [formData, setFormData] = useState<Property>({
    _id: "",
    title: "",
    location: "",
    price: "",
    status: "active",
    image: "",
    images: [],
    views: 0,
    description: "",
    type: "",
    bedrooms: 0,
    bathrooms: 0,
    area: "",
    floors: 0,
    parking: 0,
    furnished: "",
    plotType: "",
  });
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Pre-populate form when property changes
  useEffect(() => {
    if (property) {
      setFormData({
        _id: property._id,
        title: property.title || "",
        location: property.location || "",
        price: property.price || "",
        status: property.status || "active",
        image: property.image || "",
        views: property.views || 0,
        description: property.description || "",
        type: property.type || "",
        bedrooms: property.bedrooms || 0,
        bathrooms: property.bathrooms || 0,
        area: property.area || "",
        floors: property.floors || 0,
        parking: property.parking || 0,
        furnished: property.furnished || "",
        plotType: property.plotType || "",
      });

      // Initialize images if they exist in the property
      if (property.images && Array.isArray(property.images)) {
        setImages(property.images);
      } else {
        setImages([]);
      }
    }
  }, [property]);

  const handleInputChange = (
    field: keyof Property,
    value: string | number | File
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      handleInputChange("image", file);
      toast.success("Featured image selected successfully!");
    }
  };

  // Upload multiple images
  const uploadImages = async (acceptedFiles: File[]) => {
    try {
      const response = await imageUpload(acceptedFiles);

      if (response) {
        const uploadedImages = response.map((image: any) => ({
          public_id: image.asset_id,
          url: image.url,
        }));

        setImages((prevImages) => [...prevImages, ...uploadedImages]);
        toast.success("Additional images uploaded successfully!");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
      toast.error("Failed to upload additional images");
    }
  };

  // Remove an image
  const removeImage = (publicId: string) => {
    const updatedImages = images.filter(
      (image) => image.public_id !== publicId
    );
    setImages(updatedImages);
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
    ].includes(type || "");
  };

  // Function to check if property type is commercial
  const isCommercialType = (type?: string) => {
    return ["commercial"].includes(type || "");
  };

  // Function to check if property type is plot
  const isPlotType = (type?: string) => {
    return ["plot"].includes(type || "");
  };

  const handleSave = async () => {
    if (!formData.title || !formData.location || !formData.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      const dataToSend = new FormData();

      // Append basic fields
      dataToSend.append("title", formData.title);
      dataToSend.append("location", formData.location);
      dataToSend.append("price", formData.price);
      dataToSend.append("status", formData.status);
      dataToSend.append("views", formData.views.toString());

      // Append optional fields only if they have values
      if (formData.description) {
        dataToSend.append("description", formData.description);
      }
      if (formData.type) {
        dataToSend.append("type", formData.type);
      }
      if (formData.area) {
        dataToSend.append("area", formData.area);
      }

      // Append fields based on property type
      if (isResidentialType(formData.type)) {
        if (formData.bedrooms !== undefined && formData.bedrooms !== null) {
          dataToSend.append("bedrooms", formData.bedrooms.toString());
        }
        if (formData.bathrooms !== undefined && formData.bathrooms !== null) {
          dataToSend.append("bathrooms", formData.bathrooms.toString());
        }
      }

      if (isCommercialType(formData.type)) {
        if (formData.floors !== undefined && formData.floors !== null) {
          dataToSend.append("floors", formData.floors.toString());
        }
        if (formData.parking !== undefined && formData.parking !== null) {
          dataToSend.append("parking", formData.parking.toString());
        }
        if (formData.furnished) {
          dataToSend.append("furnished", formData.furnished);
        }
      }

      if (isPlotType(formData.type)) {
        if (formData.plotType) {
          dataToSend.append("plotType", formData.plotType);
        }
      }

      // Handle single image file or existing URL
      if (formData.image instanceof File) {
        dataToSend.append("image", formData.image);
      } else if (typeof formData.image === "string" && formData.image) {
        dataToSend.append("image", formData.image);
      }

      // Add multiple images
      if (images.length > 0) {
        dataToSend.append("images", JSON.stringify(images));
      }

      const response = await updatePropertyAPI(property._id, dataToSend);

      if (response?.success) {
        // Update the property with the new data including images
        const updatedProperty = {
          ...formData,
          images: images,
        };

        onSave(response.updatedProperty || updatedProperty);
        toast.success("Property updated successfully!");
        fetchProperties();
        onClose();
      } else {
        toast.error(response?.message || "Failed to update property");
      }
    } catch (error) {
      console.error("Error updating property:", error);
      toast.error("Failed to update property");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Revert formData to original property values on cancel
    if (property) {
      setFormData({
        _id: property._id,
        title: property.title || "",
        location: property.location || "",
        price: property.price || "",
        status: property.status || "active",
        image: property.image || "",
        views: property.views || 0,
        description: property.description || "",
        type: property.type || "",
        bedrooms: property.bedrooms || 0,
        bathrooms: property.bathrooms || 0,
        area: property.area || "",
        floors: property.floors || 0,
        parking: property.parking || 0,
        furnished: property.furnished || "",
        plotType: property.plotType || "",
      });

      // Reset images to original property images
      if (property.images && Array.isArray(property.images)) {
        setImages(property.images);
      } else {
        setImages([]);
      }
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Property</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Basic Information */}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Property Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter property title"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Enter property location"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="e.g., ₹1.5 Cr"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="type">Property Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleInputChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="plot">Plot</SelectItem>
                  <SelectItem value="buying-a-home">Buying a home</SelectItem>
                  <SelectItem value="renting-a-home">Renting a home</SelectItem>
                  <SelectItem value="sell-property">Sell property</SelectItem>
                  <SelectItem value="rent-property">Rent property</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Conditional Fields Based on Property Type */}
            {isResidentialType(formData.type) && (
              <div className="grid gap-4">
                <h4 className="text-md font-semibold">Residential Details</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Select
                      value={formData.bedrooms?.toString() || ""}
                      onValueChange={(value) =>
                        handleInputChange("bedrooms", Number.parseInt(value))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select bedrooms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 BHK</SelectItem>
                        <SelectItem value="2">2 BHK</SelectItem>
                        <SelectItem value="3">3 BHK</SelectItem>
                        <SelectItem value="4">4 BHK</SelectItem>
                        <SelectItem value="5">5+ BHK</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Select
                      value={formData.bathrooms?.toString() || ""}
                      onValueChange={(value) =>
                        handleInputChange("bathrooms", Number.parseInt(value))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select bathrooms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Bathroom</SelectItem>
                        <SelectItem value="2">2 Bathrooms</SelectItem>
                        <SelectItem value="3">3 Bathrooms</SelectItem>
                        <SelectItem value="4">4 Bathrooms</SelectItem>
                        <SelectItem value="5">5+ Bathrooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="area">Area (sq ft)</Label>
                    <Input
                      id="area"
                      value={formData.area}
                      onChange={(e) =>
                        handleInputChange("area", e.target.value)
                      }
                      placeholder="Area in sq ft"
                    />
                  </div>
                </div>
              </div>
            )}

            {isCommercialType(formData.type) && (
              <div className="grid gap-4">
                <h4 className="text-md font-semibold">Commercial Details</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="floors">Number of Floors</Label>
                    <Input
                      id="floors"
                      type="number"
                      value={formData.floors}
                      onChange={(e) =>
                        handleInputChange(
                          "floors",
                          Number.parseInt(e.target.value) || 0
                        )
                      }
                      placeholder="Number of floors"
                      min="0"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="parking">Parking Spaces</Label>
                    <Input
                      id="parking"
                      type="number"
                      value={formData.parking}
                      onChange={(e) =>
                        handleInputChange(
                          "parking",
                          Number.parseInt(e.target.value) || 0
                        )
                      }
                      placeholder="Number of parking spaces"
                      min="0"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="area">Area (sq ft)</Label>
                    <Input
                      id="area"
                      value={formData.area}
                      onChange={(e) =>
                        handleInputChange("area", e.target.value)
                      }
                      placeholder="Area in sq ft"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="furnished">Furnished Status</Label>
                  <Select
                    value={formData.furnished}
                    onValueChange={(value) =>
                      handleInputChange("furnished", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select furnished status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fully-furnished">
                        Fully Furnished
                      </SelectItem>
                      <SelectItem value="semi-furnished">
                        Semi Furnished
                      </SelectItem>
                      <SelectItem value="unfurnished">Unfurnished</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {isPlotType(formData.type) && (
              <div className="grid gap-4">
                <h4 className="text-md font-semibold">Plot Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="area">Plot Area (sq ft)</Label>
                    <Input
                      id="area"
                      value={formData.area}
                      onChange={(e) =>
                        handleInputChange("area", e.target.value)
                      }
                      placeholder="Plot area in sq ft"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="plotType">Plot Type</Label>
                    <Select
                      value={formData.plotType}
                      onValueChange={(value) =>
                        handleInputChange("plotType", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select plot type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">
                          Residential Plot
                        </SelectItem>
                        <SelectItem value="commercial">
                          Commercial Plot
                        </SelectItem>
                        <SelectItem value="agricultural">
                          Agricultural Land
                        </SelectItem>
                        <SelectItem value="industrial">
                          Industrial Plot
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Multiple Images Upload Section */}
            <div className="grid gap-2 mt-4">
              <Label>Property Images</Label>
              <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center mb-4 bg-blue-50">
                <Dropzone
                  onDrop={(acceptedFiles) => uploadImages(acceptedFiles)}
                  accept={{
                    "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
                  }}
                  multiple={true}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className="cursor-pointer">
                      <input {...getInputProps()} />
                      <p className="text-blue-500">
                        Drag 'n' drop multiple images here, or click to select
                        files
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Upload high-quality property images
                      </p>
                    </div>
                  )}
                </Dropzone>
              </div>

              {/* Multiple Images Preview */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                  {images.map((image, index) => (
                    <div className="relative" key={index}>
                      <button
                        type="button"
                        onClick={() => removeImage(image.public_id)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full shadow-md focus:outline-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt={`Property image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg shadow-md"
                        onError={(e) => {
                          e.currentTarget.src =
                            "/placeholder.svg?height=128&width=128";
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Enter property description"
                rows={3}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
