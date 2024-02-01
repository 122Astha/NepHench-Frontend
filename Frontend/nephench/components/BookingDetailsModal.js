import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import StarRating from './StarRating';
import { useNavigation } from '@react-navigation/native';

const BookingDetailsModal = ({ visible, onClose, serviceProvider, spId, chosenServices , progressStatus }) => {
  const navigation = useNavigation()
  const total = chosenServices.reduce((accumulator, items) => {
    const price = parseFloat(items.service.price);
    if (!isNaN(price)) {
      return accumulator + price;
    }
    return accumulator;
  }, 0);

  function handlePress() {
    navigation.navigate('chats')
  }

  
  return (
    <Modal visible={visible} onRequestClose={onClose} transparent>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 40, borderRadius: 8 }}>
            <View className="flex-row">
                    <Text  className="text-lg font-bold pb-5 flex-1">Booking Details:</Text>
                    <TouchableOpacity onPress={onClose}>
                    <View className="image -mt-5 -mr-3">
                <FontAwesome name="close" size={20}/>
                </View>
                </TouchableOpacity>
            </View>
           
          <Text>Service Provider : {serviceProvider} </Text>
          <Text className="pt-2">Chosen Services:</Text>
          {chosenServices.map((items) => (
            <View key={items.id} className="flex-row">
                <Text className="flex-1" >{items.service.name}</Text>
            <Text className="ml-5">Rs.{items.service.price}</Text>
                </View>
          
          ))}
          <View className="flex-row pt-2">
          <Text className="flex-1">Total Service Charge</Text>
          <Text>Rs.{total}</Text>
          </View>

          <TouchableOpacity className="py-2 bg-yellow-400 rounded-xl mt-5">
            <Text
              className="text-lg font-bold text-center text-gray-700"
              onPress={handlePress}
            >
              Contact {serviceProvider}
            </Text>
          </TouchableOpacity>

          {progressStatus === 'completed' && (
              <StarRating 
              spId={spId}
              />
            )}
        </View>
      </View>
    </Modal>
  );
};

export default BookingDetailsModal;