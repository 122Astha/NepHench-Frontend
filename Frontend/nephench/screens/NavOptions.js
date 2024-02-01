import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Icon } from 'react-native-elements'
import { useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const data = [
  {
    id: '123',
    title: 'Problem Unknown?',
    screen: 'ProviderMap',
  },
  {
    id: '345',
    title: 'Problem    Known?',
    screen: 'Plumber',
  },
]

const NavOptions = () => {
  const route = useRoute()
  const { role, id , imgurl} = route.params
  const navigation = useNavigation()
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  })
  // storing data
  const handlePress = async (value) => {
    try {
      await AsyncStorage.setItem('providerId', JSON.stringify(value))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SafeAreaView className="bg-white h-full p-5">
      <View className="P-5">
        <Image
          source={require('../assets/images/logoName.png')}
          style={{ width: 100, height: 100 }}
        />
        <FlatList
          data={data}
          horizontal
          keyExtractor={(items) => items.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(item.screen, {
                  role: role,
                  img: imgurl
                })
                handlePress(id)
              }}
              className="p-2 pl-6 pb-8 bg-gray-200 m-2 w-40"
            >
              <View>
                <Text className="mt-2 text-lg font-semibold">{item.title}</Text>
                <Icon
                  className="p-2 bg-black rounded-full w-10 mt-4"
                  name="arrowright"
                  color="white"
                  type="antdesign"
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

export default NavOptions
