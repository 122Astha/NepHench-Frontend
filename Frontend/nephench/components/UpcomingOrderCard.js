import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Button,
  Modal,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { putDataToApi, getDataFromApi } from '../utils/api'
import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import OrderAcceptedModal from './OrderAcceptedModal'

const Stack = createStackNavigator()
const UpcomingOrderCard = ({
  id,
  img,
  spname,
  customer,
  date,
  time,
  address,
  services,
  status,
  progressStatus,
}) => {
  const navigation = useNavigation()
  const [isModalVisible, setModalVisible] = useState(false)
  const [chosenServices, setChosenServices] = useState([])
  const [modalVisiblee, setModalVisiblee] = useState(false)

  const [refresh, setRefresh] = useState(false)

  const handleCompleteButton = async () => {
    try {
      // Send the PUT request
      await putDataToApi(`/bookings/${id}/progress?progressStatus=completed`)

      // Toggle the modal to show
      setModalVisiblee(true)
    } catch (error) {
      console.error('Error:', error)
    }
  }
  const handleBookingClick = async () => {
    try {
      const response = await getDataFromApi(`/bookings/services/${id}`)
      setChosenServices(response)
    } catch (error) {
      console.log(error.message)
    }
    setModalVisible(true)
  }
  const handleCloseModal = () => {
    setModalVisible(false)
  }

  // Convert date and time arrays to a Date object

  const isBookingDateValid = () => {
    const bookingDateTime = new Date(date)
    const currentDate = new Date()
    return bookingDateTime >= currentDate
  }

  if (!isBookingDateValid()) {
    return null
  }
  const bookingDate = new Date(date)
  const bookingDateTime = new Date(
    date[0],
    date[1] - 1,
    date[2],
    time[0],
    time[1],
  )
  // Format the date and time for display
  const formattedDate = bookingDate.toLocaleString('en-US', {
    weekday: 'long', // "Thursday"
    month: 'short', // "Sep"
    day: 'numeric', // "5"
    year: 'numeric',
  })
  const formattedTime = bookingDateTime.toLocaleTimeString('en-US', {
    hour: 'numeric', // "2"
    minute: '2-digit', // "30"
    hour12: true, // AM/PM format
  })

  // Example: formattedTime = "2:30 PM"
  const defaultDate = new Date() // Use today's date as the default
  const timeParts = formattedTime.split(':')
  const hours = parseInt(timeParts[0], 10)
  const minutes = parseInt(timeParts[1].split(' ')[0], 10)
  const isPM = timeParts[1].includes('PM')

  // Create a Date object with the default date and the parsed time
  const timeRemainingDate = new Date(
    defaultDate.getFullYear(),
    defaultDate.getMonth(),
    defaultDate.getDate(),
    isPM ? hours + 12 : hours, // Adjust for PM
    minutes,
  )
  useEffect(() => {
    if (isBookingDateValid() && progressStatus !== 'started') {
      const bookingDate = new Date(
        date[0],
        date[1] - 1,
        date[2],
        time[0],
        time[1],
      )
      const currentTime = new Date()
      const timeRemainingMs = bookingDate - currentTime
      const daysRemaining = Math.floor(timeRemainingMs / (24 * 60 * 60 * 1000))
      const hoursRemaining = Math.floor(
        (timeRemainingMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000),
      )
      const minutesRemaining = Math.floor(
        (timeRemainingMs % (60 * 60 * 1000)) / (60 * 1000),
      )
      console.log(daysRemaining)
      if (
        daysRemaining === 0 &&
        hoursRemaining === 0 &&
        minutesRemaining === 0
      ) {
        // Time has reached 0, update progressStatus to 'started'
        putDataToApi(`/bookings/${id}/progress?progressStatus=started`)
      }
    }
  }, [])

  const currentTime = new Date()
  const timeRemainingMs = bookingDate - currentTime
  const daysRemaining = Math.floor(timeRemainingMs / (24 * 60 * 60 * 1000))
  const hoursRemaining = Math.floor(
    (timeRemainingMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000),
  )
  const minutesRemaining = Math.floor(
    (timeRemainingMs % (60 * 60 * 1000)) / (60 * 1000),
  )
  console.log(
    `Days: ${daysRemaining}, Hours: ${hoursRemaining}, Minutes: ${minutesRemaining}`,
  )
  return (
    <View>
      <TouchableOpacity
        key={id}
        onPress={handleBookingClick}
        className=" bg-white  justify-between items-center rounded-lg mt-2 w-72"
      >
        <View>
          <View className="flex-row">
            <View className="px-5 pb-4 flex-1">
              <Text className="pt-4">Order From : {customer}</Text>
              <Text className="font-bold text-lg pt-3">Time Details:</Text>
              <Text>{formattedDate}</Text>
              <Text className=" text-md ">{formattedTime} </Text>
              {isBookingDateValid() ? (
                <View>
                  <Text className="pt-2">Time Remaining:</Text>
                  <Text>
                    {daysRemaining} Days {hoursRemaining} Hours{' '}
                    {minutesRemaining} Minutes
                  </Text>
                </View>
              ) : (
                <Text>Order Expired</Text>
              )}
              <Text className="pt-2">
                Task Progress Status : {progressStatus}
              </Text>
              {progressStatus === 'started' && <Button title="Complete" />}
              <View className="mt-4">
                <Button title="Complete" onPress={handleCompleteButton} />
              </View>
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisiblee}
        onRequestClose={() => {
          setModalVisiblee(false)
          // Optionally, navigate to a different screen or perform any other action
          // navigation.navigate('CompletedOrders')
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Task Successfully successfully</Text>
            <Button
              title="Close"
              onPress={() => {
                setModalVisiblee(false)
                navigation.navigate('Completed Orders')
              }}
              style={{ backgroundColor: '#1B3D9B' }}
            />
          </View>
        </View>
      </Modal>
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#f6e05e',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
})

export default UpcomingOrderCard
