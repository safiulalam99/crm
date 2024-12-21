// Define a TypeScript interface for User
export interface UserMetaData {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  phone?: string;
  confirmed_at: string;
  last_sign_in_at: string;
  app_metadata?: Record<string, unknown>;
  user_metadata?: Record<string, unknown>;
  identities?: Array<Record<string, unknown>>;
  created_at: string;
  updated_at: string;
}

interface CurrencyDetail {
  buyer_id: number;
  currency: {
    id: number;
    name: string;
  };
  time_stamp: string;
  invoicenumber: string;
}

export interface CustomerDashboardDetails {
    total_proforma_transactions?: number;
    total_invoice_transactions?: number;
    total_order_confirmation_transactions?: number;
    total_amount_invoices?: number;
    total_amount_proforma?: number;
    total_amount_order_confirmation?: number;
    buyer_name?: string;
    buyer_country?: string;
    buyer_vatnumber?: string;
    buyer_contractnumber?: string;
    buyer_address?: string;
    buyer_contact_details?: string;
    buyer_contactperson?: string;
    buyerid?: number;
    currency_details?: CurrencyDetail[];
    associated_invoices?: string[];
    associated_order_confirmations?: string[];
    associated_proformas?: string[];
  }
  