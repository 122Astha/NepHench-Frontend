import React, { useState, useEffect } from 'react'
import {
  Text,
  TextInput,
  View,
  Pressable,
  TouchableOpacity,
  Image,
} from 'react-native'
import { TailwindProvider } from 'tailwindcss-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function CustomerProfileScreen() {
  const [data, setData] = useState({})
  const getUserRecord = async () => {
    try {
      const recordString = await AsyncStorage.getItem('currentIdRecord')
      const record = JSON.parse(recordString)
      setData(record)
      // return record;
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    getUserRecord()
  }, [])
  return (
    <TailwindProvider>
      <View className="bg-white rounded-lg shadow-lg overflow-hidden">
        <Image
          className="w-full h-60 object-cover"
          alt="photo"
          source={require('../assets/images/plumberProfile.jpg')}
        />
        <View className="h-full">
          <View className="p-4  ">
            <View className="space-y-2 pt-5 ">
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <Text className=" ml-4">Name:</Text>
                <TextInput
                  className="p-2 ml-5 bg-gray-100 text-gray-700 rounded-2xl mb-1 text-sm"
                  value={data?.username}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <Text className=" ml-4">Email:</Text>
                <TextInput
                  className="p-2 ml-5 bg-gray-100 text-gray-700 rounded-2xl mb-1 text-sm"
                  value={data?.email}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <Text className=" ml-4">
                  Address{' '}
                  <Image
                    className="text-2xl w-6 h-6 mr-2"
                    source={require('../assets/images/location.png')}
                  />
                  :
                </Text>

                <TextInput
                  className="p-2 ml-5 bg-gray-100 text-gray-700 rounded-2xl mb-1 text-sm"
                  value={data?.address}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <Text className=" ml-4">
                  Phone{' '}
                  :
                </Text>

                <TextInput
                  className="p-2 ml-5 bg-gray-100 text-gray-700 rounded-2xl mb-1 text-sm"
                  value={data?.phone}
                />
              </View>
              
            </View>
            
          </View>
          <View className="flex-row pl-4 mr-10 space-x-10 pb-1 mt-4 justify-center">
            <TouchableOpacity className="h-12 ml bg-yellow-600 rounded-md flex flex-row justify-center items-center px-12">
              <View className="flex-1 flex items-center">
                <Text className="text-white text-base font-medium">Save</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        
      </View>
    </TailwindProvider>
  )
}
