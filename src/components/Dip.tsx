import React, { useState, useEffect } from 'react';
import { MenuItem } from '@/app/types';

interface DipProps {
  onAddToOrder: (item: MenuItem, quantity: number) => void;
  className?: string; // Added className prop to control spacing from parent
}

const API_KEY = 'yum-ngfeNG1iaq9Q2PJK';
const BASE_URL = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu';

const Dip: React.FC<DipProps> = ({ onAddToOrder, className }) => {
  const [dipItems, setDipItems] = useState<MenuItem[]>([]);
  const [selectedDip, setSelectedDip] = useState<number | null>(null);

  useEffect(() => {
    const fetchDipItems = async () => {
      try {
        const response = await fetch(`${BASE_URL}?type=dip`, {
          headers: { 'x-zocom': API_KEY },
        });
        const data = await response.json();
        setDipItems(data.items);
      } catch (error) {
        console.error('Error fetching dip items:', error);
      }
    };
    fetchDipItems();
  }, []);

  const handleSelectDip = (item: MenuItem) => {
    setSelectedDip(item.id);
    onAddToOrder(item, 1); // Adds item when clicked
  }; 

  return (
    <section className={`menu-section p-4 rounded-lg shadow-lg bg-[#605858] ${className}`}>
      {/* Changed background color to #605858 */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">DIPSÅS</h3>
        
        {/* Dotted divider line between the title and price */}
        <div className="flex-1 border-dotted border-t border-gray-400 mx-2"></div>
        
        <span className="text-white font-bold">19 SEK</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {dipItems.map((item) => (
          <button
            key={item.id} 
            onClick={() => handleSelectDip(item)} // Click handler to add item
            className={`p-2 rounded-md font-semibold text-white ${
              selectedDip === item.id ? 'bg-[#353131]' : 'bg-[#837C7C] hover:bg-gray-700'
            } transition-colors duration-200`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Dip;
