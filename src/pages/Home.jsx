import Hero from '../components/home/Hero';
import CategoryGrid from '../components/home/CategoryGrid';

const Home = () => {
  return (
    <div>
      <Hero />
      <CategoryGrid />
      
      {/* Featured Collections */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d"
                alt="New Arrivals"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white">New Arrivals</h3>
                  <button className="mt-4 bg-white px-6 py-2 text-sm">SHOP THE LATEST</button>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
                alt="Best Sellers"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white">Best Sellers</h3>
                  <button className="mt-4 bg-white px-6 py-2 text-sm">SHOP YOUR FAVORITES</button>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d"
                alt="Holiday Collection"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white">The Holiday Outfit</h3>
                  <button className="mt-4 bg-white px-6 py-2 text-sm">SHOP OCCASION</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;