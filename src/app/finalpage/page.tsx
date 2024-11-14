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
      className="flex flex-col items-center justify-center min-h-screen text-gray-200"
      style={{
        backgroundColor: '#605858', // Background color
      }}
    >
      <div
        className="w-[90vw] max-w-[390px] px-4"
        style={{
          paddingBottom: '10vh',
        }}
      >
        {/* YYGS Image Section */}
        <div className="mb-4 flex justify-center">
          <img
            src={boxtop.src}
            alt="YYGS"
            className="w-[40vw] max-w-[150px] h-auto"
          />
        </div>

        {/* Message Section */}
        <div className="text-center mb-6">
          <h2 className="text-lg md:text-xl font-extrabold mb-0">DINA WONTONS</h2>
          <h2 className="text-lg md:text-xl font-extrabold mb-4">TILLAGAS!</h2>
          <p className="text-md md:text-lg font-semibold">ETA 5 MIN</p>
          
          {/* Display Order ID */}
          <p
            className="text-xs md:text-sm font-bold mt-2"
            style={{ color: '#EEEEEE' }}
          >
            {orderId ? `#${orderId}` : 'Loading...'}
          </p>
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col items-center w-full space-y-4">
          <button
            className="w-full py-2 rounded-md border-2 text-base font-semibold"
            style={{
              color: '#F4F3F1F0',
              borderColor: '#F4F3F1F0',
            }}
          >
            SE KVITTO
          </button>

          <button
            onClick={handleNewOrder}
            className="w-full py-2 rounded font-semibold tracking-wide text-white"
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
