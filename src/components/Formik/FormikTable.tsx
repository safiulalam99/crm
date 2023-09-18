import { useEffect, useRef } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FormikControl from './FormikControl';
import { Field, ErrorMessage, FieldArray } from 'formik';
// import DeleteIcon from '@material-ui/icons/Delete';
import { Box, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import productData from '../../Data/products.json';
import { INITIAL_VALUES } from 'src/utils/utils';
import { useFormikContext } from 'formik';
import _ from 'lodash';
import { numberToWords } from 'src/services/services';
import useProducts from '../../services/GET_PRODUCTS'; 

interface Column {
  id: 'Product' | 'Quantity' | 'Unit Price' | 'Amount' | 'Action' | 'lot' | 'Languageversion';
  label: string;
  minWidth?: number;
  align?: any;
  format?: (value: number) => string;
}


const columns: readonly Column[] = [
  { id: 'Product', label: 'Product', minWidth: 170 },
  { id: 'Languageversion', label: 'Language Version', minWidth: 100, align: 'center' },
  { id: 'lot', label: 'lot', minWidth: 100, align: 'center' },
  { id: 'Quantity', label: 'Quantity', minWidth: 100, align: 'center' },
  {
    id: 'Unit Price',
    label: 'Unit Price',
    minWidth: 170,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US')
  },
  {
    id: 'Amount',
    label: 'Amount',
    minWidth: 100,
    align: 'center',
    format: (value: number) => value.toLocaleString('en-US')
  },
  {
    id: 'Action',
    label: 'Action',
    minWidth: 100,
    align: 'center',
    format: (value: number) => value.toFixed(2)
  }
];

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

const FormikTable = (props) => {
  const { label, name, values, ...rest } = props;
  const { products, error: productError, isLoading: productLoading } = useProducts();

  const handleUnitsChange = (index, units) => {
    const unitPrice = Number(values[index].unitPrice);
    const unitTotal = parseFloat((units * unitPrice).toFixed(2));
    formik.setFieldValue(`${name}.${index}.units`, units);
    formik.setFieldValue(`${name}.${index}.unitTotal`, unitTotal);
  };

  const handleProductChange = (index, product) => {
    formik.setFieldValue(`${name}.${index}.name`, product);
    formik.setFieldValue(`${name}.${index}.unitPrice`, product.price);
  };
  
  // console.log(numberToWords(6))
  const handleUnitPriceChange = (index, unitPrice) => {
    const units = Number(values[index].units);
    const unitTotal = parseFloat((units * unitPrice).toFixed(2));
    formik.setFieldValue(`${name}.${index}.unitPrice`, unitPrice);
    formik.setFieldValue(`${name}.${index}.unitTotal`, unitTotal);
  };

  const handleUnitTotalChange = (index, unitTotal) => {
    const units = Number(values[index].units);
    const unitPrice = units !== 0 ? parseFloat((unitTotal / units).toFixed(2)) : 0;
    formik.setFieldValue(`${name}.${index}.unitTotal`, unitTotal);
    formik.setFieldValue(`${name}.${index}.unitPrice`, unitPrice);
  };
  
  const formik = useFormikContext();

  const calculateTotal = (products) => {
    return products.reduce(
      (total, product) => total + Number(product.unitTotal),
      0
    );
  };

  const calculateSubTotal = (products) => {
    return products.reduce(
      (total, product) =>
        total + Number(product.unitPrice) * Number(product.units),
      0
    );
  };

  const debouncedSave = useRef(
    _.debounce((values) => {
      values.forEach((product, index) => {
        const unitTotal = Number(product.unitPrice) * Number(product.units);
        formik.setFieldValue(`${name}.${index}.unitTotal`, unitTotal);
      });
    }, 100)
  ).current;

  const formikValues = formik.values as any;
  useEffect(() => {
    const subtotal = parseFloat(calculateSubTotal(values).toFixed(2));
    formik.setFieldValue('subTotal', Number(subtotal));
    
    const taxRate = formikValues.taxRate;
    const tax = parseFloat(((taxRate / 100) * subtotal).toFixed(2));
    formik.setFieldValue('totalTax', Number(tax));
  
    const discountRate = formikValues.discountRate;
    const discount = parseFloat(((discountRate / 100) * subtotal).toFixed(2));
    formik.setFieldValue('totalDiscount', Number(discount));
  
    const total = parseFloat((subtotal + tax - discount).toFixed(2));
    formik.setFieldValue('total', Number(total));
    formik.setFieldValue('numberInWords', numberToWords(Number(total)));
  
    // debouncedSave(values);
  }, [values, formikValues.taxRate, formikValues.discountRate]);
  
  
  if (productLoading) return <p>Loading...</p>;
  // @ts-ignore
  if (productError) return <p>Error: {productError.message}</p>;
  
  return (
    <FieldArray name={name}>
      {({ insert, remove, push, setFieldValue }) => {
        return (
          <>
            {
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {values.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <FormikControl
                            control="autocomplete"
                            type="text"
                            name={`${name}.${index}.name`}
                            options={products}
                            getOptionLabel={(option: any) => option?.name}
                            onChange={(e, product) => handleProductChange(index, product)}
                            />
                        </TableCell>
                        <TableCell>
                          <FormikControl
                            control="input"
                            type="text"
                            name={`${name}.${index}.languageversion`}
                            // onChange={(e) => handleUnitsChange(index, e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <FormikControl
                            control="input"
                            type="text"
                            name={`${name}.${index}.productlot`}
                            // onChange={(e) => handleUnitsChange(index, e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <FormikControl
                            control="input"
                            type="number"
                            name={`${name}.${index}.units`}
                            onChange={(e) => handleUnitsChange(index, e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <FormikControl
                            control="input"
                            type="number" 
                            name={`${name}.${index}.unitPrice`}
                            defaultValue={values[index].name?.price}
                            onChange={(e) => handleUnitPriceChange(index, e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <FormikControl
                            control="input"
                            type="number"
                            name={`${name}.${index}.unitTotal`}
                            onChange={(e) => handleUnitTotalChange(index, e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <Button onClick={() => remove(index)}>
                            {/* <DeleteIcon /> */}
                            X
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>

                </Table>
                <Button
                    onClick={() =>
                      push({
                        id: generateId(),
                        name: {},
                        units: 0,
                        unitPrice: 0,
                        unitVat: 0,
                        unitTotal: 0
                      })
                    }
                  >
                    Add Row
                  </Button>
              </TableContainer>
            }
          </>
        );
      }}
    </FieldArray>
  );
};

export default FormikTable;