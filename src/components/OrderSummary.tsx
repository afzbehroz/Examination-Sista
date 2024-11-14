// src/app/components/OrderSummary.tsx

import React from 'react';
import { OrderItem } from '@/app/types';

interface OrderSummaryProps {
  orderItems: OrderItem[];
  className?: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ orderItems, className }) => {
  const total = orderItems.reduce((sum, { item, quantity }) => sum + item.price * quantity, 0);

  return (
    <div className={`order-summary p-4 rounded-lg shadow-md ${className}`}>
      <h2 className="text-2xl font-bold mb-4 text-center">Order Summary</h2>
      {orderItems.length > 0 ? (
        orderItems.map(({ item, quantity }) => (
          <div key={item.id} className="order-item flex justify-between mb-3">
            <span className="font-semibold">{item.name} x {quantity}</span>
            <span>{item.price * quantity} SEK</span>
          </div>
        ))
      ) : ( 
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      )}
      <div className="order-total flex justify-between mt-4 font-bold text-lg">
        <span>Total:</span>
        <span>{total} SEK</span>
      </div>
    </div>
  );
}; 

export default OrderSummary;
