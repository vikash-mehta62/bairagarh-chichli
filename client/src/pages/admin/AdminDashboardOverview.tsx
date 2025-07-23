
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Home, CheckCircle, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllVendorAPI } from "../../service/operations/vendor";
import { getVendorPropertyAPI } from "../../service/operations/property";

const AdminDashboardOverview = () => {
  const [stats, setStats] = useState({
    totalVendors: 0,
    approvedVendors: 0,
    pendingVendors: 0,
    totalProperties: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch vendors
        const vendors = await getAllVendorAPI();
        const totalVendors = vendors.length;
        const approvedVendors = vendors.filter(v => v.status === 'approved').length;
        const pendingVendors = vendors.filter(v => v.status === 'pending').length;

        // For properties, we'll need to fetch from all vendors
        // This is a simplified approach - ideally you'd have an admin API for this
        let totalProperties = 0;
        for (const vendor of vendors) {
          try {
            const properties = await getVendorPropertyAPI({ vendor: vendor._id });
            totalProperties += properties.length;
          } catch (error) {
            console.log("Error fetching properties for vendor:", vendor._id);
          }
        }

        setStats({
          totalVendors,
          approvedVendors,
          pendingVendors,
          totalProperties,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const statsCards = [
    {
      title: "Total Vendors",
      value: stats.totalVendors.toString(),
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Approved Vendors", 
      value: stats.approvedVendors.toString(),
      icon: CheckCircle,
      color: "bg-green-500",
    },
    {
      title: "Pending Approval",
      value: stats.pendingVendors.toString(),
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      title: "Total Properties",
      value: stats.totalProperties.toString(),
      icon: Home,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome to the admin dashboard</p>
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

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">New vendor registration</p>
                <p className="text-sm text-gray-500">Rajesh Kumar submitted application</p>
              </div>
              <span className="text-sm text-gray-400">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Property approved</p>
                <p className="text-sm text-gray-500">Luxury Villa in Awadhpuri approved</p>
              </div>
              <span className="text-sm text-gray-400">4 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Vendor approved</p>
                <p className="text-sm text-gray-500">Priya Sharma's application approved</p>
              </div>
              <span className="text-sm text-gray-400">1 day ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboardOverview;
