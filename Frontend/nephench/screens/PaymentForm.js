import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { postDataToApi } from '../utils/api';
const PaymentForm = ({ onSubmit }) => {
  const [amount, setAmount] = useState('');
  const route = useRoute();
  const { bookingId, serviceProvider, chosenServices, spId } = route.params;
  const getCustomerId = async () => {
    try {
      const customerId = await AsyncStorage.getItem('customerId')
      return customerId
    } catch (error) {
      console.log(error.message)
    }
  }
  const total = chosenServices.reduce((accumulator, items) => {
    const price = parseFloat(items.service.price);
    if (!isNaN(price)) {
      return accumulator + price;
    }
    return accumulator;
  }, 0);
  const handleSubmit = async (data) => {
    // Validate the inputs if needed

    // Get the customer ID from AsyncStorage
    const customerId = await getCustomerId();
    if(customerId !== null){
      try{
        const response = await postDataToApi('/cashinhand', 
        {
          customerId:customerId,
          serviceProviderId: spId,
          serviceId: bookingId,
          totalAmount: amount
        });
        console.log(response, "response after submit")
      } catch(error){
        console.error('Error:', error);
      }
    }
    else {
      // Handle the case where customerId is not available from AsyncStorage
      console.error('Customer ID is not available');
    }
};

  

  return (
    <View style={styles.container}>
      <Text className="text-xl">Payment Details:</Text>
        <Text className="pt-5" >Service Provider Details:</Text>
        <Text>Name: {serviceProvider} </Text>
      <Text className="pt-5  ">Chosen Services Details:</Text>
          {chosenServices.map((items) => (
            <View key={items.id} className="flex-row p-5">
                <Text className="flex-1"  >{items.service.name}</Text>
            <Text className="">Rs.{items.service.price}</Text>
                </View>
          ))}
          <View className="flex-row pt-2 p-5">
          <Text className="flex-1">Total Service Charge:</Text>
          <Text>Rs.{total}</Text>
          </View>
          <Text>Enter the amount you paid to the service provider below:</Text>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      {/* <Button title="Submit" onPress={handleSubmit} /> */}
      <TouchableOpacity
           onPress={handleSubmit} 
            className=" bg-yellow-400 rounded-xl"
          >
            <Text className="text-xl font-bold text-center text-gray-700 p-4">
              Submit
            </Text>
          </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 80
  },
  input: {
    marginTop: 15,
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default PaymentForm;