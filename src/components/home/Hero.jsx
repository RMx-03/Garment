import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Hero = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0">
        <LazyLoadImage
          src="/images/products/shalom-ejiofor-YLSBNapbXXY-unsplash.webp"
          alt="Hero"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Your Cozy Era
        </h1>
        <p className="mt-6 max-w-lg mx-auto text-xl text-white">
          Get peak comfy-chic with new winter essentials.
        </p>
        <div className="mt-10">
          <Link
            to="/shop"
            className="inline-block bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
          >
            SHOP NOW
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;