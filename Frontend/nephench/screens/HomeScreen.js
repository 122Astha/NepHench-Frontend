import { View, Text, Image, TextInput, ScrollView , Modal, TouchableOpacity, StyleSheet, TouchableWithoutFeedback , BackHandler, Alert} from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation  } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Categories from '../components/Categories'
import FeaturedRow from '../components/FeaturedRow'
import { FontAwesome } from '@expo/vector-icons';
import { getDataFromApi } from '../utils/api';
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function HomeScreen() {
  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isExitConfirmationVisible, setExitConfirmationVisible] = useState(false);

  const getCustomerId = async () => {
    try {
      const customerId = await AsyncStorage.getItem('customerId')
      return customerId
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleIconPress = () => {
    setModalVisible((prevModalVisible) => !prevModalVisible)
  }

  const closeModal = () => {
    setModalVisible(false)
  }

  const getNotifications = async () => {
    try {
      const userId = await getCustomerId()
      const res = await getDataFromApi(`/notification/${userId}`)
      setNotifications(res)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getNotifications()
  }, [])

  const handleBackPress = () => {
   
    // Show the exit confirmation alert on the HomeScreen
    if (navigation.isFocused()) {
      setExitConfirmationVisible(true);
      Alert.alert('Exit App', 'Do you really want to exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Exit',
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true; // Prevent default back button behavior
    }
    return false; // Allow back navigation on other screens
  };
  useEffect(() => {
   
 
 // Add the event listener when the component mounts
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // Remove the event listener when the component unmounts
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  })

  const handleExitConfirmation = () => {
    setExitConfirmationVisible(false);
    BackHandler.exitApp();
  }

  const handleCancelExit = () => {
    setExitConfirmationVisible(false);
  }
  return (
    <>
      <ScrollView>
        <SafeAreaView className="bg-white pt-5 relative">
          {/* Header */}
          <View className="flex-row pb-2 items-center mx-4 space-x-2">
            <Image
              source={require('../assets/logo/logo1.png')}
              className="h-7 w-7 bg-gray-300 p-4 rounded-full"
            />
            <View className="flex-1">
              <Text className="font-bold text-gray-400 text-xs">Book Now!</Text>
              <Text className="font-bold text-xl">Current Location</Text>
            </View>
            <View>
      {/* Notification Icon */}
      <TouchableOpacity onPress={handleIconPress}>
        <View className="notification">
          <FontAwesome name="bell" size={20} />
        </View>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="popup"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        
              <TouchableWithoutFeedback onPress={closeModal}>
                 <View style={ styles.modalContainer }>
                   {/* Modal Content */}
                  <View style={{ backgroundColor: 'white', padding: 20 }}>
          
                    {/* List of Notifications */}
                    {notifications.map((request, index) => (
                      <View key={index}>
                      <Text >{request.content}</Text>
                      {index !== notifications.length - 1 && <View style={styles.separator} />}
                      </View>
                    ))}   
                  </View>
                </View>
                </TouchableWithoutFeedback>
              </Modal>
            </View>
          </View>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Image
              source={require('../assets/images/coverPage.jpg')}
              style={{ borderRadius: 10, width: 370, height: 200 }}
            />
            <View
              style={{
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              }}
            >
              <Text
                style={{ textAlign: 'center' }}
                className="text-black font-bold text-2xl"
              >
                Get Discount
              </Text>
              <Text
                style={{ textAlign: 'center' }}
                className="text-black font-bold text-2xl"
              >
                Upto 10%
              </Text>
              <Text
                style={{ textAlign: 'center' }}
                className="text-white font-bold text-lg"
              >
                On Your First Order!
              </Text>
            </View>
          </View>

          {/* Body */}
          <ScrollView
            className="bg-gray-100"
            contentContainerStyle={{
              paddingBottom: 100,
            }}
          >
            {/* Categories */}
            <Categories />

            {/* Feature Rows */}
            <FeaturedRow />
          </ScrollView>
        </SafeAreaView>
      </ScrollView>
    </>
  )
}


const styles = StyleSheet.create({
  // Add styles for the modal container and content
  modalContainer: {
    flex: 1,
    marginTop: 60,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center'
  },
  separator: {
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 8,
  },
});