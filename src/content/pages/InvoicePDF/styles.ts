import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  body: {
    paddingTop: 20,
    paddingBottom: 45,
    paddingHorizontal: 25,
    // color: '#827f7f',
    borderColor: '#827f7f'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
    // marginBottom: -180
  },

  invoiceTitle: {
    fontSize: 18,
    marginTop: 10,
    color: '#827f7f'
  },
  invoiceNo: {
    fontSize: 13,
    color: '#6b6b6b',
  },
  colorItems: {
    color: '#42aed9'
  },
  headerSpace: {
    marginTop: 5,
    marginBottom: 2,
    color: '#6b6b6b',
  },
  invoiceDetails: {
    fontSize: 9,
    width: '40%',
    textAlign: 'right'
  },
  buyerSellerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 2
  },
  comments: {
    marginTop: 2,
    fontSize: 9,
    width: '40%',

    flexWrap: 'wrap'
  },
  subs: {
    marginTop: 40,
  
  },
  productsTable: {
    width: '100%'

    // marginBottom:
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2',
    borderBottomWidth: 1
    // borderStyle: 'solid'
  },
  tableRow: {
    flexDirection: 'row'
  },
  subtitle: {
    fontWeight: 'bold',
    marginBottom: 3,
    fontSize: 12
  },
  manufacturertitle: {
    fontWeight: 'bold',
    marginBottom: 3,
    fontSize: 12,
    marginTop: 5
  },
  tableCol: {
    width: '25%',
    // borderRightWidth: 1,
    padding: 8,
    fontSize: 9
  },
  tableColUnits: {
    width: '12%',
    // borderRightWidth: 1,
    padding: 8,
    fontSize: 9,
    textAlign: 'center'
  },
  tableColName: {
    width: '40%',
    // borderRightWidth: 1,
    padding: 8,
    fontSize: 9
  },
  tableColNameColor: {
    width: '40%',
    // borderRightWidth: 1,
    padding: 3,
    fontSize: 9,
    color: '#42aed9'
  },
  tableRowShaded: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F2' // Light blue
  },
  tableColc: {
    width: '12%',
    // borderRightWidth: 1,
    padding: 8,
    fontSize: 9,
    textAlign: 'right'
  },
  buyerseller: {
    fontSize: 9,
    width: '50%',
    flexWrap: 'wrap'
  },
  logo: {
    alignContent: 'flex-start',
    width: 148.52,
    height: 70,
    objectFit: 'cover'
  },

  logoAndSeller: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 20
    // width: '50%'
  },
  summarySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  commentsSection: {
    width: '50%',
    fontSize: 9
  },
  someTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5
  },
  companytitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#6b6b6b'
  },
  companydisplayname: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#827f7f',
    fontStyle: 'italic' // Add this line to make the font italic
  },

  buyertitle: {
    fontSize: 12,
    fontWeight: 'bold'
  },

  summaryTable: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    width: '30%',
    fontSize: 9
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%' // Control the full width
  },
  summaryTitle: {
    textAlign: 'left',
    width: '40%',
    marginBottom: 2
  },
  summaryValue: {
    textAlign: 'right',
    width: '60%',
    marginBottom: 2
  },
  numberinwords: {
    marginTop: 5
  },
  footer: {
    position: 'absolute',
    fontSize: 11,
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#42aed9'
  },
  signaturePlace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    fontSize: 9,
    alignItems: 'center' // Align items vertically
  },
  leftSignature: {
    width: '10%',
    textAlign: 'left'
  },
  rightSignature: {
    width: '10%',
    textAlign: 'right'
  },
  // Add this to your existing StyleSheet
  signatureTitle: {
    fontWeight: 'bold',
    fontSize: 9
  },
  signatureSection: {
    marginTop: 50 // Adjust this value to position the signature section
  },

  pageNumber: {
    position: 'absolute',
    fontSize: 7,
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey'
  }
});
