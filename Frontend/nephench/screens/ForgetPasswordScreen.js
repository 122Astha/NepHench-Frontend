import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, {useState, useRef, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from "react-hook-form";
import { postDataToApi } from '../utils/api'
import AsyncStorage from '@react-native-async-storage/async-storage'



export default function ForgetPasswordScreen() {
  const navigation = useNavigation()


  const { handleSubmit, control, formState: { errors } } = useForm();

  const onRequest = async (data) => {
    const { email } = data
    try{
      const response = await postDataToApi('/reset-password/request', { email});
          navigation.navigate('ResetPasswordScreen')

        
    }catch(error) {
      console.log(error.message)
    }
    
  }

  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: '#72A0C1' }}>
      <SafeAreaView className="flex ">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center w-full">
          <Image
            source={require('../assets/images/plumber.png')}
            style={{ width: 200, height: 200 }}
          />
        </View>
      </SafeAreaView>
      <View
        style={{ borderTopLeftRadius: 200 }}
        className="flex-1 bg-white px-8 pt-14"
      >
        <View className="text-xl font-bold text-center text-gray-700">
          <Text className="text-3xl text-yellow-400 font-bold text-center mt-10 ">
            Forgot Password
          </Text>
          <Text className="text-gray-500 mt-4 text-center">
            Enter the email address associated with your account
          </Text>
        </View>
        <View className="form space-y-2 pt-8">
          <Text className="text-gray-700 ml-4">Email</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="p-2 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name="email"
            rules={{ required: true }}
          />

         
          <TouchableOpacity
            onPress={handleSubmit(onRequest)}
            className="py-3 bg-yellow-400 rounded-xl"
          >
            <Text className="text-xl font-bold text-center text-gray-700">
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

