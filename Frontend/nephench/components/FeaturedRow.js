import React, {useState, useEffect} from 'react'
import { View, Text, ScrollView } from 'react-native'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import ServiceCard from './ServiceCard'
import { getDataFromApi } from '../utils/api'

const FeaturedRow = () => {
  const [data, setData] = useState([])
  const getServiceCat = async () => {
    try {
      const response = await getDataFromApi('/serviceprovider')
      setData(response)
    } catch (error) {
      console.log(error.message)
    }
  }
  // console.log(data, "hello data")

  useEffect(() => {
    getServiceCat()
  }, [])

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="front-bold text-lg">Featured</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>

      <Text className="text-xs text-gray-500 px-4">Paid placement from our partners</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
      {data && data.map((items) => (
        <View key={items.id}>
        {/* Service Card */}
        <ServiceCard
          id={items.id}
          imgUrl={items.image}
          title={items.roleName}
          // rating={4.5}
          // genre="Japanese"
          // address="Pokhara"
          short_description={items.description}
          dishes={[]}
          long={20}
          lat={0}
        />
      </View>

      ))}
      </ScrollView>
   
    </View>
  )
}

export default FeaturedRow
