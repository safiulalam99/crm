import { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient'; // Adjust the path to your Supabase configuration

type Buyer = {
  address: string
  contractnumber: string | null
  country: string
  currency: string | null
  deliveryterm: string | null
  id: number
  name: string
  paymentterm: string | null
  registrationnumber: string | null
  representative: string | null
  vatnumber: string | null
};

type UseBuyersResult = {
  buyers: Buyer[] | null;
  error: any;
  isLoading: boolean;
};

const useBuyers = (): UseBuyersResult => {
  const [buyers, setBuyers] = useState<Buyer[] | null>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        let { data, error } = await supabase.from('buyers').select('*');
        if (error) throw error;
        setBuyers(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBuyers();
  }, []);

  return { buyers, error, isLoading };
};

export default useBuyers;
