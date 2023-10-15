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



import { useState, useEffect } from 'react';

type BankDetail = {
  name: string;
  bankbic: string;
  bankname: string;
  accountname: string;
  id: number;
  iban: string;
  bank: string;
  bic: string;
  seller_id: number;
  user_id: string | null;
};

type UseBankDetailsResult = {
  bankDetails: BankDetail[] | null;
  error: any;
  isLoading: boolean;
};

export const useBankDetails = (): UseBankDetailsResult => {
  const [bankDetails, setBankDetails] = useState<BankDetail[] | null>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        let { data, error } = await supabase
          .from('bank_details')
          .select('*');
          // .eq('seller_id', seller_id);
        if (error) throw error;
        setBankDetails(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

      fetchBankDetails();
    
  }, []);  // Re-fetch bank details whenever seller_id changes

  return { bankDetails, error, isLoading };
};

export default useBankDetails;

