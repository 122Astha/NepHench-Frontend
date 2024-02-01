import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ArrowLeftIcon, StarIcon } from 'react-native-heroicons/outline'
import PlumberRow from '../components/PlumberRow'
import BasketIcon from '../components/BasketIcon'
import { useDispatch } from 'react-redux'
import { setService } from '../features/serviceSlice'
import { getDataFromApi } from '../utils/api'

const ServiceScreen = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const route = useRoute()
  const { role, img} = route.params

  const [services, setServices] = useState([])
  const filteredServices = services.filter(items => role === items.role);
  const getServices = async () => {
    try {
      const res = await getDataFromApi('/services')
      setServices(res)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getServices()
    dispatch(setService({}))
  }, [])
  // storing data


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  })
  return (
    <>
      <BasketIcon />
      <ScrollView>
        <View className="relative">
          <Image
            source={{
              uri: img,
            }}
            className="w-full h-56 bg-gray-300 p-4"
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full"
          >
            <ArrowLeftIcon size={20} color={'#00CCBB'} />
          </TouchableOpacity>
        </View>
        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-3xl font-bold">{role}</Text>
          </View>
        </View>
        {filteredServices.map(items => (
        <View key={items.id}>
          <PlumberRow
            id={items.id}
            name={items.name}
            description={items.description}
            price={items.price}
            image={items.image}
            role={items.role}
          />
        </View>
      ))}
      </ScrollView>
    </>
  )
}

export default ServiceScreen
