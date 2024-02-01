import React from 'react';
import { Text, View, StyleSheet, Image, FlatList } from 'react-native';
import Constants from 'expo-constants';

const ServiceProviderProfile = ({ name, rating, profilePic }) => {
  return (
    <View className="flex-row items-center justify-between p-4 border-b border-gray-300">
      <View className="flex-row items-center flex-1 pr-4">
        <Image source={profilePic} className="w-10 h-10 rounded-full mr-4" />
        <View>
          <Text className="text-lg font-semibold">{name}</Text>
          <Text className="text-gray-500">Rating: {rating}</Text>
        </View>
      </View>
      <TouchableOpacity className="bg-blue-500 rounded p-2">
        <Text className="text-white">Accept</Text>
        
      </TouchableOpacity>
      
    </View>
  );
};

const RequestScreen = () => {
return (
<View style={styles.container}>
<FlatList
        data={ChatData}
        renderItem={({item}) => <MessageCard image={item.image}
         title={item.title} companyName={item.companyName}
          miles={item.miles} price={item.price} rating={item.rating}
           length={item.length} time={item.time} riderName={item.riderName} />}
        keyExtractor={item => item.id}
      />
</View>
);
}
export default RequestScreen;

const styles = StyleSheet.create({
  container: {
  flex: 1,
  paddingTop: Constants.statusBarHeight,
  backgroundColor: '#ccc',
  padding: 16,
  },
  buttonCardContainer: {
  width: '50%',
  borderRadius: 8,
  overflow: 'hidden',
  },
  buttonText: {
  color: '#fff',
  textAlign: 'center',
  paddingVertical: 8,
  },
  messageCardContainer: {
  backgroundColor: '#666',
  borderRadius: 8,
  height: 200,
  marginBottom: 8,
  },
  divider: {
  backgroundColor: '#0f0',
  height: 1,
  borderRadius: 4,
  },
  messageCardInnerContainer: {
  flexDirection: 'row',
  padding: 16,
  },
  profileImage: {
  width: 64,
  height: 64,
  borderRadius: 32,
  },
  messageDetailsContainer: {
  marginLeft: 16,
  flex: 1,
  },
  messageTitle: {
  color: '#fff',
  fontSize: 20,
  },
  messageSubtitle: {
  color: '#fff',
  marginTop: 8,
  },
  ratingContainer: {
  flexDirection: 'row',
  marginTop: 8,
  },
  ratingText: {
  marginLeft: 4,
  color: '#fff',
  },
  fareAndTimeContainer: {
  marginLeft: 16,
  },
  fareText: {
  color: '#0f0',
  fontWeight: 'bold',
  fontSize: 24,
  },
  timeText: {
  marginTop: 8,
  fontSize: 24,
  color: '#fff',
  },
  distanceText: {
  color: '#fff',
  },
  buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginHorizontal: 16,
  marginTop: 16,
  },
  declineButton: {
  backgroundColor: 'gray',
  },
  acceptButton: {
  backgroundColor: '#0f0',
  }
  });