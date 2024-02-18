// useCustomerTotalsByCountry.ts
import { useQuery } from '@tanstack/react-query';
import supabase from 'src/config/supabaseClient';

interface CustomerTotal {
  customer_name: string;
  net_total: number;
  country: string;
  id: number;
  contact_person: string;
}

const fetchCustomerTotalsByCountry = async (countryName: string): Promise<CustomerTotal[]> => {
  let { data, error } = await supabase
    .rpc('get_customers_details_and_totals_by_country', { country_name: countryName });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const useCustomerTotalsByCountry = (countryName: string) => {
  return useQuery<CustomerTotal[], Error>(
    ['customerTotals', countryName], 
    () => fetchCustomerTotalsByCountry(countryName), 
    {
      enabled: !!countryName, 
    }
  );
};

export default useCustomerTotalsByCountry;
