// src/app/finalpage/page.tsx

"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import boxtop from '../assets/boxtop.png';

const FinalPage: React.FC = () => {
  const router = useRouter();
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve the order ID from localStorage
    const savedOrderId = localStorage.getItem('orderId');
    setOrderId(savedOrderId);
  }, []);

  const handleNewOrder = () => {
    router.push('/'); // Navigate back to the menu page
  };

  return (
    <div
      className="flex flex-col items-center justify-end min-h-screen text-gray-200"
      style={{
        backgroundColor: '#605858', // Background color
      }}
    >
      <div
        className="w-[90vw] max-w-[390px] px-4 pb-8"
      >
        {/* YYGS Image Section - Doubled in size */}
        <div className="mb-6 flex justify-center">
          <img
            src={boxtop.src}
            alt="YYGS"
            className="w-[80vw] max-w-[300px] h-auto" // Increased size by 100%
          />
        </div>

        {/* Message Section */}
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-xl font-extrabold mb-0">DINA WONTONS</h2>
          <h2 className="text-3xl md:text-xl font-extrabold mb-4">TILLAGAS!</h2>
          <p className="text-xl md:text-lg font-semibold">ETA 5 MIN</p>
          
          {/* Display Order ID */}
          <p
            className="text-m md:text-lg font-bold mt-4 mb-16"
            style={{ color: '#EEEEEE' }}
          >
            {orderId ? `#${orderId}` : 'Loading...'}
          </p>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col items-center w-full space-y-4">
          <button
            className="w-full py-7 rounded-md border-2 font-semibold text-2xl"
            style={{
              color: '#F4F3F1F0',
              borderColor: '#F4F3F1F0',
            }}
          >
            SE KVITTO
          </button>

          <button
            onClick={handleNewOrder}
            className="w-full py-7 rounded font-semibold tracking-wide text-white text-2xl"
            style={{
              backgroundColor: '#353131',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#4B4B4B')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#353131')}
          >
            GÖR EN NY BESTÄLLNING
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalPage;
