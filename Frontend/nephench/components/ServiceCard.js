import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { StarIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'

const ServiceCard = ({ id, imgUrl, title, rating, short_description }) => {
  const navigation = useNavigation()
  const text_truncate = function (str, length, ending) {
    if (length == null) {
      length = 30
    }
    if (ending == null) {
      ending = '...'
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending
    } else {
      return str
    }
  }

  const navigateToNavOptions = () => {
    navigation.navigate('NavOptions', {
      role: title,
      id: id,
      imgurl:imgUrl
    });
  };

  return (
    <>
  <TouchableOpacity
         onPress={navigateToNavOptions}
      className="bg-white mr-3 shadow-sm"
    >
      <Image
        source={{
          uri: imgUrl,
        }}
        className="h-36 w-64 rounded-sm"
      />
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          {/* <StarIcon color="green" opacity={0.5} size={22} />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500">{rating}</Text>
          </Text> */}
        </View>

        <View className="flex-row items-center space-x-1">
          {/* <LocationMarkerIcon color="gray" opacity={0.4} size={22} /> */}
          <Text className="text-xs text-gray-500">
            {' '}
            {text_truncate(short_description)} 
          </Text>
        </View>
      </View>
    </TouchableOpacity>
    
    </>
  
    
  )
}

export default ServiceCard
