import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  body: {
    paddingTop: 0,
    paddingBottom: 45,
    paddingHorizontal: 25,
    display: 'flex',
    flexDirection: 'column',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  flexSpace: {
    flex: 1,
    minHeight: 20,  // Minimum spacing when content is short
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
    color: '#6b6b6b'
  },
  colorItems: {
    color: '#42aed9'
  },
  headerSpace: {
    marginTop: 5,
    marginBottom: 2,
    color: '#6b6b6b'
  },
  invoiceDetails: {
    fontSize: 9,
    width: '40%',
    textAlign: 'right'
  },
  buyerSellerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: 20,
    marginTop: 2
    // backgroundColor: "#cfc8b8",
  },
  manufacturerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 2
    // backgroundColor: "#cfc8b8",
  },
  comments: {
    marginTop: 2,
    fontSize: 9,
    width: '40%',
    // backgroundColor: "#bfa250",
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  notes: {
    marginTop: 2,
    fontSize: 9,
    width: '40%'
    // backgroundColor: "#bfa250",
    // justifyContent: 'space-between',
    // flexWrap: 'wrap'
  },
  subs: {
    marginTop: 5
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
  sign: {
    // backgroundColor:'red',
    width: 140, // Set width
    height: 50, // Set height
    marginBottom: 0, // Optional: add some margin if needed
    marginLeft: 90 // Optional: add some margin if needed
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
    marginTop: 10
  },
  signature: {
    position: 'absolute',
    bottom: 2,
    left: 0,
    right: 0,
    textAlign: 'center',
    width: '50%',
    fontSize: 9,
    marginBottom: 10
  },
  signaturename: {
    fontSize: 9
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
    // backgroundColor:"red"
  },
  footer: {
    position: 'absolute',
    fontSize: 11,
    bottom: 12,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#42aed9',
    zIndex: 1000
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
  signatureWrapper: {
    marginBottom: 1,  // Space before footer
    width: '100%',
    position: 'relative',
  },
  signatureSection: {
    position: 'relative',  // Changed from absolute
    width: '100%',
    height: 100,  // Fixed height for signature section
  },
  signatureBox: {
    position: 'absolute',
    left: '10%',
    transform: 'translateX(-50%)',
    top: 5,  // Adjusted from 0 to bring signature closer to line
    width: 200,
    alignItems: 'center',
  },
  signatureImage: {
    width: 80,
    height: 35,
    objectFit: 'contain',
    marginBottom: -10, // Added negative margin to bring image closer to line
  },
  signatureLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    paddingRight: 20,
    position: 'absolute',
    top: 35,  // Adjusted from 40 to maintain proper spacing with signature
    width: '100%',
  },
  signatureDash: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    flex: 0.3,
    marginLeft: 5,
  },
  signatureName: {
    fontSize: 9,
    color: '#6b6b6b',
    position: 'absolute',
    left: '15%',
    transform: 'translateX(-50%)',
    width: 200,
    textAlign: 'center',
    top: 45,  // Changed from 60 to 45 to bring the name closer to the line
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 7,
    bottom: 3,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey'
  },
  signatureLabel: {
    fontSize: 9,
    color: '#6b6b6b',
  },
});
