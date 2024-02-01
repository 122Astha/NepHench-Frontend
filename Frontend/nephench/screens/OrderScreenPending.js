import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, ScrollView , BackHandler , Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TailwindProvider } from 'tailwindcss-react-native'
import { putDataToApi, getDataFromApi } from '../utils/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import OrderCard from '../components/OrderCard'

export default function OrderScreenPending() {
  const navigation = useNavigation()
  const [refresh, setRefresh] = useState(false)
  const [pendingRequests, setPendingRequests] = useState([])
  const [isModalVisible, setModalVisible] = useState(false);
  const [isExitConfirmationVisible, setExitConfirmationVisible] = useState(false);

  const getCustomerId = async () => {
    try {
      const customerId = await AsyncStorage.getItem('customerId')
      return customerId
    } catch (error) {
      console.log(error.message)
    }
  }

  const getPendingRequest = async () => {
    try {
      const serviceProvider = await getCustomerId()
      console.log(serviceProvider, 'service Provider Id')
      const res = await getDataFromApi(`bookings/${serviceProvider}`)
      
      setPendingRequests(res)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getPendingRequest();
    if (refresh) {
      setRefresh(false); // Reset the state to avoid continuous refresh
    }
  }, [refresh])

  const handleBackPress = () => {
   
    // Show the exit confirmation alert on the HomeScreen
    if (navigation.isFocused()) {
      setExitConfirmationVisible(true);
      Alert.alert('Exit App', 'Do you really want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Exit',
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true; // Prevent default back button behavior
    }
    return false; // Allow back navigation on other screens
  };
  useEffect(() => {
   
 
 // Add the event listener when the component mounts
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // Remove the event listener when the component unmounts
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [navigation]);

  return (

    <TailwindProvider>
      <View className="flex-1 bg-gray-500 justify-center items-center">
        <ScrollView
          className="h-48 w-80 mt-4"
          contentContainerClassName="flex-grow justify-center items-center"
        >
          {pendingRequests.length === 0 ? (
            <Text className="text-2xl text-white font-bold">
              No Pending Requests
            </Text>
          ) : (
            <>
              <View className="flex  justify-center mb-4">
                <Text className="text-lg text-white font-bold">
                  Pending Requests:
                </Text>
              </View>
              <View className="flex items-center justify-center">
                {pendingRequests.map((request, index) => {
                  if (request.status === 'pending') {
                    return (
                      <View key={request.id}>
                      <OrderCard
                        id={request.id}
                        spname={request.serviceProvider.username}
                        customer={request.customer.username}
                        address={request.customer.address}
                        date={request.date}
                        time={request.time}
                        status={request.status}
                      />
                    </View>
                     
                    )
                  } else {
                    return null // Exclude non-pending requests from the list
                  }
                })}
                
              </View>
            </>
          )}
        </ScrollView>
       
      </View>
    </TailwindProvider>
    

  )
}