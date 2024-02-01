import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

const CategoryCard = ({ imgUrl, title }) => {
  return (
    <TouchableOpacity className="mr-5">
      <Image
        source={{
          uri: imgUrl,
        }}
        className="w-20 h-20 rounded"
      />
      <Text className="t.fontMono">{title}</Text>
    </TouchableOpacity>
  )
}

export default CategoryCard
