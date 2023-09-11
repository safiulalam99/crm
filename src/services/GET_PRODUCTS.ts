import { useQuery } from '@tanstack/react-query'
import supabase from "../config/supabaseClient";

type Product = {
  category: string | null;
  description: string | null;
  id: number;
  name: string;
  price: number;
};

const fetchProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase.from("products").select("*");
  if (error) {
    throw error;
  }
  return data as Product[];
};

const useProducts = () => {
  const { data: products, error, isLoading } = useQuery(["products"], fetchProducts);

  return { products, error, isLoading };
};

export default useProducts;
