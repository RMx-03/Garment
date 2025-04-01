import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiTruck, FiPackage, FiGift } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { Products } from '../data/products.js';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const allProducts = [
      ...Products.women,
      ...Products.men,
    ];
    const foundProduct = allProducts.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
          {/* Product Images */}
          <div className="grid grid-cols-2 gap-4">
            {product.image.map((img, index) => (
              <div key={index} className="aspect-w-1 aspect-h-1">
                <img
                  src={img}
                  alt={`${product.name} - View ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Product Info */}
          <div className="mt-10 lg:mt-0">
            <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
            <div className="mt-3 flex items-center">
              <p className="text-2xl text-gray-900">${product.price}</p>
              {product.originalPrice && (
                <p className="ml-2 text-xl text-gray-500 line-through">
                  ${product.originalPrice}
                </p>
              )}
            </div>
            
            {/* Description */}
            <div className="mt-4">
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Color Selection */}
            <div className="mt-8">
              <h2 className="text-sm font-medium text-gray-900">Color</h2>
              <div className="mt-2 flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`p-2 border rounded-md ${
                      selectedColor === color ? 'border-black' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-gray-900">Size</h2>
                <button className="text-sm text-gray-500 underline">Size Guide</button>
              </div>
              <div className="mt-2 grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`py-2 text-center border rounded-md ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Details */}
            <div className="mt-8">
              <h2 className="text-sm font-medium text-gray-900">Product Details</h2>
              <ul className="mt-2 space-y-2">
                {product.details.map((detail, index) => (
                  <li key={index} className="text-gray-600">• {detail}</li>
                ))}
              </ul>
            </div>

            {/* Add to Bag Button */}
            <button 
              className="mt-8 w-full bg-black text-white py-3 hover:bg-gray-800"
              onClick={() => {
                if (!selectedSize) {
                  alert('Please select a size.');
                  return;
                }
                if (!selectedColor) {
                  alert('Please select a color.');
                  return;
                }
                addToCart(product, 1, selectedSize, selectedColor);
                alert('Added to bag!');
              }}
            >
              ADD TO BAG
            </button>

            {/* Shipping Info */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center">
                <FiTruck className="h-5 w-5 mr-2" />
                <div>
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-sm text-gray-500">On all U.S. orders over $100</p>
                </div>
              </div>
              <div className="flex items-center">
                <FiPackage className="h-5 w-5 mr-2" />
                <div>
                  <p className="font-medium">Easy Returns</p>
                  <p className="text-sm text-gray-500">Extended returns through January 31</p>
                </div>
              </div>
              <div className="flex items-center">
                <FiGift className="h-5 w-5 mr-2" />
                <div>
                  <p className="font-medium">Send It As A Gift</p>
                  <p className="text-sm text-gray-500">Add a free personalized note during checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;