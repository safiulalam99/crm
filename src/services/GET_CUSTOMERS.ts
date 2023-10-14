import { useState, useEffect, useCallback } from 'react';
import supabase from '../config/supabaseClient'; 

const useCustomers = () => {
  const [customers, setCustomers] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCustomers = useCallback(async () => {
    setIsLoading(true);
    try {
      let { data, error } = await supabase.from('buyers').select('*');
      if (error) throw error;
      setCustomers(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return { customers, error, isLoading, refreshCustomers: fetchCustomers };
};

export default useCustomers;
