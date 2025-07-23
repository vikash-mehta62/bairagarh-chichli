import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Home, TrendingUp, Sparkle, Handshake, Lightbulb, MapPin, Scale, HeartHandshake } from "lucide-react";

const About = () => {
  const achievements = [
    {
      icon: Award,
      title: "25+ Years Experience",
      description: "Trusted expertise in the real estate market",
    },
    {
      icon: Users,
      title: "5,000+ Happy Clients",
      description: "Successfully served thousands of families",
    },
    {
      icon: Home,
      title: "10,00,000+ Sq. Ft. Sold",
      description: "Extensive portfolio of successful transactions",
    },
    {
      icon: TrendingUp,
      title: "Market Leaders",
      description: "Leading real estate company in Bhopal", // Location specific
    },
  ];

  const whyChooseUsPoints = [
    {
      icon: MapPin,
      title: "Local Market Mastery",
      description: "Deep understanding of Bhopal's unique real estate landscape.",
    },
    {
      icon: Handshake,
      title: "Transparent Dealings",
      description: "Committed to honesty and clarity in every transaction.",
    },
    {
      icon: Lightbulb,
      title: "Innovative Solutions",
      description: "Leveraging technology for smarter property decisions.",
    },
    {
      icon: Scale,
      title: "Ethical Practices",
      description: "Upholding the highest standards of integrity and fairness.",
    },
    {
      icon: HeartHandshake,
      title: "Client-First Approach",
      description: "Your satisfaction is our ultimate priority, always.",
    },
    {
      icon: Sparkle,
      title: "Proven Track Record",
      description: "Decades of success stories and happy clients.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      {/* Hero Section */}
      <section className="relative py-28 md:py-36 bg-gradient-to-br from-indigo-100 to-indigo-300 text-indigo-900 overflow-hidden shadow-md">
        {/* Subtle background pattern (lighter for visibility) */}
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.08\' fill-rule=\'evenodd\'%3E%3Cpath d=\'M5 0h1L0 6V5zM6 5v1H5z\'/%3E%3C/g%3E%3C/svg%3E")'}}></div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-sm leading-tight animate-fade-in-up">
            Your Trusted Partner in Real Estate: <br /><span className="text-orange-700">Company Name</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto opacity-90 leading-relaxed animate-fade-in delay-200">
            For over 25 years, we've been building trust and creating homes in Bhopal, Madhya Pradesh.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="lg:order-1 text-gray-700">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 border-b-4 border-orange-500 pb-3 inline-block leading-tight">
                Our Foundation Story
              </h2>
              <p className="text-lg leading-relaxed mb-6">
                **Company Name Infra** was founded with a singular vision: to make real estate accessible, transparent, and genuinely trustworthy for everyone across **Madhya Pradesh**. What began as a small, passionate family endeavor over two decades ago has blossomed into one of the most respected and innovative names in the region's real estate industry.
              </p>
              <p className="text-lg leading-relaxed">
                Our unwavering **commitment to excellence**, ethical practices, and paramount customer satisfaction has allowed us to earn the deep trust of over **5,000 delighted clients**. We've proudly facilitated the sale of more than **10,00,000 square feet** of prime real estate, transforming aspirations into realities. We are not just about properties; we are about building lasting communities and futures.
              </p>
            </div>
            <div className="lg:order-2">
              <img
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1400&q=80"
                alt="Modern Office Interior"
                className="rounded-2xl shadow-2xl w-full h-80 md:h-96 object-cover transform hover:scale-102 transition-transform duration-500 ease-in-out border border-gray-200"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Achievements - Data-driven and visually distinct */}
      <section className="py-20 md:py-32 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-orange-600">Impactful</span> Milestones
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              These numbers reflect our unwavering dedication and significant success in empowering clients and shaping the real estate landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 text-center flex flex-col items-center justify-center transform hover:-translate-y-3 hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <CardContent className="p-0"> {/* Remove default padding */}
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md transition-all duration-300 group-hover:from-indigo-600 group-hover:to-indigo-800">
                    <achievement.icon className="w-9 h-9 text-white transform group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-gray-900 mb-2 leading-tight">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 text-base leading-relaxed">{achievement.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision - Dynamic Two-Column Layout */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white p-8 rounded-2xl shadow-xl transform hover:scale-[1.01] transition-transform duration-300 flex flex-col h-full">
              <h3 className="text-3xl font-bold mb-5 border-b-2 border-orange-400 pb-3 inline-block">
                Our Mission
              </h3>
              <p className="text-lg leading-relaxed opacity-95 flex-grow">
                To provide **exceptional real estate services** that consistently exceed our clients' expectations, while maintaining the highest standards of **integrity, professionalism, and unwavering customer care**. We are deeply committed to making the complex process of buying, selling, or renting property as **smooth, transparent, and enjoyable** as possible for every single individual we serve.
              </p>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500 to-orange-700 text-white p-8 rounded-2xl shadow-xl transform hover:scale-[1.01] transition-transform duration-300 flex flex-col h-full">
              <h3 className="text-3xl font-bold mb-5 border-b-2 border-indigo-200 pb-3 inline-block">
                Our Vision
              </h3>
              <p className="text-lg leading-relaxed opacity-95 flex-grow">
                To emerge as the **most trusted and preferred real estate partner** across Madhya Pradesh, widely recognized for our **innovative solutions, ethical practices, and steadfast commitment** to creating enduring value for our clients, partners, and the community at large. We aim to continually **redefine industry standards** and positively shape the future of real estate.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Detailed Grid Layout */}
      <section className="py-20 md:py-32 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why <span className="text-indigo-600">Choose</span> Company Name?
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              We combine unparalleled experience, profound expertise, and unwavering dedication to ensure your property journey is seamless and successful.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {whyChooseUsPoints.map((point, index) => {
              const Icon = point.icon;
              const isOrangeIcon = index === 1 || index === 3 || index === 5; // Alternate icon color for visual balance
              return (
                <div
                  key={index}
                  className="text-center bg-white p-8 rounded-xl shadow-lg transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 flex flex-col items-center"
                >
                  <div className={`w-24 h-24 ${isOrangeIcon ? 'bg-gradient-to-br from-orange-500 to-orange-700' : 'bg-gradient-to-br from-indigo-500 to-indigo-700'} rounded-full flex items-center justify-center mx-auto mb-6 shadow-md border-4 border-white transition-all duration-300`}>
                    <Icon className="w-12 h-12 text-white transform group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    {point.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-base">
                    {point.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;