import { memo } from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from '../common/OptimizedImage';

const TestimonialSlide = memo(({ testimonial }) => (
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
    <div className="aspect-w-3 aspect-h-4 overflow-hidden rounded-lg">
      <Link to={`/product/${testimonial.id}`}>
        <OptimizedImage
          src={testimonial.image}
          alt={`${testimonial.author} wearing ${testimonial.product}`}
          className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
          width={600}
          height={800}
          loading="lazy"
        />
      </Link>
    </div>
  </div>
));

TestimonialSlide.displayName = 'TestimonialSlide';

export default TestimonialSlide;
