import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icon } from 'react-native-elements'
import { useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createStackNavigator } from '@react-navigation/stack';
import { getDataFromApi } from '../utils/api';
const Stack = createStackNavigator();

const PaymentScreen = ({navigation }) => {
    const [paymentUrl, setPaymentUrl] = useState('');
  
    const handlePayment = async () => {
      const requestBody = {
        return_url: "https://example.com/payment/",
        website_url: "https://example.com/",
        amount: 1000,
        purchase_order_id: 'test12',
        purchase_order_name: 'test',
        customer_info: {
          name: 'Simran Shilpakar',
          email: 'simranshilpakar@gmail.com',
          phone: '9866011435',
        },
        product_details: [
          {
            identity: '1234567890',
            name: 'Khalti logo',
            total_price: 1000,
            quantity: 1,
            unit_price: 1000,
          },
        ],
      };
      
      try {
        const response = await fetch('https://khalti.com/api/v2/epayment/initiate/', {
          method:'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Key live_secret_key_74339a72b4a24d57bce3eece8319bde6'
          },
          body:JSON.stringify(requestBody)
      });
        const responseData = await response.json();
      const { payment_url } = responseData;
      console.log(payment_url)
      setPaymentUrl(payment_url);
      navigation.navigate('PaymentWebView', { paymentUrl: payment_url });
      } catch (error) {
        console.error('Error initiating payment:', error);
        // Handle any errors that occur during the API request
      }
    };
    const route = useRoute();
    const { bookingId, serviceProvider, chosenServices , spId } = route.params;
    console.log(chosenServices)
    const paymentForm  = async () => {
      navigation.navigate('PaymentForm' , 
      { serviceProvider: serviceProvider,
        spId:spId,
      bookingId:bookingId,
      chosenServices:chosenServices}
      )
    }

  return (
    <SafeAreaView className="bg-white h-full p-5">
      <View className="P-5">
        <Image
          source={require('../assets/images/logoName.png')}
          style={{ width: 100, height: 100 }}
        />
        <FlatList
          horizontal
          keyExtractor={(items) => items.id}
          renderItem={({ item }) => (
            <TouchableOpacity
            onPress={handlePayment}
              className="p-2 pl-6 pb-8 bg-gray-200 m-2 w-40"
            >
              <View>
                <Text className="mt-2 text-lg font-semibold">Pay with Khalti</Text>
                <Icon
                  className="p-2 bg-black rounded-full w-10 mt-4"
                  name="arrowright"
                  color="white"
                  type="antdesign"
                />
              </View>
            </TouchableOpacity>
          )}
        />
         <FlatList
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity
            onPress={paymentForm}
              className="p-2 pl-6 pb-8 bg-gray-200 m-2 w-40"
            >
              <View>
                <Text className="mt-2 text-lg font-semibold">Cash in hand</Text>
                <Icon
                  className="p-2 bg-black rounded-full w-10 mt-4"
                  name="arrowright"
                  color="white"
                  type="antdesign"
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

export default PaymentScreen
