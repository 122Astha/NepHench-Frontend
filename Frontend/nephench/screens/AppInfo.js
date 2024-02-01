import React from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const AppInfo = () => {
    const navigation = useNavigation()

    const handleAcceptTerms = () => {
        // Handle the action when the user accepts the terms and conditions
        // For example, navigate to the next screen
        navigation.navigate('Setting');
      };
  return (
    <ScrollView className="p-4 mt-6">
      <Text className="text-xl font-bold mb-2">Nephench – App Information</Text>
      <Text className="text-base mb-4">
      A NepHench App is a versatile and user-friendly mobile application designed to simplify household management by offering a range of essential services. This app combines the power of chat, map, and booking functionalities to create a seamless experience for users. With its integrated chat feature, users can easily communicate with service providers, discussing their specific requirements, seeking recommendations, or asking for quotes. This real-time communication ensures a direct and efficient channel for resolving queries and making informed decisions.
      </Text>

      <Text className="text-base mb-4">
      The map feature in the Home Service App enables users to identify nearby service providers, offering a geolocation-based solution to find professionals quickly and conveniently. Whether it's finding a plumber, electrician, or any other service, users can rely on the app to pinpoint the nearest options, saving time and effort. Additionally, the booking functionality streamlines the process of scheduling services, allowing users to select a suitable date and time, confirm their appointments, and receive notifications, ensuring a hassle-free experience.
      </Text>
      <Text className="text-base mb-4">
      In summary, the NepHench App is a comprehensive solution that brings convenience to users' fingertips. By incorporating chat, map, and booking services, it offers a holistic approach to home management, helping individuals connect with trusted service providers, locate them effortlessly, and efficiently schedule and manage their bookings. Whether it's fixing a leaky faucet or planning a home renovation, this app empowers users with the tools they need to simplify their lives and keep their homes in top shape.
      </Text>



      <TouchableOpacity className="
          bg-yellow-400 py-2 px-4 rounded-lg m-10
          items-center justify-center"
        onPress={handleAcceptTerms}
      >
        <Text className="text-base text-gray-700 font-bold">
          Back
        </Text>
      </TouchableOpacity>

      
      {/* Add more sections using Text components */}
    </ScrollView>
  )
}

export default AppInfo
