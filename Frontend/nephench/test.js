import React, { useState, useEffect, useContext } from 'react'
import { useAssets } from 'expo-asset'
import { Text, Platform, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TailwindProvider } from 'tailwindcss-react-native'
import { Provider } from 'react-redux'

import HomeScreen from './screens/HomeScreen'
import BasketScreen from './screens/BasketScreen'
import ServiceScreen from './screens/ServiceScreen'
import WelcomeScreen from './screens/WelcomeScreen'
import OnboardingScreen from './screens/OnboardingScreen'
import CustomerProfileScreen from './screens/CustomerProfileScreen'
import Setting from './screens/Setting'
import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignupScreen'
import ForgetPasswordScreen from './screens/ForgetPasswordScreen'
import BookingsScreen from './screens/BookingsScreen'
import PaymentScreen from './screens/PaymentScreen'
import PaymentWebViewScreen from './screens/PaymentWebViewScreen'
import ResetPasswordScreen from './screens/ResetPasswordScreen'
import MapScreen from './screens/MapScreen'
import ChatListScreen from './screens/ChatListScreen'
import ChatScreen from './screens/ChatScreen'
import ProviderValidation from './screens/ProviderValidation'
import ServiceProviderDetails from './screens/ServiceProviderDetails'
import NavOptions from './screens/NavOptions'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import ProfileScreen from './screens/ProfileScreen'
import OrderScreenAccepted from './screens/OrderScreenAccepted'
import UserList from './screens/UserList'
import ProviderMapScreen from './screens/ProviderMapScreen'
import OrderScreenPending from './screens/OrderScreenPending'
import ScheduleScreen from './screens/ScheduleScreen'
// import MyContacts from './screens/MyContacts'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import store from './store'
// import RequestScreen from './screens/RequestScreen'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  Entypo,
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
} from '@expo/vector-icons'

