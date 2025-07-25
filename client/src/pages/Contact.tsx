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
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react"; // Added CheckCircle for list items
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { createInquiryAPI } from "../service/operations/inquiry";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    propertyType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await createInquiryAPI(formData);
      if (response) {
        toast({
          title: "Message Sent!",
          description: "Thank you for contacting us. We'll get back to you soon.",
          variant: "default", // You might have a success variant
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          propertyType: "",
        });
      } else {
        toast({
          title: "Failed to Send Message",
          description: "There was an issue sending your inquiry. Please try again.",
          variant: "destructive", // You might have an error variant
        });
      }
    } catch (error) {
      console.error("Error sending inquiry:", error);
      toast({
        title: "Failed to Send Message",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      details: ["123, Main Street, Arera Colony", "Bhopal, Madhya Pradesh, India"],
      link: "https://maps.app.goo.gl/YOUR_GOOGLE_MAPS_LINK_HERE", // Replace with actual Google Maps link
      color: "indigo", // For alternating icon colors
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 83190 39381", "+91 78901 23456"],
      link: "tel:+918319039381",
      color: "orange",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@propedgesolutions.co.in", "sales@propedgesolutions.co.in"],
      link: "mailto:info@propedgesolutions.co.in",
      color: "indigo",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon - Sat: 9:00 AM - 7:00 PM", "Sunday: 10:00 AM - 5:00 PM"],
      link: null,
      color: "orange",
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
            Get In <span className="text-orange-700">Touch</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto opacity-90 leading-relaxed animate-fade-in delay-200">
            Connect with our expert team for all your real estate needs and inquiries.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16 md:py-24">
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <Card
              key={index}
              className="text-center bg-white rounded-xl shadow-lg border border-gray-100 transform hover:-translate-y-2 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div
                  className={`w-16 h-16 ${
                    info.color === "indigo"
                      ? "bg-gradient-to-br from-indigo-500 to-indigo-700"
                      : "bg-gradient-to-br from-orange-500 to-orange-700"
                  } rounded-full flex items-center justify-center mx-auto mb-4 shadow-md`}
                >
                  <info.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                  {info.title}
                </h3>
                {info.details.map((detail, detailIndex) => (
                  <p key={detailIndex} className="text-gray-700 text-sm leading-relaxed">
                    {info.link && detailIndex === 0 ? (
                      <a
                        href={info.link}
                        className={`hover:text-${info.color}-600 transition-colors duration-200`}
                        target="_blank" // Open links in new tab
                        rel="noopener noreferrer" // Security best practice
                      >
                        {detail}
                      </a>
                    ) : (
                      detail
                    )}
                  </p>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                Send us a Message
              </CardTitle>
              <p className="text-gray-700 text-lg leading-relaxed">
                Fill out the form below and our team will get back to you as soon as possible.
              </p>
            </CardHeader>
            <CardContent className="p-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-700 font-medium mb-1 block">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      placeholder="Your full name"
                      required
                      className="h-12 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg text-gray-900"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-700 font-medium mb-1 block">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="your.email@example.com"
                      required
                      className="h-12 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg text-gray-900"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-gray-700 font-medium mb-1 block">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      placeholder="+91 98765 43210"
                      required
                      className="h-12 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg text-gray-900"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="propertyType" className="text-gray-700 font-medium mb-1 block">Property Interest</Label>
                    <Select
                      value={formData.propertyType}
                      onValueChange={(value) =>
                        handleInputChange("propertyType", value)
                      }
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className="h-12 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg text-gray-700">
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent className="rounded-lg shadow-lg border border-gray-100">
                        <SelectItem value="apartment" className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Apartment</SelectItem>
                        <SelectItem value="villa" className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Villa</SelectItem>
                        <SelectItem value="commercial" className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Commercial</SelectItem>
                        <SelectItem value="plot" className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Plot</SelectItem>
                        <SelectItem value="buying-a-home" className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Buying a home</SelectItem>
                        <SelectItem value="renting-a-home" className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Renting a home</SelectItem>
                        <SelectItem value="sell-property" className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Sell property</SelectItem>
                        <SelectItem value="rent-property" className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Rent property</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject" className="text-gray-700 font-medium mb-1 block">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) =>
                      handleInputChange("subject", e.target.value)
                    }
                    placeholder="How can we help you?"
                    required
                    className="h-12 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg text-gray-900"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-700 font-medium mb-1 block">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    placeholder="Tell us more about your requirements..."
                    rows={5}
                    required
                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg text-gray-900"
                    disabled={isSubmitting}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full px-6 py-3 shadow-md flex items-center justify-center gap-2 transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Map and Additional Info */}
          <div className="space-y-8">
            <Card className="bg-white rounded-xl shadow-lg border border-gray-100">
              <CardHeader className="p-6 pb-0">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Visit Our Office
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-4">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg mb-4 overflow-hidden shadow-sm">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.0364766654745!2d77.3974!3d23.2599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c4369e9b0b0b1%3A0x8f7c9e0a0a0a0a0a!2sArera%20Colony%2C%20Bhopal%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" // Updated map embed for Arera Colony, Bhopal
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  ></iframe>
                </div>
                <p className="text-gray-700 text-base leading-relaxed">
                  Located in the heart of Bhopal, our office is easily accessible and equipped with modern facilities to serve you better. We look forward to welcoming you!
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-xl shadow-lg border border-gray-100">
              <CardHeader className="p-6 pb-0">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Why Choose CompanyName Solutions?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-4">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 leading-relaxed">
                      25+ years of trusted experience in the real estate market, ensuring unparalleled expertise.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 leading-relaxed">
                      Successfully served over 5,000 satisfied clients and our community continues to grow.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 leading-relaxed">
                      Our expert team possesses deep local market knowledge, providing you with the best insights.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 leading-relaxed">
                      Committed to transparent and ethical business practices in every transaction.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-orange-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 leading-relaxed">
                      We offer comprehensive, end-to-end real estate solutions tailored to your unique needs.
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;