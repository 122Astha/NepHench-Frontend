import React, {useState} from 'react'
import { View, Text, TouchableOpacity, Image , StyleSheet,Button} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { putDataToApi, getDataFromApi } from '../utils/api';
import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import OrderAcceptedModal from './OrderAcceptedModal';

const Stack = createStackNavigator();
const OrderAcceptedCard = ({ id, img, spname, customer, date, time, address, services, status, progressStatus }) => {
  const navigation = useNavigation()
  const [isModalVisible, setModalVisible] = useState(false);
  const [chosenServices, setChosenServices] = useState([]);
    const [refresh, setRefresh] = useState(false)
    const [progressState, setProgressState] = useState('pending'); // 'pending', 'starting', 'completed'
    const [progressValue, setProgressValue] = useState(0);
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
    const handleStart = () => {
        // When the user clicks "Start," update the progress state and value
        setProgressState('starting');
        setProgressValue(0);
    
        // Simulate progress (e.g., using a timer)
        const progressInterval = setInterval(() => {
          if (progressValue < 1) {
            setProgressValue((prevValue) => prevValue + 0.1);
          } else {
            // Progress completed
            setProgressState('completed');
            clearInterval(progressInterval);
          }
        }, 1000);
      };

  // Convert date and time arrays to a Date object
  const bookingDateTime = new Date(- 1, date[2], time[0], time[1]);
      const bookingDate = new Date(date)
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

  return (
    <View>
    <TouchableOpacity
                        key={id}
                        onPress={handleBookingClick}
                        className=" bg-white  justify-between items-center rounded-lg mt-2  px-4 w-96 h-20"
                      >
                        <View>
                            <View className="flex-row" >
                                    <View className="image" style = {styles.avatar_bookings}>
                                    <FontAwesome name="wrench" size={40}/>
                                    </View>
                                    <View className="px-5 pb-4 flex-1">
                                            <Text className="font-bold text-lg pt-3">{formattedDate}</Text>
                                            <Text className=" text-md ">{formattedTime} </Text>
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

export default OrderAcceptedCard;