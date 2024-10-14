import { useEffect, useRef, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Field, ErrorMessage, FieldArray } from 'formik';
// import DeleteIcon from '@material-ui/icons/Delete';
import { Box, Button, Drawer, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { INITIAL_VALUES } from 'src/utils/utils';
import { useFormikContext } from 'formik';
import _ from 'lodash';
import { numberToWords } from 'src/services/services';
import CreateProductForm from 'src/content/pages/ProductsPage/CreateProduct';
import useProducts from 'src/services/GET_PRODUCTS';
import FormikControl from 'src/components/Formik/FormikControl';
interface Column {
  id:
    | 'Product'
    | 'Quantity'
    | 'Unit Price'
    | 'Amount'
    | 'Action'
    | 'lot'
    | 'Languageversion';
  label: string;
  minWidth?: number;
  align?: any;
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'Product', label: 'Product', minWidth: 170 },
  {
    id: 'Languageversion',
    label: 'Language Version',
    minWidth: 100,
    align: 'center'
  },
  { id: 'lot', label: 'lot/exp', minWidth: 100, align: 'center' },
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = () => setDrawerOpen(false);

  const {
    products,
    error: productError,
    isLoading: productLoading,
    refetch
  } = useProducts();

  const formik = useFormikContext();

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
    const unitPrice =
      units !== 0 ? parseFloat((unitTotal / units).toFixed(2)) : 0;
    formik.setFieldValue(`${name}.${index}.unitTotal`, unitTotal);
    formik.setFieldValue(`${name}.${index}.unitPrice`, unitPrice);
  };


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


  const formikValues = formik.values as any;
  const formatToTwoDecimalPlaces = (num) => parseFloat(num.toFixed(2));

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

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  // Add a function to refresh products
  const refreshProducts = async () => {
    await refetch();
  };
  return (
    <FieldArray name={name}>
      {({ insert, remove, push }) => {
        return (
          <>
            {
              <TableContainer sx={{ maxHeight: 440 }}>
            <Grid container justifyContent="flex-end">
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                PaperProps={{
                  style: {
                    width: '70%',
                  },
                }}
              >
                <Button onClick={toggleDrawer(false)}>Close</Button>
                <CreateProductForm afterCreate={refreshProducts} closeDrawer={closeDrawer} />
              </Drawer>
              <Button onClick={toggleDrawer(true)}><AddIcon/> Create New Product</Button>
            </Grid>
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
                      <TableRow key={product.id || index}>
                        <TableCell>
                          <FormikControl
                            control="autocomplete"
                            type="text"
                            name={`${name}.${index}.name`}
                            options={products}
                            getOptionLabel={(option: any) => option?.name}
                            onChange={(e, product) =>
                              handleProductChange(index, product)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <FormikControl
                            control="input"
                            type="text"
                            name={`${name}.${index}.languageversion`}
                            // onChange={(e) => handleUnitsChange(index, e.target.value)}
                            style={{ width: '100px', height: '60px' }}
                          />
                        </TableCell>
                        <TableCell>
                          <FormikControl
                            control="input"
                            type="text"
                            name={`${name}.${index}.productlot`}
                            // onChange={(e) => handleUnitsChange(index, e.target.value)}
                            style={{ width: '100px', height: '60px' }}
                          />
                        </TableCell>
                        <TableCell>
                          <FormikControl
                            control="input"
                            type="number"
                            name={`${name}.${index}.units`}
                            onChange={(e) =>
                              handleUnitsChange(index, e.target.value)
                            }
                            style={{ width: '100px', height: '60px' }}
                          />
                        </TableCell>
                        <TableCell>
                          <FormikControl
                            control="input"
                            type="number"
                            name={`${name}.${index}.unitPrice`}
                            defaultValue={values[index].name?.price}
                            onChange={(e) =>
                              handleUnitPriceChange(index, e.target.value)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <FormikControl
                            control="input"
                            type="text"
                            name={`${name}.${index}.unitTotal`}
                            onChange={(e) =>
                              handleUnitTotalChange(index, e.target.value)
                            }
                            style={{ width: '100px', height: '60px' }}
                          />
                        </TableCell>
                        <TableCell>
                          <Button onClick={() => remove(index)}>
                            {/* <DeleteIcon /> */}X
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
