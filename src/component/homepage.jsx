import { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import Footer from './footer';

export default function ECommerceApp({ cart, addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  

  // Fetch Data from public API 
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  

  const totalItems = cart.reduce((total, item) => total + (item.quantity || 1), 0);
  const navigate = useNavigate();

  return (
    <div className="min-h-full">
      <Disclosure as="nav" className="bg-slate-900 sticky top-[-1px] md:top-0 z-10">
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
                <span className="absolute -top-2 -right-2 bg-violet-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </div>
          </div>
        </div>
      </Disclosure>

      <header className="bg-slate-900 shadow-sm">
  <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
    <h1 className="text-3xl font-bold tracking-tight text-white">Products</h1>
  </div>
</header>

<div className="bg-gradient-to-r from-slate-900 via-violet-900 to-slate-900 text-white text-center py-10 px-4">
  <h2 className="text-3xl font-bold mb-2">Shop the Best Products</h2>
  <p className="text-violet-200 text-sm">Free shipping on orders over $50</p>
</div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/*Show products in a grid layout*/}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

{loading
      ? // Skeleton Cards
        Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="border p-4 rounded-xl shadow-sm animate-pulse">
            <div className="bg-gray-200 rounded-md h-64 w-full mb-4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-9 bg-gray-200 rounded-md w-full"></div>
          </div>
        ))
      :  products.map((product) => (
            <div key={product.id} className="group relative border p-4 rounded-lg flex flex-col justify-between shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-white lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img src={product.image} alt={product.title} className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <span className="text-xs bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full capitalize">
  {product.category}
</span>
                  <h3 className="text-sm text-gray-700 font-medium">{product.title}</h3>
                 
                </div>
                <p className="text-sm font-bold text-gray-900">${product.price}</p>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 w-full bg-violet-600 text-white py-2 rounded-md hover:bg-violet-700 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        


        </div>
      </main>
      <Footer />
    </div>
  );
}