import * as Yup from 'yup';

export const INITIAL_PRODUCT = {
  name: {},
  units: 0,
  unitPrice: 0,
  unitVat: 0,
  unitTotal: 0
};

export const VAT_TYPE = {
  label: '',
  value: '',
  vat: 0,
  text: ''
};
export const INITIAL_VALUES = {
  invoiceNumber: '',
  buyerData: null,
  sellerData: null,
  vatType: {},
  date: null,
  currency: {
    name: 'Euro',
    symbol: '€'
  },
  deliveryTerm: '',
  deliveryDate: null,
  paymentSplit: '',
  products: [INITIAL_PRODUCT],
  subTotal: 0,
  total: 0,
  taxRate: 0,
  totalTax: 0,
  totalDiscount: 0,
  discountRate: 0,
  numberInWords: '',
  comments: '',
  paymentStatus: ''
};


export const validationSchema = Yup.object().shape({
  invoiceNumber: Yup.string().required('Invoice number is required'),
  buyerData: Yup.object().required('Buyer data is required'),
  sellerData: Yup.object().nullable().required('Seller data is required'),
  vatType: Yup.object(),
  date: Yup.date().nullable().required('Date is required'),
  currency: Yup.object().shape({
    name: Yup.string(),
    symbol: Yup.string()
  }),
  deliveryTerm: Yup.string(),
  deliveryDate: Yup.date().nullable().required('Delivery date is required'),
  paymentSplit: Yup.string(),
  products: Yup.array().of(
    Yup.object().shape({
      name: Yup.object().required('Product name is required'),
      units: Yup.number().min(0, 'Units must be 0 or more').required('Units are required'),
      unitPrice: Yup.number().min(0, 'Unit price must be 0 or more').required('Unit price is required'),
      unitVat: Yup.number().min(0, 'Unit VAT must be 0 or more').required('Unit VAT is required'),
      unitTotal: Yup.number().min(0, 'Unit total must be 0 or more').required('Unit total is required')
    })
  ).required('At least one product is required'),
  taxRate: Yup.number().min(0, 'Tax rate must be between 0 and 100').max(100, 'Tax rate must be between 1 and 100'),
  discountRate: Yup.number().min(0, 'Discount rate must be between 0 and 100').max(100, 'Discount rate must be between 1 and 100'),
  comments: Yup.string(),
  paymentStatus: Yup.string()
});