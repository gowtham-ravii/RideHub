import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import UPIModal from './UPIModal'; // Import the UPIModal component

const PaymentScreen = ({ route, navigation }) => {
  const { fare ,userOrigin,userDestination} = route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const navigateToDriverTrack = () => {
    navigation.navigate('DriverTrackScreen',{userOrigin,userDestination});
  };

  const handleCreditCardPayment = async () => {
    // Your credit card payment logic here
  };

  const handlePaymentMethodSelect = (method) => {
    // Handle the selected UPI payment method (Google Pay, PhonePe, Paytm)
    setSelectedPaymentMethod(method);
    setIsModalVisible(false);

    // You can add logic here to initiate the UPI payment with the selected method.
    // For example, you can call a function to open the respective UPI app or payment gateway.
  };

  return (
    <View style={styles.container}>

      <View style={styles.contentContainer}>
        <Text style={styles.paymentAmount}>Payment Amount</Text>
        <Text style={styles.fareAmount}>{fare}</Text>

        <TouchableOpacity style={styles.paymentButton} onPress={navigateToDriverTrack}>
          <Text style={styles.paymentButtonText}>Pay with Cash</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.paymentButton} onPress={handleCreditCardPayment}>
          <Text style={styles.paymentButtonText}>
            {isLoading ? 'Processing...' : 'Pay with Credit/Debit Card'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.paymentButton} onPress={() => setIsModalVisible(true)}>
          <Text style={styles.paymentButtonText}>UPI Payment</Text>
        </TouchableOpacity>
      </View>

      {/* Render the UPI modal */}
      <UPIModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} onPaymentMethodSelect={handlePaymentMethodSelect} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.7,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  paymentAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  fareAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 20,
  },
  paymentButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginVertical: 10,
  },
  paymentButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default PaymentScreen;
