import React, { useState, useEffect, useContext } from 'react'
import { Text, View, LogBox } from 'react-native'
import { useAssets } from 'expo-asset'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TailwindProvider } from 'tailwindcss-react-native'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import store from './store'
import {
  Entypo,
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons
} from '@expo/vector-icons'
// app screen
import HomeScreen from './screens/HomeScreen'
import BasketScreen from './screens/BasketScreen'
import ServiceScreen from './screens/ServiceScreen'
import WelcomeScreen from './screens/WelcomeScreen'
import OnboardingScreen from './screens/OnboardingScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import SPDetails from './screens/ServiceProviderDetails'
import CustomerProfileScreen from './screens/CustomerProfileScreen'
import AppInfo from './screens/AppInfo'
import TermandConditions from './screens/TermandConditions'
import Setting from './screens/Setting'
import SignUpScreen from './screens/SignupScreen'
import ForgetPasswordScreen from './screens/ForgetPasswordScreen'
import BookingsScreen from './screens/BookingsScreen'
import PaymentForm from './screens/PaymentForm'
import PaymentScreen from './screens/PaymentScreen'
import PaymentWebViewScreen from './screens/PaymentWebViewScreen'
import ResetPasswordScreen from './screens/ResetPasswordScreen'
import MapScreen from './screens/MapScreen'
import ChatListScreen from './screens/ChatListScreen'
import ChatScreen from './screens/ChatScreen'
import ProviderValidation from './screens/ProviderValidation'
import ServiceProviderDetails from './screens/ServiceProviderDetails'
import NavOptions from './screens/NavOptions'
import ProfileScreen from './screens/ProfileScreen'
import OrderScreenAccepted from './screens/OrderScreenAccepted'
import UserList from './screens/UserList'
import ProviderMapScreen from './screens/ProviderMapScreen'
import OrderScreenPending from './screens/OrderScreenPending'
import ScheduleScreen from './screens/ScheduleScreen'

// import SignIn from "./screens/Firebase/screens/SignIn";
import ContextWrapper from './context/ContextWrapper'
import Context from './context/Context'
import Profile from './screens/Firebase/screens/Profile'
import Chats from './screens/Firebase/screens/Chats'
import Photo from './screens/Firebase/screens/Photo'
import Login from './screens/LoginScreen'
import Contacts from './screens/Firebase/screens/Contacts'
import Chat from './screens/Firebase/screens/Chat'
import ChatHeader from './screens/Firebase/components/ChatHeader'
import LoginScreen from './screens/LoginScreen'
import UpcomingOrders from './screens/UpcomingOrders'
import CompletedOrders from './screens/CompletedOrders'
LogBox.ignoreLogs([
  'Setting a timer',
  'AsyncStorage has been extracted from react-native core and will be removed in a future release.',
])

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function App() {
  const [currUser, setCurrUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const {
    theme: { colors },
  } = useContext(Context)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false)
      if (user) {
        setCurrUser(user)
      }
    })
    return () => unsubscribe()
  }, [])

  function Home() {
    return (
      <>
        <Tab.Navigator >
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
          {/* <Tab.Screen name="chats" component={Chats} /> */}
          <Tab.Screen
            name="chats"
            component={Chats}
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
                      name="chat"
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
        <Tab.Navigator >
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
            name="chats"
            component={Chats}
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
                      name="chat"
                      size={24}
                      color={focused ? '#16247d' : '#111'}
                    />
                  </View>
                )
              },
            }}
          />
         <Tab.Screen
            name="Upcoming Orders"
            component={UpcomingOrders}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                   <MaterialIcons name="system-update-alt" size={24} color="black" />
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

  if (loading) {
    return <Text>Loading...</Text>
  }

  return (
    <NavigationContainer>
      <Provider store={store}>
        <SafeAreaProvider>
          <TailwindProvider>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: colors.foreground,
                  shadowOpacity: 0,
                  elevation: 0,
                },
                headerTintColor: colors.white,
              }}
            >
              <Stack.Screen
                name="Login"
                options={{ headerShown: false }}
                component={Login}
              />
              <Stack.Screen
                name="home"
                options={{ headerShown: false }}
                component={Home}
              />
              <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="contacts"
                options={{ title: 'Select Contacts' }}
                component={Contacts}
              />
              <Stack.Screen
                name="chat"
                component={Chat}
                options={{ headerTitle: (props) => <ChatHeader {...props} /> }}
              />

              <Stack.Screen
                name="chats"
                options={{ title: 'NepHench' }}
                component={Chats}
              />
                  <Stack.Screen
                name="PaymentForm"
                options={{ title: 'NepHench' }}
                component={PaymentForm}
              />
                   <Stack.Screen
                name="Completed Orders"
                options={{ title: 'Completed Orders' }}
                component={CompletedOrders}
              />

              <Stack.Screen
                name="MyOrders"
                component={MyOrders}
                options={{
                  headerShown: false,
                }}
              />
               <Stack.Screen
                name="AppInfo"
                component={AppInfo}
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
                name="spDetails"
                component={SPDetails}
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
              {/* <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{
                    headerShown: false,
                  }}
                /> */}

              {/* <Stack.Screen
                  name="SignUp"
                  component={SignUpScreen}
                  options={{
                    headerShown: false,
                  }} */}
              {/* /> */}
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
                name="termandcondition"
                component={TermandConditions}
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
            </Stack.Navigator>
          </TailwindProvider>
        </SafeAreaProvider>
      </Provider>
    </NavigationContainer>
  )
}
// function ChatHome() {
//   const {
//     theme: { colors },
//   } = useContext(Context)
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => {
//         return {
//           tabBarLabel: () => {
//             if (route.name === 'photo') {
//               return <Ionicons name="camera" size={20} color={colors.white} />
//             } else {
//               return (
//                 <Text style={{ color: colors.white }}>
//                   {route.name.toLocaleUpperCase()}
//                 </Text>
//               )
//             }
//           },
//           tabBarShowIcon: true,
//           tabBarLabelStyle: {
//             color: colors.white,
//           },
//           tabBarIndicatorStyle: {
//             backgroundColor: colors.white,
//           },
//           tabBarStyle: {
//             backgroundColor: colors.foreground,
//           },
//         }
//       }}
//       initialRouteName="chats"
//     >
//       <Tab.Screen name="photo" component={Photo} />
//       {/* <Tab.Screen name="chats" component={Chats} /> */}
//     </Tab.Navigator>
//   )
// }

function Main() {
  // const [assets] = useAssets(
  //   require('./assets/icon-square.png'),
  //   require('./assets/chatbg.png'),
  //   require('./assets/user-icon.png'),
  //   require('./assets/welcome-img.png'),
  // )
  // if (!assets) {
  //   return <Text>Loading ..</Text>
  // }
  return (
    <ContextWrapper>
      <App />
    </ContextWrapper>
  )
}

export default Main
