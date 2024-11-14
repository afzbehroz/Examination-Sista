// src/app/components/Menu.tsx

import React from 'react';
import MenuItemList from './MenuItemList';
import { MenuItem } from '@/app/types';

interface MenuProps {
  onAddToOrder: (item: MenuItem, quantity: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

const Menu: React.FC<MenuProps> = ({ onAddToOrder, className, style }) => {
  return (
    <div className={`menu text-gray-200 ${className}`} style={style}>
      <h2
        className="text-3xl font-extrabold text-white"
        style={{
          marginLeft: "0",       // Ensures text is all the way to the left
          paddingLeft: "8px",    // Optional small padding for alignment
          marginBottom: "8px",   // Reduces space below "MENY"
          textAlign: "left"      // Aligns text to the left
        }}
      >
        MENY
      </h2>
      <div className="flex flex-col gap-4">
        {/* Replacing Wonton, Dip, and Drink with MenuItemList */}
        <MenuItemList type="wonton" onAddToOrder={onAddToOrder} />
        <MenuItemList type="dip" onAddToOrder={onAddToOrder} />
        <MenuItemList type="dricka" onAddToOrder={onAddToOrder} />
      </div>
    </div>
  );
};

export default Menu;
