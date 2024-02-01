import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const BookingDetailsModal = ({ visible, onClose, serviceProvider, chosenServices, date,time, customer, address }) => {
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
          <Text>Customer : {customer} </Text>
           <Text>Date: {date}</Text>
           <Text>Time: {time}</Text>
           <Text>Address: {address}</Text>
          <Text className="pt-2">Chosen Services:</Text>
          {chosenServices.map((items) => (
            <View key={items.id} className="flex-row">
                <Text className="flex-1" >{items.service.name}</Text>
            <Text className="ml-5">Rs.{items.service.price}</Text>
                </View>

          ))}
        </View>
      </View>
    </Modal>
  );
};

export default BookingDetailsModal;