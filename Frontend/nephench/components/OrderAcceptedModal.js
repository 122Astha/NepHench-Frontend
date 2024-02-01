import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const OrderAcceptedModal = ({ visible, onClose, serviceProvider, chosenServices, date,time, customer, address }) => {
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
          <Text className="pt-4">Chosen Services:</Text>
          {chosenServices.map((items) => (
            <View key={items.id} className="flex-row">
                <Text className="flex-1" >{items.service.name}</Text>
            <Text className="ml-5">Rs.{items.service.price}</Text>
                </View>
          ))}
          <Text className="pt-4">For further inquiry you have the options:</Text>
          <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Icon name="phone" size={30} color="#007AFF" />
                <Text style={styles.buttonText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Icon name="comment" size={30} color="#007AFF" />
                <Text style={styles.buttonText}>Chat</Text>
            </TouchableOpacity>
            </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      marginTop: 10
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderWidth: 1,
      borderColor: '#007AFF',
    },
    buttonText: {
      marginLeft: 10, // Adjust spacing between icon and text as needed
      color: '#007AFF',
      fontSize: 18,
    },
  });

export default OrderAcceptedModal;