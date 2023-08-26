import React from 'react';

const DownloadButton: React.FC = () => {
  const downloadInvoice = async () => {
    try {
      const response = await fetch('http://localhost:3001/generate-invoice');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'invoice.docx';
      a.click();
    } catch (error) {
      console.error('Error downloading the file.', error);
    }
  };

  return (
    <button onClick={downloadInvoice}>
      Download Invoice
    </button>
  );
}

export default DownloadButton;
