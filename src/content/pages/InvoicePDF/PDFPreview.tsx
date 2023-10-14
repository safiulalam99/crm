import React, { useEffect, useState } from 'react';
import {
  Document,
  PDFViewer,
  PDFDownloadLink
} from '@react-pdf/renderer';
import PDF from './Document';
import './index.css';
import { getInvoiceData } from 'src/services/GET_invoice_preview';
import { useParams } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import Content from './Content';
import { numberToWords } from 'src/utils/towords';

const Invoice = () => {
  const [sample_data, setSample_data] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getInvoiceData(id);
        setSample_data(data[0]);
        
      } catch (error) {
        console.error('Failed to fetch invoice data:', error);
      }
    }

    fetchData();
  }, []);
  function testNumberToWords() {
    const testValues = [
      10110.40,
      234234.30,
      3234424.32,
      10000.00,
      10001.00,
      10100.00,
      11000.00,
      11111.11,
    ];
  
    for (let i = 0; i < testValues.length; i++) {
      const value = testValues[i];
      console.log(`${value} => ${numberToWords(value)}`);
    }
  }
  
  testNumberToWords();  return (
    <div className="container">
      <div className="pdf-viewer">
        <PDFViewer showToolbar={true} className="viewer">
          <Document>
            <PDF sample_data={sample_data} />
            <Content />
          </Document>
        </PDFViewer>
      </div>
      {/* <div className="download-button">
        <PDFDownloadLink document={<PDF sample_data={sample_data} />} fileName="order-confirmation.pdf">
          {({ loading }) =>
            loading ? (
              "Loading document..."
            ) : (
              // <Button variant="contained" color="primary">
              //   Download
              // </Button>
            )
          }
        </PDFDownloadLink>
      </div> */}
    </div>
  );
};

export default Invoice;

