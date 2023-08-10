import { useEffect, useRef } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import FormikControl from '../Formik/FormikControl';
import { Field, ErrorMessage, FieldArray } from 'formik';
import DeleteIcon from '@material-ui/icons/Delete';
import { Box, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import productData from '../../Data/products.json';
import { INITIAL_VALUES } from 'src/utils/utils';
import { useFormikContext } from 'formik';
import _ from 'lodash';
import { convertNumberToWords } from 'src/services/services';
import { useForm } from "react-hook-form";


interface Column {
  id: 'Product' | 'Quantity' | 'Unit Price' | 'Amount' | 'Action';
  label: string;
  minWidth?: number;
  align?: any;
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'Product', label: 'Product', minWidth: 170 },
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
  const form = useForm()

  
  return (
    <FieldArray name={name}>
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
                      <TableRow key={product.id}>
                        <TableCell>
                          <FormikControl
                            control="autocomplete"
                            type="text"
                            name={`${name}.${index}.name`}
                            options={productData}
                            getOptionLabel={(option: any) => option?.name}
                            onChange={(e, product) => handleProductChange(index, product)}
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
                            <DeleteIcon />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
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
                </Table>
              </TableContainer>
            }
          </>
        );
    </FieldArray>
  );
};

export default FormikTable;