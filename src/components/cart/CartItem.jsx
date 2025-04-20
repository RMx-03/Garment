import { memo } from 'react';
import { Link } from 'react-router-dom';
import { FiX, FiMinus, FiPlus } from 'react-icons/fi';
import OptimizedImage from '../common/OptimizedImage';

const CartItem = memo(({ item, onRemove, onUpdateQuantity }) => {
  const handleIncrement = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  // Get the first image from the array if it exists, otherwise use the single image or fallback
  const imageUrl = Array.isArray(item.image) ? item.image[0] : (item.image || '/images/products/placeholder.jpg');

  return (
    <div className="flex py-4 border-b border-gray-200 last:border-0">
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
        <Link to={`/product/${item.id}`}>
          <OptimizedImage
            src={imageUrl}
            alt={item.name}
            className="h-full w-full object-cover object-center transition-opacity hover:opacity-75"
            width={96}
            height={96}
            loading="lazy"
          />
        </Link>
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <Link to={`/product/${item.id}`}>
            <h3 className="hover:text-gray-600 transition-colors">{item.name}</h3>
          </Link>
          <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm text-gray-500">
            {item.variant && `${item.variant}`}
            {item.size && ` | Size: ${item.size}`}
            {item.color && ` | ${item.color}`}
          </p>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={handleDecrement}
                className="px-2 py-1 text-gray-600 hover:text-gray-800 transition-colors"
                disabled={item.quantity <= 1}
                aria-label="Decrease quantity"
              >
                <FiMinus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center text-sm">{item.quantity}</span>
              <button
                onClick={handleIncrement}
                className="px-2 py-1 text-gray-600 hover:text-gray-800 transition-colors"
                aria-label="Increase quantity"
              >
                <FiPlus className="w-4 h-4" />
              </button>
            </div>
            
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="-m-2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={`Remove ${item.name} from cart`}
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

CartItem.displayName = 'CartItem';

export default CartItem; 