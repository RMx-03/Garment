import { memo } from 'react';
import { Link } from 'react-router-dom';
import { FiX, FiMinus, FiPlus } from 'react-icons/fi';

const CartItem = memo(({ item, onRemove, onUpdateQuantity }) => {
  const handleIncrement = () => {
    onUpdateQuantity(item.id, item.size, item.color, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.size, item.color, item.quantity - 1);
    }
  };

  // Get the first image from the array if it exists, otherwise use the single image or fallback
  const imageUrl = Array.isArray(item.image) ? item.image[0] : (item.image || '/images/products/placeholder.jpg');

  return (
    <div className="flex py-4 border-b border-gray-200 last:border-0">
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded bg-gray-100">
        <Link to={`/product/${item.id}`}>
          <img
            src={imageUrl}
            alt={item.name}
            className="h-full w-full object-cover object-center"
          />
        </Link>
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between">
            <Link 
              to={`/product/${item.id}`}
              className="text-sm font-medium text-gray-900 hover:text-gray-700"
            >
              {item.name}
            </Link>
            <button
              type="button"
              onClick={() => onRemove(item.id, item.size, item.color)}
              className="text-gray-400 hover:text-gray-500"
              aria-label={`Remove ${item.name} from cart`}
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {item.color && `Color: ${item.color}`}
            {item.size && ` / Size: ${item.size}`}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border border-gray-200 rounded">
            <button
              onClick={handleDecrement}
              className="px-2 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={item.quantity <= 1}
              aria-label={`Decrease quantity of ${item.name}`}
            >
              <FiMinus className="w-3 h-3" />
            </button>
            <span className="px-4 py-1 text-sm" aria-label="Quantity">{item.quantity}</span>
            <button
              onClick={handleIncrement}
              className="px-2 py-1 text-gray-600 hover:text-gray-800"
              aria-label={`Increase quantity of ${item.name}`}
            >
              <FiPlus className="w-3 h-3" />
            </button>
          </div>
          <p className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
});

CartItem.displayName = 'CartItem';

export default CartItem; 