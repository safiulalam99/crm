import { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient'; // Adjust the path to your Supabase configuration


type Seller = {
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
};

const useSellers = (): UseSellersResult => {
  const [sellers, setSellers] = useState<Seller[] | null>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        let { data, error } = await supabase.from('sellers').select('*');
        if (error) throw error;
        setSellers(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSellers();
  }, []);

  return { sellers, error, isLoading };
};

export default useSellers;
