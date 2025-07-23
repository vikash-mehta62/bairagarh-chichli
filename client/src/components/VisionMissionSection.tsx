import { Lightbulb, Target, TrendingUp, Users, Shield, Zap, Goal, Gem, Award, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function VisionMissionSection() {
  return (
    <section className="relative w-full  py-10 overflow-hidden bg-white dark:bg-gray-950">
      {/* Dynamic Background with Abstract Shapes and Gradients */}
      <div className="absolute inset-0 z-0 opacity-80 dark:opacity-60">
        <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob-slow transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob-fast transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-pink-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob-medium transform -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-yellow-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob-slow transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Content Container */}
      <div className="relative container px-4 md:px-6 z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20 md:mb-24 lg:mb-32">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-full px-6 py-2 mb-6 shadow-lg animate-fade-in-down">
            <Award className="w-5 h-5" />
            <span className="text-base font-semibold tracking-wide">Our Guiding Principles</span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(to_right,var(--tw-gradient-stops))] from-gray-900 via-gray-700 to-gray-500 dark:from-white dark:via-gray-200 dark:to-gray-400 leading-tight mb-6 animate-fade-in-up">
            Shaping the Future of <span className="text-blue-600 dark:text-blue-400">Real Estate</span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-gray-700 dark:text-gray-300 leading-relaxed animate-fade-in-up delay-200">
            Discover the core beliefs and ambitious objectives that drive our commitment to excellence, innovation, and unwavering client success in every property journey.
          </p>
        </div>

        {/* Feature Grid: Mission & Vision Side-by-Side (or stacked on smaller screens) */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Mission Card - Left Aligned, Focus on Data */}
          <Card className="group relative overflow-hidden rounded-3xl border border-blue-300/60 dark:border-blue-700/40 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-xl hover:shadow-blue-400/30 dark:hover:shadow-blue-700/40 transition-all duration-700 transform hover:-translate-y-3">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <CardContent className="relative p-10 flex flex-col h-full text-left">
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-500 border-4 border-white dark:border-gray-800">
                    <Target className="w-12 h-12 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2 leading-tight">
                    Our Mission
                  </h3>
                  <p className="text-blue-700 dark:text-blue-400 font-semibold text-xl">
                    Empowering Informed Decisions
                  </p>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed flex-grow mb-8">
                We are on a mission to revolutionize real estate by providing unparalleled, data-driven insights and a seamless, transparent platform. Our goal is to empower every client with the knowledge and tools needed to make confident, successful property decisions, ensuring a smooth and rewarding experience from start to finish.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                {[
                  { icon: <TrendingUp className="w-4 h-4 text-blue-500" />, text: "Market Trend Analysis" },
                  { icon: <Shield className="w-4 h-4 text-purple-500" />, text: "Secure Transactions" },
                  { icon: <Users className="w-4 h-4 text-cyan-500" />, text: "Client-Centric Solutions" },
                  { icon: <Lightbulb className="w-4 h-4 text-orange-500" />, text: "Actionable Insights" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-base text-gray-700 dark:text-gray-300 font-medium">
                    {item.icon} {item.text}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Vision Card - Right Aligned, Focus on Innovation */}
          <Card className="group relative overflow-hidden rounded-3xl border border-purple-300/60 dark:border-purple-700/40 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-xl hover:shadow-purple-400/30 dark:hover:shadow-purple-700/40 transition-all duration-700 transform hover:-translate-y-3">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <CardContent className="relative p-10 flex flex-col h-full text-left">
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-500 border-4 border-white dark:border-gray-800">
                    <Goal className="w-12 h-12 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2 leading-tight">
                    Our Vision
                  </h3>
                  <p className="text-purple-700 dark:text-purple-400 font-semibold text-xl">
                    Pioneering Tomorrow's Real Estate
                  </p>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed flex-grow mb-8">
                Our vision is to be the global leader in real estate innovation, constantly pushing boundaries to create smarter, more sustainable, and interconnected property ecosystems. We envision a future where technology seamlessly enhances every aspect of property ownership, investment, and living, making it accessible and beneficial for all.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                {[
                  { icon: <Zap className="w-4 h-4 text-purple-500" />, text: "Cutting-Edge Technology" },
                  { icon: <Lightbulb className="w-4 h-4 text-pink-500" />, text: "Sustainable Practices" },
                  { icon: <MapPin className="w-4 h-4 text-red-500" />, text: "Global Market Reach" }, // Assuming MapPin is available
                  { icon: <Gem className="w-4 h-4 text-green-500" />, text: "Value-Driven Solutions" }, // Assuming Gem is available
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-base text-gray-700 dark:text-gray-300 font-medium">
                    {item.icon} {item.text}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dynamic Values Section - Separated and Enhanced */}
        <div className="mt-28 md:mt-36 lg:mt-48 text-center relative">
          <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-16 relative">
            The Values That <span className="text-green-600 dark:text-green-400">Define Us</span>
            <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-24 h-2 bg-gradient-to-r from-green-400 to-teal-500 rounded-full"></div>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <div className="flex flex-col items-center p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-green-300/40 dark:hover:shadow-green-700/40 transition-all duration-500 transform hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Client Focus</h4>
              <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                Prioritizing needs and building lasting relationships.
              </p>
            </div>

            <div className="flex flex-col items-center p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-purple-300/40 dark:hover:shadow-purple-700/40 transition-all duration-500 transform hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Integrity & Trust</h4>
              <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                Upholding the highest ethical standards in every interaction.
              </p>
            </div>

            <div className="flex flex-col items-center p-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-pink-300/40 dark:hover:shadow-red-700/40 transition-all duration-500 transform hover:-translate-y-2 group">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-red-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Lightbulb className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Innovation Driven</h4>
              <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                Continuously seeking new ways to add value and improve experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}