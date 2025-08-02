"use client";

import type React from "react";
import { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Send, Download, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactPopup = ({ isOpen, onClose }: ContactPopupProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    propertyType: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // In a real application, you would send formData to your backend API here.
    // Example: const response = await createInquiryAPI(formData);

    // Simulating API call success for demonstration purposes:
    const responseSuccess = true; // Replace with actual API call result

    if (responseSuccess) {
      toast({
        title: "Inquiry Sent Successfully!",
        description:
          "Thank you for reaching out. We'll connect with you very soon.",
        variant: "default",
      });
      onClose();
    } else {
      toast({
        title: "Failed to Send Inquiry",
        description:
          "There was an issue sending your message. Please try again or contact us directly.",
        variant: "destructive",
      });
    }

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      propertyType: "",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDownloadPdf = (pdfPath: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "Download Initiated!",
      description: `${fileName} is downloading now. Check your downloads folder.`,
      variant: "default",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-8 bg-white rounded-xl shadow-2xl animate-in fade-in-90 zoom-in-95">
        <DialogHeader className="border-b pb-5 mb-6 text-center">
          <DialogTitle className="text-4xl font-extrabold text-gray-900 leading-tight">
            Connect With Our Property Experts
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2 text-lg">
            Whether you're looking to buy, sell, or rent, we're here to help you
            find your dream property.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="popup-name"
                    className="text-gray-700 font-medium text-sm"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="popup-name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="e.g., Jane Doe"
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500/50 transition duration-200"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="popup-email"
                    className="text-gray-700 font-medium text-sm"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="popup-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="jane.doe@example.com"
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500/50 transition duration-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="popup-phone"
                    className="text-gray-700 font-medium text-sm"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="popup-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+91 7771832778"
                    required
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500/50 transition duration-200"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="popup-propertyType"
                    className="text-gray-700 font-medium text-sm"
                  >
                    Interest in
                  </Label>
                  <Select
                    value={formData.propertyType}
                    onValueChange={(value) =>
                      handleInputChange("propertyType", value)
                    }
                  >
                    <SelectTrigger className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500/50 transition duration-200">
                      <SelectValue placeholder="Select property type/service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="commercial">
                        Commercial Space
                      </SelectItem>
                      <SelectItem value="plot">Land/Plot</SelectItem>
                      <SelectItem value="buying-a-home">
                        Buying a Home
                      </SelectItem>
                      <SelectItem value="renting-a-home">
                        Renting a Home
                      </SelectItem>
                      <SelectItem value="sell-property">
                        Selling Property
                      </SelectItem>
                      <SelectItem value="rent-property">
                        Renting Out Property
                      </SelectItem>
                      <SelectItem value="general-inquiry">
                        General Inquiry
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label
                  htmlFor="popup-subject"
                  className="text-gray-700 font-medium text-sm"
                >
                  Subject <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="popup-subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  placeholder="e.g., Inquiry about new launch, site visit"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500/50 transition duration-200"
                />
              </div>

              <div>
                <Label
                  htmlFor="popup-message"
                  className="text-gray-700 font-medium text-sm"
                >
                  Your Message <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="popup-message"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Tell us more about your specific requirements, preferences, or questions..."
                  rows={5}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500/50 transition duration-200"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-800 transition duration-300 ease-in-out py-2 px-4 rounded-lg"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white hover:bg-blue-700 transition duration-300 ease-in-out shadow-md hover:shadow-lg py-2 px-4 rounded-lg flex items-center justify-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Inquiry
                </Button>
              </div>
            </form>
          </div>

          {/* Download and Direct Contact Section */}
          <div className="space-y-6 lg:border-l lg:pl-8 border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">
              Explore Our Offerings
            </h3>
            <div className="bg-blue-50 p-5 rounded-lg shadow-inner">
              <p className="text-gray-700 mb-4 text-center text-lg font-semibold">
                Download Detailed Property Brochures
              </p>
              <div className="grid grid-cols-1 gap-4">
                <Button
                  type="button"
                  variant="default"
                  onClick={() =>
                    handleDownloadPdf(
                      "/1.pdf",
                      "Residential_Properties_Brochure.pdf"
                    )
                  }
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center py-3 px-4 rounded-lg transition duration-300 ease-in-out text-base font-medium shadow-sm"
                >
                  <Download className="w-5 h-5 mr-3" /> Residential Brochure
                </Button>
                <Button
                  type="button"
                  variant="default"
                  onClick={() =>
                    handleDownloadPdf(
                      "/2.pdf",
                      "Commercial_Properties_Brochure.pdf"
                    )
                  }
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center py-3 px-4 rounded-lg transition duration-300 ease-in-out text-base font-medium shadow-sm"
                >
                  <Download className="w-5 h-5 mr-3" /> Commercial Brochure
                </Button>
              </div>
            </div>

            <div className="pt-6">
              <h3 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">
                Prefer to Talk?
              </h3>
              <p className="text-gray-700 mb-4 text-lg">
                Reach out to us directly for immediate assistance or detailed
                discussions.
              </p>
              <div className="space-y-3">
                <a
                  href="tel:+917771832778" // Replace with your actual phone number
                  className="flex items-center text-blue-600 hover:text-blue-800 font-semibold text-lg transition duration-200"
                >
                  <Phone className="w-6 h-6 mr-3 text-blue-500" /> +91
                  7771832778
                </a>
                <a
                  href="mailto:info@yourrealestate.com" // Replace with your actual email
                  className="flex items-center text-blue-600 hover:text-blue-800 font-semibold text-lg transition duration-200"
                >
                  <Mail className="w-6 h-6 mr-3 text-blue-500" />{" "}
                  info@yourrealestate.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactPopup;
