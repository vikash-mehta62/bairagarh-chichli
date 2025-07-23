import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Review() {
  const testimonials = [
    {
      id: 1,
      text: "Finding my dream home was so easy with this real estate company. The process was smooth and transparent.",
      author: "Rahul Sharma",
    },
    {
      id: 2,
      text: "I got the perfect flat in a great location. The team was super helpful throughout the buying process.",
      author: "Preeti Agarwal",
    },
    {
      id: 3,
      text: "Very professional and trustworthy service. They kept me informed and guided me well at every step.",
      author: "Ajay Mehta",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(1);
  const maxIndex = testimonials.length - 1;
  const testimonialRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex(currentIndex === maxIndex ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? maxIndex : currentIndex - 1);
  };

  // Get previous and next indices with wrap-around
  const getPrevIndex = (index) => (index === 0 ? maxIndex : index - 1);
  const getNextIndex = (index) => (index === maxIndex ? 0 : index + 1);

  return (
    <div className="w-full bg-gray-50 py-16 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#2d4b6b]">
          See What Our Clients Are Saying
        </h1>

        <div className="relative">
          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#e6f3f7] -z-10"></div>

          <div
            className="relative flex justify-center items-center"
            ref={testimonialRef}
          >
            {/* Previous testimonial (partially visible) */}
            <div className="absolute left-0 md:left-10 top-1/2 -translate-y-1/2 w-[300px] max-w-[30%] bg-white p-6 rounded-lg shadow-md opacity-50 hidden md:block">
              <div className="text-[#2d4b6b] opacity-50">
                <span className="text-4xl text-[#7fbfd3]">&ldquo;</span>
                <p className="line-clamp-4 text-sm">
                  {testimonials[getPrevIndex(currentIndex)].text}
                </p>
              </div>
              <div className="mt-4 flex items-center">
                <div className="text-sm font-medium">
                  {testimonials[getPrevIndex(currentIndex)].author}
                </div>
              </div>
            </div>

            {/* Current testimonial */}
            <div className="bg-white p-8 rounded-lg shadow-md max-w-xl z-10">
              <div className="text-[#2d4b6b]">
                <span className="text-5xl text-[#7fbfd3]">&ldquo;</span>
                <p className="text-lg">{testimonials[currentIndex].text}</p>
              </div>
              <div className="mt-6 flex items-center">
                <div className="w-6 h-6 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                    <path fill="none" d="M0 0h48v48H0z" />
                  </svg>
                </div>
                <div className="text-sm font-medium text-gray-700">
                  {testimonials[currentIndex].author}
                </div>
              </div>
            </div>

            {/* Next testimonial (partially visible) */}
            <div className="absolute right-0 md:right-10 top-1/2 -translate-y-1/2 w-[300px] max-w-[30%] bg-white p-6 rounded-lg shadow-md opacity-50 hidden md:block">
              <div className="text-[#2d4b6b] opacity-50">
                <span className="text-4xl text-[#7fbfd3]">&ldquo;</span>
                <p className="line-clamp-4 text-sm">
                  {testimonials[getNextIndex(currentIndex)].text}
                </p>
              </div>
              <div className="mt-4 flex items-center">
                <div className="text-sm font-medium">
                  {testimonials[getNextIndex(currentIndex)].author}
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={prevSlide}
              className="absolute cursor-pointer left-2 md:-left-4 top-1/2 -translate-y-1/2 bg-[#2d4b6b] text-white rounded-full p-2 shadow-md z-20 hover:bg-[#1d3a5a] transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute cursor-pointer right-2 md:-right-4 top-1/2 -translate-y-1/2 bg-[#2d4b6b] text-white rounded-full p-2 shadow-md z-20 hover:bg-[#1d3a5a] transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
