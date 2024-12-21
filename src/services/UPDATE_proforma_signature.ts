import supabase from '../config/supabaseClient';

export const updateProformaSignature = async (proformaId: string, signatureId: string | null) => {
  const { data, error } = await supabase
    .from('proforma')
    .update({ signature_id: signatureId })
    .eq('proforma_id', proformaId)
    .select();

  if (error) throw error;
  return data;
}; 