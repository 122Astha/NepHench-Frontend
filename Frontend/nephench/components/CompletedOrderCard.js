import React, {useState , useEffect} from 'react'
import { View, Text, TouchableOpacity, Image , StyleSheet,Button} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { putDataToApi, getDataFromApi } from '../utils/api';
import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import OrderAcceptedModal from './OrderAcceptedModal';

const Stack = createStackNavigator();
const CompletedOrderCard = ({ id, img, spname, customer, date, time, address, services, status, progressStatus }) => {
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
    
      const bookingDate = new Date(date)
      const bookingDateTime = new Date(date[0], date[1] - 1, date[2], time[0], time[1]);
  // Format the date and time for display
    const formattedDate = bookingDate.toLocaleString('en-US', {
    weekday: 'long', // "Thursday"
    month: 'short',  // "Sep"
    day: 'numeric',   // "5"
    year: 'numeric'
  });
  const formattedTime = bookingDateTime.toLocaleTimeString('en-US', {
    hour: 'numeric',  // "2"
    minute: '2-digit', // "30"
    hour12: true      // AM/PM format
  });

  // Example: formattedTime = "2:30 PM"
const defaultDate = new Date(); // Use today's date as the default
const timeParts = formattedTime.split(':');
const hours = parseInt(timeParts[0], 10);
const minutes = parseInt(timeParts[1].split(' ')[0], 10);
const isPM = timeParts[1].includes('PM');

// Create a Date object with the default date and the parsed time
const timeRemainingDate = new Date(
  defaultDate.getFullYear(),
  defaultDate.getMonth(),
  defaultDate.getDate(),
  isPM ? hours + 12 : hours, // Adjust for PM
  minutes
);


  const currentTime = new Date();
  const timeRemainingMs = bookingDate - currentTime;
  const daysRemaining = Math.floor(timeRemainingMs / (24 * 60 * 60 * 1000));
  const hoursRemaining = Math.floor((timeRemainingMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutesRemaining = Math.floor((timeRemainingMs % (60 * 60 * 1000)) / (60 * 1000));
  console.log(`Days: ${daysRemaining}, Hours: ${hoursRemaining}, Minutes: ${minutesRemaining}`);
 
  useEffect(() => {
    // Check if progressStatus is "started" and display the "Complete" button
    if (progressStatus === 'completed') {
      setRefresh(true);
    }
  }, []);

  if(refresh) {
  return (
    <View>
    <TouchableOpacity
                        key={id}
                        onPress={handleBookingClick}
                        className=" bg-white  justify-between items-center rounded-lg mt-2 w-72"
                      >
                        <View>
                            <View className="flex-row" >
                                    <View className="px-5 pb-4 flex-1">
                                        <Text className="pt-4">Order From : {customer}</Text>
                                            <Text className="font-bold text-lg pt-3">Time Details:</Text>
                                            <Text>{formattedDate}</Text>
                                            <Text className=" text-md ">{formattedTime} </Text>
                                            <Text>Task Progress Status : {progressStatus}</Text>
                                    </View>
                             </View>
                        </View>
                       
                        <View style={styles.separator} />
                
                      </TouchableOpacity>
                       {/* Popup Modal */}
     <OrderAcceptedModal
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
}


const styles = StyleSheet.create({
    // Add styles for the modal container and content
    avatar_bookings: {
        
        marginTop: 20,
        
    },
    separator: {
      borderBottomColor: 'gray',
      borderBottomWidth: StyleSheet.hairlineWidth,
      marginVertical: 8,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      example: {
        marginVertical: 24,
      }
  });

export default CompletedOrderCard;