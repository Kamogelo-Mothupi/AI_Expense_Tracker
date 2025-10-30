import React, { useState } from 'react';
import { Expense } from './types';
import { mockExpenses } from './data/mockExpenses';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseChart from './components/ExpenseChart';
import AiInsights from './components/AiInsights';

function App() {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [netIncome, setNetIncome] = useState(35000);

  const addExpense = (newExpense: Omit<Expense, 'id'>) => {
    setExpenses(prev => [{ ...newExpense, id: Date.now() }, ...prev]);
  };

  const deleteExpense = (id: number) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-200">
      <header className="bg-slate-800 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">
            FinSight AI Expense Tracker
          </h1>
          <p className="text-slate-400 mt-1">Your personal AI-powered financial dashboard.</p>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1 space-y-8">
            <ExpenseForm onAddExpense={addExpense} />
            <AiInsights 
              expenses={expenses} 
              netIncome={netIncome} 
              onUpdateIncome={setNetIncome}
              totalExpenses={totalExpenses}
            />
          </div>

          <div className="lg:col-span-2 space-y-8">
            <ExpenseChart expenses={expenses} />
            <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;