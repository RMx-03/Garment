import React, { useState, useEffect, memo, useCallback } from 'react';
import Slider from 'react-slick';
import { testimonials } from '../../data/testimonials';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const StarRating = memo(({ rating }) => {
  return (
    <div className="flex gap-1.5 mb-4">
      {[...Array(rating)].map((_, index) => (
        <span key={index} className="text-yellow-400 text-lg">★</span>
      ))}
    </div>
  );
});

StarRating.displayName = 'StarRating';

const TestimonialCard = memo(({ testimonial }) => {
  return (
    <div className="bg-white p-6 md:p-8 shadow-lg mx-2 my-4 flex flex-col h-full">
      <div className="flex-grow">
        <div className="text-[#FF6B6B] text-4xl md:text-5xl font-serif mb-4">"</div>
        <p className="text-gray-600 mb-6 text-base md:text-lg leading-relaxed font-['Inter'] min-h-[80px]">
          {testimonial.text}
        </p>
        <StarRating rating={testimonial.rating} />
      </div>
      <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
        <img 
          src={testimonial.image} 
          alt={testimonial.name} 
          className="w-12 h-12 md:w-14 md:h-14 rounded-full mr-4 object-cover"
        />
        <div>
          <h3 className="font-['Inter'] font-semibold text-gray-800 text-base md:text-lg">
            {testimonial.name}
          </h3>
          <p className="text-gray-500 font-['Inter'] text-xs md:text-sm">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
});

TestimonialCard.displayName = 'TestimonialCard';

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: true,
  className: "testimonial-swiper",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '20px'
      }
    }
  ]
};

const MobileTestimonials = memo(({ testimonials }) => (
  <Slider {...sliderSettings}>
    {testimonials.map((testimonial) => (
      <div key={testimonial.id} className="outline-none">
        <TestimonialCard testimonial={testimonial} />
      </div>
    ))}
  </Slider>
));

MobileTestimonials.displayName = 'MobileTestimonials';

const DesktopTestimonials = memo(({ testimonials }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {testimonials.map((testimonial) => (
      <TestimonialCard key={testimonial.id} testimonial={testimonial} />
    ))}
  </div>
));

DesktopTestimonials.displayName = 'DesktopTestimonials';

const TestimonialSection = memo(() => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <div className="bg-gray-50 bg-grainy-light py-16 md:py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative flex flex-col md:flex-row items-center md:items-start justify-between gap-6 text-left mb-12 md:mb-16 md:px-12">
          <h1 className="londrina-outline-regular pl-4 md:pl-12 absolute top-6 md:top-12 left-22 md:left-0 text-6xl md:text-[8rem] lg:text-[10rem] font-extrabold text-[#FF6B6B]  pointer-events-none select-none z-0">
            Testimonials
          </h1>
          {/* heading section */}
          <div className="flex flex-col items-center md:items-start ">
            <div className="flex items-center gap-2">
              <span className="hidden md:block h-20 border-l-2 border-[#FF6B6B]"></span>
              <h2 className="font-['Playfair_Display'] font-extrabold text-3xl md:text-5xl text-gray-900">
                Our Customer
              </h2>
              <span className="text-[#FF6B6B] text-2xl md:text-3xl">✦</span>
            </div>
          </div>
          <div className="max-w-sm">
            <p className="outfit-regular text-center text-gray-500 text-base pt-8 md:text-lg font-['Inter'] max-w-2xl mx-auto">
              Our brand is very trusted, you can see from some of the reviews of our customers.
            </p>
          </div>
        </div>
        
        <div className="relative lg:pt-12 px-0 md:px-4">
          {isMobile ? (
            <MobileTestimonials testimonials={testimonials} />
          ) : (
            <DesktopTestimonials testimonials={testimonials} />
          )}
        </div>
      </div>
    </div>
  );
});

TestimonialSection.displayName = 'TestimonialSection';

export default TestimonialSection;