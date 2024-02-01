import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const BottomNavigation = () => {
  const navigation = useNavigation()
  return (
    <View className="absolute bottom-0 w-full z-50">
      <TouchableOpacity
        onPress={() => navigation.navigate('Basket')}
        className=" bg-[#00CCBB] p-4 rounded-lg flex-row items-center space-x-1"
      >
        <Text className="text-white font-extrabold text-lg by-[#01A296] py-1 px-2">
          rfar
        </Text>
        <Text className="flex-1 text-white font-extrabold text-lg text-center">
          View Basket
        </Text>
        <Text className="text-lg text-white font-extrabold">
          <Text>dsfcadf</Text>
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default BottomNavigation
