import { View, Text, TouchableOpacity, Image, TextInput, Alert } from 'react-native'
import React, {useState, useRef, useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from "react-hook-form";
import { postDataToApi } from '../utils/api'
import * as Notifications from "expo-notifications"
import {signIn} from "../firebase"
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
  }),
});

async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('Permission for push notifications not granted');
    return;
  }

  // Get the device token
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log('Device Token:', token);
  // setDeviceToken(token)

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
}


export default function LoginScreen() {
  const navigation = useNavigation()

  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [error, setError] = useState(null);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const { handleSubmit, control, formState: { errors } } = useForm();
  console.log(expoPushToken, "token token")
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  // console.log(token,"device token")
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });
  
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
  
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };


    
  }, []);  




  const onLogin = async (data) => {
    console.log('Expo Push Token:', expoPushToken);
    const { email, password } = data;

    try {
      // Perform database login
      const databaseResponse = await postDataToApi('/users/login', { email, password });
      await AsyncStorage.setItem('currentIdRecord', JSON.stringify(databaseResponse))
      const value = databaseResponse.id
      await AsyncStorage.setItem('customerId', JSON.stringify(value))

      // Perform Firebase login (assuming you have a separate signIn function for Firebase)
      await signIn(email, password);

      // Firebase login was successful, navigate to MapScreen
      if (databaseResponse.roleName === "Service Provider") {
        // If the database login is successful and the role is "Service Provider," navigate to MyOrders
        navigation.navigate('MyOrders');
      } else {
        navigation.navigate('MapScreen');
      }
    } catch (error) {
      // Handle errors
      // console.error('An error occurred:', error);

      // Check if the error is related to Firebase authentication
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        const firebaseErrorMessage = 'Firebase authentication error: ' + error.message;
        console.log(firebaseErrorMessage);
        // Set the error message state and open the modal
        setErrorMessage(firebaseErrorMessage);
        setIsErrorModalVisible(true);
      } else {
        const otherErrorMessage = 'Other error occurred: ' + error.message;
        console.log(otherErrorMessage);
        // Set the error message state and open the modal
        setErrorMessage(otherErrorMessage);
        setIsErrorModalVisible(true);
      }
    }
  };

  const closeErrorModal = () => {
    // Close the error modal
    setIsErrorModalVisible(false);
  };

  return (
    <SafeAreaView >
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
       {/* Display the error message in a modal */}
       <Modal isVisible={isErrorModalVisible}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
            <Text style={{ color: 'red', marginBottom: 10 }}>{errorMessage}</Text>
            <TouchableOpacity onPress={closeErrorModal}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
        {/* Display the error message if it exists */}
          <View className="text-xl font-bold text-center text-gray-700">
          <Text className="text-3xl text-yellow-400 font-bold text-center ">
            Welcome Back
          </Text>
          <Text className="text-gray-500 ml-4 text-center">
            Login to your account
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

          <Text className="text-gray-700 ml-4">Password</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="p-2 bg-gray-100 text-gray-700 rounded-2xl"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={value => onChange(value)}
                value={value}
              />
            )}
            name="password"
            rules={{ required: true }}
          />
          <TouchableOpacity className="flex items-end" onPress={() => navigation.navigate('ForgetPasswordScreen')}>
            <Text className="text-gray-700 mb-5">Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSubmit(onLogin)}
            className="py-3 bg-yellow-400 rounded-xl"
          >
            <Text className="text-xl font-bold text-center text-gray-700">
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-500 font-semibold">
            Don't have an account?
          </Text>
          <TouchableOpacity  onPress={() => navigation.navigate('SignUp')}>
            <Text className="font-semibold text-yellow-500"> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </SafeAreaView>
  )
  };
  




