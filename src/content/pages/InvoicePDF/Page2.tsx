import React, { useEffect, useState } from 'react';
import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Image
} from '@react-pdf/renderer';
import { styles } from './styles';
import { numberToWords } from 'src/utils/towords';





const Invoice = ({ sample_data }) => {
  return (
    <>
      <Document>
        <Page size="A4" style={styles.body}>
          {/* Header */}
          <View style={styles.header}>
            {/* Logo and Seller Name */}
            <View style={styles.logoAndSeller}>
              <View>
                <Image style={styles.logo} src="./bio2.png" />
              </View>
              <View>
                <Text style={styles.someTitle}>
                  {sample_data?.sellers.name}
                </Text>
              </View>
            </View>

            {/* Invoice Title and Details */}
            <View style={styles.invoiceDetails}>
              <Text style={styles.invoiceTitle}>ORDER CONFIRMATION</Text>
              <Text style={styles.invoiceTitle}></Text>
              <Text style={styles.invoiceNo}>
                Invoice: {sample_data?.invoicenumber}
              </Text>
              <Text style={styles.invoiceNo}>Date: {sample_data?.date}</Text>
              <Text style={styles.headerSpace}>
                Currency: {sample_data?.buyers?.currency?.name}
              </Text>
              <Text>Delivery Date: {sample_data?.deliverydate}</Text>
              <Text>Country of Origin: {sample_data?.sellers?.country}</Text>
              <Text>Payment Term: {sample_data?.paymentsplit}</Text>
            </View>
          </View>

          {/* Buyer and Seller Info with Comments */}
          <View style={styles.buyerSellerSection}>
            {/* Buyer Info */}
            <View style={styles.comments}>
              <Text>Buyer</Text>
              <Text>{sample_data?.buyers?.name}</Text>
              <Text>{sample_data?.buyers?.address}</Text>
              <Text>{sample_data?.buyers?.country}</Text>
            </View>

            {/* Comments */}
            <View style={styles.comments}>
              <Text style={styles.subtitle}>Notes</Text>
              <Text>{sample_data?.comments}</Text>
            </View>
          </View>

          {/* Products Table */}
          <View style={styles.productsTable}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableColUnits}>Units</Text>
              <Text style={styles.tableColName}>Name</Text>
              <Text style={styles.tableColc}>Language Version</Text>
              <Text style={styles.tableColc}>Lot No.</Text>
              <Text style={styles.tableColc}>Unit Price</Text>
              <Text style={styles.tableColc}>Total</Text>
            </View>
            {sample_data?.invoice_products.map((product, index) => (
              <View
                style={
                  index % 2 === 0 ? styles.tableRow : styles.tableRowShaded
                }
                key={index}
              >
                <Text style={styles.tableColUnits}>{product.units}</Text>
                <Text style={styles.tableColName}>
                  {product.product_id.name}
                </Text>
                <Text style={styles.tableColc}>{product.languageversion}</Text>
                <Text style={styles.tableColc}>{product.productlot}</Text>
                <Text style={styles.tableColc}>{product.unitprice}</Text>
                <Text style={styles.tableColc}>{product.unittotal}</Text>
              </View>
            ))}
          </View>

          {/* Summary and Comments */}
          <View style={styles.summarySection}>
            {/* Comments */}
            <View style={styles.commentsSection}>
              {sample_data?.taxrate == 0 ? (
                <Text>Free of VAT</Text>
              ) : (
                <Text></Text>
              )}
              <Text>
                Goods sold B2B from {sample_data?.sellers?.country} to{' '}
                {sample_data?.buyers.country}
              </Text>
              <View style={styles.numberinwords}>
                <Text>{sample_data?.numberinwords}</Text>
              </View>
            </View>

            {/* Summary Table */}
            <View style={styles.summaryTable}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryTitle}>Subtotal</Text>
                <Text style={styles.summaryValue}>{sample_data?.subtotal}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryTitle}>VAT</Text>
                <Text style={styles.summaryValue}>{sample_data?.totaltax}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryTitle}>Discount</Text>
                <Text style={styles.summaryValue}>
                  {sample_data?.totaldiscount}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryTitle}>Total</Text>
                <Text style={styles.summaryValue}>{sample_data?.total}</Text>
              </View>
            </View>
          </View>

          {/* signature */}

          <View style={styles.signatureSection}>
            {' '}
            {/* Apply the new style here */}
            <Text style={styles.someTitle}>BUYER'S REPRESENTATIVE</Text>
            <View style={styles.summarySection}>
              <View style={styles.commentsSection}>
                <Text>Name and Signature: _____________________</Text>
              </View>
              <View style={styles.summaryTable}>
                <View style={styles.summaryRow}>
                  <Text>Place and Date of issue: _____________________</Text>
                </View>
              </View>
            </View>
          </View>

          <Text style={styles.footer}>OUR VISION AT BIOFROST IS TO BE THE MOST RESPECTED COLD THERAPY BRAND IN THE WORLD</Text>
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
      </Document>
    </>
  );
};

export default Invoice;
