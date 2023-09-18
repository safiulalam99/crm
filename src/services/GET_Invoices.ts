import { useQuery } from '@tanstack/react-query'
import supabase from '../config/supabaseClient'; // Adjust the path to your Supabase configuration

const fetchInvoices = async () => {
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
        contactperson, 
        contactpersonrole, 
        paymentterm, 
        deliveryterm, 
        registrationnumber
    )
  `);
  if (error) throw error;
  return data;
};

const useBuyers = () => {
  const { data: invoiceData, error, isLoading } = useQuery(
    ["invoices"],
    fetchInvoices,
    {
      staleTime: 10000, // data considered "fresh" for 10 seconds
    }
  );

  console.log(invoiceData)
  return { invoiceData, error, isLoading };
};
export default useBuyers;
