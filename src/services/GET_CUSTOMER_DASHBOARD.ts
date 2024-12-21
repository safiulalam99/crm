import { useAtomValue, useSetAtom } from 'jotai';
import supabase from '../config/supabaseClient.js';
import { useQuery } from '@tanstack/react-query';
import { customerDashboardDetailsAtom, loggedUser } from 'src/atoms/atoms.js';

async function fetchCustomerDashboardDetails(buyer_id, user_id) {

  const { data, error } = await supabase.rpc('get_buyer_dashboard', {
    buyer_id_param: buyer_id,
    user_id_param: user_id
  });

  if (error) {
    console.error('Error fetching dashboard details:', error);
    throw new Error(error.message);
  }

  return data[0];
}


export const usefetchCustomerDashboardDetails = (
  buyer_id_param,
  user_id_param
) => {
  const queryKey = [
    'customer_dashboard_details',
    buyer_id_param,
    user_id_param
  ];
  const queryFn = async () => {
    return fetchCustomerDashboardDetails(buyer_id_param, user_id_param);
  };

  const {
    data: customer_dashboard_details,
    error: customer_dashboard_details_error,
    isLoading: customer_dashboard_details_isLoading,
    refetch: refetch_customer_dashboard_details
  } = useQuery(queryKey, queryFn, {
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000
  });

  return {
    customer_dashboard_details,
    customer_dashboard_details_error,
    customer_dashboard_details_isLoading,
    refetch_customer_dashboard_details
  };
};

export const getLoggedInUserDetails = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Error fetching logged-in user details:', error);
    return null;
  }
  //  useAtomValue(loggedUser);
  return data.user;
};

// ****************************************************
// ***********  GET CUSTOMER INVOICE   ***************
const fetchInvoicesCustomerForUser = async (invoiceNumbers, buyerId) => {
  let { data, error } = await supabase.rpc('get_invoices_with_buyer_and_currency_details', {
    invoice_numbers: invoiceNumbers,
    buyer_id_param: buyerId
  });

  if (error) throw error;
  return data;
};

export const usefetchInvoicesCustomerForUser = (invoiceNumbers, buyerId) => {
  const queryKey = ['multiple_customer_invoices', invoiceNumbers, buyerId];
  const queryFn = async () => {
    return fetchInvoicesCustomerForUser(invoiceNumbers, buyerId);
  };

  const {
    data: multiple_customer_invoices,
    error: multiple_customer_invoices_error,
    isLoading: multiple_customer_invoices_isLoading,
    refetch: multiple_customer_invoices_refetch
  } = useQuery(queryKey, queryFn, {
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000
  });

  return {
    multiple_customer_invoices,
    multiple_customer_invoices_error,
    multiple_customer_invoices_isLoading,
    multiple_customer_invoices_refetch
  };
};

// Fetch Associated Order Confirmations from Supabase
const fetchOrderConfirmationsForUser = async (
  orderConfirmationNumbers,
  buyerId
) => {
  let { data, error } = await supabase.rpc(
    'get_multiple_order_confirmations_with_currencies',
    {
      order_confirmation_numbers: orderConfirmationNumbers,
      buyer_id_param: buyerId
    }
  );

  if (error) throw error;
  return data;
};

export const useFetchOrderConfirmationsForUser = (
  orderConfirmationNumbers,
  buyerId
) => {
  const queryKey = [
    'multiple_customer_order_confirmations',
    orderConfirmationNumbers,
    buyerId
  ];
  const queryFn = async () => {
    return fetchOrderConfirmationsForUser(orderConfirmationNumbers, buyerId);
  };

  const {
    data: multiple_customer_order_confirmations,
    error: multiple_customer_order_confirmations_error,
    isLoading: multiple_customer_order_confirmations_isLoading,
    refetch: multiple_customer_order_confirmations_refetch
  } = useQuery(queryKey, queryFn, {
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000
  });

  return {
    multiple_customer_order_confirmations,
    multiple_customer_order_confirmations_error,
    multiple_customer_order_confirmations_isLoading,
    multiple_customer_order_confirmations_refetch
  };
};

// Fetch Associated Proformas from Supabase
const fetchProformasForUser = async (proformaIds, buyerId) => {
  let { data, error } = await supabase.rpc('get_multiple_proformas_with_currencies', {
    proforma_ids: proformaIds,
    buyer_id_param: buyerId
  });

  if (error) throw error;
  return data;
};

export const useFetchProformasForUser = (proformaIds, buyerId) => {
  const queryKey = ['multiple_customer_proformas', proformaIds, buyerId];
  const queryFn = async () => {
    return fetchProformasForUser(proformaIds, buyerId);
  };

  const {
    data: multiple_customer_proformas,
    error: multiple_customer_proformas_error,
    isLoading: multiple_customer_proformas_isLoading,
    refetch: multiple_customer_proformas_refetch
  } = useQuery(queryKey, queryFn, {
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000
  });

  return {
    multiple_customer_proformas,
    multiple_customer_proformas_error,
    multiple_customer_proformas_isLoading,
    multiple_customer_proformas_refetch
  };
};
