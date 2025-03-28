import { Link } from 'react-router-dom';

const stores = [
  {
    city: 'SEATTLE',
    name: 'University Village',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8'
  },
  {
    city: 'SAN FRANCISCO',
    name: 'Valencia Street, San Francisco',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8'
  },
  {
    city: 'PALO ALTO',
    name: 'Stanford',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8'
  }
];

const Stores = () => {
  return (
    <div className="bg-white">
      {/* Secondary Navigation */}
      {/* <div className="border-b border-gray-200">
        <nav className="flex justify-center space-x-8 py-4">
          <Link to="/about" className="text-sm text-gray-700 hover:text-black">About</Link>
          <Link to="/stores" className="text-sm text-gray-900 font-medium">Stores</Link>
          <Link to="/factories" className="text-sm text-gray-700 hover:text-black">Factories</Link>
          <Link to="/environmental" className="text-sm text-gray-700 hover:text-black">Environmental Initiatives</Link>
          <Link to="/carbon" className="text-sm text-gray-700 hover:text-black">Our Carbon Commitment</Link>
          <Link to="/impact" className="text-sm text-gray-700 hover:text-black">Annual Impact Report</Link>
          <Link to="/cleaner" className="text-sm text-gray-700 hover:text-black">Cleaner Fashion</Link>
        </nav>
      </div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-4">Stores</h1>
        <p className="text-center text-gray-600 mb-12">Find one of our stores nearest to you.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stores.map((store) => (
            <div key={store.name} className="group">
              <div className="aspect-w-3 aspect-h-2 overflow-hidden">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500">{store.city}</p>
                <h3 className="text-lg font-medium text-gray-900">{store.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stores;