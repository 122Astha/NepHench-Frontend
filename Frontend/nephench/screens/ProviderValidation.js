import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Button,
} from 'react-native'
import React, {useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

// subscribe for more videos like this :)
export default function ProviderValidation() {
  const navigation = useNavigation()
  const [selectedImageUri, setSelectedImageUri] = useState(null);

  const uploadPicture = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.canceled) {
      const selectedAssets = pickerResult.assets;
      if (selectedAssets.length > 0) {
        const selectedImageUri = selectedAssets[0].uri;
        setSelectedImageUri(selectedImageUri);
        const base64Image = await convertImageToBase64(selectedImageUri);
        // Send the base64Image to the server or process it as needed
        // console.log(base64Image, ' base64 image');
      }
    }
  };

  const convertImageToBase64 = async (imageUri) => {
    const base64Image = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return base64Image;
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 bg-white px-8  ">
        <ScrollView>
          <View className="form space-y-2 p-5">
            {/* <Input label="Username" /> */}
            <Text className="text-gray-700 ml-4">
              Service Provider Role Name
            </Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="Enter Name"
            />
            <Text className="text-gray-700 ml-4">
              Service Provider License number
            </Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="Enter Name"
            />
            <Text className="text-gray-700 ml-4">
              Front Image of license{' '}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
              <Image
                source={
                  selectedImageUri
                    ? { uri: selectedImageUri }
                    : require('../assets/images/plumber.png')
                }
                style={{ width: 100, height: 35, marginRight: 10 }}
              />
              <Button title="Upload Picture" onPress={uploadPicture} />
            </View>
            <Text className="text-gray-700 ml-4">
              Back Image of license
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
              <Image
                source={
                  selectedImageUri
                    ? { uri: selectedImageUri }
                    : require('../assets/images/plumber.png')
                }
                style={{ width: 100, height: 35, marginRight: 10 }}
              />
              <Button title="Upload Picture" onPress={uploadPicture} />
            </View>
            <Text className="text-gray-700 ml-4">ID Confirmation</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
              <Image
                source={
                  selectedImageUri
                    ? { uri: selectedImageUri }
                    : require('../assets/images/plumber.png')
                }
                style={{ width: 100, height: 35, marginRight: 10 }}
              />
              <Button title="Upload Picture" onPress={uploadPicture} />
            </View>
            <TouchableOpacity className="py-3 bg-yellow-400 rounded-xl" onPress={() => navigation.navigate('Home')}>
              <Text className="font-xl font-bold text-center text-gray-700">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}
