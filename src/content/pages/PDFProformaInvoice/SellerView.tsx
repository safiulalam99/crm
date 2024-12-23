import React from 'react';

const SellerView = ({ styles, View, Text, sample_data }) => {
  return (
    <>
      <View style={styles.manufacturerSection}>
        <View style={styles.comments}>
          <View>
            <Text style={styles.manufacturertitle}>Manufacturer</Text>
            <Text style={{ marginBottom: 2 }}>
              <Text style={{ color: '#6b6b6b' }}>
                {sample_data?.sellers?.name}
              </Text>
            </Text>
            <Text style={{ marginBottom: 2 }}>
              <Text style={{ color: '#6b6b6b' }}>
                {sample_data?.address?.address}
                {sample_data?.address?.address &&
                  sample_data?.address?.country &&
                  ', '}
              </Text>
              <Text style={{ color: '#6b6b6b' }}>
                {sample_data?.address?.country}
              </Text>
            </Text>

            <Text style={{ marginBottom: 2, color: '#6b6b6b' }}>
              Vat No:{' '}
              <Text style={{ color: '#6b6b6b' }}>
                {sample_data?.sellers?.vatnumber}
              </Text>
            </Text>
            {sample_data?.sellers?.managingdirector ? (
              <Text style={{ marginBottom: 2, color: '#6b6b6b' }}>
                Managing Director:{' '}
                <Text style={{ color: '#6b6b6b' }}>
                  {sample_data?.sellers?.managingdirector}
                </Text>
              </Text>
            ) : null}
          </View>
        </View>
        {sample_data?.bank_details ? (
          <View style={styles.comments}>
            <View>
              <Text style={styles.manufacturertitle}>
                Manufacturer's Bank Details
              </Text>
              <Text style={{ marginBottom: 2 }}>
                <Text style={{ color: '#6b6b6b' }}>
                  Account Name: {sample_data?.bank_details?.accountname}
                </Text>
              </Text>
              <Text style={{ marginBottom: 2 }}>
                <Text style={{ color: '#6b6b6b' }}>
                  IBAN: {sample_data?.bank_details?.iban}
                </Text>
              </Text>
              <Text style={{ marginBottom: 2, color: '#6b6b6b' }}>
                BIC:{' '}
                <Text style={{ color: '#6b6b6b' }}>
                  {sample_data?.bank_details?.bic}
                </Text>
              </Text>
              {sample_data?.bank_details?.iban ? (
                <Text style={{ marginBottom: 2, color: '#6b6b6b' }}>
                  Bank:{' '}
                  <Text style={{ color: '#6b6b6b' }}>
                    {sample_data?.bank_details?.bank}
                  </Text>
                </Text>
              ) : null}
            </View>
          </View>
        ) : null}
      </View>
    </>
  );
};

export default SellerView;
