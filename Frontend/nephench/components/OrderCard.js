import React, {useState} from 'react'
import { View, Text, TouchableOpacity, Image , StyleSheet} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import OrderDetailModal from './OrderDetailModal';
import { putDataToApi, getDataFromApi } from '../utils/api';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const OrderCard = ({ id, img, spname, customer, date, time, address, services, status, progressStatus }) => {
  const navigation = useNavigation()
    const [isModalVisible, setModalVisible] = useState(false);
    const [chosenServices, setChosenServices] = useState([]);
    const [refresh, setRefresh] = useState(false)
    const handleBookingClick = async () => {
        try {
              const response = await getDataFromApi(`/bookings/services/${id}`);
              setChosenServices(response);
          } catch (error) {
            console.log(error.message);
          }
      setModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setModalVisible(false);
    };

  // Convert date and time arrays to a Date object
  const bookingDateTime = new Date(date[0], date[1] - 1, date[2], time[0], time[1]);

  // Format the date and time for display
    const formattedDate = bookingDateTime.toLocaleString('en-US', {
    weekday: 'long', // "Thursday"
    month: 'short',  // "Sep"
    day: 'numeric'   // "5"
  });
  const formattedTime = bookingDateTime.toLocaleTimeString('en-US', {
    hour: 'numeric',  // "2"
    minute: '2-digit', // "30"
    hour12: true      // AM/PM format
  });

  const handleAcceptRequest = async (id) => {
    try {

    // Make an API call to update the request status
    const res = await putDataToApi(`/bookings/${id}/accept`);
    console.log(res.message, "updated accepted ?");
    if (res.message === 'Booking accepted'){
      setRefresh(true)
    }
    
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRejectRequest = async (id) => {
    try {
      // Update the status of the request to "rejected"

      // Make an API call to update the request status
      const res = await putDataToApi(`/bookings/${id}/reject`)
      // console.log(res, "updated rejected? ")
      // Refresh the pending requests list
    
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <View>
    <TouchableOpacity
                        key={id}
                        onPress={handleBookingClick}
                        className=" bg-gray-700 justify-between items-center rounded-lg mt-2  px-4 py-6"
                      >
                        <Text className="text-white">
                          Dear {spname}, You have a new booking request from {customer}. Please click to view the booking description !!!
                        </Text>
                
                        <View className="flex-row block">
                          <TouchableOpacity
                            style={{ marginRight: 10 }}
                            className="bg-green-500 px-2 py-2 mt-2  rounded-md "
                            onPress={() => handleAcceptRequest(id)}
                          >
                            <Text className="text-white">Accept</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            className="bg-red-500 px-2 py-2 mt-2 rounded-md"
                            onPress={() => handleRejectRequest(id)}
                          >
                            <Text className="text-white">Reject</Text>
                          </TouchableOpacity>
                        </View>
                      </TouchableOpacity>
     {/* Popup Modal */}
     <OrderDetailModal
     visible={isModalVisible}
     onClose={handleCloseModal}
     serviceProvider={spname}
     chosenServices={chosenServices}
     date={formattedDate}
     time={formattedTime}
     customer={customer}
     address={address}
   />
   </View>
  )
}


const styles = StyleSheet.create({
    // Add styles for the modal container and content
    avatar_bookings: {
        paddingLeft: 16,
        marginTop: 20,
        marginLeft: 10
    },
    separator: {
      borderBottomColor: 'gray',
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginVertical: 8,
    },
  });
export default OrderCard