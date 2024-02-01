import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity , Linking, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getDataFromApi } from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

const SettingData = [
  // { id: '1', name: 'Help & Support', icon: 'support' },
  // { id: '2', name: 'NepHench Website', icon: 'home' },
  // { id: '3', name: 'Frequently Asked Questions', icon: 'question' },
  { id: '4', name: 'Privacy Policy', icon: 'cog' },
  { id: '5', name: 'About App', icon: 'apple' },
  { id: '6', name: 'Log Out', icon: 'cog' },
];

const Setting = () => {
  const navigation = useNavigation()
  const [data, setData] = useState({
  });

  const getCustomerId = async () => {
    try {
      const customerId = await AsyncStorage.getItem('customerId');
      return customerId;
    } catch (error) {
      console.log(error.message);
    }
  };
  const getUserDetail = async () => {
    const userId = await getCustomerId();
    try {
      const response = await getDataFromApi(`/users/${userId}`);
      setData(response);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleLogout = () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            
            navigation.navigate('Login');
          },
          style: 'destructive', // You can use 'default' for a regular button style
        },
      ],
      { cancelable: false }
    );
  };

 

  useEffect(() => {
    getUserDetail();
  }, []);

  return (
    <View className=' p-6 '>
     <View className="flex-row">
     <View className='flex-row'>
      {data.image ? (
          <Image style={{ width: 64, height: 60 , borderRadius:75 }} source={{uri: `data:image/jpeg;base64,${data.image}`}} alt="profile" />
        ) : (
          <Text>Loading...</Text>
        )}
        <View className='ml-4 flex-1'>
        <TouchableOpacity onPress={() => navigation.navigate('CustomerProfileScreen')}>
          <Text className=' text-xl font-semibold'>{data.username}</Text>
            </TouchableOpacity>
          <Text className=' text-md pt-1'>{data.email}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('CustomerProfileScreen')}>
      <View className='ml-12 mt-2'>
        <FontAwesome name='edit' size={25}></FontAwesome>
      </View>
      </TouchableOpacity>
     </View>
      <View className='bg-white h-px mt-6' />

<View>
        <TouchableOpacity className='flex-row bg-gray-500 my-4 p-4 rounded-lg items-center mt-3'  onPress={() => Linking.openURL('http://192.168.52.87:3006/presentation')}>
        <View className='flex-row flex-1'>
          <Icon name="home" color="#fff" size={26}  />
          <Text className='text-white text-lg ml-4'>NepHench Website</Text>
        </View>
        <Icon name="chevron-right" color="#fff" size={20}  />
      </TouchableOpacity>
      <TouchableOpacity className='flex-row bg-gray-500 my-4 p-4 rounded-lg items-center mt-3'   onPress={() => navigation.navigate('termandcondition')} >
        <View className='flex-row flex-1'>
          <Icon name="cog"color="#fff" size={26} />
          <Text className='text-white text-lg ml-4' >Privacy Policy</Text>
        </View>
        <Icon name="chevron-right" color="#fff" size={20} />
      </TouchableOpacity>
      <TouchableOpacity className='flex-row bg-gray-500 my-4 p-4 rounded-lg items-center mt-3'  onPress={() => navigation.navigate('AppInfo')} >
        <View className='flex-row flex-1'>
          <Icon name="cog" color="#fff" size={26} />
          <Text className='text-white text-lg ml-4'>About App</Text>
        </View>
        <Icon name="chevron-right" color="#fff" size={20} />
      </TouchableOpacity>
      <TouchableOpacity
      className='flex-row bg-gray-500 my-4 p-4 rounded-lg items-center mt-3'
      onPress={handleLogout}
    >
      <View className='flex-row flex-1'>
        <Icon name="cog" color="#fff" size={26} />
        <Text className='text-white text-lg ml-4'>Logout</Text>
      </View>
      <Icon name="chevron-right" color="#fff" size={20} />
    </TouchableOpacity>
      </View>
      {/* <FlatList
        data={SettingData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      /> */}
    </View>
  );
};

export default Setting;