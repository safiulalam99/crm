import React from 'react';
import axios from 'axios';

const MyComponent: React.FC = () => {
  const sendData = async () => {
    // const data = {
    //     first_name: 'John',
    //     last_name: 'Doe',
    //     phone: '0652455478',
    //     description: 'New Website',
    //     users: [
    //         { name: 'John', age: 22, phone: '+33653454343' },
    //         { name: 'John', age: 22, phone: '+33653454343' },
    //         { name: 'John', age: 22, phone: '+33653454343' },
    //         { name: 'John', age: 22, phone: '+33653454343' },
    //         { name: 'John', age: 22, phone: '+33653454343' },
    //         { name: 'Mary', age: 25, phone: '+33666666666' }
    //     ]
    // };

    const data = {
      invoicenumber: '543236574',
      vattype: '{}',
      date: '2023-08-04',
      deliveryterm: null,
      deliverydate: '2023-08-03',
      paymentsplit: 'asnjbvajghsgdiyagsidgua asifgashf oiuahs foas ',
      subtotal: 2767.57,
      total: 3155.03,
      taxrate: 24,
      totaltax: 664.22,
      totaldiscount: 276.76,
      discountrate: 10,
      numberinwords: null,
      comments:
        'Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century ',
      paymentstatus: 'status',
      buyer_id: 2,
      seller_id: 1,
      currency_id: 1,
      time_stamp: '2023-08-26T00:24:12.48591+00:00',
      buyers: {
        id: 2,
        name: 'Tech Ltd',
        address: '456 Tech Ave',
        country: 'USA',
        vatnumber: 'US 12345678',
        contractnumber: 'US29082021',
        representative: 'John Smith',
        paymentterm: '30 days',
        deliveryterm: 'FOB',
        registrationnumber: '98765432',
        currency_id: 1
      },
      sellers: {
        id: 1,
        name: 'VIKING LAB OY',
        address: 'LEIJATIE 6 A2, FI-33470 YLÖJÄRVI, FINLAND',
        vatnumber: 'FI26181268',
        displayname: 'Viking Lab Ltd. | BIOFROST®',
        managingdirector: 'HEIKKI LEHMUSLEHTI',
        country: 'FINLAND'
      },
      invoice_products: [
        {
          unitprice: 19.99,
          units: 3,
          productlot: '2',
          unittotal: 59.97,
          unitvat: 0,
          product_id: {
            id: 1,
            name: 'Desktop Organizer',
            description: 'Small desktop organizer with compartments',
            category: 'office supplies',
            price: 19.99,
            time_stamp: '2023-08-15T17:26:53.826163+00:00'
          }
        },
        {
          unitprice: 19.99,
          units: 2,
          productlot: '3',
          unittotal: 39.98,
          unitvat: 0,
          product_id: {
            id: 1,
            name: 'Desktop Organizer',
            description: 'Small desktop organizer with compartments',
            category: 'office supplies',
            price: 19.99,
            time_stamp: '2023-08-15T17:26:53.826163+00:00'
          }
        },
        {
          unitprice: 19.99,
          units: 3,
          productlot: '3',
          unittotal: 59.97,
          unitvat: 0,
          product_id: {
            id: 1,
            name: 'Desktop Organizer',
            description: 'Small desktop organizer with compartments',
            category: 'office supplies',
            price: 19.99,
            time_stamp: '2023-08-15T17:26:53.826163+00:00'
          }
        },
        {
          unitprice: 49.99,
          units: 20,
          productlot: '5',
          unittotal: 999.8,
          unitvat: 0,
          product_id: {
            id: 5,
            name: 'Keyboard',
            description: 'Mechanical keyboard with backlight',
            category: 'electronics',
            price: 49.99,
            time_stamp: '2023-08-15T17:26:53.826163+00:00'
          }
        },
        {
          unitprice: 24.99,
          units: 2,
          productlot: '3',
          unittotal: 49.98,
          unitvat: 0,
          product_id: {
            id: 3,
            name: 'Laptop Stand',
            description: 'Adjustable laptop stand',
            category: 'office supplies',
            price: 24.99,
            time_stamp: '2023-08-15T17:26:53.826163+00:00'
          }
        },
        {
          unitprice: 4.49,
          units: 1,
          productlot: '3',
          unittotal: 4.49,
          unitvat: 0,
          product_id: {
            id: 2,
            name: 'Mouse Pad',
            description: 'Standard mouse pad',
            category: 'office supplies',
            price: 4.49,
            time_stamp: '2023-08-15T17:26:53.826163+00:00'
          }
        },
        {
          unitprice: 29.99,
          units: 50,
          productlot: '8',
          unittotal: 1499.5,
          unitvat: 0,
          product_id: {
            id: 4,
            name: 'Wireless Mouse',
            description: 'Ergonomic wireless mouse',
            category: 'electronics',
            price: 29.99,
            time_stamp: '2023-08-15T17:26:53.826163+00:00'
          }
        },
        {
          unitprice: 4.49,
          units: 12,
          productlot: '7',
          unittotal: 53.88,
          unitvat: 0,
          product_id: {
            id: 2,
            name: 'Mouse Pad',
            description: 'Standard mouse pad',
            category: 'office supplies',
            price: 4.49,
            time_stamp: '2023-08-15T17:26:53.826163+00:00'
          }
        }
      ]
    };

    // const url ="https://us-central1-test-pulumi-scripts.cloudfunctions.net/function-1"

    try {
      const response = await axios.post('http://localhost:8080/', data, {
        responseType: 'blob' // Indicate that we're expecting a binary blob
      });

      // Create a blob from the response data
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      });

      // Create a link element to initiate the download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'output.docx'); // Set the download file name
      document.body.appendChild(link);
      link.click();
      link.remove(); // Clean up after download
    } catch (error) {
      console.error('Error posting data', error);
    }
  };

  return (
    <div>
      <button onClick={sendData}>Send Data</button>
    </div>
  );
};

export default MyComponent;
