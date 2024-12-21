import React, { useEffect, useState } from 'react';
import {
  Document,
  PDFViewer,
  PDFDownloadLink
} from '@react-pdf/renderer';
import PDF from './Document';
import './index.css';
import { getOrder_confirmation } from 'src/services/GET_order_confirmation_preview';
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
        const data = await getOrder_confirmation(id);
        setSample_data(data[0]);
        
      } catch (error) {
        console.error('Failed to fetch invoice data:', error);
      }
    }

    fetchData();
  }, []);

  return (
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
              {/* <pre>{JSON.stringify(sample_data, null, 2)}</pre> */}

    </div>
  );
};

export default Invoice;

