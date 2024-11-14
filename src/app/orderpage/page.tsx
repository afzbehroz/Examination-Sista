// src/app/orderpage/page.tsx

"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { OrderItem } from '../types';

const OrderPage: React.FC = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Retrieve saved order items from localStorage
    const storedOrderItems = JSON.parse(localStorage.getItem('orderItems') || '[]');
    setOrderItems(storedOrderItems);
  }, []);

  const handlePlaceOrder = async () => {
    try {
      const response = await fetch(`https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/hlhu/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-zocom': 'yum-ngfeNG1iaq9Q2PJK',
        },
        body: JSON.stringify({ items: orderItems.map((orderItem) => orderItem.item.id) }),
      });

      const data = await response.json();
      if (data.order && data.order.id) {
        localStorage.setItem('orderId', data.order.id);
      }

      router.push('/finalpage');
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const handleIncreaseQuantity = (itemId: number) => {
    setOrderItems((prevItems) =>
      prevItems.map((orderItem) =>
        orderItem.item.id === itemId
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      )
    ); 
  };

  const handleDecreaseQuantity = (itemId: number) => {
    setOrderItems((prevItems) =>
      prevItems
        .map((orderItem) =>
          orderItem.item.id === itemId
            ? { ...orderItem, quantity: orderItem.quantity - 1 }
            : orderItem
        )
        .filter((orderItem) => orderItem.quantity > 0)
    );
  };

  const total = orderItems.reduce((sum, { item, quantity }) => sum + item.price * quantity, 0);

  return (
    <div
      className="flex flex-col items-center w-full h-screen overflow-auto pt-8 text-gray-800" // Added pt-8 for top padding
      style={{ backgroundColor: "#eeeeee" }}
    >
      <div className="w-full max-w-[358px] px-4 bg-white p-4 rounded-lg shadow-lg max-h-[80vh] overflow-y-scroll">
        {orderItems.length > 0 ? (
          <div className="order-summary text-gray-700">
            {orderItems.map(({ item, quantity }) => (
              <div key={item.id} className="flex flex-col items-start border-b border-gray-300 py-2">
                <div className="flex justify-between items-center w-full">
                  <span className="font-semibold uppercase text-sm text-gray-800">{item.name}</span>
                  <div className="flex-1 border-dotted border-t border-gray-400 mx-2"></div>
                  <span className="font-bold text-gray-800">{item.price * quantity} SEK</span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <button 
                    onClick={() => handleDecreaseQuantity(item.id)} 
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full h-6 w-6 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="text-sm text-gray-800">{quantity} stycken</span>
                  <button 
                    onClick={() => handleIncreaseQuantity(item.id)} 
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full h-6 w-6 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}

            <div
              className="flex justify-between items-center mt-4 font-bold text-lg text-gray-800 bg-[#C2C1C1] w-full h-20 px-4 py-3 rounded-md"
            >
              <div className="flex flex-col">
                <span className="text-sm font-bold">TOTALT</span>
                <span className="text-xs text-gray-600">inkl 20% moms</span>
              </div>
              <span className="text-2xl font-bold">{total} SEK</span>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="mt-6 w-full py-3 rounded font-semibold tracking-wide text-white bg-[#353131] hover:bg-gray-700"
            > 
              TAKE MY MONEY!
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500">Your order basket is empty.</p>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
