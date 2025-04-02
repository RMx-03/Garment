import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const GiftCard = () => {
  const [amount, setAmount] = useState(50);

  const formik = useFormik({
    initialValues: {
      recipientName: '',
      recipientEmail: '',
      senderName: '',
      senderEmail: '',
      message: '',
    },
    validationSchema: Yup.object({
      recipientName: Yup.string().required('Required'),
      recipientEmail: Yup.string().email('Invalid email').required('Required'),
      senderName: Yup.string().required('Required'),
      senderEmail: Yup.string().email('Invalid email').required('Required'),
      message: Yup.string(),
    }),
    onSubmit: (values) => {
      console.log({ ...values, amount });
    },
  });

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Purchase a Gift Card</h1>

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Amount Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Amount
              </label>
              <div className="grid grid-cols-4 gap-4">
                {[25, 50, 100, 200].map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={`py-2 text-center rounded-md ${
                      amount === value
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                    onClick={() => setAmount(value)}
                  >
                    ${value}
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Recipient Information</h2>
              <div>
                <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  id="recipientName"
                  type="text"
                  {...formik.getFieldProps('recipientName')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                />
                {formik.touched.recipientName && formik.errors.recipientName && (
                  <div className="text-red-600 text-sm mt-1">{formik.errors.recipientName}</div>
                )}
              </div>

              <div>
                <label htmlFor="recipientEmail" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="recipientEmail"
                  type="email"
                  {...formik.getFieldProps('recipientEmail')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                />
                {formik.touched.recipientEmail && formik.errors.recipientEmail && (
                  <div className="text-red-600 text-sm mt-1">{formik.errors.recipientEmail}</div>
                )}
              </div>
            </div>

            {/* Sender Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Your Information</h2>
              <div>
                <label htmlFor="senderName" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  id="senderName"
                  type="text"
                  {...formik.getFieldProps('senderName')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                />
                {formik.touched.senderName && formik.errors.senderName && (
                  <div className="text-red-600 text-sm mt-1">{formik.errors.senderName}</div>
                )}
              </div>

              <div>
                <label htmlFor="senderEmail" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="senderEmail"
                  type="email"
                  {...formik.getFieldProps('senderEmail')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                />
                {formik.touched.senderEmail && formik.errors.senderEmail && (
                  <div className="text-red-600 text-sm mt-1">{formik.errors.senderEmail}</div>
                )}
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message (Optional)
              </label>
              <textarea
                id="message"
                rows={4}
                {...formik.getFieldProps('message')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors duration-200"
            >
              Purchase Gift Card - ${amount}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GiftCard;