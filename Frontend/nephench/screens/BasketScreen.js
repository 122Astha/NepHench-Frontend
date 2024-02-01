import React, { useMemo, useState, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { selectService } from '../features/serviceSlice'
import { useDispatch, useSelector } from 'react-redux'
import TimePicker from './TimePicker'
import ScheduleScreen from './ScheduleScreen'
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from '../features/basketSlice'
import { XCircleIcon } from 'react-native-heroicons/solid'
import AsyncStorage from '@react-native-async-storage/async-storage'

const BasketScreen = () => {
  const navigation = useNavigation()
  const service = useSelector(selectService)
  const items = useSelector(selectBasketItems)
  const basketTotal = useSelector(selectBasketTotal)

  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState('')
  const dispatch = useDispatch()
  const filteredArray = Object.values(groupedItemsInBasket).flat();
  const uniqueIds = [...new Set(filteredArray.map(item => item.id))];

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      ;(results[item.id] = results[item.id] || []).push(item)
      return results
    }, {})
    setGroupedItemsInBasket(groupedItems)
    // console.log(groupedItems, "hello group itmes")
  }, [items])

  const handleSubmit = async () => {
    const keys = ['providerId', 'customerId', 'time', 'date']

    try {
      const values = await AsyncStorage.multiGet(keys)
      const providerId = values[0][1]
      const customerId = values[1][1]
      const time = values[2][1]
      const date = values[3][1]
      console.log(providerId, "does provider Id coming?")

      if (providerId && customerId && time && date) {
        navigation.navigate('Userlist', {
          providerid: providerId,
          customer: customerId,
          selectedtime : time,
          selecteddate: date,
          service: uniqueIds
        })
      } else {
        console.log('record not found')
      }
    } catch (error) {
      console.log('Error retrieving values from AsyncStorage:', error)
    }
  }

  return (
    <SafeAreaView className="mt-10 flex-1 bg-white ">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">{service.title}</Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon color="#00CCBB" height={40} width={40} />
          </TouchableOpacity>
        </View>

        {/* <Text className="flex-1"> Schedule Your Time</Text> */}
        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
            <Text style={{ color: '#00CCBB' }}>Schedule You Time</Text>
          <View style={{ marginLeft: 8, marginRight: 8 }} />
        <TimePicker />
          <View style={{ marginLeft: 8, marginRight: 8 }} />
          <ScheduleScreen />
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#00CCBB]">{items.length}</Text>
              <Text className="flex-1">{items[0]?.name} </Text>

              <Text className="text-gray-600">
                <Text> {items[0]?.price} </Text>
              </Text>

              <TouchableOpacity>
                <Text
                  className="text-[#00CCBB] text-xs"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">SubTotal</Text>
            <Text className="text-gray-400">
              <Text> {basketTotal} </Text>
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Service Charge</Text>
            <Text className="text-gray-400">
              <Text> 100 </Text>
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <Text className="font-extrabold">
              <Text> {basketTotal + 100} </Text>
            </Text>
          </View>
          <TouchableOpacity
            className="rounded-lg bg-[#1B3D9B] p-3"
            onPress={handleSubmit}
          >
            <Text className="text-center text-white text-lg font-bold">
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen
