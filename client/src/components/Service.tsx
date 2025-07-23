import { Home, Search, Building, Handshake, Check } from "lucide-react"; // Using more relevant icons

export default function Service() {
  const services = [
    {
      title: "Buy Your Dream Property",
      icon: <Search className="w-8 h-8 text-white" />,
      description:
        "Navigate the market with confidence. We specialize in finding prime residential, commercial, and land properties that perfectly match your investment goals and lifestyle. Our experts guide you from search to seamless acquisition, ensuring the best value and a smooth process.",
    },
    {
      title: "Sell Your Property for Top Value",
      icon: <Home className="w-8 h-8 text-white" />, // Home icon for selling too, as it's about your property
      description:
        "Unlock the true potential of your property. Our strategic marketing and expert negotiation skills are designed to attract qualified buyers and secure the highest possible market price. We handle all complexities, ensuring a swift and profitable sale with minimal stress.",
    },
    {
      title: "Rent & Lease Solutions",
      icon: <Building className="w-8 h-8 text-white" />,
      description:
        "Whether you're looking for an ideal rental home or seeking to lease out your commercial space, we provide comprehensive solutions. Our extensive listings and tenant/client matching services ensure you find or fill properties efficiently, with full legal and management support.",
    },
  ];

  const values = [
    "Integrity",
    "Client-Centric",
    "Expertise",
    "Transparency",
    "Innovation",
    "Excellence",
  ];

  return (
    <section className="py-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-500 relative overflow-hidden">
      {/* Subtle Background Elements (more subdued) */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-blue-200/5 rounded-full mix-blend-multiply filter blur-2xl animate-blob-slow opacity-70 dark:opacity-20"></div>
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-indigo-200/5 rounded-full mix-blend-multiply filter blur-2xl animate-blob-medium opacity-70 dark:opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
        {/* Header Section */}
        <div className="mb-20 md:mb-24 text-center">
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="p-4 bg-blue-600 rounded-full shadow-lg dark:bg-blue-500">
              <Home className="w-9 h-9 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Our Core <span className="text-blue-600 dark:text-blue-400">Services</span>
            </h1>
          </div>
          <p className="text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Specialized real estate solutions designed to meet your every need, from property acquisition to sales and leasing.
          </p>
          {/* Subtle separator */}
          <div className="w-20 h-1 bg-gray-300 dark:bg-gray-700 mx-auto mt-8 rounded-full"></div>
        </div>

        {/* Services Grid Section */}
        <div className="grid md:grid-cols-3 gap-10 mb-24">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 relative group"
            >
              <div className="relative z-10">
                <div className="mb-8 flex items-center gap-4">
                  <div className="p-3 bg-blue-600 rounded-full shadow-md dark:bg-blue-500 transition-transform duration-300 group-hover:scale-105">
                    {service.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                    {service.title}
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base text-justify">
                  {service.description}
                </p>
              
              </div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-10 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
              Our Guiding <span className="text-indigo-600 dark:text-indigo-400">Values</span>
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Our principles shape every interaction, ensuring a foundation of trust and professional excellence in all we do.
            </p>
            {/* Subtle separator */}
            <div className="w-20 h-1 bg-gray-300 dark:bg-gray-700 mx-auto mt-8 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-5 rounded-xl bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 border border-gray-200 dark:border-gray-600 group"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center shadow-md dark:bg-indigo-500 transition-transform duration-200 group-hover:scale-105">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold text-gray-800 dark:text-gray-100 tracking-wide block mb-1">
                    {value}
                  </span>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {value === "Integrity" && "Operating with unwavering honesty and strong moral principles in every deal."}
                    {value === "Client-Centric" && "Placing your needs at the forefront, ensuring tailored solutions and satisfaction."}
                    {value === "Expertise" && "Leveraging deep market knowledge and skilled professionals for superior outcomes."}
                    {value === "Transparency" && "Maintaining open communication and clear processes throughout your journey."}
                    {value === "Innovation" && "Adopting cutting-edge strategies and technology to enhance your real estate experience."}
                    {value === "Excellence" && "Committing to the highest standards of quality and service in all operations."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}