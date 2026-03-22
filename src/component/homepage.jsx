import { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

export default function ECommerceApp({ cart, addToCart }) {
  const [products, setProducts] = useState([]);
  

  // Fetch Data from public API 
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  const navigate = useNavigate();

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-gray-800 sticky top-[-1px] md:top-0 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center justify-center gap-2">
              <img className='h-[25px]' src="/favicon.svg" alt="" />
              <span className="text-white font-bold text-xl">E-Commerce Shop</span>
            </div>
            {/*Show cart item count*/}
            <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
              <ShoppingCartIcon className="size-6 text-gray-300" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </div>
          </div>
        </div>
      </Disclosure>

      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Products</h1>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/*Show products in a grid layout*/}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative border p-4 rounded-lg flex flex-col justify-between">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img src={product.image} alt={product.title} className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700 font-medium">{product.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                </div>
                <p className="text-sm font-bold text-gray-900">${product.price}</p>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}