import React, { useState, useEffect } from 'react';
import { MenuItem } from '@/app/types';

interface WontonProps {
  onAddToOrder: (item: MenuItem, quantity: number) => void;
  className?: string; // Added className prop to control spacing from parent
}

const API_KEY = 'yum-ngfeNG1iaq9Q2PJK';
const BASE_URL = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu';

const Wonton: React.FC<WontonProps> = ({ onAddToOrder, className }) => {
  const [wontonItems, setWontonItems] = useState<MenuItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  useEffect(() => {
    const fetchWontonItems = async () => {
      try {
        const response = await fetch(`${BASE_URL}?type=wonton`, {
          headers: { 'x-zocom': API_KEY },
        });
        const data = await response.json();
        setWontonItems(data.items);
      } catch (error) {
        console.error('Error fetching wonton items:', error);
      }
    };
    fetchWontonItems();
  }, []);

  const handleItemClick = (item: MenuItem) => {
    setSelectedItemId(item.id);
    onAddToOrder(item, 1); // Adds item when clicked
  };

  return (
    <section className={`menu-section p-4 rounded-lg shadow-lg bg-[#605858] ${className}`}>
      {/* Changed background color to #605858 */}
      {wontonItems.map((item) => (
        <div
          key={item.id}
          className={`p-4 border-b border-gray-600 text-white cursor-pointer transition-colors duration-200 ${
            selectedItemId === item.id ? 'bg-[#353131]' : 'hover:bg-gray-700'
          }`}
          onClick={() => handleItemClick(item)} // Click handler to add item
        >
          <div className="flex justify-between items-center">
            <h4 className="font-bold uppercase">{item.name}</h4>
            
            {/* Dotted divider line between the name and price */}
            <div className="flex-1 border-dotted border-t border-gray-400 mx-2"></div>
            
            <span className="font-bold">
              {item.price} SEK
            </span>
          </div>
          <p className="text-sm text-gray-300">
            {item.ingredients ? item.ingredients.join(', ') : 'No ingredients available'}
          </p>
        </div>
      ))}
    </section>
  );
};

export default Wonton;
