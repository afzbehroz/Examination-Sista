// src/app/page.tsx

"use client";
import React, { useState } from 'react';
import Menu from '../components/Menu';
import { MenuItem, OrderItem } from './types';
import { useRouter } from 'next/navigation';
import CartIcon from './assets/cart.svg';

const Home: React.FC = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const router = useRouter();

  const handleAddToOrder = (menuItem: MenuItem, quantity: number) => {
    setOrderItems((prevOrderItems) => {
      const existingItemIndex = prevOrderItems.findIndex((orderItem) => orderItem.item.id === menuItem.id);

      if (existingItemIndex >= 0) {
        const updatedOrderItems = [...prevOrderItems];
        updatedOrderItems[existingItemIndex].quantity += quantity;
        return updatedOrderItems;
      } else {
        return [...prevOrderItems, { item: menuItem, quantity }];
      }
    });
  };

  const itemCount = orderItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavigateToOrderPage = () => {
    localStorage.setItem('orderItems', JSON.stringify(orderItems));
    router.push('/orderpage');
  };

  return (
    <div className="flex flex-col items-center justify-center mx-auto w-full h-screen overflow-hidden" style={{ backgroundColor: "#489078" }}>
      
      {/* Cart Icon */}
      <button  
        onClick={handleNavigateToOrderPage} 
        className="fixed top-5 right-5 text-xl p-2 bg-white rounded-md"
        style={{
          width: "45px",
          height: "45px",
        }}
      >
        <div className="relative">
          <img src={CartIcon.src} alt="Cart" width="60" height="60"/>
          {itemCount > 0 && (
            <span
              className="absolute bg-red-500 text-white rounded-full text-[14px] w-6 h-6 flex items-center justify-center"
              style={{
                bottom: '44px',
                left: '14px',
                transform: 'translate(50%, 50%)',
              }}
            >
              {itemCount}
            </span>
          )}
        </div>
      </button>

      {/* Menu Component for selecting items */}
      <Menu onAddToOrder={handleAddToOrder} className="p-4 rounded-lg shadow-md text-white overflow-y-auto"/>
    </div>
  );
};

export default Home;
