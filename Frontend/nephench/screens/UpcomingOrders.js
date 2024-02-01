import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { TailwindProvider } from 'tailwindcss-react-native'
import { getDataFromApi } from '../utils/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import UpcomingOrderCard from '../components/UpcomingOrderCard'

export default function UpcomingOrders() {
  const navigation = useNavigation()
  const [pendingRequests, setPendingRequests] = useState([])

  const getCustomerId = async () => {
    try {
      const customerId = await AsyncStorage.getItem('customerId')
      return customerId
    } catch (error) {
      console.log(error.message)
    }
  }
  const getAcceptedRequest = async () => {
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
    getAcceptedRequest()
  }, [])


  return (

    <TailwindProvider>
      <View className="flex-1 bg-gray-500 justify-center items-center">
        <ScrollView
          className="h-48 w-80 mt-4"
          contentContainerClassName="flex-grow justify-center items-center"
        >
          {pendingRequests.length === 0 ? (
            <Text className="text-2xl text-white font-bold">
              No Upcoming Orders
            </Text>
          ) : (
            <>
              <View className="flex items-center justify-center">
                {pendingRequests.map((request, index) => {
                  if (request.progressStatus === "pending") {
                    return (
                      <UpcomingOrderCard
                        id={request.id}
                        spname={request.serviceProvider.username}
                        customer={request.customer.username}
                        address={request.customer.address}
                        date={request.date}
                        time={request.time}
                        status={request.status}
                        progressStatus={request.progressStatus}
                      />
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
