import { useState, useEffect, useCallback } from 'react';
import supabase from '../config/supabaseClient'; 

const useBuyers = () => {
  const [buyers, setBuyers] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBuyers = useCallback(async () => {
    setIsLoading(true);
    try {
      let { data, error } = await supabase.from('buyers').select('*');
      if (error) throw error;
      setBuyers(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBuyers();
  }, [fetchBuyers]);

  return { buyers, error, isLoading, refreshBuyers: fetchBuyers };
};

export default useBuyers;
