
import React, { useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { initialProducts } from '../data/products';
import { Product } from '../types';

interface ProductListPageProps {
    searchTerm: string;
}

const ProductListPage: React.FC<ProductListPageProps> = ({ searchTerm }) => {
  const [products] = React.useState<Product[]>(initialProducts);
  
  const filteredProducts = useMemo(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    if (!lowercasedSearchTerm) return products;

    return products.filter(product =>
      product.title.toLowerCase().includes(lowercasedSearchTerm) ||
      product.category.toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [products, searchTerm]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {searchTerm ? 'Results' : 'Our Collection'}
        </h1>
        <p className="text-md text-gray-600">
            {searchTerm ? `Showing results for "${searchTerm}"` : "Discover products curated just for you."}
        </p>
      </div>
      
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
            <p className="text-xl text-gray-500">No products found for "{searchTerm}".</p>
        </div>
      )}
    </div>
  );
};

export default ProductListPage;
