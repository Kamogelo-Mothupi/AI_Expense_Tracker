export type ExpenseCategory = 'Food' | 'Transport' | 'Utilities' | 'Entertainment' | 'Health' | 'Other';

export interface Expense {
  id: number;
  date: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
}

// FIX: Add Product and CartItem types to be used across the e-commerce part of the application.
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}
