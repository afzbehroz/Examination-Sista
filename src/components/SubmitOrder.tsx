// src/app/components/SubmitOrder.tsx
import React from 'react';
import { OrderItem } from '@/app/types';

interface SubmitOrderProps {
  orderItems: OrderItem[];
  onOrderSuccess: (orderId: string) => void; // Callback to handle successful order submission
}

const API_KEY = 'yum-BAPUdN5hTPLuk3iN';
const TENANT_ID = 'hlhu';
const BASE_URL = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com';

const SubmitOrder: React.FC<SubmitOrderProps> = ({ orderItems, onOrderSuccess }) => {
  const handleSubmitOrder = async () => {
    const items = orderItems.map(item => item.item.id); // Extract only item IDs from orderItems

    try {
      const response = await fetch(`${BASE_URL}/${TENANT_ID}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-zocom': API_KEY,
        },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      const data = await response.json();
      console.log('Order submitted successfully:', data);

      // Call the success callback with the order ID
      onOrderSuccess(data.order.id);
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <button
      onClick={handleSubmitOrder}
      className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md mt-6 w-full"
    >
      Take My Money
    </button>
  );
};

export default SubmitOrder;
