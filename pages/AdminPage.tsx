
import React, { useState } from 'react';
import { initialProducts } from '../data/products';
import { Product } from '../types';
import { generateDescription } from '../services/geminiService';

const AdminPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [newProduct, setNewProduct] = useState({ title: '', price: '', description: '', image: 'https://picsum.photos/seed/new/600/600', category: '' });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateDescription = async () => {
    if (!newProduct.title) {
        alert("Please enter a product title first.");
        return;
    }
    setIsGenerating(true);
    try {
        const description = await generateDescription(newProduct.title);
        setNewProduct(prev => ({ ...prev, description }));
    } catch (error) {
        console.error(error);
        alert("Failed to generate description.");
    } finally {
        setIsGenerating(false);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const productToAdd: Product = {
      id: Date.now(),
      ...newProduct,
      price: parseFloat(newProduct.price),
    };
    // In a real app, this would be an API call.
    // Here we just update the client-side state for demonstration.
    setProducts(prev => [productToAdd, ...prev]);
    // Note: This state is not persisted. Refreshing the page will reset the product list.
    setNewProduct({ title: '', price: '', description: '', image: `https://picsum.photos/seed/${Date.now()}/600/600`, category: '' });
    alert('Product added successfully! (Note: This is temporary and will be lost on page refresh)');
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
        <form onSubmit={handleAddProduct} className="space-y-4">
          <div>
            <label htmlFor="title" className="block font-medium text-gray-700">Product Title</label>
            <input type="text" name="title" value={newProduct.title} onChange={handleInputChange} className="w-full p-2 border rounded-md" required />
          </div>
          <div>
            <label htmlFor="price" className="block font-medium text-gray-700">Price</label>
            <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} className="w-full p-2 border rounded-md" required />
          </div>
          <div>
            <label htmlFor="category" className="block font-medium text-gray-700">Category</label>
            <input type="text" name="category" value={newProduct.category} onChange={handleInputChange} className="w-full p-2 border rounded-md" required />
          </div>
          <div>
            <label htmlFor="description" className="block font-medium text-gray-700">Description</label>
            <div className="relative">
                <textarea name="description" value={newProduct.description} onChange={handleInputChange} rows={4} className="w-full p-2 border rounded-md" required />
                <button 
                  type="button" 
                  onClick={handleGenerateDescription}
                  disabled={isGenerating}
                  className="absolute bottom-2 right-2 bg-gray-700 text-white px-3 py-1 text-sm rounded-md hover:bg-gray-800 disabled:bg-gray-400"
                >
                  {isGenerating ? 'Generating...' : 'Generate with AI'}
                </button>
            </div>
          </div>
          <button type="submit" className="w-full bg-[#131921] text-white py-2 rounded-md font-semibold hover:bg-gray-800">Add Product</button>
        </form>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Current Products ({products.length})</h2>
        <div className="space-y-3 h-96 overflow-y-auto">
            {products.map(p => (
                <div key={p.id} className="flex justify-between items-center p-2 border-b">
                    <span>{p.title}</span>
                    <span className="font-semibold">${p.price.toFixed(2)}</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
