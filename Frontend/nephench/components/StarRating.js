import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, Modal, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postDataToApi } from '../utils/api';
import { useNavigation } from '@react-navigation/native';

const StarRating = ({ spId }) => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0); // Initial rating state
  const [reviewText, setReviewText] = useState(''); // Review text state
  const [showSubmit, setShowSubmit] = useState(false); // Control visibility of Submit button
  const [modalVisible, setModalVisible] = useState(false); // Control visibility of the success modal

  const getCustomerId = async () => {
    try {
      const customerId = await AsyncStorage.getItem('customerId');
      return customerId;
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function to handle star click
  const handleStarClick = (star) => {
    setRating(star);
    setShowSubmit(star > 0 && reviewText.trim() !== ''); // Show Submit if rating and review are filled
  };

  // Function to handle review text input
  const handleReviewTextChange = (text) => {
    setReviewText(text);
    setShowSubmit(rating > 0 && text.trim() !== ''); // Show Submit if rating and review are filled
  };

  // Function to submit the review
  const onSubmit = async () => {
    const customer = await getCustomerId();
    // Prepare the data for the API request
    const serviceProvider = spId;
    if (customer !== null) {
      try {
        const response = await postDataToApi('/reviews', {
          serviceProvider,
          customer,
          rating,
          reviewText,
        });
        console.log(response, 'data');
        // Show the success modal
        setModalVisible(true);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      // Handle the case where customerId is not available from AsyncStorage
      console.error('Customer ID is not available');
    }
  };

  return (
    <View>
      <Text>Rate us:</Text>
      {/* Render stars */}
      <View style={{ flexDirection: 'row' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleStarClick(star)}>
            <Text style={{ fontSize: 30 }}>{star <= rating ? '★' : '☆'}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Render review text input */}
      <TextInput
        placeholder="Write your review here"
        onChangeText={handleReviewTextChange}
        value={reviewText}
        multiline
      />

      {/* Display the selected rating and review text */}
      <Text>Selected Rating: {rating}</Text>
      <Text>Review: {reviewText}</Text>

      {/* Show the Submit button conditionally */}
      {showSubmit && <Button title="Submit" className='m-3' onPress={onSubmit} />}

      {/* Success Modal */}
    {/* Success Modal */}
<Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(false);
    // Optionally, navigate to a different screen or perform any other action
    navigation.navigate('My Bookings');
  }}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalText}>Review submitted successfully</Text>
      <Button   
        title="Close"
        onPress={() => {
          setModalVisible(false);
          // Optionally, navigate to a different screen or perform any other action
          navigation.navigate('My Bookings');
        }}
        style={{ backgroundColor: '#1B3D9B' }}
      />
    </View>
  </View>
</Modal>

    </View>
  );
};

export default StarRating;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#f6e05e',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

