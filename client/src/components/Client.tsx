import React from 'react';
import { Handshake, Star } from 'lucide-react'; // Importing relevant icons

const Client = () => {
  return (
    <section 
      className="py-10 relative overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: 'rgb(255, 255, 255)', // Light mode default

      }}
    >
      {/* Background patterns/gradients for subtle depth */}
      <div 
        className="absolute inset-0 opacity-50 dark:opacity-30"
        style={{
          // Radial gradient from center
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, transparent 70%)',
          // Dark mode specific background, typically managed by 'dark:' variants
          // For inline, you'd need more complex JS logic or a global CSS dark mode class.
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div 
            className="inline-flex items-center gap-3 rounded-full px-6 py-2 mb-6 shadow-lg"
            style={{
              background: 'linear-gradient(to right, hsl(224, 71%, 40%) 0%, hsl(271, 76%, 53%) 100%)', // Blue to Purple
              color: 'white',
              animation: 'fade-in-down 0.6s ease-out forwards',
              // Keyframe for fade-in-down
              animationName: 'fade-in-down',
              animationDuration: '0.6s',
              animationTimingFunction: 'ease-out',
              animationFillMode: 'forwards',
            }}
          >
            <Handshake className="w-5 h-5" />
            <span className="text-base font-semibold tracking-wide">Our Valued Partners</span>
          </div>
          <h2 
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
            style={{
              color: 'rgb(17, 24, 39)', // text-gray-900
              animation: 'fade-in-up 0.6s ease-out forwards',
              animationName: 'fade-in-up',
              animationDuration: '0.6s',
              animationTimingFunction: 'ease-out',
              animationFillMode: 'forwards',
            }}
          >
            Powering Success Through 
            <span 
              style={{ color: 'hsl(40, 95%, 55%)' }} // accent-gold
            >
              Collaboration
            </span>
          </h2>
          <p 
            className="max-w-3xl mx-auto text-xl leading-relaxed"
            style={{
              color: 'rgb(75, 85, 99)', // text-gray-700
              animation: 'fade-in-up 0.6s ease-out 0.2s forwards',
              animationName: 'fade-in-up',
              animationDuration: '0.6s',
              animationTimingFunction: 'ease-out',
              animationDelay: '0.2s',
              animationFillMode: 'forwards',
            }}
          >
            We are proud to collaborate with leading brands and organizations,
            building strong partnerships that drive mutual growth and innovation.
          </p>
          {/* Decorative separator, refined */}
          <div 
            className="flex items-center justify-center my-8"
            style={{
              animation: 'fade-in-up 0.6s ease-out 0.3s forwards',
              animationName: 'fade-in-up',
              animationDuration: '0.6s',
              animationTimingFunction: 'ease-out',
              animationDelay: '0.3s',
              animationFillMode: 'forwards',
            }}
          >
            <div 
              className="h-0.5 w-16 rounded-full"
              style={{ background: 'linear-gradient(to right, transparent, hsl(200, 60%, 70%), hsl(270, 60%, 70%))' }} // Fading blue to purple
            ></div>
            <div 
              className="h-2 w-2 rounded-full mx-2 shadow-md"
              style={{ background: 'linear-gradient(to right, hsl(220, 70%, 55%), hsl(270, 70%, 55%))' }} // Solid blue to purple
            ></div>
            <div 
              className="h-0.5 w-16 rounded-full"
              style={{ background: 'linear-gradient(to left, transparent, hsl(200, 60%, 70%), hsl(270, 60%, 70%))' }} // Fading blue to purple
            ></div>
          </div>
        </div>

        {/* Client Logos Scroll Container */}
        <div className="overflow-hidden relative py-8">
         
          <style>
            {`
            @keyframes scroll-logos-ltr {
              0% { transform: translateX(-50%); } /* Start halfway through the duplicated content */
              100% { transform: translateX(0%); }  /* End at the beginning of the duplicated content */
            }

            @keyframes fade-in-down {
              0% { opacity: 0; transform: translateY(-20px); }
              100% { opacity: 1; transform: translateY(0); }
            }

            @keyframes fade-in-up {
              0% { opacity: 0; transform: translateY(20px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            `}
          </style>

          <div 
            className="flex"
            style={{
              animation: 'scroll-logos-ltr 40s linear infinite', // Left-to-right scroll
              // Using a very wide div for the content to ensure continuous flow
              width: '200%', // Twice the width to hold two sets of logos
            }}
          >
            {/* Repeat the logo set twice for continuous loop */}
            {Array.from({ length: 7 }).map((_, index) => (
              <img
                key={`logo-1-${index}`}
                src={`/c${index + 1}.png`} // Assuming c1.png, c2.png, etc.
                alt={`Client logo ${index + 1}`}
                className="h-16 lg:h-20 object-contain mx-8 opacity-70 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-pointer"
                style={{ minWidth: '100px', maxWidth: '180px' }}
              />
            ))}
            {Array.from({ length: 7 }).map((_, index) => (
              <img
                key={`logo-2-${index}`}
                src={`/c${index + 1}.png`}
                alt={`Client logo ${index + 1}`}
                className="h-16 lg:h-20 object-contain mx-8 opacity-70 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-pointer"
                style={{ minWidth: '100px', maxWidth: '180px' }}
              />
            ))}
          </div>
          {/* Fading overlay at the edges for a professional touch */}
          <div 
            className="absolute inset-y-0 left-0 w-24"
            style={{ background: 'linear-gradient(to right, rgb(255, 255, 255), transparent)' }} // from-white
          ></div>
          <div 
            className="absolute inset-y-0 right-0 w-24"
            style={{ background: 'linear-gradient(to left, rgb(255, 255, 255), transparent)' }} // from-white
          ></div>
          {/* Dark mode fades would need 'dark:' variant or JS */}
        </div>

        {/* Optional: Testimonial or call to action */}
        <div className="text-center mt-20">
          <p 
            className="text-lg md:text-xl max-w-2xl mx-auto italic mb-8"
            style={{ color: 'rgb(75, 85, 99)' }} // text-gray-700
          >
            "Working with us means gaining a partner dedicated to your success, leveraging cutting-edge strategies and a collaborative spirit."
          </p>
          <button
            className="inline-flex items-center px-8 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            style={{
              background: 'linear-gradient(to right, hsl(40, 95%, 55%), hsl(16, 100%, 50%))', // Gold to Orange
              color: 'white',
              fontWeight: 'bold',
              // Hover state
              '--tw-gradient-from': 'hsl(16, 100%, 50%)', // Orange
              '--tw-gradient-to': 'hsl(0, 100%, 50%)',     // Red
              // This is a common pattern for Tailwind hover gradients:
              // You apply the base gradient, then on hover, you redefine the
              // gradient stops using custom CSS properties or just use different classes.
              // For strict inline, we'd simulate by just changing background on hover with JS,
              // or using classes that you ensure are included.
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'linear-gradient(to right, hsl(16, 100%, 50%), hsl(0, 100%, 50%))'; // Orange to Red on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'linear-gradient(to right, hsl(40, 95%, 55%), hsl(16, 100%, 50%))'; // Gold to Orange on leave
            }}
          >
            <Star className="w-5 h-5 mr-2" /> Explore Success Stories
          </button>
        </div>
      </div>
    </section>
  );
};

export default Client;