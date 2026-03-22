import { useNavigate } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import Footer from './footer';
import { useState } from 'react';

// Use props passed from App.jsx to keep everything in sync
export default function CartPage({ cart, updateQuantity, removeItem }) {
  const navigate = useNavigate();
  const [confirmIndex, setConfirmIndex] = useState(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Disclosure as="nav" className="bg-slate-900">
        <button
          onClick={() => navigate('/')}
          className="text-white bg-violet-600 p-2 rounded-lg cursor-pointer my-4 mx-4"
        >
          ← Back to Products
        </button>
      </Disclosure>
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6 px-4 pt-4 flex items-center">
          Your Cart{' '}
          <span className="bg-violet-600 text-white text-sm font-semibold px-2.5 py-1  rounded-full ml-1">
            {cart.reduce((total, item) => total + (item.quantity || 1), 0)} items
          </span>
        </h1>

        {cart.length === 0 ? (
          <span className='flex items-center justify-center h-[400px] flex-col gap-7'>
            <img className='h-[200px] mt-4' src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-illustration-svg-download-png-9824435.png" alt="Empty Cart" />
            <p className='text-3xl border-b border-b-amber-400'>Your cart is empty.</p>
            <button onClick={() => navigate('/')} className="text-white bg-violet-500 p-2 rounded-full cursor-pointer mb-4 px-3">Shop Now</button>
          </span>
        ) : (
          <div className="space-y-4 pb-10">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center pb-4 bg-white rounded-xl p-4 mx-4 shadow-md border border-gray-100">
                <div className="flex items-center cursor-pointer">
                  <img src={item.image} className="w-16 h-16 object-contain mr-4" alt={item.title} />
                  <div>
                    <h2 className="font-medium text-sm line-clamp-1 w-48 text-wrap w-[150px] md:w-auto" >{item.title}</h2>
                    <p className="text-gray-600 text-[16px]">${item.price} </p>
                  </div>
                </div>

                <div className='flex flex-col items-center gap-3'>
                  {/* Product Counter Section */}
                  <div className="flex items-center gap-4 bg-white px-3 py-1 rounded-full border border-gray-300">
                    <span
                      onClick={() => updateQuantity(index, -1)}
                      className="cursor-pointer font-bold text-red-500 hover:scale-125 transition px-2"
                    >
                      −
                    </span>
                    <span className="font-semibold w-4 text-center">{item.quantity || 1}</span>
                    <span
                      onClick={() => updateQuantity(index, 1)}
                      className="cursor-pointer font-bold text-green-600 hover:scale-125 transition px-2"
                    >
                      +
                    </span>
                  </div>


                  {confirmIndex === index ? (
                    <div className="flex gap-2 items-center">
                      <span className="text-xs text-gray-500">Remove?</span>
                      <button
                        onClick={() => { removeItem(index); setConfirmIndex(null); }}
                        className="text-white bg-red-500 px-2 py-1 rounded text-xs cursor-pointer"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setConfirmIndex(null)}
                        className="text-gray-600 bg-gray-200 px-2 py-1 rounded text-xs cursor-pointer"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmIndex(index)}
                      className="text-white hover:font-semibold bg-red-500 px-3 py-1 rounded cursor-pointer"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}

            <div className="mx-4 p-4 border-t border-gray-300 flex justify-between items-center">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-xl font-bold text-violet-700">
                ${cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0).toFixed(2)}
              </span>
            </div>
            <div className='flex items-center justify-center cursor-pointer bg-violet-600 text-white font-bold text-lg py-3 rounded-lg w-[200px] mx-auto  '>
              <span>
                Place Your Order
              </span>
            </div>
          </div>
        )}</div>
      <Footer />
    </div>
  );
}