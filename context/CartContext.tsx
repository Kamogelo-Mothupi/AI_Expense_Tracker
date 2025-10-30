
import React, { createContext, useReducer, Dispatch, ReactNode } from 'react';
import { Product, CartItem } from '../types';

type CartState = CartItem[];

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }
    case 'REMOVE_ITEM': {
      return state.filter(item => item.id !== action.payload);
    }
    case 'UPDATE_QUANTITY': {
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);
    }
    case 'CLEAR_CART': {
      return [];
    }
    default:
      return state;
  }
};

export const CartContext = createContext<{ state: CartState; dispatch: Dispatch<CartAction> } | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
