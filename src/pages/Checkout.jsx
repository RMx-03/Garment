import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCart } from '../context/CartContext';
import stripePromise from '../lib/stripe';

const CheckoutSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  zipCode: Yup.string().required('Required'),
  cardName: Yup.string().required('Required'),
});

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      cardName: '',
    },
    validationSchema: CheckoutSchema,
    onSubmit: async (values) => {
      try {
        setIsProcessing(true);
        setError(null);
        
        const stripe = await stripePromise;
        if (!stripe) throw new Error('Stripe failed to load');

        // Here you would typically make an API call to your backend to:
        // 1. Create a payment intent
        // 2. Process the order
        // For demo purposes, we'll simulate a successful payment
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Clear cart and redirect to success page
        clearCart();
        navigate('/checkout/success');
      } catch (err) {
        setError(err.message);
      } finally {
        setIsProcessing(false);
      }
    },
  });

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Your cart is empty</h2>
          <p className="mt-2">Add some items to your cart to checkout</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
          {/* Checkout Form */}
          <div>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...formik.getFieldProps('email')}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-black focus:border-black"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-red-600 text-sm mt-1">{formik.errors.email}</div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      {...formik.getFieldProps('firstName')}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-black focus:border-black"
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <div className="text-red-600 text-sm mt-1">{formik.errors.firstName}</div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      {...formik.getFieldProps('lastName')}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-black focus:border-black"
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <div className="text-red-600 text-sm mt-1">{formik.errors.lastName}</div>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    {...formik.getFieldProps('address')}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-black focus:border-black"
                  />
                  {formik.touched.address && formik.errors.address && (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.address}</div>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      {...formik.getFieldProps('city')}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-black focus:border-black"
                    />
                    {formik.touched.city && formik.errors.city && (
                      <div className="text-red-600 text-sm mt-1">{formik.errors.city}</div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      {...formik.getFieldProps('state')}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-black focus:border-black"
                    />
                    {formik.touched.state && formik.errors.state && (
                      <div className="text-red-600 text-sm mt-1">{formik.errors.state}</div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      {...formik.getFieldProps('zipCode')}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-black focus:border-black"
                    />
                    {formik.touched.zipCode && formik.errors.zipCode && (
                      <div className="text-red-600 text-sm mt-1">{formik.errors.zipCode}</div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    {...formik.getFieldProps('cardName')}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-black focus:border-black"
                  />
                  {formik.touched.cardName && formik.errors.cardName && (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.cardName}</div>
                  )}
                </div>

                {/* Stripe Card Element would go here in a real implementation */}
                <div className="mt-4 p-4 bg-gray-100 rounded-md">
                  <p className="text-sm text-gray-600">
                    This is a demo checkout. In a real implementation, Stripe Elements would be used here for secure card input.
                  </p>
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm mt-4">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 disabled:bg-gray-400"
              >
                {isProcessing ? 'Processing...' : `Pay $${getCartTotal().toFixed(2)}`}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.color} | Size {item.size} | Qty {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between">
                  <p className="font-medium">Subtotal</p>
                  <p className="font-medium">${getCartTotal().toFixed(2)}</p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="font-medium">Shipping</p>
                  <p className="font-medium">Free</p>
                </div>
                <div className="flex justify-between mt-2 text-lg font-bold">
                  <p>Total</p>
                  <p>${getCartTotal().toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;