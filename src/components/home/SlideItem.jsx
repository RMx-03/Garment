import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FiHeart } from 'react-icons/fi';

const SlideItem = ({ product, onFavClick }) => (
  <div className="relative group">
    <div className="relative">
      <Link to={`/product/${product.id}`}>
        <LazyLoadImage
          src={product.image[0]}
          alt={product.name}
          loading="eager"
          className="w-full aspect-[3/4] object-cover"
        />
      </Link>
      <button
        onClick={() => onFavClick(product)}
        className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
      >
        <FiHeart className="w-5 h-5" />
      </button>
    </div>
    <div className="mt-4">
      <Link to={`/product/${product.id}`} className="block">
        <h3 className="text-sm font-medium">{product.name}</h3>
        <p className="mt-1 text-sm">${product.price}</p>
      </Link>
    </div>
  </div>
);


const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.product.id === nextProps.product.id &&
    prevProps.product.name === nextProps.product.name &&
    prevProps.product.price === nextProps.product.price &&
    prevProps.product.image[0] === nextProps.product.image[0]
  );
};

export default React.memo(SlideItem, areEqual);
