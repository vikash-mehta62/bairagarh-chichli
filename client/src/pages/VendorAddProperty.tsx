"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Dropzone, { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { createPropertyAPI } from "../service/operations/property";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { imageUpload } from "../service/operations/image";

const VendorAddProperty = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    location: "",
    type: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    description: "",
    vendor: "",
    // Commercial specific fields
    floors: "",
    parking: "",
    furnished: "",
    // Plot specific fields
    plotType: "",
  });
  const [images, setImages] = useState([]);

  const uploadImage = async (acceptedFiles) => {
    const response = await imageUpload(acceptedFiles);
    console.log(response);

    const uploadedImages = response?.map((image) => ({
      public_id: image.asset_id,
      url: image.url,
    }));
    setImages((prevImages) => [...prevImages, ...uploadedImages]);
  };

  const removeImage = (publicId) => {
    const updatedImages = images.filter(
      (image) => image.public_id !== publicId
    );
    setImages(updatedImages);
  };

  const user = useSelector((state: RootState) => state.auth?.user ?? null);

  if (user?._id && formData.vendor === "") {
    setFormData((prev) => ({ ...prev, vendor: user._id }));
  }

  const navigate = useNavigate();

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFormData({
        ...formData,
        image: file,
      });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 1,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to check if property type requires bedrooms/bathrooms
  const isResidentialType = (type: string) => {
    return ["apartment", "villa", "buying-a-home", "renting-a-home"].includes(
      type
    );
  };

  // Function to check if property type is commercial
  const isCommercialType = (type: string) => {
    return ["commercial"].includes(type);
  };

  // Function to check if property type is plot
  const isPlotType = (type: string) => {
    return ["plot"].includes(type);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Include all form fields regardless of property type
    const dataToSend = {
      title: formData.title,
      price: formData.price,
      location: formData.location,
      type: formData.type,
      bedrooms: formData.bedrooms || "",
      bathrooms: formData.bathrooms || "",
      area: formData.area,
      description: formData.description,
      vendor: formData.vendor,
      // Commercial specific fields
      floors: formData.floors || "",
      parking: formData.parking || "",
      furnished: formData.furnished || "",
      // Plot specific fields
      plotType: formData.plotType || "",
      images: JSON.stringify(images),
    };

    console.log("Data being sent to backend:", dataToSend); // For debugging

    try {
      const response = await createPropertyAPI(dataToSend);
      if (response?.data?.success) {
        toast.success("Property added successfully!");
        navigate("/vendor/dashboard");
      } else {
        toast.error(response?.data?.message || "Failed to add property.");
      }
    } catch (error) {
      console.error("Error adding property:", error);
      toast.error("An error occurred while adding the property.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-16 items-center border-b px-6">
        <SidebarTrigger />
        <h1 className="ml-4 text-lg font-semibold">Vendor Dashboard</h1>
      </div>
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Add New Property
            </h1>
            <Button
              variant="outline"
              onClick={() => navigate("/vendor/dashboard")}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Property Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter property title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    name="price"
                    placeholder="Enter price (e.g., ₹1.5 Cr)"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="Enter location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Property Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleSelectChange("type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="plot">Plot</SelectItem>
                      <SelectItem value="buying-a-home">
                        Buying a home
                      </SelectItem>
                      <SelectItem value="renting-a-home">
                        Renting a home
                      </SelectItem>
                      <SelectItem value="sell-property">
                        Sell property
                      </SelectItem>
                      <SelectItem value="rent-property">
                        Rent property
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Conditional Fields Based on Property Type */}
              {isResidentialType(formData.type) && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Select
                      value={formData.bedrooms}
                      onValueChange={(value) =>
                        handleSelectChange("bedrooms", value)
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
                  <div className="space-y-2">
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Select
                      value={formData.bathrooms}
                      onValueChange={(value) =>
                        handleSelectChange("bathrooms", value)
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
                  <div className="space-y-2">
                    <Label htmlFor="area">Area (sq ft)</Label>
                    <Input
                      id="area"
                      name="area"
                      placeholder="Area in sq ft"
                      value={formData.area}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              {isCommercialType(formData.type) && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="floors">Number of Floors</Label>
                    <Input
                      id="floors"
                      name="floors"
                      type="number"
                      placeholder="Number of floors"
                      value={formData.floors}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parking">Parking Spaces</Label>
                    <Input
                      id="parking"
                      name="parking"
                      type="number"
                      placeholder="Number of parking spaces"
                      value={formData.parking}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="area">Area (sq ft)</Label>
                    <Input
                      id="area"
                      name="area"
                      placeholder="Area in sq ft"
                      value={formData.area}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              {isCommercialType(formData.type) && (
                <div className="space-y-2">
                  <Label htmlFor="furnished">Furnished Status</Label>
                  <Select
                    value={formData.furnished}
                    onValueChange={(value) =>
                      handleSelectChange("furnished", value)
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
              )}

              {isPlotType(formData.type) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="area">Plot Area (sq ft)</Label>
                    <Input
                      id="area"
                      name="area"
                      placeholder="Plot area in sq ft"
                      value={formData.area}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Plot Type</Label>
                    <Select
                      value={formData.plotType}
                      onValueChange={(value) =>
                        handleSelectChange("plotType", value)
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
              )}

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Property Images
                </label>
                <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center mb-4 bg-blue-50">
                  <Dropzone
                    onDrop={(acceptedFiles) => uploadImage(acceptedFiles)}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()} className="cursor-pointer">
                        <input {...getInputProps()} />
                        <p className="text-blue-500">
                          Drag 'n' drop images here, or click to select files
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Upload high-quality property images
                        </p>
                      </div>
                    )}
                  </Dropzone>
                </div>

                {/* Image Preview */}
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
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter property description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full gradient-gold text-white">
                Add Property
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorAddProperty;
