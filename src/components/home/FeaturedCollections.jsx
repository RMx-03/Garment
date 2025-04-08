import React from 'react';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const collections = [
  {
    title: 'New Arrivals',
    image: '/images/products/glassesshop-fGTadsxRmTk-unsplash.webp',
    alt: 'New Arrivals',
    link: '/new',
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
    link: '/holiday',
    buttonText: 'SHOP OCCASION',
  },
];

const FeaturedCollections = () => (
  <section className="py-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {collections.map((item, index) => (
          <div key={index} className="relative group">
            <LazyLoadImage
              src={item.image}
              alt={item.alt}
              className="w-full h-96 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 transition-colors duration-300 group-hover:bg-opacity-40">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                <Link
                  to={item.link}
                  className="mt-4 bg-white px-6 py-2 text-sm inline-block hover:bg-gray-100 transition-colors"
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

export default FeaturedCollections;
