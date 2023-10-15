import { useState, useEffect, useCallback } from 'react';
import supabase from '../config/supabaseClient'; // Adjust the path to your Supabase configuration


type Seller = {
  bankaccountname: string;
  iban: string;
  bankname: string;
  bankbic: string;
  address: string;
  country: string | null;
  displayname: string | null;
  id: number;
  managingdirector: string | null;
  name: string;
  vatnumber: string | null;
};

type UseSellersResult = {
  sellers: Seller[] | null;
  error: any;
  isLoading: boolean;
  fetchSellers: any;
  
};

const useSellers = () => {
  const [sellers, setSellers] = useState<Seller[] | null>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

 
  const refreshSellers  = useCallback(async () => {
    setIsLoading(true);
    try {
      let { data, error } = await supabase.from('sellers').select('*');
      if (error) throw error;
      setSellers(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);
    useEffect(() => {
    refreshSellers ();
  }, []);

  return { sellers, error, isLoading, refreshSellers  };  
};

export default useSellers;
