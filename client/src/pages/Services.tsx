import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Home,
  Search,
  FileText,
  Calculator,
  Users,
  Shield,
  CheckCircle, // Changed from a simple div for list items
  ArrowRight, // For CTA button icon
} from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  const services = [
    {
      icon: Home,
      title: "Property Sales",
      description:
        "Comprehensive property sales services for residential, commercial, and industrial properties.",
      features: [
        "Market Analysis",
        "Property Valuation",
        "Marketing Strategy",
        "Negotiation Support",
      ],
    },
    {
      icon: Search,
      title: "Property Search",
      description:
        "Expert assistance in finding the perfect property that matches your requirements and budget.",
      features: [
        "Personalized Search",
        "Location Analysis",
        "Property Tours",
        "Investment Guidance",
      ],
    },
    {
      icon: FileText,
      title: "Legal Documentation",
      description:
        "Complete legal support for property transactions with experienced legal professionals.",
      features: [
        "Document Verification",
        "Registration Support",
        "Legal Compliance",
        "Title Clearance",
      ],
    },
    {
      icon: Calculator,
      title: "Property Valuation",
      description:
        "Accurate property valuation services based on market trends and expert analysis.",
      features: [
        "Market Research",
        "Comparative Analysis",
        "Investment Assessment",
        "Detailed Reports",
      ],
    },
    {
      icon: Users,
      title: "Vendor Services",
      description:
        "Multi-vendor platform for property owners to list and manage their properties effectively.",
      features: [
        "Property Listing",
        "Vendor Verification",
        "Lead Management",
        "Performance Analytics",
      ],
    },
    {
      icon: Shield,
      title: "Property Management",
      description:
        "Complete property management solutions for landlords and property investors.",
      features: [
        "Tenant Management",
        "Maintenance Services",
        "Rent Collection",
        "Property Maintenance",
      ],
    },
  ];

  const process = [
    {
      step: "01",
      title: "Consultation",
      description:
        "Initial consultation to understand your requirements and preferences.",
    },
    {
      step: "02",
      title: "Property Search",
      description: "Curated property options based on your criteria and budget.",
    },
    {
      step: "03",
      title: "Site Visits",
      description: "Guided property tours and detailed property inspections.",
    },
    {
      step: "04",
      title: "Documentation",
      description: "Complete legal documentation and registration support.",
    },
    {
      step: "05",
      title: "Handover",
      description: "Smooth property handover with comprehensive post-sale support.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Hero Section */}
      <section className="relative py-28 md:py-36 bg-gradient-to-br from-indigo-100 to-indigo-300 text-indigo-900 overflow-hidden shadow-md">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.08\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 6V5zM6 5v1H5z\'/%3E%3C/g%3E%3C/svg%3E")'}}></div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-sm leading-tight animate-fade-in-up">
            Our Comprehensive <span className="text-orange-700">Real Estate Services</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto opacity-90 leading-relaxed animate-fade-in delay-200">
            Tailored solutions to navigate the property market with confidence, from search to settlement.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-orange-500 pb-3 inline-block leading-tight">
              What <span className="text-indigo-600">We Offer</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              From initial property search to legal documentation and beyond, we provide end-to-end real estate support for all your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <Card
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-start transform hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <CardHeader className="flex flex-col items-start p-0 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-lg flex items-center justify-center mb-4 shadow-md transition-all duration-300 group-hover:from-indigo-600 group-hover:to-indigo-800">
                    <service.icon className="w-8 h-8 text-white transform group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 leading-tight">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-grow">
                  <p className="text-gray-700 text-base mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2 pl-0">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-gray-600 text-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-orange-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-32 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-orange-600">Streamlined</span> Process
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              A transparent, step-by-step approach designed to ensure smooth and successful property transactions for every client.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-12 lg:gap-x-8 relative justify-items-center">
            {/* Horizontal Line for Desktop */}
            <div className="hidden lg:block absolute top-[calc(60px)] left-0 w-full h-1 bg-indigo-200"></div>

            {process.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center relative z-10 w-full max-w-xs sm:max-w-none"
              >
                {/* Step Number Circle */}
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-extrabold text-2xl flex-shrink-0 shadow-lg border-4 border-white">
                  {step.step}
                </div>

                {/* Vertical Line for Mobile/Tablet */}
                {index < process.length - 1 && (
                  <div className="lg:hidden absolute top-[calc(100% + 24px)] left-1/2 w-1 h-16 bg-indigo-200 transform -translate-x-1/2 -translate-y-1/2"></div>
                )}

                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed max-w-[200px] mx-auto">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-indigo-700 to-indigo-900 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Ready to Find Your <span className="text-orange-300">Perfect Property?</span>
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90">
            Connect with our experts today for a personalized consultation and let us guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contact">
              <Button
                size="lg"
                className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                Get Free Consultation <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/properties">
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-3 border-2 border-white text-gray-800 font-semibold rounded-full hover:bg-white hover:text-indigo-800 transition-all duration-300 shadow-lg flex items-center gap-2"
              >
                Explore Properties <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;