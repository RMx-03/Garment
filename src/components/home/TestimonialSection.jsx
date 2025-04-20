import { memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import { OptimizedImage } from '../common/OptimizedImage';
import TestimonialSlide from './TestimonialSlide';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const testimonials = [
  {
    id: 1,
    author: "Sarah M.",
    text: "The quality and fit are exceptional. This piece has become a staple in my wardrobe.",
    rating: 5,
    product: "Classic Wool Blazer",
    image: "/images/products/pexels-cup-of-couple-6634909.webp"
  },
  {
    id: 2,
    author: "Michael R.",
    text: "Incredible attention to detail and the customer service is outstanding.",
    rating: 5,
    product: "Premium Denim Jeans",
    image: "/images/products/nastia-kardash-dupe.webp"
  },
  {
    id: 3,
    author: "Emma L.",
    text: "Sustainable fashion that doesn't compromise on style. Love everything about it!",
    rating: 5,
    product: "Organic Cotton Dress",
    image: "/images/products/marcel-strauss-Kv6NXMlNBVI-unsplash.webp"
  }
];

const swiperOptions = {
  modules: [Navigation, Pagination, A11y],
  spaceBetween: 30,
  slidesPerView: 1,
  navigation: true,
  pagination: { clickable: true },
  className: 'testimonial-swiper',
  watchSlidesProgress: true,
  grabCursor: true,
  a11y: {
    prevSlideMessage: 'Previous testimonial',
    nextSlideMessage: 'Next testimonial',
  }
};

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mb-16">People Are Talking</h2>
        <div className="max-w-6xl mx-auto">
          <Swiper {...swiperOptions}>
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <TestimonialSlide testimonial={testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default memo(TestimonialSection); 