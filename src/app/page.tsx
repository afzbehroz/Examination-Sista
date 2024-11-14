// src/app/page.tsx

"use client";
import React, { useState } from 'react';
import Menu from '../components/Menu';
import OrderSummary from '../components/OrderSummary';
import { MenuItem, OrderItem } from './types';
import { useRouter } from 'next/navigation';
import CartIcon from './assets/cart.svg'; // Import custom cart icon

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
    <div className="flex flex-col items-center justify-center mx-auto max-w-max max-h-max">
      <Menu onAddToOrder={handleAddToOrder} className="p-4 rounded-lg shadow-md text-white" /> 
      <OrderSummary orderItems={orderItems} className="p-4 rounded-lg shadow-md mt-6 text-white" /> 

      {/* Custom Cart Icon with Item Count Badge */}
      <button  
        onClick={handleNavigateToOrderPage} 
        className="absolute text-xl p-2 text-white bg-white rounded-md"
        style={{
          width: "31.99px",
          height: "30.72px",
          top: "146px",
          left: "356px"
        }}
      >
        <div className="relative">
          <img src={CartIcon.src} alt="Cart" width="40" height="40" />
          {itemCount > 0 && (
            <span
              className="absolute bg-red-500 text-white rounded-full text-[8px] w-4 h-4 flex items-center justify-center"
              style={{
                bottom: '22px',
                left: '8px',
                transform: 'translate(50%, 50%)',
              }}
            >
              {itemCount}
            </span>
          )}
        </div>
      </button>
    </div>
  );
};

export default Home;
