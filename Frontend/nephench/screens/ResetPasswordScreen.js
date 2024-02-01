import { View, Text, TouchableOpacity, Image, TextInput, Alert , ScrollView } from 'react-native'
import React, {useState, useRef, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from "react-hook-form";
import { postDataToApi } from '../utils/api'
import AsyncStorage from '@react-native-async-storage/async-storage'



export default function ResetPasswordScreen() {
  const navigation = useNavigation()

  const { handleSubmit, control, formState: { errors } } = useForm();

  const onReset = async (data) => {
    const { token , newPassword } = data
    try{
      const response = await postDataToApi('/reset-password/reset', { token, newPassword});
        if(response){
          console.log(response.message, "hello from reset password")
          navigation.navigate('Login')
        }
        
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
          <ScrollView>
        <View className="text-xl font-bold text-center text-gray-700">
          <Text className="text-3xl text-yellow-400 font-bold text-center mt-10 ">
            Reset Password
          </Text>
          <Text className="text-gray-500 mt-4 text-center">
           Please enter the code sent to the email address associated with your account along with new password.
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

        <Text className="text-gray-700 ml-4">Code</Text>
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
            name="token"
            rules={{ required: true }}
          />
          <Text className="text-gray-700 ml-4">New Password</Text>
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
            name="newPassword"
            rules={{ required: true }}
          />
          <TouchableOpacity
            onPress={handleSubmit(onReset)}
            className="py-3 bg-yellow-400 rounded-xl"
          >
            <Text className="text-xl font-bold text-center text-gray-700">
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
     </ScrollView>
      </View>
    </View>
  )
}

