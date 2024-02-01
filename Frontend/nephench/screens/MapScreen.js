import React, { useState, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'
import { StyleSheet, View, Dimensions, Button } from 'react-native'
import * as Location from 'expo-location'
import { postDataToApi } from '../utils/api'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function MapScreen() {
  const navigation = useNavigation()
  const [mapRegion, setMapRegion] = useState(null)

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      setErrorMsg('Permission to access location is denied')
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    })
    const latitude = location.coords.latitude
    const longitude = location.coords.longitude
    setMapRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
    console.log(location.coords.latitude, location.coords.longitude)
  }

  
  useEffect(() => {
    userLocation()// Save location immediately when the component loads
  }, [])

  const onSaveLocation = async () => {
    const user = await AsyncStorage.getItem('customerId')
    if (mapRegion) {
      const { latitude, longitude } = mapRegion
      try {



//         console.log(mapRegion, "hello mapRegion")
//         const response = await postDataToApi('/locations', { latitude, longitude, user })
//         console.log(response, "hello response")
//         if (response !== null) {
//           navigation.navigate('home')
//         }
// // 

      } catch (error) {
        console.log(error.message)
      }
    }
  }


  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion}>
        {mapRegion && <Marker coordinate={mapRegion} title="Current Location" />}
      </MapView>
      <View style={{ position: 'absolute', margin: 30 }}>
        <Button title="Save Location" onPress={() => navigation.navigate('home')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
})


