import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const Sustainability = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09"
            loading="lazy"
            alt="Sustainability Hero"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        <div className="relative flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-6xl font-light mb-6">
            Environmental<br />
            Initiatives
          </h1>
          <p className="text-xl max-w-2xl">
            We're committed to reducing our environmental impact and creating a more sustainable future for fashion.
          </p>
        </div>
      </div>

      {/* Initiatives Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="h-48 bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b"
                loading="lazy"
                alt="Recycled Materials"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
            <h3 className="text-xl font-semibold mb-3">Recycled Materials</h3>
            <p className="text-gray-600">
              By 2025, 100% of our materials will come from recycled or sustainable sources.
            </p>
          </div>

          <div className="text-center">
            <div className="h-48 bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e"
                alt="Carbon Neutral"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
            <h3 className="text-xl font-semibold mb-3">Carbon Neutral</h3>
            <p className="text-gray-600">
              We're working towards carbon neutrality across our entire supply chain.
            </p>
          </div>

          <div className="text-center">
            <div className="h-48 bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1527176930608-09cb256ab504"
                loading="lazy"
                alt="Zero Waste"
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
            <h3 className="text-xl font-semibold mb-3">Zero Waste</h3>
            <p className="text-gray-600">
              Our goal is to eliminate waste from our production process by 2024.
            </p>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Our Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-black mb-2">75%</div>
              <p className="text-gray-600">Recycled Materials Used</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-black mb-2">50%</div>
              <p className="text-gray-600">Carbon Footprint Reduction</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-black mb-2">90%</div>
              <p className="text-gray-600">Water Usage Reduction</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-black mb-2">85%</div>
              <p className="text-gray-600">Renewable Energy Usage</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sustainability;