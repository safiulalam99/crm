import { useState, useEffect } from 'react';
import supabase from 'src/config/supabaseClient';
import countriesData from '../../Data/countries.json';

interface CountryData {
  url: string;
  alpha3: string;
  label: string;
  value: string;
  file_url: string;
}
interface SalesData {
  country: string;
  id: string; // Previously alpha3
  value: number; // Previously totalSales
  file_url: string;
}

interface AggregatedSales {
  [countryName: string]: {
    totalSales: number;
    file_url: string;
  };
}

interface SalesDataWithAlpha3 {
  country: string;
  alpha3: string;
  totalSales: number;
}

const useSalesByCountry = () => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const salesAggregation: AggregatedSales = {};
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        // Fetch buyers data
        const { data: buyersData, error: buyersError } = await supabase
          .from('buyers')
          .select('*');
        if (buyersError) throw buyersError;

        // Fetch invoices data
        const { data: invoicesData, error: invoicesError } = await supabase
          .from('invoices')
          .select('*');
        if (invoicesError) throw invoicesError;

        // Fetch invoices_products data
        const { data: invoicesProductsData, error: invoicesProductsError } =
          await supabase.from('invoices_products').select('*');
        if (invoicesProductsError) throw invoicesProductsError;

        // Aggregate sales by country
        const salesAggregation = invoicesData.reduce((acc, invoice) => {
          const buyer = buyersData.find((b) => b.id === invoice.buyer_id);
          const products = invoicesProductsData.filter(
            (p) => p.invoicenumber === invoice.invoicenumber
          );
          const totalSales = products.reduce(
            (sum, product) => sum + product.unittotal,
            0
          );

          if (buyer && buyer.country) {
            if (!acc[buyer.country]) {
              acc[buyer.country] = { totalSales: 0 };
            }
            acc[buyer.country].totalSales += totalSales;
          }

          return acc;
        }, {});

        // Map alpha3 codes and sort
        const formattedSalesData: SalesData[] = Object.entries(salesAggregation)
          .map(([countryName, data]) => {
            const countryInfo = countriesData.find(
              (country) => country.label === countryName
            ) || { alpha3: 'N/A' }; // Use default object with alpha3
            return {
              country: countryName,
              id: countryInfo?.alpha3 || 'N/A',
              // @ts-ignore

              file_url: countryInfo?.file_url || 'N/A',
              // @ts-ignore
              value: data?.totalSales
            };
          })
          .sort((a, b) => b.value - a.value)
          .slice(0, 5);

        setSalesData(formattedSalesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  return { salesData, isLoading, error };
};

export default useSalesByCountry;
