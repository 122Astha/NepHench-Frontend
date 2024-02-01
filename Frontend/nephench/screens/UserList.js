import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet,Modal, Button} from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { postDataToApi, getDataFromApi } from '../utils/api'
// import { useNavigation } from '@react-navigation/native'
import moment from 'moment'

const RequestScreen = () => {
  const navigation = useNavigation()
  const [data, setData] = useState(null)
  const [modalVisiblee, setModalVisiblee] = useState(false)
  const route = useRoute()
  const {
    providerid,
    customer,
    selectedtime,
    selecteddate,
    service,
  } = route.params
  // console.log(service, "Is services coming in userlist")
  const formattedtime = moment(selectedtime, ['hh:mm A']).format('hh:mm A')
  const formatteddate = selecteddate.replace(/"/g, '')
  const date = formatteddate.toString() // Convert date to string
  const time = formattedtime.toString() //
  // console.log(date, 'date')
  // console.log(time, 'time')
  const getServiceProvider = async () => {
    try {
      const res = await getDataFromApi('/users/serviceproviders')
      setData(res)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getServiceProvider()
  }, [])

  const filteredService =
    data &&
    data
      .filter(function (datum) {
        return datum.serviceprovider.id == providerid
      })
      .map(function (datum) {
        return datum
      })

  const onBooking = async (serviceProvider) => {
    try {
      console.log(serviceProvider, 'serviceProvider')
      console.log(customer, 'customer id in user lIST')
      console.log(time, 'time value in user lIST')
      console.log(date, 'Date value in user lIST')
      console.log(service, 'service From USER lIST')
      const response = await postDataToApi('/bookings', {
        customer,
        time,
        date,
        service,
        serviceProvider,
      })
      setModalVisiblee(true)
      console.log(response, 'what is reponse of this feelow in user List')
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <View className="p-4 mt-10">
      <Text className="text-lg font-bold text-center">
        Our Trusted Service provider
      </Text>
      <ScrollView>
        <View className="mt-5">
          {filteredService &&
            filteredService.map((items) => (
              <View
                className="flex-col justify-between p-4 border-b border-gray-300"
                key={items.id}
              >
                <View className="flex-row items-center">
                  <Image
                    source={require('../assets/images/plumberProfile.jpg')}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <View className="flex-1">
                    <Text className="text-lg font-semibold">
                      {items.username}
                    </Text>
                    <Text className="text-gray-500">
                      Role Name: {items.role.name}
                    </Text>
                    {/* <Text className="text-gray-500">
                      Role Id: {items.serviceprovider.id}
                    </Text>
                    <Text className="text-gray-500">
                      Rating: {items.totalRatings}
                    </Text> */}
                  </View>
                </View>
                <View className="flex-row justify-end mt-2">
                  <TouchableOpacity
                    className="flex-1 bg-green-500 rounded p-2 mr-2"
                    onPress={() => onBooking(items.id)}
                  >
                    <Text className="text-white text-center">Booking</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-1 bg-gray-300 rounded p-2">
                    <Text className="text-red-500 text-center">Reject</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisiblee}
        onRequestClose={() => {
          setModalVisiblee(false)
          // Optionally, navigate to a different screen or perform any other action
          navigation.navigate('Home')
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Booking Request Successfully Send</Text>
            <Button
              title="Close"
              onPress={() => {
                setModalVisiblee(false)
                navigation.navigate('Home')
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

export default RequestScreen
