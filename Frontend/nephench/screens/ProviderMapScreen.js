import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Button } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE, Circle } from 'react-native-maps'
import { Entypo } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getDataFromApi } from '../utils/api'
import { useNavigation } from '@react-navigation/native'
const MapScreen = () => {
 const navigation = useNavigation()
const[marker, setMarker] = useState([])
const [data, setData] = useState([])


  useEffect(() => {
    // Simulate an API call to fetch marker data
    // You should replace this with your actual data fetching logic
    const fetchData = async () => {
        try {
          const response = await getDataFromApi('/locations');
          console.log(response, "hello booked response")
          setMarker(response);
        } catch (error) {
          console.log(error.message);
        }
    };
    const getCustomerId = async () => {
      try {
        const customerId = await AsyncStorage.getItem('customerId')
        return customerId
      } catch (error) {
        console.log(error.message)
      }
    }
    const getAcceptedRequest = async () => {
      try {
        const currentID = await getCustomerId();
        console.log(currentID, "coming?");
        console.log(marker,"marker")
        // Ensure that currentID and the id property are of the same data type
        const filteredService = marker && marker.filter(function (datum) {
          console.log(datum,"markerId is matched or not")
          if (datum.user.id === currentID) {
            console.log("matched the id")
          }else{
            console.log("does not machhed the id")
          }
          // Assuming both are numbers, you can parse currentID to a number if needed
          return datum.user.id === Number(currentID);
        });
        
        console.log(filteredService, "after matched function");
        setData(filteredService);
      } catch (error) {
        console.log(error.message);
      }
    };

   
    fetchData();
    getAcceptedRequest()
  }, []);

 
  
  
  
console.log(data, ",atched data")
  return (
    <View style={{ marginTop: 30 }}>
    {data.map((index, i) => (
      <MapView
          key={i}
        zoomEnabled={true}
        provider={PROVIDER_GOOGLE}
        style={{ width: '100%', height: '100%' }}
        initialRegion={{
          latitude: parseFloat(index.latitude),
          longitude: parseFloat(index.longitude),
          latitudeDelta: 0.0000,
          longitudeDelta: 0.0000,
        }}
      >
   
     
        {data.map((emoji, i) => (
          <Marker
            key={i}
            title="Your location"
            description={'city'}
            coordinate={{
              latitude: parseFloat(emoji.latitude),
              longitude: parseFloat(emoji.longitude),
            }}
          ></Marker>

          
        ))}


        {/* comment */}
        {marker.map((emoji, i) => (
          <Marker
            key={i}
            title="Service Provider"
            description={'city'}
            coordinate={{
              latitude: parseFloat(emoji.latitude),
              longitude: parseFloat(emoji.longitude),
            }}
          ></Marker>

          
        ))}
       

    {/* comment */}
      </MapView>
      )
    )}
      <View
        style={{
          position: 'absolute',
          bottom: 30,
          left: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View>
          <Button className="bg-yellow-500"  onPress={() => navigation.navigate('Basket')} title="List Providers" />
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {/* <View
          style={{
            backgroundColor: '#B0B0B0',
            width: 34,
            height: 34,
            borderRadius: 17,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            style={{ width: 34, height: 34, borderRadius: 17 }}
            source={{
              uri:
                'https://sdk.bitmoji.com/render/panel/76c3b171-f0cf-4dd6-b91f-91bd86693f61-d8fa313e-d0e8-4d84-9769-a3238cf96fc0-v1.png?transparent=1&palette=1',
            }}
          />
        </View> */}
        {/* <View
          style={{
            backgroundColor: '#B0B0B0',
            marginLeft: 10,
            width: 34,
            height: 34,
            borderRadius: 17,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Feather name="search" size={17} color="white" />
        </View> */}
        {/* <View
          style={{
            backgroundColor: '#B0B0B0',
            marginLeft: 250,
            width: 34,
            height: 34,
            borderRadius: 17,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="settings" size={18} color="white" />
        </View> */}
      </View>
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({})
