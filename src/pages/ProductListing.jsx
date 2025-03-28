import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const womenProducts = [
  {
    id: 1,
    name: 'The Cloud Relaxed Cardigan',
    price: 132,
    originalPrice: 188,
    discount: '30% off',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27',
    colors: ['Black', 'Navy', 'Brown', 'Charcoal'],
    category: 'Sweaters'
  },
  {
    id: 2,
    name: 'The Organic Cotton Long-Sleeve Turtleneck',
    price: 35,
    originalPrice: 50,
    discount: '30% off',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105',
    colors: ['Black', 'Navy', 'White'],
    category: 'Tops'
  },
  {
    id: 3,
    name: 'The Silk Relaxed Shirt',
    price: 98,
    originalPrice: 140,
    discount: '30% off',
    image: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7',
    colors: ['White', 'Black', 'Blue'],
    category: 'Tops'
  }
];

const menProducts = [
  {
    id: 4,
    name: 'The Performance Chino',
    price: 68,
    originalPrice: 98,
    discount: '30% off',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22',
    colors: ['Khaki', 'Navy', 'Black', 'Olive'],
    category: 'Pants'
  },
  {
    id: 5,
    name: 'The Merino Wool Sweater',
    price: 98,
    originalPrice: 140,
    discount: '30% off',
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2',
    colors: ['Navy', 'Charcoal', 'Brown'],
    category: 'Sweaters'
  },
  {
    id: 6,
    name: 'The Oxford Shirt',
    price: 64,
    originalPrice: 88,
    discount: '30% off',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f',
    colors: ['White', 'Blue', 'Gray'],
    category: 'Shirts'
  }
];

const ProductListing = ({ category }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  
  const products = category === 'women' ? womenProducts : menProducts;
  const pageTitle = category === 'women' ? "Women's Clothing & Apparel" : "Men's Clothing & Apparel";

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {pageTitle} - New Arrivals
          </h1>
        </div>

        <div className="flex gap-x-8 pt-6">
          {/* Filters */}
          <div className="w-64">
            <div className="border-b border-gray-200 py-6">
              <h2 className="text-lg font-medium text-gray-900">Category</h2>
              {/* Add category filters */}
            </div>
            <div className="border-b border-gray-200 py-6">
              <h2 className="text-lg font-medium text-gray-900">Color</h2>
              {/* Add color filters */}
            </div>
          </div>

          {/* Product grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`} className="group">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                    {product.discount && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-sm">
                        {product.discount}
                      </div>
                    )}
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                  <div className="mt-1 flex items-center">
                    <p className="text-sm text-gray-900">${product.price}</p>
                    {product.originalPrice && (
                      <p className="ml-2 text-sm text-gray-500 line-through">
                        ${product.originalPrice}
                      </p>
                    )}
                  </div>
                  <div className="mt-1 flex gap-1">
                    {product.colors.map((color) => (
                      <div
                        key={color}
                        className="h-4 w-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color.toLowerCase() }}
                      />
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;