// for firebase
import { onAuthStateChanged } from 'firebase/auth'
import Context from './context/Context'
import { auth } from './firebase'
import SignIn from './screens/Firebase/screens/SignIn'
import Profile from './screens/Firebase/screens/Profile'
import Contacts from './screens/Firebase/screens/Contacts'
import Chat from './screens/Firebase/screens/Chat'
import Chats from './screens/Firebase/screens/Chats'
import Photo from './screens/Firebase/screens/Photo'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: '#fff',
  },
}

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null)
  const [currUser, setCurrUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const {
    theme: { colors },
  } = useContext(Context)

  const [assets] = useAssets(
    require('./assets/icon-square.png'),
    require('./assets/chatbg.png'),
    require('./assets/user-icon.png'),
    require('./assets/welcome-img.png'),
  )

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false)
      if (user) {
        setCurrUser(user)
      }
    })
    return () => unsubscribe()
  }, [])
  // useEffect(() => {
  //   AsyncStorage.getItem('alreadyLaunched').then((value) => {
  //     if (value === null) {
  //       AsyncStorage.setItem('alreadyLaunched', 'true')
  //       setIsFirstLaunch(true)
  //     } else {
  //       setIsFirstLaunch(false)
  //     }
  //   })
  // }, [])

  // for Customer Navigation
  function Home() {
    return (
      <>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Entypo
                      name="home"
                      size={24}
                      color={focused ? '#16247d' : '#111'}
                    />
                  </View>
                )
              },
            }}
          />
          <Tab.Screen
            name="My Bookings"
            component={BookingsScreen}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Entypo
                      name="wallet"
                      size={24}
                      color={focused ? '#16247d' : '#111'}
                    />
                  </View>
                )
              },
            }}
          />
          <Tab.Screen
            name="chat"
            component={ChatScreen}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Entypo
                      name="wallet"
                      size={24}
                      color={focused ? '#16247d' : '#111'}
                    />
                  </View>
                )
              },
            }}
          />
          <Tab.Screen
            name="ProviderMap"
            component={ProviderMapScreen}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Entypo
                      name="location"
                      size={24}
                      color={focused ? '#16247d' : '#111'}
                    />
                  </View>
                )
              },
            }}
          />

          <Tab.Screen
            name="Setting"
            component={Setting}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Ionicons
                      name="settings"
                      size={24}
                      color={focused ? '#16247d' : '#111'}
                    />
                  </View>
                )
              },
            }}
          />
        </Tab.Navigator>
      </>
    )
  }

  // For service Provider
  function MyOrders() {
    return (
      <>
        <Tab.Navigator>
          <Tab.Screen
            name="My Orders"
            component={OrderScreenPending}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Ionicons
                      name="list-sharp"
                      size={24}
                      color={focused ? '#16247d' : '#111'}
                    />
                  </View>
                )
              },
            }}
          />
          <Tab.Screen
            name="Accepted Order"
            component={OrderScreenAccepted}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <MaterialCommunityIcons
                      name="sticker-check-outline"
                      size={24}
                      color="black"
                    />
                  </View>
                )
              },
            }}
          />

          <Tab.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <FontAwesome name="user" size={24} color="black" />
                  </View>
                )
              },
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      </>
    )
  }

  // For chat Application
  function ProfileImage() {
    const {
      theme: { colors },
    } = useContext(Context);
    return (
      <Tab.Navigator
        screenOptions={({ route }) => {
          return {
            tabBarLabel: () => {
              if (route.name === "photo") {
                return <Ionicons name="camera" size={20} color={colors.white} />;
              } else {
                return (
                  <Text style={{ color: colors.white }}>
                    {route.name.toLocaleUpperCase()}
                  </Text>
                );
              }
            },
            tabBarShowIcon: true,
            tabBarLabelStyle: {
              color: colors.white,
            },
            tabBarIndicatorStyle: {
              backgroundColor: colors.white,
            },
            tabBarStyle: {
              backgroundColor: colors.foreground,
            },
          };
        }}
        initialRouteName="chats"
      >
        <Tab.Screen name="photo" component={Photo} />
        <Tab.Screen name="chats" component={Chats} />
      </Tab.Navigator>
    );
   
  }


  if (loading) {
    return <Text>Loading...</Text>
  }
  if (!assets) {
    return <Text>Loading ..</Text>
  }
  return (
    <NavigationContainer>
      <Provider store={store}>
        <SafeAreaProvider>
          <TailwindProvider>
          {!currUser ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="signIn" component={SignIn} />
        </Stack.Navigator>
      ) : (
              <Stack.Navigator
                initialRouteName="Welcome"
                screenOptions={screenOptions}
              >
                {/* {isFirstLaunch && (
                  <Stack.Screen
                    options={{ headerShown: false, tabBarButton: () => null }}
                    name="OnboardingScreen"
                    component={OnboardingScreen}
                  />
                )} */}

                {/* {!currUser.displayName && ( */}
                  <Stack.Screen
                    name="profile"
                    component={Profile}
                    options={{ headerShown: false }}
                  />
                {/* )} */}
                <Stack.Screen
                  name="Home"
                  component={Home}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="MyOrders"
                  component={MyOrders}
                  options={{
                    headerShown: false,
                  }}
                />

                <Stack.Screen
                  name="Schedule"
                  component={ScheduleScreen}
                  options={{ headerShown: false, tabBarButton: () => null }}
                />
                <Stack.Screen
                  name="Userlist"
                  component={UserList}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="ProviderMap"
                  component={ProviderMapScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="CustomerProfileScreen"
                  component={CustomerProfileScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="OrderScreenAccepted"
                  component={OrderScreenAccepted}
                  options={{
                    headerShown: false,
                  }}
                />

                <Stack.Screen
                  name="NavOptions"
                  component={NavOptions}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="ID Confirmation"
                  component={ProviderValidation}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Welcome"
                  component={WelcomeScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{
                    headerShown: false,
                  }}
                />

                <Stack.Screen
                  name="SignUp"
                  component={SignUpScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="ForgetPasswordScreen"
                  component={ForgetPasswordScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="ResetPasswordScreen"
                  component={ResetPasswordScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Plumber"
                  component={ServiceScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="Basket"
                  component={BasketScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="ChatList"
                  component={ChatListScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="MapScreen"
                  component={MapScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="PaymentScreen"
                  component={PaymentScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="PaymentWebView"
                  component={PaymentWebViewScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                   <Stack.Screen
                  name="SPDetails"
                  component={ServiceProviderDetails}
                  options={{
                    headerShown: false,
                  }}
                />
                {/* <Stack.Screen
                name="OrderAccepted"
                component={OrderScreenAccepted}
                options={{
                  headerShown: false,
                }}
              /> */}
                {/* <Stack.Screen
                name="Chat"
                component={ChatScreen}
                options={{
                  headerShown: false,
                }}
              /> */}

                {/* for firebase */}
                {/* <Stack.Screen
                  name="signIn"
                  options={{ title: 'Whatsapp' }}
                  component={SignIn}
                /> */}
              
                <Stack.Screen
                  name="profileImg"
                  component={ProfileImage}
                  options={{ title: 'Whatsapp' }}
                />
                <Stack.Screen
                  name="contacts"
                  options={{ title: 'Select Contacts' }}
                  component={Contacts}
                />
                         <Stack.Screen name="chat" component={Chat} options={{headerTitle: (props) => <ChatHeader {...props} />}}/>

              </Stack.Navigator>
      )}
          </TailwindProvider>
        </SafeAreaProvider>
      </Provider>
    </NavigationContainer>
  )
}