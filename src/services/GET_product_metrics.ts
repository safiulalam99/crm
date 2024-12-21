import { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient'; // Adjust the import to your supabaseClient path


const useTopproducts = () => {
  const [topproducts, setTopproducts] = useState(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTopproducts = async () => {
      try {
        let { data, error } = await supabase.rpc(
          'get_top_selling_products_with_revenue'
        );
        if (error) throw error;
        setTopproducts(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopproducts();
  }, []);

  return { topproducts, error, isLoading };
};

export default useTopproducts;
