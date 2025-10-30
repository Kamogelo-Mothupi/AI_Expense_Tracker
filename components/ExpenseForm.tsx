import React, { useState } from 'react';
import { Expense, ExpenseCategory } from '../types';

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
}

const categories: ExpenseCategory[] = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Health', 'Other'];

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('Food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;

    onAddExpense({
      amount: parseFloat(amount),
      description,
      category,
      date,
    });

    // Reset form
    setAmount('');
    setDescription('');
    setCategory('Food');
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold text-slate-100 mb-4">Add New Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label htmlFor="amount" className="block text-sm font-medium text-slate-400">Amount</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        <span className="text-slate-400 sm:text-sm">R</span>
                    </div>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="block w-full rounded-md border-slate-600 bg-slate-700 text-slate-200 pl-7 pr-4 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="0.00"
                        required
                        step="0.01"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-slate-400">Date</label>
                <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 block w-full rounded-md border-slate-600 bg-slate-700 text-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3"
                required
                />
            </div>
        </div>
        <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-400">Description</label>
            <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-slate-600 bg-slate-700 text-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3"
            placeholder="e.g., Coffee with a friend"
            required
            />
        </div>
        <div>
            <label htmlFor="category" className="block text-sm font-medium text-slate-400">Category</label>
            <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
            className="mt-1 block w-full rounded-md border-slate-600 bg-slate-700 text-slate-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3"
            >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
        </div>
        <button type="submit" className="w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;