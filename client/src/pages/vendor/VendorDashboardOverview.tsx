
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Eye, IndianRupee, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getVendorPropertyAPI } from "../../service/operations/property";

const VendorDashboardOverview = () => {
  const user = useSelector((state: RootState) => state.auth?.user ?? null);
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalViews: 0,
    totalValue: "₹0",
    recentProperties: 0,
  });
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?._id) return;

      try {
        const vendorProperties = await getVendorPropertyAPI({ vendor: user._id });
        setProperties(vendorProperties);
        
        // Calculate stats
        const totalProperties = vendorProperties.length;
        const totalViews = vendorProperties.reduce((sum, prop) => sum + (prop.views || 0), 0);
        const recentProperties = vendorProperties.filter(prop => {
          const createdAt = new Date(prop.createdAt);
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          return createdAt > thirtyDaysAgo;
        }).length;

        setStats({
          totalProperties,
          totalViews,
          totalValue: "₹" + (totalProperties * 1.5) + " Cr", // Sample calculation
          recentProperties,
        });
      } catch (error) {
        console.error("Error fetching vendor data:", error);
      }
    };

    fetchData();
  }, [user]);

  const statsCards = [
    {
      title: "Total Properties",
      value: stats.totalProperties.toString(),
      icon: Home,
      color: "bg-blue-500",
    },
    {
      title: "Total Views",
      value: stats.totalViews.toString(),
      icon: Eye,
      color: "bg-green-500",
    },
    {
      title: "Portfolio Value",
      value: stats.totalValue,
      icon: IndianRupee,
      color: "bg-yellow-500",
    },
    {
      title: "This Month",
      value: stats.recentProperties.toString(),
      icon: Calendar,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back, {user?.name || 'Vendor'}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-full text-white mr-4`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Properties */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Properties</CardTitle>
        </CardHeader>
        <CardContent>
          {properties.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No properties found. Start by adding your first property!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {properties.slice(0, 5).map((property) => (
                <div key={property._id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    {property.image && (
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <div>
                      <p className="font-medium">{property.title}</p>
                      <p className="text-sm text-gray-500">{property.location}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{property.price}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(property.createdAt).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorDashboardOverview;
