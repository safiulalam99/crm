import { useState, useEffect } from 'react';
import supabase from '../config/supabaseClient'; // Adjust the path to your Supabase configuration

const useBuyers = (): any => {
  const [invoiceData, setBuyers] = useState<any[] | null>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        let { data, error } = await supabase.from('invoices').select(`
          invoicenumber, 
          deliverydate, 
          total, 
          time_stamp, 
          buyer_id,
          buyers (
              id, 
              name, 
              address, 
              country, 
              vatnumber, 
              contractnumber, 
              representative, 
              paymentterm, 
              deliveryterm, 
              currency, 
              registrationnumber
          )
      `);
        if (error) throw error;
        setBuyers(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  return { invoiceData, error, isLoading };
};

export default useBuyers;
