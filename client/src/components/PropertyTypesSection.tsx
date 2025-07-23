"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Building,
  Home,
  Building2,
  MapPin,
  Key,
  Search,
  DollarSign,
  HandHeart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const PropertyTypesSection = () => {
  const router = useNavigate();

  const propertyTypes = [
    {
      id: "apartment",
      title: "Apartment",
      image:
        "https://is1-2.housingcdn.com/4f2250e8/e40e9a26237f9ba9c5c0fe2dec96a6ba/v5/fs/siddharth_apartment-ratanpur_--siddharth_construction_%26_builders.jpg",
      icon: Building,
      description: "Modern apartments in prime locations, perfect for urban living.",
    },
    {
      id: "villa",
      title: "Villa",
      image:
        "https://www.maramani.com/cdn/shop/articles/ID_24402-1.jpg?v=1700459989&width=1500",
      icon: Home,
      description: "Luxury villas with premium amenities, offering space and privacy.",
    },
    {
      id: "commercial",
      title: "Commercial",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtKPhTIXHRqKTBvlaVAeqJs14cJWqVGjJVVg&s",
      icon: Building2,
      description: "Office spaces and commercial properties for your business needs.",
    },
    {
      id: "plot",
      title: "Plot",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgWuUyJmnLuvj1BurkemfWGSqdb0WKGTr-Wg&s",
      icon: MapPin,
      description: "Residential and commercial plots, ideal for custom builds.",
    },
    {
      id: "buying-a-home",
      title: "Buying a Home",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRbcrj53mGyk-u4JwrIb6z1RBAeCpxR78gfQ&s",
      icon: Key,
      description: "Navigate the home buying process with expert guidance.",
    },
    {
      id: "renting-a-home",
      title: "Renting a Home",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRicwRmM2_WYADdZ7ygXgQv1nKGuP3iAxfXUg&s",
      icon: Search,
      description: "Discover rental properties that fit your lifestyle and budget.",
    },
    {
      id: "sell-property",
      title: "Sell Property",
      image:
        "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202403/65ee8897a0986-i-want-to-sell-my-house-and-buy-two-other-residential-properties-the-capital-gain-on-it-will-be-aro-112910279-16x9.jpg?size=948:533",
      icon: DollarSign,
      description: "List your property for sale and connect with potential buyers.",
    },
    {
      id: "rent-property",
      title: "Rent Property",
      image:
        "https://blog.ipleaders.in/wp-content/uploads/2021/07/Real-Estate-Is-this-a-good-time-to-buy-a-house-1.jpg",
      icon: HandHeart,
      description: "Rent out your property with ease and find reliable tenants.",
    },
  ];

  const handlePropertyTypeClick = (typeId: string) => {
    router(`/properties?type=${typeId}`);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Explore <span className="text-yellow-600">Diverse Property Types</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Whether you're looking to buy, sell, or rent, we offer a wide range of properties
            to suit every need and aspiration. Find your perfect match.
          </p>
        </div>

        {/* Property Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {propertyTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <Card
                key={type.id}
                className="group cursor-pointer transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl bg-white border border-gray-200 rounded-xl overflow-hidden relative"
                onClick={() => handlePropertyTypeClick(type.id)}
              >
                <CardContent className="p-0">
                  {/* Property Image */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <img
                      src={type.image || "/placeholder.svg"}
                      alt={type.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <p className="text-sm text-white font-medium">
                        {type.description}
                      </p>
                    </div>
                  </div>

                  {/* Property Type Details */}
                  <div className="p-6 text-center">
                    <div className="flex items-center justify-center mb-4">
                      <div className="p-4 bg-yellow-500 rounded-full shadow-lg transform -translate-y-10 group-hover:-translate-y-12 transition-transform duration-500">
                        <IconComponent className="h-7 w-7 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mt-[-20px] mb-2 group-hover:text-yellow-700 transition-colors duration-300">
                      {type.title}
                    </h3>
                    <p className="text-md text-gray-600">
                      {type.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <button
            onClick={() => router("/properties")}
            className="inline-flex items-center px-10 py-4 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl text-lg"
          >
            View All Properties
            <Search className="ml-3 h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PropertyTypesSection;