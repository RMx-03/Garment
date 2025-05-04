import React, { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TrackedImage from '../common/TrackedImage';
import useComponentLoaded from '../../hooks/useComponentLoaded';

const collections = [
  {
    title: 'New Arrivals',
    image: '/images/products/glassesshop-fGTadsxRmTk-unsplash.webp',
    alt: 'New Arrivals',
    link: '/new-arrivals',
    buttonText: 'SHOP THE LATEST',
  },
  {
    title: 'Best Sellers',
    image: '/images/products/kevin-laminto-0ZPlUMo2lis-unsplash.webp',
    alt: 'Best Sellers',
    link: '/best-sellers',
    buttonText: 'SHOP YOUR FAVORITES',
  },
  {
    title: 'The Holiday Outfit',
    image: '/images/products/molly-archer-BTdHmE4jst8-unsplash.webp',
    alt: 'Holiday Collection',
    link: '/holiday-gifting',
    buttonText: 'SHOP OCCASION',
  },
];

const FeaturedCollections = memo(() => {
  const [imagesLoaded, setImagesLoaded] = useState(0);
  
  // Register this component in the loading system
  useComponentLoaded('featured-collections', imagesLoaded === collections.length);
  
  // Track when all images in the collection are loaded
  const handleImageLoad = () => {
    setImagesLoaded(prev => prev + 1);
  };
  
  return (
    <section className="py-16 bg-grainy-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {collections.map((item, index) => (
            <div key={index} className="relative group">
              <TrackedImage
                src={item.image}
                alt={item.alt}
                loading="eager"
                className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
                componentId={`featured-collection-${index}`}
                afterLoad={handleImageLoad}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 transition-colors duration-300 group-hover:bg-opacity-40">
                <div className="text-center">
                  <h3 className="text-2xl text-white mb-4 prata-regular">{item.title}</h3>
                  <Link
                    to={item.link}
                    className="mt-4 bg-white text-black px-6 py-2 text-sm inline-block hover:bg-gray-100 transition-colors outfit-regular"
                  >
                    {item.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

FeaturedCollections.displayName = 'FeaturedCollections';

export default FeaturedCollections;
