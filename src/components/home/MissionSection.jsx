import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

const MissionSection = () => (
  <section className="relative py-24">
    <LazyLoadImage
      src="/images/products/hendrik-morkel-xccjtrOXJ7k-unsplash.webp"
      alt="Mission"
      loading="eager"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="relative bg-black bg-opacity-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">We're on a Mission To Clean Up the Industry</h2>
        <p className="text-lg mb-8">Read about our progress in our latest Impact Report.</p>
        <Link
          to="/sustainability"
          className="bg-white text-black px-8 py-3 inline-block hover:bg-gray-100 transition-colors"
        >
          LEARN MORE
        </Link>
      </div>
    </div>
  </section>
);

export default MissionSection;
