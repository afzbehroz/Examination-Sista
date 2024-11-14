// src/app/components/Drink.tsx
import React, { useState, useEffect } from 'react';
import { MenuItem } from '@/app/types';

interface DrinkProps {
  onAddToOrder: (item: MenuItem, quantity: number) => void;
}

const API_KEY = 'yum-ngfeNG1iaq9Q2PJK';
const BASE_URL = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu';

const Drink: React.FC<DrinkProps> = ({ onAddToOrder }) => {
  const [drinkItems, setDrinkItems] = useState<MenuItem[]>([]);
  const [selectedDrink, setSelectedDrink] = useState<number | null>(null);

  useEffect(() => {
    const fetchDrinkItems = async () => {
      try {
        const response = await fetch(`${BASE_URL}?type=drink`, {
          headers: { 'x-zocom': API_KEY },
        });
        const data = await response.json();
        setDrinkItems(data.items);
      } catch (error) {
        console.error('Error fetching drink items:', error);
      }
    };
    fetchDrinkItems();
  }, []);

  const handleSelectDrink = (item: MenuItem) => {
    setSelectedDrink(item.id);
    onAddToOrder(item, 1);
  };

  return (
    <section className="menu-section mb-4">
      <div className="bg-[#605858] p-4 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">DRICKA</h3>
          
          {/* Dotted divider line between the title and price */}
          <div className="flex-1 border-dotted border-t border-gray-400 mx-2"></div>
          
          <span className="text-white font-bold">19 SEK</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {drinkItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelectDrink(item)}
              className={`p-2 rounded-md font-semibold text-white text-sm text-center transition-colors duration-200 ${
                selectedDrink === item.id
                  ? 'bg-[#353131]'
                  : 'bg-[#837C7C] hover:bg-gray-700'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Drink;
