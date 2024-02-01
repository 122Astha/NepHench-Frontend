import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { getDataFromApi } from '../utils/api';
import BookingCard from '../components/BookingCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BookingsScreen = () => {
  const [data, setData] = useState([]);

  const getCustomerId = async () => {
    try {
      const customerId = await AsyncStorage.getItem('customerId');
      console.log(customerId, "herllo cs Id")
      return customerId;
    } catch (error) {
      console.log(error.message);
    }
  };

  const getServiceCat = async () => {
    const userId = await getCustomerId();
    try {
      const response = await getDataFromApi(`/bookings/customer/${userId}`);
      setData(response);
      // console.log(response, "hello booked response")
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getServiceCat();
  }, []);

  // Separate data into upcoming and completed bookings based on progressStatus
  const upcomingBookings = data.filter((booking) => booking.progressStatus === 'pending');
  const completedBookings = data.filter((booking) => booking.progressStatus === 'completed');


  // State to keep track of the active tab (upcoming or completed)
  const [activeTab, setActiveTab] = useState('upcoming');
  return (
    <View>
      {/* Tabs */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
        <TouchableOpacity
          style={{ paddingVertical: 8, paddingHorizontal: 16, borderBottomWidth: activeTab === 'upcoming' ? 2 : 0 }}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={{ color: activeTab === 'upcoming' ? 'black' : 'gray', fontWeight: 'bold' }}>Upcoming Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ paddingVertical: 8, paddingHorizontal: 16, borderBottomWidth: activeTab === 'completed' ? 2 : 0 }}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={{ color: activeTab === 'completed' ? 'black' : 'gray', fontWeight: 'bold' }}>Completed Bookings</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {activeTab === 'upcoming' ? (
          upcomingBookings.map((booking) => (
            <View key={booking.id}>
              <BookingCard
                id={booking.id}
                spname={booking.serviceProvider.username}
                spid={booking.serviceProvider.id}
                semail= {booking.serviceProvider.email}
                date={booking.date}
                time={booking.time}
                status={booking.status}
                progressStatus={booking.progressStatus}
              />
            </View>
          ))
        ) : (
          completedBookings.map((booking) => (
            <View key={booking.id}>
              <BookingCard
                id={booking.id}
                spname={booking.serviceProvider.username}
                spId={booking.serviceProvider.id}
                date={booking.date}
                time={booking.time}
                status={booking.status}
                progressStatus={booking.progressStatus}
              />
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default BookingsScreen;