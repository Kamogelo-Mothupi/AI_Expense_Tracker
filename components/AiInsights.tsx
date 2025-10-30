import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Expense } from '../types';
import { generateInsights } from '../services/geminiService';
import { SpinnerIcon } from './Icons';

interface AiInsightsProps {
  expenses: Expense[];
  netIncome: number;
  onUpdateIncome: (income: number) => void;
  totalExpenses: number;
}

const AiInsights: React.FC<AiInsightsProps> = ({ expenses, netIncome, onUpdateIncome, totalExpenses }) => {
  const [insights, setInsights] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [localIncome, setLocalIncome] = useState(netIncome.toString());
  
  const remainingBalance = netIncome - totalExpenses;

  useEffect(() => {
    setLocalIncome(netIncome.toString());
  }, [netIncome]);

  const handleGetInsights = async () => {
    if (netIncome <= 0) {
        alert("Please set your net income to get personalized advice.");
        return;
    }
    setIsLoading(true);
    setInsights('');
    const result = await generateInsights(expenses, netIncome, totalExpenses);
    setInsights(result);
    setIsLoading(false);
  };

  const handleIncomeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newIncome = parseFloat(localIncome);
    if (!isNaN(newIncome) && newIncome > 0) {
        onUpdateIncome(newIncome);
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold text-slate-100 mb-4">Financial Advisor</h2>

      <div className="bg-slate-700 p-4 rounded-lg mb-4">
        <h3 className="text-lg font-semibold text-slate-200 mb-2">Financial Summary</h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Net Income:</span>
            <span className="font-medium text-slate-100">R{netIncome.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Total Expenses:</span>
            <span className="font-medium text-red-400">- R{totalExpenses.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t border-slate-600 pt-1 mt-1">
            <span className="font-bold text-slate-300">Remaining:</span>
            <span className={`font-bold ${remainingBalance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              R{remainingBalance.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleIncomeSubmit} className="mb-4">
        <label htmlFor="netIncome" className="block text-sm font-medium text-slate-400 mb-1">Your Monthly Net Income</label>
        <div className="flex space-x-2">
            <div className="relative flex-grow">
                 <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <span className="text-slate-400 sm:text-sm">R</span>
                </div>
                <input
                    type="number"
                    id="netIncome"
                    value={localIncome}
                    onChange={(e) => setLocalIncome(e.target.value)}
                    className="block w-full rounded-md border-slate-600 bg-slate-700 text-slate-200 pl-7 pr-4 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="e.g., 35000"
                    step="100"
                />
            </div>
            <button type="submit" className="px-4 py-2 text-sm font-semibold bg-slate-600 rounded-md hover:bg-slate-500 transition-colors">Set</button>
        </div>
      </form>

      <button
        onClick={handleGetInsights}
        disabled={isLoading || expenses.length === 0 || netIncome <= 0}
        className="w-full flex items-center justify-center bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold text-sm hover:bg-indigo-700 disabled:bg-slate-500 disabled:cursor-not-allowed transition-colors mb-4"
      >
        {isLoading ? (
            <>
              <SpinnerIcon />
              <span className="ml-2">Analyzing...</span>
            </>
        ) : 'Get Personalised Insights'}
      </button>

      <div className="bg-slate-700 p-4 rounded-lg min-h-[150px] prose prose-sm max-w-none prose-invert prose-headings:font-semibold prose-p:text-slate-300">
        {isLoading && <p className="text-center text-slate-400">FinSight is analyzing your spending...</p>}
        {insights ? (
           <ReactMarkdown remarkPlugins={[remarkGfm]}>{insights}</ReactMarkdown>
        ) : (
          !isLoading && <p className="text-center text-slate-400">Your personalized financial analysis will appear here. Set your income, add expenses, and click the button above.</p>
        )}
      </div>
    </div>
  );
};

export default AiInsights;