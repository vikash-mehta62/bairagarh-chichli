"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getAllPropertyAPI } from "../../service/operations/property";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deletePropertyAPI } from "../../service/operations/property";
const AdminProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterBedrooms, setFilterBedrooms] = useState("all");
  const [filterBathrooms, setFilterBathrooms] = useState("all");
  const user = useSelector((state: RootState) => state.auth?.user ?? null);

  const fetchAllProperty = async () => {
    try {
      const response = await getAllPropertyAPI();
      setProperties(response);
      console.log(response);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProperty();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "inactive":
        return <Badge className="bg-red-100 text-red-800">Inactive</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const handleDelete = async (propertyId: string) => {
    setProperties(properties.filter((p) => p._id !== propertyId));
    await deletePropertyAPI(propertyId);
    toast.success("Property deleted successfully!");
  };

  const filteredProperties = properties.filter((property) => {
    const matchesSearchTerm =
      property?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property?.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property?.vendor?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      property?.vendor?.company
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesType =
      filterType === "all" ||
      property?.type?.toLowerCase() === filterType.toLowerCase();

    const matchesBedrooms =
      filterBedrooms === "all" ||
      property?.bedrooms?.toString() === filterBedrooms;

    const matchesBathrooms =
      filterBathrooms === "all" ||
      property?.bathrooms?.toString() === filterBathrooms;

    return (
      matchesSearchTerm && matchesType && matchesBedrooms && matchesBathrooms
    );
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Property Management
          </h1>
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (!user?.isProperties) {
    return (
      <div className="text-red-600 text-center p-4 font-semibold">
        You do not have permission to view this page.
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Property Management
        </h1>
        <p className="text-gray-600">View all vendor properties</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Properties ({filteredProperties.length})</CardTitle>
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <Input
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Select onValueChange={setFilterType} value={filterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                {/* Add other property types as needed */}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredProperties.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No properties found matching your criteria.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Bedrooms</TableHead>
                  <TableHead>Bathrooms</TableHead>
                  <TableHead>Area</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProperties.map((property) => (
                  <TableRow key={property?._id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        {property?.images && (
                          <img
                            src={property?.images[0]?.url || "/placeholder.svg"}
                            alt={property?.title || "Property image"}
                            className="w-12 h-12 object-cover rounded"
                          />
                        )}
                        <div>
                          <p className="font-medium">{property?.title}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{property?.vendor?.name}</p>
                        <p className="text-sm text-gray-500">
                          {property?.vendor?.company}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {property?.price}
                    </TableCell>
                    <TableCell>{property?.location}</TableCell>
                    <TableCell>{property?.type}</TableCell>
                    <TableCell>{property?.bedrooms}</TableCell>
                    <TableCell>{property?.bathrooms}</TableCell>
                    <TableCell>{property?.area}</TableCell>
                    <TableCell>
                      {property?.createdAt
                        ? new Date(property.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )
                        : "N/A"}
                    </TableCell>
                    <br />
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(property._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProperties;
