import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const PhonePeScreen = ({ route }) => {
  const fare = 100;

  const handlePayment = () => {
    // Include the fare amount as a query parameter in the URL
    const paymentLink = `https://buy.stripe.com/5kAbKpdy25re412288?customUnitAmount=${fare}`;

    // Open the payment link in the default browser
    Linking.openURL(paymentLink).catch(() => {
      // Handle errors if the link cannot be opened
      console.error('Failed to open the payment link');
    });
  };
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/googlepayQR.png')} style={styles.qrCode} />
      <Text style={styles.title}>PhonePe</Text>
      <Text style={styles.upiId}>Your UPI ID: your-phonepe-upi-id@example.com</Text>
      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4', // Background color
    padding: 20,
  },
  qrCode: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Text color
  },
  upiId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Text color
  },
  payButton: {
    backgroundColor: '#007bff', // Button background color
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  payButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // Button text color
  },
});

export default PhonePeScreen;
