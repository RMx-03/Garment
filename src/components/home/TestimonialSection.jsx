import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { testimonials } from '../../data/testimonials';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-1.5 mb-4">
      {[...Array(rating)].map((_, index) => (
        <span key={index} className="text-yellow-400 text-lg">★</span>
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial }) => {
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
};

const Testimonials = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  return (
    <div className="bg-gray-50 py-16 md:py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 text-left mb-12 md:mb-16 px-4 md:px-12">
          {/* heading section */}
          <div className="flex flex-col md:items-start items-center">
            <div className="flex items-center gap-2">
              <span class="h-20 border-l-2 border-[#FF6B6B]"></span>
              <h2 className="font-['Playfair_Display'] font-extrabold text-3xl md:text-5xl text-gray-900">
                Our Customer
              </h2>
              <span className="text-[#FF6B6B] text-2xl md:text-3xl">✦</span>
            </div>
              <h2 className="pl-3 font-['Playfair_Display'] font-extrabold text-3xl md:text-5xl text-gray-900">
                Testimonials
              </h2>              
          </div>
          <div className="max-w-xl">
            <p className="text-gray-500 text-base md:text-lg font-['Inter'] max-w-2xl mx-auto">
              Our brand is very trusted, you can see from some of the reviews of our customers.
            </p>
          </div>
        </div>
        
        <div className="relative px-0 md:px-4">
          {isMobile ? (
            <Slider {...sliderSettings}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="outline-none">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </Slider>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;