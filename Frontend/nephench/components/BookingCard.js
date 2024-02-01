import React, {useState} from 'react'
import { View, Text, TouchableOpacity, Image , StyleSheet} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import BookingDetailsModal from './BookingDetailsModal';
import { getDataFromApi } from '../utils/api';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const BookingCard = ({ id, img, spname, spId, date, time, services, status, progressStatus }) => {
  const navigation = useNavigation()
    const [isModalVisible, setModalVisible] = useState(false);
    const [chosenServices, setChosenServices] = useState([]);
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
    const paymentScreenHandle  = () => {
      navigation.navigate('PaymentScreen',
      { bookingId: id ,
       serviceProvider: spname ,
       spId:spId,
      chosenServices: chosenServices})
    }
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
  return (
    <View>
    <TouchableOpacity
         onPress={handleBookingClick}
      className="bg-white  shadow-sm"
    >
        <View className="flex-row" >
        <View className="image" style = {styles.avatar_bookings}>
          <FontAwesome name="wrench" size={40}/>
        </View>
      <View className="px-5 pb-4 flex-1">
            <Text className="font-bold text-lg pt-3">{formattedDate}</Text>
            <Text className=" text-md ">{formattedTime} - {formattedTime}</Text>
            </View>
            {progressStatus === 'completed' && (
         <View className="mt-5 mr-5">
         <TouchableOpacity
            onPress={paymentScreenHandle}
            className=" bg-yellow-400 rounded-xl"
          >
            <Text className="text-xl font-bold text-center text-gray-700 p-4">
              Pay
            </Text>
          </TouchableOpacity>
         {/* <Button title="Pay"
          onPress={paymentScreenHandle} 
          /> */}
       </View>
            )}
      </View>
            <View style={styles.separator} />
    </TouchableOpacity>

     {/* Popup Modal */}
     <BookingDetailsModal
     visible={isModalVisible}
     onClose={handleCloseModal}
     spId={spId}
     serviceProvider={spname}
     chosenServices={chosenServices}
     progressStatus={progressStatus}
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
export default BookingCard