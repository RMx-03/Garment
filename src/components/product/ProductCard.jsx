import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
      <Link to={`/product/${product.id}`} className="group product-card">
        <div className="product-card-image">
          <img
            src={product.image}
            alt={product.name}
            className="group-hover:opacity-75"
          />
          {product.discount && (
            <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-xs">
              {product.discount}
            </div>
          )}
        </div>
        <div className="mt-4 space-y-1">
          <h3 className="text-sm text-gray-900">{product.name}</h3>
          <div className="flex items-center">
            <p className="text-sm font-medium text-gray-900">${product.price}</p>
            {product.originalPrice && (
              <p className="ml-2 text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </p>
            )}
          </div>
          <div className="flex gap-1">
            {product.colors.map((color) => (
              <div
                key={color}
                className="h-4 w-4 rounded-full border border-gray-300"
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              />
            ))}
          </div>
        </div>
      </Link>
    );
  };
  
  export default ProductCard;