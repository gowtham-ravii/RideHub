import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView, ActivityIndicator } from 'react-native';
import { database } from '../config/firebase'; // Import the Firebase database instance
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore methods
import { AirbnbRating } from 'react-native-ratings'; // Import AirbnbRating
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from React Navigation

const ReviewScreen = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        navigation.navigate('HomeScreen'); // Navigate back to the home screen after 10 seconds
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [submitted, navigation]);

  const submitReview = async () => {
    // Validate the input (e.g., check if review text is not empty)
    if (!reviewText) {
      alert('Please provide a review text.');
      return;
    }

    // Create a Firestore collection reference
    const reviewsCollection = collection(database, 'reviews');

    // Set isLoading to true when review submission is initiated
    setIsLoading(true);

    // Create a new document with the review data
    try {
      const docRef = await addDoc(reviewsCollection, {
        rating: rating,
        reviewText,
      });

      console.log('Review submitted with ID: ', docRef.id);
      setSubmitted(true); // Set submitted state to true
      // Optionally, you can navigate back to the previous screen or perform any other action here.
    } catch (error) {
      console.error('Error submitting review: ', error);
      alert('An error occurred while submitting your review. Please try again.');
    } finally {
      // Set isLoading back to false regardless of success or failure
      setIsLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!submitted ? (
        <>
          <Text style={styles.header}>Submit a Review</Text>
          <Text style={styles.label}>Your Rating:</Text>
          <AirbnbRating
            count={5}
            reviews={['Terrible', 'Bad', 'OK', 'Good', 'Excellent']}
            defaultRating={0}
            size={30}
            onFinishRating={(value) => setRating(value)}
            showRating={false}
            selectedColor="#00A86B" // Green color for selected stars
          />
          <Text style={styles.label}>Review:</Text>
          <TextInput
            style={styles.input}
            multiline
            onChangeText={(text) => setReviewText(text)}
            value={reviewText}
            placeholder="Write your review here..."
            placeholderTextColor="#999" // Light gray placeholder text
          />
          {isLoading ? (
            <ActivityIndicator size="large" color="#00A86B" />
          ) : (
            <Button title="Submit Review" onPress={submitReview} color="#00A86B" />
          )}
        </>
      ) : (
        <View style={styles.centeredContainer}>
          <Text style={styles.thankYouMessage}>Thank you for choosing RideHub!</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5', // Light gray background color
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00A86B', // Green header text color
    textAlign: 'center', // Center-align the header text
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#00A86B', // Green label text color
  },
  input: {
    borderWidth: 1,
    borderColor: '#00A86B', // Green border color
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    minHeight: 120,
    fontSize: 16,
    color: '#333', // Dark gray text color
    backgroundColor: '#FFFFFF', // White background color
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  },
  thankYouMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00A86B', // Green text color
    textAlign: 'center', // Center-align the text
  },
});

export default ReviewScreen;
