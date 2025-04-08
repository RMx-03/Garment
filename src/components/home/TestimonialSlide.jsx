import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const TestimonialSlide = ({ testimonial }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <div>
      <div className="flex mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <span key={i} className="text-yellow-400">★</span>
        ))}
      </div>
      <p className="text-xl mb-6">"{testimonial.text}"</p>
      <p className="text-sm text-gray-600">
        -- {testimonial.author},&nbsp;
        <Link
          to={`/product/${testimonial.id}`}
          className="underline hover:text-black"
        >
          {testimonial.product}
        </Link>
      </p>
    </div>
    <div className="aspect-[3/4] overflow-hidden">
      <Link to={`/product/${testimonial.id}`}>
        <LazyLoadImage
          src={testimonial.image}
          alt={testimonial.product}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </Link>
    </div>
  </div>
);

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.testimonial.id === nextProps.testimonial.id &&
    prevProps.testimonial.text === nextProps.testimonial.text &&
    prevProps.testimonial.rating === nextProps.testimonial.rating &&
    prevProps.testimonial.image === nextProps.testimonial.image &&
    prevProps.testimonial.author === nextProps.testimonial.author &&
    prevProps.testimonial.product === nextProps.testimonial.product
  );
};

export default React.memo(TestimonialSlide, areEqual);
