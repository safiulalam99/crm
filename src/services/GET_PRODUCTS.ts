import { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient'; 

type Product = {
    category: string | null
    description: string | null
    id: number
    name: string
    price: number
};

type UseProductsResult = {
  products: Product[] | null;
  error: any;
  isLoading: boolean;
};

const useProducts = (): UseProductsResult => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if products are already in cache
    const cachedProducts = sessionStorage.getItem('products');
    if (cachedProducts) {
      setProducts(JSON.parse(cachedProducts));
      setIsLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        let { data, error } = await supabase.from('products').select('*');
        if (error) throw error;
        setProducts(data);
        // Cache the products data
        sessionStorage.setItem('products', JSON.stringify(data));
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []); 
  
  return { products, error, isLoading };
};

export default useProducts;
