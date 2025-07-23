import React, { useState } from "react";
import { Mail, Phone } from "lucide-react";
import { createCustomerSupportAPI } from "../service/operations/customerSupport";
const CustomerSupport = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  });

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
    const respose = await createCustomerSupportAPI(formData);
    if (respose?.success) {
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "",
        message: "",
      });
    }
  };

  return (
    <div className="min-h-screen font-inter antialiased text-gray-800">
      {/* Main Content Section */}
      <main className="container mx-auto my-8 p-4 md:p-12  rounded-3xl">
        <section className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-6 leading-tight">
            Welcome to Our Dedicated <br className="hidden md:inline" />
            Property Support Center!
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 max-w-3xl mx-auto">
            Whether you're looking to{" "}
            <strong className="text-blue-700">buy</strong>,{" "}
            <strong className="text-blue-700">sell</strong>, or{" "}
            <strong className="text-blue-700">rent</strong> a property, we're
            here to assist you every step of the way. Our dedicated team is
            ready to answer your questions and provide the expert support you
            need.
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 mt-5 max-w-3xl mx-auto">
            Before reaching out, please check our{" "}
            <strong className="text-blue-700">
              Frequently Asked Questions (FAQs)
            </strong>{" "}
            section below. You might find an instant answer to your
            property-related query!
          </p>
        </section>

        <hr className="my-16 border-blue-200 border-dashed rounded-full" />

        {/* FAQs Section */}
        <section className="mb-20">
          <h2 className="text-4xl font-extrabold text-blue-700 mb-10 rounded-md text-center">
            Frequently Asked Questions (FAQs)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* FAQ Card 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 transform transition duration-300 hover:scale-[1.01] hover:shadow-xl group">
              <h3 className="text-2xl font-semibold text-blue-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                Q: How do I list my property on your website?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                A: To list your property, navigate to the "
                <a
                  href="#"
                  className="text-blue-600 hover:underline font-medium"
                >
                  List Property
                </a>
                " section. You'll need to create an account (if you don't have
                one) and then follow the guided steps to upload comprehensive
                details and high-quality photos.
              </p>
            </div>
            {/* FAQ Card 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 transform transition duration-300 hover:scale-[1.01] hover:shadow-xl group">
              <h3 className="text-2xl font-semibold text-blue-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                Q: How can I schedule a property viewing?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                A: On any property's detail page, you'll find a prominent
                "Schedule a Viewing" button. Click it to choose an available
                time slot or contact the listing agent directly via their
                provided contact details.
              </p>
            </div>
            {/* FAQ Card 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 transform transition duration-300 hover:scale-[1.01] hover:shadow-xl group">
              <h3 className="text-2xl font-semibold text-blue-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                Q: What is the process for making an offer on a property?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                A: Once you've viewed a property you're interested in, you can
                submit an offer directly through your account dashboard. Our
                dedicated team can also guide you through the entire negotiation
                process, ensuring a smooth transaction.
              </p>
            </div>
            {/* FAQ Card 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-blue-100 transform transition duration-300 hover:scale-[1.01] hover:shadow-xl group">
              <h3 className="text-2xl font-semibold text-blue-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                Q: Are there any fees for listing my property?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                A: Our basic listing service is free of charge, but we offer
                various premium packages with enhanced visibility and features
                designed to sell your property faster. Please refer to our{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Pricing Page
                </a>{" "}
                for full details on commission rates and additional fees.
              </p>
            </div>
          </div>
        </section>

        <hr className="my-16 border-blue-200 border-dashed rounded-full" />

        {/* Contact Us Section with Form */}
        <section className="mb-20">
          <h2 className="text-4xl font-extrabold text-blue-700 mb-10 rounded-md text-center">
            Contact Our Property Experts
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 mb-12 max-w-3xl mx-auto text-center">
            If you couldn't find an answer in our comprehensive FAQs, please
            don't hesitate to reach out. Fill out the form below, and our
            property support team will get back to you as soon as possible,
            typically within 24-48 business hours.
          </p>

          <h3 className="text-3xl font-bold text-blue-600 mb-8 text-center">
            Submit Your Property Inquiry
          </h3>
          <form
            onSubmit={handleSubmit}
            className="space-y-8 bg-blue-50 p-8 md:p-12 rounded-3xl shadow-xl border border-blue-200 max-w-2xl mx-auto"
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
                className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg outline-none transition duration-200"
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
                className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg outline-none transition duration-200"
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
                className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg outline-none transition duration-200"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-lg font-medium text-gray-700 mb-2"
              >
                Category:
              </label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg bg-white appearance-none pr-10 outline-none transition duration-200 cursor-pointer"
                >
                  <option value="property_listing">
                    Property Listing Inquiry
                  </option>
                  <option value="viewing_request">
                    Property Viewing Request
                  </option>
                  <option value="offer_submission">
                    Offer & Negotiation Support
                  </option>
                  <option value="agent_support">Agent/Broker Support</option>
                  <option value="loan_mortgage">Loan & Mortgage Inquiry</option>
                  <option value="technical_issue">
                    Technical Issue (Website)
                  </option>
                  <option value="general_feedback">General Feedback</option>
                  <option value="other">Other</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.096 6.924 4.682 8.338z" />
                  </svg>
                </div>
              </div>
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
                className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-lg outline-none transition duration-200"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 px-8 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out text-xl font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Submit Inquiry
            </button>
          </form>
        </section>

        <hr className="my-16 border-blue-200 border-dashed rounded-full" />

        {/* Other Ways to Connect */}
        <section className="mb-8 text-center">
          <h2 className="text-4xl font-extrabold text-blue-700 mb-10 rounded-md">
            Other Ways to Connect
          </h2>
          <div className="space-y-6 text-lg text-gray-700 max-w-7xl mx-auto">
            <p className="flex flex-col md:flex-row items-center justify-center text-xl">
              <Mail
                className="mr-3 text-blue-600"
                size={24}
                strokeWidth={1.5}
              />
              <span className="font-semibold">Email:</span> You can also
              directly email our property support at{" "}
              <a
                href="mailto:support@yourpropertywebsite.com"
                className="text-blue-600 hover:underline ml-2"
              >
                support@yourpropertywebsite.com
              </a>
            </p>
            <p className=" flex flex-col md:flex-row items-center justify-center text-xl">
              <Phone
                className="mr-3 text-blue-600"
                size={24}
                strokeWidth={1.5}
              />
              <span className="font-semibold">Phone:</span> For urgent property
              matters, call us at{" "}
              <span className="text-blue-600 ml-2">
                [Your Property Phone Number]
              </span>{" "}
              (Available Monday-Friday, 9 AM - 5 PM IST)
            </p>
          </div>
        </section>

        <p className="text-center text-xl text-gray-700 mt-20 mb-4">
          We appreciate your patience and look forward to helping you with your{" "}
          <strong className="text-blue-700">property journey!</strong>
        </p>
      </main>
    </div>
  );
};

export default CustomerSupport;
