import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const BottomNavBar = () => {
    const Tab = createBottomTabNavigator();
  
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;
  
            if (route.name === 'Home') {
              iconName = focused ? 'home-solid' : 'home-outline';
            } else if (route.name === 'Search') {
              iconName = focused ? 'search-solid' : 'search-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'user-solid' : 'user-outline';
            }
  
            return (
              <Image
                source={{ uri: `icon_${iconName}.png` }} // Replace with actual image paths
                style={className="w-6 h-6"}
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray',
          showLabel: false,
          style: className="bg-white py-2",
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
  };
  