// src/app/components/MenuItemList.tsx

import React, { useState, useEffect } from 'react';
import { MenuItem } from '@/app/types';

interface MenuItemListProps {
  type: string;
  onAddToOrder: (item: MenuItem, quantity: number) => void;
}

const API_KEY = 'yum-ngfeNG1iaq9Q2PJK';
const BASE_URL = 'https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/menu';

const MenuItemList: React.FC<MenuItemListProps> = ({ type, onAddToOrder }) => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${BASE_URL}?type=${type}`, {
          headers: { 'x-zocom': API_KEY },
        });
        const data = await response.json();
        setItems(data.items);
      } catch (error) {
        console.error(`Error fetching ${type} items:`, error);
      }
    };
    fetchItems();
  }, [type]);

  const handleItemClick = (item: MenuItem) => {
    setSelectedItemId(item.id);
    onAddToOrder(item, 1); // Adds item to cart immediately when clicked
  };

  return (
    <section
      className={`menu-section p-4 rounded-lg shadow-lg mb-4 ${
        type === "wonton" ? "bg-[#605858]" : "bg-[#605858]"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white uppercase">
          {type === "wonton" ? "Wontons" : type === "dip" ? "Dipsås" : "Dricka"}
        </h3>
        
        {/* Dotted divider line and price for dip and drink sections */}
        {type !== "wonton" && (
          <>
            <div className="flex-1 border-dotted border-t border-gray-400 mx-2"></div>
            <span className="text-white font-bold">19 SEK</span>
          </>
        )}
      </div>

      {type === "wonton" ? (
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={`p-4 border-b border-gray-400 text-white cursor-pointer transition-colors duration-200 ${
                selectedItemId === item.id ? 'bg-[#353131]' : 'hover:bg-gray-700'
              }`}
              onClick={() => handleItemClick(item)} // Click handler to add item to cart
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold uppercase text-sm">{item.name}</span>
                <div className="flex-1 border-dotted border-t border-gray-400 mx-2"></div>
                <span className="font-bold text-sm">{item.price} SEK</span>
              </div>
              <p className="text-sm text-gray-300">{item.ingredients?.join(", ") || "No ingredients available"}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`p-2 rounded-md font-semibold text-white ${
                selectedItemId === item.id ? 'bg-[#353131]' : 'bg-[#837C7C] hover:bg-gray-700'
              } transition-colors duration-200`}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default MenuItemList;
