import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react"; // Import useState

export default function VendorIntroForm() {
  const navigate = useNavigate();

  // State to manage selected types
  const [selectedUserType, setSelectedUserType] = useState(null); // 'Owner', 'Agent', 'Builder'
  const [selectedPurpose, setSelectedPurpose] = useState(null); // 'Sell', 'Rent/lease', 'List as PG'

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex flex-col max-w-7xl mx-auto md:flex-row items-center justify-center min-h-screen  px-4 md:px-20 py-10">
        {/* Left Text Section */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0 pr-0 md:pr-10">
          <h2 className="text-4xl font-extrabold text-gray-800 leading-tight">
            Post property Ad to sell or rent online for{" "}
            <span className="text-blue-700">Free!</span>
          </h2>
          <ul className="mt-8 space-y-4 text-gray-700 text-lg">
            <li className="flex items-center">
              <span className="text-green-500 mr-3 text-2xl">✔</span> Get Access
              to 4 Lakh + Buyers
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-3 text-2xl">✔</span> Sell
              Faster with Premium Service
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-3 text-2xl">✔</span> Get Expert
              Advice on Market Trends and Insights
            </li>
          </ul>
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 bg-white border border-blue-200 p-8 rounded-xl shadow-2xl">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            Let's get you started
          </h3>

          {/* You are: Section */}
          <div className="mb-6">
            <label className="block text-base font-semibold text-gray-700 mb-3">
              You are:
            </label>
            <div className="flex flex-wrap gap-3">
              {["Owner", "Agent", "Builder"].map((type) => (
                <button
                  key={type}
                  className={`
                  px-6 py-2 border rounded-full text-base font-medium
                  transition-all duration-300 ease-in-out
                  ${
                    selectedUserType === type
                      ? "bg-blue-600 text-white shadow-md border-blue-600"
                      : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:border-blue-300"
                  }
                `}
                  onClick={() => setSelectedUserType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* You are here to: Section */}
          <div className="mb-6">
            <label className="block text-base font-semibold text-gray-700 mb-3">
              You are here to:
            </label>
            <div className="flex flex-wrap gap-3">
              {["Sell", "Rent/lease", "List as PG"].map((type) => (
                <button
                  key={type}
                  className={`
                  px-6 py-2 border rounded-full text-base font-medium
                  transition-all duration-300 ease-in-out
                  ${
                    selectedPurpose === type
                      ? "bg-blue-600 text-white shadow-md border-blue-600"
                      : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:border-blue-300"
                  }
                `}
                  onClick={() => setSelectedPurpose(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Contact Number Section */}
          <div className="mb-6">
            <label className="block text-base font-semibold text-gray-700 mb-3">
              Your contact number
            </label>
            <div className="flex gap-3">
              <select className="border border-gray-300 p-2.5 rounded-md text-base w-1/3 focus:ring-blue-500 focus:border-blue-500">
                <option>IND +91</option>
                {/* Add more country codes if needed */}
              </select>
              <input
                type="text"
                placeholder="WhatsApp Number"
                className="border border-gray-300 p-2.5 rounded-md flex-1 text-base focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* WhatsApp Info Banner */}
          <div className="bg-yellow-50 border border-yellow-300 p-3 rounded-lg text-sm flex items-center gap-3 text-yellow-800 mb-6 shadow-sm">
            <FaWhatsapp className="text-green-600 text-xl" />
            <span>
              Enter your WhatsApp No. to get enquiries from Buyer/Tenant
            </span>
          </div>

          {/* Start Now Button */}
          <button
            onClick={() => navigate("/vendor/register")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full text-xl font-bold transition-transform transform hover:scale-105 shadow-lg"
          >
            Start Now
          </button>
        </div>
      </div>
    </div>
  );
}
