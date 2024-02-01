import { View, Text, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import CategoryCard from './CategoryCard'
import { getDataFromApi } from '../utils/api'

const Categories = () => {
  const [data, setData] = useState([])
  const getServiceCat = async () => {
    try {
      const response = await getDataFromApi('/serviceprovider')
      setData(response)
      console.log(data, 'response')
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getServiceCat()
  }, [])
  return (
    <View>
      <Text className="font-bold text-x mt-3 px-4">Most Ured Services</Text>
      <View style={{ flexDirection: 'row' }}>
        {data &&
          data.map((items) => (
            <View key={items.id} >
              <ScrollView
                contentContainerStyle={{
                  paddingHorizontal: 15,
                  paddingTop: 10,
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                <CategoryCard
                  imgUrl={items.image}
                  title={items.roleName}
                  style={{ marginRight: 10 }} // Add margin-right for the gap
                />
              </ScrollView>
            </View>
          ))}
      </View>
    </View>
  )
}

export default Categories
