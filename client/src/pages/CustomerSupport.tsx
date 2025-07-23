"use client";

import React, { useState } from "react";
import { Mail, Phone, MessageSquareText, Lightbulb, HelpCircle, Send } from "lucide-react"; // Added new icons
import { createCustomerSupportAPI } from "../service/operations/customerSupport";
import { useToast } from "@/hooks/use-toast"; // Ensure useToast is correctly imported and configured
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CustomerSupport = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await createCustomerSupportAPI(formData);
      if (response?.success) {
        toast({
          title: "Message Sent!",
          description: "Thank you for contacting us. We'll get back to you soon.",
          variant: "default", // Assuming a default success variant
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          category: "",
          message: "",
        });
      } else {
        toast({
          title: "Failed to Send Message",
          description: "There was an issue sending your inquiry. Please try again.",
          variant: "destructive", // Assuming a destructive error variant
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

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Hero Section */}
      <section className="relative py-28 md:py-36 bg-gradient-to-br from-indigo-100 to-indigo-300 text-indigo-900 overflow-hidden shadow-md">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.08\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 6V5zM6 5v1H5z\'/%3E%3C/g%3E%3C/svg%3E")'}}></div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-sm leading-tight animate-fade-in-up">
            Dedicated <span className="text-orange-700">Support</span> Center
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto opacity-90 leading-relaxed animate-fade-in delay-200">
            Whether you're looking to buy, sell, or rent a property, we're here to assist you every step of the way.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16 md:py-24">
        <section className="mb-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-orange-500 pb-3 inline-block leading-tight">
            Frequently Asked <span className="text-indigo-600">Questions</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mt-4">
            Before reaching out, please check our comprehensive FAQs below. You might find an instant answer to your property-related query!
          </p>
        </section>

        {/* FAQs Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* FAQ Card 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition duration-300 hover:-translate-y-2 hover:shadow-xl group">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300 leading-tight">
                Q: How do I list my property on your website?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                A: To list your property, navigate to the "
                <a
                  href="#"
                  className="text-indigo-600 hover:underline font-medium"
                >
                  List Property
                </a>
                " section. You'll need to create an account (if you don't have
                one) and then follow the guided steps to upload comprehensive
                details and high-quality photos.
              </p>
            </div>
            {/* FAQ Card 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition duration-300 hover:-translate-y-2 hover:shadow-xl group">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300 leading-tight">
                Q: How can I schedule a property viewing?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                A: On any property's detail page, you'll find a prominent
                "Schedule a Viewing" button. Click it to choose an available
                time slot or contact the listing agent directly via their
                provided contact details.
              </p>
            </div>
            {/* FAQ Card 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition duration-300 hover:-translate-y-2 hover:shadow-xl group">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300 leading-tight">
                Q: What is the process for making an offer on a property?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                A: Once you've viewed a property you're interested in, you can
                submit an offer directly through your account dashboard. Our
                dedicated team can also guide you through the entire negotiation
                process, ensuring a smooth transaction.
              </p>
            </div>
            {/* FAQ Card 4 */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 transform transition duration-300 hover:-translate-y-2 hover:shadow-xl group">
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300 leading-tight">
                Q: Are there any fees for listing my property?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                A: Our basic listing service is free of charge, but we offer
                various premium packages with enhanced visibility and features
                designed to sell your property faster. Please refer to our{" "}
                <a
                  href="#"
                  className="text-indigo-600 hover:underline font-medium"
                >
                  Pricing Page
                </a>{" "}
                for full details on commission rates and additional fees.
              </p>
            </div>
          </div>
        </section>

        <hr className="my-20 border-indigo-200 border-dashed rounded-full" />

        {/* Contact Us Section with Form */}
        <section className="mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-orange-500 pb-3 inline-block leading-tight">
            Contact Our Property <span className="text-indigo-600">Experts</span>
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 mb-12 max-w-3xl mx-auto text-center mt-4">
            If you couldn't find an answer in our comprehensive FAQs, please don't hesitate to reach out. Fill out the form below, and our property support team will get back to you as soon as possible.
          </p>

          <h3 className="text-3xl font-bold text-indigo-600 mb-8 text-center">
            Submit Your Property Inquiry
          </h3>
          <form
            onSubmit={handleSubmit}
            className="space-y-8 bg-white p-8 md:p-12 rounded-xl shadow-lg border border-gray-100 max-w-2xl mx-auto"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Your Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg outline-none transition duration-200"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Your Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg outline-none transition duration-200"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Subject:
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg outline-none transition duration-200"
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Category:
              </label>
              {/* Using shadcn Select component for consistency */}
              <Select
                value={formData.category}
                onValueChange={(value) => handleChange({ target: { name: "category", value } })}
                disabled={isSubmitting}
              >
                <SelectTrigger className="h-auto py-3 px-5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg bg-white text-gray-900">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="rounded-lg shadow-lg border border-gray-100">
                  <SelectItem value="property_listing" className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Property Listing Inquiry</SelectItem>
                  <SelectItem value="viewing_request" className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Property Viewing Request</SelectItem>
                  <SelectItem value="offer_submission" className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Offer & Negotiation Support</SelectItem>
                  <SelectItem value="agent_support" className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Agent/Broker Support</SelectItem>
                  <SelectItem value="loan_mortgage" className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Loan & Mortgage Inquiry</SelectItem>
                  <SelectItem value="technical_issue" className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Technical Issue (Website)</SelectItem>
                  <SelectItem value="general_feedback" className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">General Feedback</SelectItem>
                  <SelectItem value="other" className="text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Your Message:
              </label>
              <textarea
                id="message"
                name="message"
                rows="7"
                value={formData.message}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg outline-none transition duration-200"
                disabled={isSubmitting}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-4 px-8 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out text-xl font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Submit Inquiry
                </>
              )}
            </button>
          </form>
        </section>

        <hr className="my-20 border-indigo-200 border-dashed rounded-full" />

        {/* Other Ways to Connect */}
        <section className="mb-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 border-b-4 border-orange-500 pb-3 inline-block leading-tight">
            Other Ways to <span className="text-indigo-600">Connect</span>
          </h2>
          <div className="space-y-6 text-lg text-gray-700 max-w-7xl mx-auto mt-8">
            <p className="flex flex-col md:flex-row items-center justify-center text-xl">
              <Mail
                className="mr-3 text-indigo-600 w-7 h-7 flex-shrink-0"
                strokeWidth={1.5}
              />
              <span className="font-semibold mr-2">Email:</span> You can also
              directly email our property support at{" "}
              <a
                href="mailto:support@propedgesolutions.com" // Updated placeholder email
                className="text-indigo-600 hover:underline ml-1 md:ml-2"
              >
                support@propedgesolutions.com
              </a>
            </p>
            <p className=" flex flex-col md:flex-row items-center justify-center text-xl">
              <Phone
                className="mr-3 text-indigo-600 w-7 h-7 flex-shrink-0"
                strokeWidth={1.5}
              />
              <span className="font-semibold mr-2">Phone:</span> For urgent property
              matters, call us at{" "}
              <span className="text-indigo-600 ml-1 md:ml-2 font-bold">
                +91 83190 39381
              </span>{" "}
              (Available Monday-Friday, 9 AM - 7 PM IST)
            </p>
          </div>
        </section>

        <p className="text-center text-xl text-gray-700 mt-20 mb-4">
          We appreciate your patience and look forward to helping you with your{" "}
          <strong className="text-indigo-700">property journey!</strong>
        </p>
      </main>
    </div>
  );
};

export default CustomerSupport;