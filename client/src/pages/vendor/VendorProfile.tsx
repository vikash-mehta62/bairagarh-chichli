import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import {
  User,
  Mail,
  Phone,
  Building,
  MapPin,
  FileText,
  CreditCard,
  BadgeIcon as IdCard,
  Edit,
  Save,
  X,
  Calendar,
  Shield,
} from "lucide-react";
import {
  getVendorByIdAPI,
  updateVendorProfileAPI,
} from "../../service/operations/vendor";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const updateVendorAPI = async (id: string, data: any) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return { success: true, vendor: { ...data, _id: id } };
};

interface VendorData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  description: string;
  role: string;
  status: string;
  adhar: string;
  pan: string;
  createdAt: string;
  updatedAt: string;
}

const VendorProfile = () => {
  const [vendor, setVendor] = useState<VendorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState<Partial<VendorData>>({});

  const user = useSelector((state: RootState) => state.auth?.user ?? null);

  useEffect(() => {
    fetchVendorData();
  }, []);

  const fetchVendorData = async () => {
    try {
      setLoading(true);
      const data = await getVendorByIdAPI(user?._id);
      setVendor(data);
      setFormData(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setUpdating(true);
      const response = await updateVendorProfileAPI(user?._id, formData);

      if (response.success) {
        setVendor((prev) => ({ ...prev, ...formData } as VendorData));
        setIsEditing(false);
        toast({
          title: "Success",
          description: "Profile updated successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    setFormData(vendor || {});
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Profile not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Vendor Profile
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your profile information
              </p>
            </div>
            <div className="flex gap-2">
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={handleSave}
                    disabled={updating}
                    className="flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {updating ? "Saving..." : "Save"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={updating}
                    className="flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Summary Card */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarFallback className="text-2xl">
                      {getInitials(vendor.name)}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {vendor.name}
                  </h2>
                  <p className="text-gray-600">{vendor.company}</p>
                  <div className="flex justify-center mt-3">
                    <Badge
                      variant={
                        vendor.status === "active" ? "default" : "secondary"
                      }
                    >
                      <Shield className="w-3 h-3 mr-1" />
                      {vendor.status}
                    </Badge>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-gray-600">Member since</p>
                      <p className="font-medium">
                        {formatDate(vendor.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <User className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-gray-600">Role</p>
                      <p className="font-medium capitalize">{vendor.role}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={formData.name || ""}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{vendor.name}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={formData.email || ""}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="Enter your email"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        {vendor.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={formData.phone || ""}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        {vendor.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="company">Company Name</Label>
                    {isEditing ? (
                      <Input
                        id="company"
                        value={formData.company || ""}
                        onChange={(e) =>
                          handleInputChange("company", e.target.value)
                        }
                        placeholder="Enter your company name"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900 flex items-center gap-2">
                        <Building className="w-4 h-4 text-gray-400" />
                        {vendor.company}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  {isEditing ? (
                    <Textarea
                      id="address"
                      value={formData.address || ""}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      placeholder="Enter your address"
                      rows={3}
                    />
                  ) : (
                    <p className="mt-1 text-gray-900 flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      {vendor.address}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  {isEditing ? (
                    <Textarea
                      id="description"
                      value={formData.description || ""}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      placeholder="Tell us about yourself and your business"
                      rows={4}
                    />
                  ) : (
                    <p className="mt-1 text-gray-900 flex items-start gap-2">
                      <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
                      {vendor.description}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Document Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Document Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="adhar">Aadhaar Number</Label>
                    {isEditing ? (
                      <Input
                        id="adhar"
                        value={formData.adhar || ""}
                        onChange={(e) =>
                          handleInputChange("adhar", e.target.value)
                        }
                        placeholder="Enter your Aadhaar number"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900 flex items-center gap-2">
                        <IdCard className="w-4 h-4 text-gray-400" />
                        {vendor.adhar}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="pan">PAN Number</Label>
                    {isEditing ? (
                      <Input
                        id="pan"
                        value={formData.pan || ""}
                        onChange={(e) =>
                          handleInputChange("pan", e.target.value)
                        }
                        placeholder="Enter your PAN number"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-gray-400" />
                        {vendor.pan}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="percentage">Admin Commission (%)</Label>
                    <p className="mt-1 text-gray-900 flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-gray-400" />
                      {vendor?.percentage ? `${vendor.percentage}%` : "Not set"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;
