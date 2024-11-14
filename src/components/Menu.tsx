// src/app/components/Menu.tsx

import React from 'react';
import Wonton from './Wonton';
import Dip from './Dip';
import Drink from './Drink';
import { MenuItem } from '@/app/types';

interface MenuProps {
  onAddToOrder: (item: MenuItem, quantity: number) => void;
  className?: string;
}

const Menu: React.FC<MenuProps> = ({ onAddToOrder, className }) => {
  return (
    <div
      className={`menu text-gray-200 ${className}`}
      style={{
        backgroundColor: '#489078', // Custom mint color background remains as specified
        width: '358px',
        height: '1068px',           
        padding: '16px',
        borderRadius: '4px',
        gap: '16px',
        position: 'relative',
        top: '110px',
        left: '16px',
        minHeight: '851.2px',
        paddingTop: "50px"
      }}
    >
      <h2 className="text-3xl font-extrabold mb-2 text-center text-white mr-60">MENY</h2>
      <div className="flex flex-col gap-4">
        <Wonton onAddToOrder={onAddToOrder} />
        <Dip onAddToOrder={onAddToOrder} />
        <Drink onAddToOrder={onAddToOrder} />  
      </div>  
    </div>
  );
};   

export default Menu;
