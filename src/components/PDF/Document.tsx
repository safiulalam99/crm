import { Page, Text, StyleSheet, View, Image } from '@react-pdf/renderer';
import { styles } from './styles';
import { numberToWords } from 'src/utils/towords';
import { formatDate } from 'src/utils/formatDate';

// utils/checkColumns.js
export const checkColumns = (products) => {
  if (!products) return { hasLanguageVersion: false, hasProductLot: false };
  const hasLanguageVersion = products.some(
    (product) => product?.languageversion
  );
  const hasProductLot = products.some((product) => product?.productlot);
  return { hasLanguageVersion, hasProductLot };
};

const Invoice = ({ sample_data }) => {
  if (!sample_data || !sample_data.products) {
    return null; // or return a loading indicator
  }

  const { hasLanguageVersion, hasProductLot } = checkColumns(
    sample_data?.products
  );
  const colorCode = '#42aed9';
  const tableColWidth = hasLanguageVersion && hasProductLot ? '10%' : '17%';
  console.log(sample_data);
  return (
    <>
      <Page size="A4" style={styles.body}>
        {/* Header */}
        <View style={styles.header}>
          {/* Logo and Seller Name */}
          <View style={styles.logoAndSeller}>
            <View>
              <Image style={styles.logo} src="/bio2.png" />
            </View>
            <View style={{ width: 250, alignItems: 'flex-start' }}>
              <Text style={styles.companytitle}>
                {sample_data?.sellers?.name}
              </Text>
              <Text style={styles.companydisplayname}>
                {sample_data?.sellers?.displayname}
              </Text>
            </View>
          </View>

          {/* Invoice Title and Details */}
          <View style={styles.invoiceDetails}>
            <Text style={styles.invoiceTitle}>ORDER CONFIRMATION</Text>
            <Text style={styles.invoiceTitle}></Text>
            <Text style={styles.invoiceNo}>
              Order No:{' '}
              <Text style={styles.colorItems}>
                {sample_data?.invoicenumber}{' '}
              </Text>
            </Text>
            <Text style={styles.invoiceNo}>
              Date:{' '}
              <Text style={{ color: '#6b6b6b' }}>
                {formatDate(sample_data?.date)}
              </Text>
            </Text>
            <Text style={styles.headerSpace}>
              Currency:{' '}
              <Text style={{ color: '#6b6b6b' }}>
                {sample_data?.buyers?.currency?.name} (
                {sample_data?.buyers?.currency?.symbol})
              </Text>
            </Text>
            <Text style={{ marginBottom: 2 }}>
              Delivery Date:{' '}
              <Text style={{ color: '#6b6b6b' }}>
                {formatDate(sample_data?.deliverydate)}
              </Text>
            </Text>
            <Text style={{ marginBottom: 2 }}>
              Country of Origin:{' '}
              <Text style={{ color: '#6b6b6b' }}>
                {sample_data?.sellers?.country}
              </Text>
            </Text>
            <Text style={{ marginBottom: 2 }}>
              Payment Term:{' '}
              <Text style={{ color: '#6b6b6b' }}>
                {sample_data?.buyers?.paymentterm}
              </Text>
            </Text>
          </View>
        </View>

        {/* Buyer and Seller Info with Comments */}
        <View style={styles.buyerSellerSection}>
          <View style={styles.comments}>
            <View>
              {/* Buyer Info */}
              <Text style={styles.subtitle}>Buyer</Text>
              <Text style={{ marginBottom: 2 }}>
                Company:{' '}
                <Text style={{ color: '#6b6b6b' }}>
                  {sample_data?.buyers?.name}
                </Text>
              </Text>
              <Text style={{ marginBottom: 2 }}>
                Address:{' '}
                <Text style={{ color: '#6b6b6b' }}>
                  {sample_data?.buyers?.address}
                </Text>
              </Text>
              <Text style={{ marginBottom: 2 }}>
                Country:{' '}
                <Text style={{ color: '#6b6b6b' }}>
                  {sample_data?.buyers?.country}
                </Text>
              </Text>
              <Text style={{ marginBottom: 2 }}>
                Vat No:{' '}
                <Text style={{ color: '#6b6b6b' }}>
                  {sample_data?.buyers?.vatnumber}
                </Text>
              </Text>
              <Text style={{ marginBottom: 2 }}>
                Managing director:{' '}
                <Text style={{ color: '#6b6b6b' }}>
                  {sample_data?.buyers?.contactperson}
                </Text>
              </Text>
              {/* Seller Info */}
            </View>
            <View>
              <Text style={styles.manufacturertitle}>Manufacturer</Text>
              <Text style={{ marginBottom: 2 }}>
                Company:{' '}
                <Text style={{ color: '#6b6b6b' }}>
                  {sample_data?.sellers?.name}
                </Text>
              </Text>
              <Text style={{ marginBottom: 2 }}>
                Address:{' '}
                <Text style={{ color: '#6b6b6b' }}>
                  {sample_data?.sellers?.address},{' '}
                  {sample_data?.sellers?.country}
                </Text>
              </Text>
              <Text style={{ marginBottom: 2 }}>
                Vat No:{' '}
                <Text style={{ color: '#6b6b6b' }}>
                  {sample_data?.sellers?.vatnumber}
                </Text>
              </Text>
              <Text style={{ marginBottom: 2 }}>
                Managing director:{' '}
                <Text style={{ color: '#6b6b6b' }}>
                  {sample_data?.sellers?.managingdirector}
                </Text>
              </Text>
            </View>
          </View>

          {/* Comments */}
          <View style={styles.comments}>
            <Text style={styles.subtitle}>Notes</Text>
            <Text>{sample_data?.comments}</Text>
          </View>
        </View>

        {/* Products Table */}
        {/* Products Table */}
        <View style={styles.productsTable}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableColUnits}>Units</Text>
            <Text style={styles.tableColName}>Name</Text>
            {hasLanguageVersion && (
              <Text style={[styles.tableColc, { width: tableColWidth }]}>
                Language Version
              </Text>
            )}
            {hasProductLot && (
              <Text style={[styles.tableColc, { width: tableColWidth }]}>
                Lot No
              </Text>
            )}
            <Text style={[styles.tableColc, { width: tableColWidth }]}>
              Unit Price
            </Text>
            <Text style={[styles.tableColc, { width: tableColWidth }]}>
              Total
            </Text>
          </View>
          {sample_data?.products.map((product, index) => (
            <View
              style={index % 2 === 0 ? styles.tableRow : styles.tableRowShaded}
              key={index}
            >
              <Text style={styles.tableColUnits}>{product?.units}</Text>
              <Text style={[styles.tableColName, { color: product?.name?.color }]}>
                {product?.name?.name}
              </Text>
              {hasLanguageVersion && (
                <Text style={[styles.tableColc, { width: tableColWidth }]}>
                  {product?.languageversion}
                </Text>
              )}
              {hasProductLot && (
                <Text style={[styles.tableColc, { width: tableColWidth }]}>
                  {product?.productlot}
                </Text>
              )}
              <Text style={[styles.tableColc, { width: tableColWidth }]}>
                {product?.unitprice}
              </Text>
              <Text style={[styles.tableColc, { width: tableColWidth }]}>
                {product?.unittotal}
              </Text>
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
              <Text style={styles.summaryTitle}>
                Subtotal ({sample_data?.buyers?.currency?.symbol})
              </Text>
              <Text style={styles.summaryValue}>{sample_data?.subtotal}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryTitle}>
                VAT ({sample_data?.taxrate}%)
              </Text>
              <Text style={styles.summaryValue}>{sample_data?.totaltax}</Text>
            </View>
            {sample_data?.totaldiscount && sample_data?.totaldiscount !== 0 ? (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryTitle}>Discount</Text>
                <Text style={styles.summaryValue}>
                  {sample_data?.totaldiscount}
                </Text>
              </View>
            ) : null}

            <View style={styles.summaryRow}>
              <Text style={styles.summaryTitle}>
                Total ({sample_data?.buyers?.currency?.symbol})
              </Text>
              <Text style={styles.summaryValue}>{sample_data?.total}</Text>
            </View>
          </View>
        </View>

        {/* signature */}

        <View style={styles.signatureSection}>
          {' '}
          {/* Apply the new style here */}
          <Text style={styles.someTitle}>Buyer's Representative</Text>
          <View style={styles.summarySection}>
            <View style={styles.commentsSection}>
              <Text>Name, Date and Signature: ___________________________</Text>
            </View>
          </View>
        </View>

        <Text style={styles.footer}>
          OUR VISION AT BIOFROST IS TO BE THE MOST RESPECTED COLD THERAPY BRAND
          IN THE WORLD
        </Text>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </>
  );
};

export default Invoice;
