import React, { useEffect, useRef } from 'react';
import { Expense } from '../types';

declare const Chart: any; // Using Chart.js from CDN

interface ExpenseChartProps {
  expenses: Expense[];
}

const categoryColors = {
  'Food': 'rgba(255, 99, 132, 0.8)',
  'Transport': 'rgba(54, 162, 235, 0.8)',
  'Utilities': 'rgba(255, 206, 86, 0.8)',
  'Entertainment': 'rgba(75, 192, 192, 0.8)',
  'Health': 'rgba(153, 102, 255, 0.8)',
  'Other': 'rgba(255, 159, 64, 0.8)',
};

const ExpenseChart: React.FC<ExpenseChartProps> = ({ expenses }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (!ctx) return;

      const dataByCat = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
      }, {} as { [key: string]: number });

      const labels = Object.keys(dataByCat);
      const data = Object.values(dataByCat);
      const backgroundColors = labels.map(label => categoryColors[label as keyof typeof categoryColors] || categoryColors.Other);

      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels,
          datasets: [{
            label: 'Expenses by Category',
            data,
            backgroundColor: backgroundColors,
            borderColor: '#1e293b', // slate-800
            borderWidth: 3,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#cbd5e1' // slate-300
              }
            },
            title: {
              display: true,
              text: 'Expense Breakdown',
              font: {
                  size: 18,
                  weight: 'bold',
              },
              color: '#f1f5f9' // slate-100
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [expenses]);

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg relative h-96 md:h-auto">
      {expenses.length === 0 ? (
          <div className="flex items-center justify-center h-full">
              <p className="text-slate-400">No data to display chart.</p>
          </div>
      ) : (
          <canvas ref={chartRef}></canvas>
      )}
    </div>
  );
};

export default ExpenseChart;