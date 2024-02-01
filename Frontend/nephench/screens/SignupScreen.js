import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Button,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import RNPickerSelect from 'react-native-picker-select'
import { useForm, Controller } from 'react-hook-form'
import { postDataToApi, getDataFromApi } from '../utils/api'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { signUp } from '../firebase'

export default function SignUpScreen() {
  const navigation = useNavigation()
  const [roleName, setRoleName] = useState(null)
  const [data, setData] = useState([])
  const [serviceProviderRoleName, setServiceProviderRoleName] = useState([])
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()
  const [confirmationImage, setConfirmationImage] = useState(null)
  const [frontImage, setFrontImage] = useState(null)
  const [backImage, setBackImage] = useState(null)
  const convertImageToBase64 = async (imageUri) => {
    const base64Image = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    })
    return base64Image
  }
  const uploadID = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!permissionResult.granted) {
      alert('Permission to access camera roll is required!')
      return
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync()
    if (!pickerResult.canceled) {
      const selectedAssets = pickerResult.assets
      if (selectedAssets.length > 0) {
        const confirmationImage = selectedAssets[0].uri
        const base64Image = await convertImageToBase64(confirmationImage)
        setConfirmationImage(base64Image)
      }
    }
  }
  const uploadFrontImg = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!permissionResult.granted) {
      alert('Permission to access camera roll is required!')
      return
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync()
    if (!pickerResult.canceled) {
      const selectedAssets = pickerResult.assets
      if (selectedAssets.length > 0) {
        const frontImage = selectedAssets[0].uri
        const base64Image = await convertImageToBase64(frontImage)
        setFrontImage(base64Image)
      }
    }
  }
  const uploadBackImg = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (!permissionResult.granted) {
      alert('Permission to access camera roll is required!')
      return
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync()
    if (!pickerResult.canceled) {
      const selectedAssets = pickerResult.assets
      if (selectedAssets.length > 0) {
        const backImage = selectedAssets[0].uri
        const base64Image = await convertImageToBase64(backImage)
        setBackImage(base64Image)
      }
    }
  }

  const onSignUpForCustomer = async (data) => {
    const displayName = data.username
    const { username, password, confirmPassword, email, phone } = data
    try {
      const response = await postDataToApi('/users/register', {
        username,
        password,
        confirmPassword,
        email,
        roleName,
        phone,
      })
      await signUp(email, password, displayName)
      navigation.navigate('Login')
    } catch (error) {
      console.log(error.message)
    }
  }
  const onSignUpForProvider = async (data) => {
    const displayName = data.username
    const {
      username,
      password,
      confirmPassword,
      email,
      liscenceNo,
      phone,
    } = data
    try {
      const response = await postDataToApi('/users/register', {
        username,
        password,
        confirmPassword,
        email,
        roleName,
        serviceProviderRoleName,
        liscenceNo,
        frontImage,
        backImage,
        confirmationImage,
        phone,
      })
      await signUp(email, password, displayName)
      navigation.navigate('Login')
    } catch (error) {
      console.log(error.message)
    }
  }
  const handleRoleName = (value) => {
    setRoleName(value)
  }
  const handleProviderName = (value) => {
    setServiceProviderRoleName(value)
  }
  const roleNameOptions = data.map((item) => ({
    label: item.roleName,
    value: item.roleName,
  }))

  const getServiceCat = async () => {
    try {
      const response = await getDataFromApi('/serviceprovider')
      setData(response)
    } catch (error) {
      console.log(error.message)
    }
  }
  console.log(data, 'hello role name')

  useEffect(() => {
    getServiceCat()
  }, [])
  return (
    <View className="flex-1 bg-white" style={{ backgroundColor: '#6699CC' }}>
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center">
          <Image
            source={require('../assets/images/plumber.png')}
            style={{ width: 200, height: 200 }}
          />
        </View>
      </SafeAreaView>
      <View
        className="flex-1 bg-white px-8 pt-14 "
        style={{ borderTopLeftRadius: 200 }}
      >
        <ScrollView>
          <View className="form space-y-2 p-5 m-5">
            <Text className="text-gray-700 ml-4">User Name</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="p-2 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="username"
              rules={{ required: true }}
            />
            <Text className="text-gray-700 ml-4">Email Address</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="p-2 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="email"
              rules={{ required: true }}
            />
            <Text className="text-gray-700 ml-4">Phone Number</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="p-2 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="phone"
              rules={{ required: true }}
            />
            <Text className="text-gray-700 ml-4">Password</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="p-2 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="password"
              rules={{ required: true }}
            />
            <Text className="text-gray-700 ml-4">Confirm Password</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="p-2 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  secureTextEntry
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
              name="confirmPassword"
              rules={{ required: true }}
            />
            <Text className="text-gray-700 ml-4">Role</Text>
            <RNPickerSelect
              placeholder={{
                label: 'Select an option...',
              }}
              items={[
                { label: 'Customer', value: 'Customer' },
                { label: 'Service Provider', value: 'Service Provider' },
              ]}
              onValueChange={handleRoleName}
              value={roleName}
            />

            {roleName === 'Service Provider' ? (
              <View className="form space-y-2 p-5">
                {/* <Input label="Username" /> */}
                <Text className="text-gray-700 ml-4">
                  Service Provider Role Name
                </Text>
                <RNPickerSelect
                  placeholder={{
                    label: 'Select an option...',
                    value: null,
                  }}
                  items={roleNameOptions}
                  onValueChange={handleProviderName}
                  value={serviceProviderRoleName}
                />

                <Text className="text-gray-700 ml-4">
                  Service Provider Pancard number
                </Text>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className="p-2 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                    />
                  )}
                  name="liscenceNo"
                  rules={{ required: true }}
                />
                <Text className="text-gray-700 ml-4">
                  Front Image of Pancard{' '}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                  }}
                >
                  <Image
                    source={
                      frontImage
                        ? { uri: frontImage }
                        : require('../assets/images/plumber.png')
                    }
                    style={{ width: 100, height: 35, marginRight: 10 }}
                  />
                  <Button title="Upload Picture" onPress={uploadFrontImg} />
                </View>
                <Text className="text-gray-700 ml-4">
                  Back Image of Pancard
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                  }}
                >
                  <Image
                    source={
                      backImage
                        ? { uri: backImage }
                        : require('../assets/images/plumber.png')
                    }
                    style={{ width: 100, height: 35, marginRight: 10 }}
                  />
                  <Button title="Upload Picture" onPress={uploadBackImg} />
                </View>
                <Text className="text-gray-700 ml-4">Profile Image</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 10,
                  }}
                >
                  <Image
                    source={
                      confirmationImage
                        ? { uri: confirmationImage }
                        : require('../assets/images/plumber.png')
                    }
                    style={{ width: 100, height: 35, marginRight: 10 }}
                  />
                  <Button title="Upload Picture" onPress={uploadID} />
                </View>
                <TouchableOpacity
                  className="py-3 bg-yellow-400 rounded-xl"
                  onPress={handleSubmit(onSignUpForProvider)}
                >
                  <Text className="font-xl font-bold text-center text-gray-700">
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                onPress={handleSubmit(onSignUpForCustomer)}
                className="py-3 bg-yellow-400 rounded-xl"
              >
                <Text className="font-xl font-bold text-center text-gray-700">
                  Sign Up
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('termandcondition')}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '78%',
                paddingRight: 16,
              }}
            >
              <Text style={{ color: 'grey', fontSize: 16 }}>
                By signing in, you agree to our{''}
              </Text>
              <Text
                style={{ fontWeight: 'bold', fontSize: 16 }}
                className="text-gray-500"
              >
                Terms & Conditions
              </Text>
            </View>
          </TouchableOpacity>

          <View className="flex-row justify-center m-2">
            <Text className="text-gray-500 font-semibold">
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="font-semibold text-yellow-500"> Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}
