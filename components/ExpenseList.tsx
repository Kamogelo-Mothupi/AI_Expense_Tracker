import React from 'react';
import { Expense } from '../types';
import { CategoryIcons, TrashIcon } from './Icons';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: number) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDeleteExpense }) => {
  const sortedExpenses = [...expenses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold text-slate-100 mb-4">Recent Expenses</h2>
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {sortedExpenses.length === 0 ? (
          <p className="text-center text-slate-400 py-8">No expenses yet. Add one to get started.</p>
        ) : (
          sortedExpenses.map(expense => {
            const Icon = CategoryIcons[expense.category] || CategoryIcons.Other;
            return (
              <div key={expense.id} className="flex items-center space-x-4 group">
                <div className="bg-slate-700 p-3 rounded-full text-slate-300">
                  <Icon />
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-slate-100">{expense.description}</p>
                  {/* FIX: Corrected typo from 'toLocaleDateDateString' to 'toLocaleDateString' */}
                  <p className="text-sm text-slate-400">{new Date(expense.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="text-right">
                        <p className="font-bold text-slate-100 text-lg">-R{expense.amount.toFixed(2)}</p>
                        <p className="text-sm text-slate-400">{expense.category}</p>
                    </div>
                    <button 
                        onClick={() => onDeleteExpense(expense.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-red-800"
                        aria-label={`Delete expense: ${expense.description}`}
                    >
                        <TrashIcon />
                    </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ExpenseList;