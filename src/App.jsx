import { useState ,useEffect } from 'react'
import './App.css'
import Cart from './component/cart'
import Homepage from './component/homepage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast,Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
 

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);
    if (existingItemIndex > -1) {
      updateQuantity(existingItemIndex, 1);
      toast.success(`${product.title} added to cart!`);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      
    }
  };

  const updateQuantity = (index, delta) => {
    const newCart = [...cart];
    const newQuantity = (newCart[index].quantity || 1) + delta;

    if (newQuantity < 1) {
      removeItem(index);
      return;
    }
    newCart[index].quantity = newQuantity;
    setCart(newCart);
  };

  const [pendingRemove, setPendingRemove] = useState(null);

const removeItem = (index) => {
  const newCart = cart.filter((_, i) => i !== index);
  setCart(newCart);
  toast.success(`${cart[index].title} removed from cart`);
};

  return (
    <BrowserRouter>
    <ToastContainer position="bottom-right" autoClose={3000} transition={Slide} theme="dark"/>
      <Routes>
        <Route path="/" element={<Homepage cart={cart} addToCart={addToCart} />} />
        <Route 
          path="/cart" 
          element={<Cart cart={cart} updateQuantity={updateQuantity} removeItem={removeItem} />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App
