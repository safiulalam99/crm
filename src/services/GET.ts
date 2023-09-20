import { useQuery } from '@tanstack/react-query'
import supabase from "../config/supabaseClient";

type Product = {
  category: string | null;
  description: string | null;
  id: number;
  name: string;
  price: number;
};

 const fetchSellers = async (): Promise<Product[]> => {
  const { data, error } = await supabase.from("sellers").select("*");
  if (error) {
    throw error;
  }
  return data as Product[];
};

export const useSellers = () => {
  const { data: sellers, error, isLoading } = useQuery(["sellers"], fetchSellers);

  return { sellers, error, isLoading };
};

