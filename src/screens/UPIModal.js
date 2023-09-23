import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';

const UPIModal = ({ isVisible, onClose, onPaymentMethodSelect, navigation }) => {
  const paymentMethods = ['Google Pay', 'PhonePe', 'Paytm'];

  const handlePaymentMethodSelect = (method) => {
    // Handle the selected UPI payment method
    onPaymentMethodSelect(method);

    if (method === 'Google Pay') {
      // Navigate to the GoogleScreen.js screen when Google Pay is selected
      navigation.navigate('GoogleScreen');
    } else if (method === 'PhonePe') {
      // Navigate to the PhonePeScreen.js screen when PhonePe is selected
      navigation.navigate('PhonePeScreen');
    } else if (method === 'Paytm') {
      // Navigate to the PaytmScreen.js screen when Paytm is selected
      navigation.navigate('PaytmScreen');
    }

    onClose();
  };

  return (
    <Modal transparent visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {paymentMethods.map((method, index) => (
              <TouchableOpacity
                key={index}
                style={styles.paymentOption}
                onPress={() => handlePaymentMethodSelect(method)}
              >
                <Text style={styles.paymentOptionText}>{method}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40, // Add extra padding for better scrolling
  },
  paymentOption: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
  },
  paymentOptionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UPIModal;
