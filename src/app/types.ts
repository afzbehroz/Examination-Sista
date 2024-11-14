// src/app/types.ts

export interface MenuItem {
    id: number;
    name: string;
    type: string;
    price: number;
    description?: string;
    ingredients?: string[]; // Add this line to include ingredients
}

export interface OrderItem {
    item: MenuItem;
    quantity: number;
}
