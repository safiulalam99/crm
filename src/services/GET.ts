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


export const getproduct = async (id:string) => {
  try {
    // Fetch from the invoices table
    const { data: productData, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('id', id);

    if (productError) throw productError;

    return productData;
  } catch (error) {
    console.error('Error fetching product data:', error);
    alert('There was an error fetching the product data.');
    return null;
  }
};
export const getcustomer = async (id:string) => {
  try {
    // Fetch from the products table
    const { data: customerData, error: customerError } = await supabase
      .from('buyers')
      .select('*')
      .eq('id', id);

    if (customerError) throw customerError;

    return customerData;
  } catch (error) {
    console.error('Error fetching customer data:', error);
    alert('There was an error fetching the customer data.');
    return null;
  }
};
