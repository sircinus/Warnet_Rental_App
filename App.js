import React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Splash from './src/screens/Splash';
import Account from './src/screens/Account';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Detail from './src/screens/Detail';
import AddOrder from './src/screens/AddOrder';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const RootHome = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        tabBarActiveTintColor: '#62a0f3',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1f2e44',
          height: 60,
        },
        tabBarLabelStyle: {
          fontFamily: 'UbuntuSans-Regular',
          fontSize: 14,
          marginBottom: 5,
        },
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          tabBarLabel: 'Order',
          tabBarInactiveTintColor: 'white',
          tabBarIcon: ({color}) => (
            <Icon name="tasks" color={color} size={20} />
          ),
        }}></Tab.Screen>

      <Tab.Screen
        name="AccountTab"
        component={Account}
        options={{
          tabBarLabel: 'Account',
          tabBarInactiveTintColor: 'white',
          tabBarIcon: ({color}) => (
            <Icon2 name="account" color={color} size={24} />
          ),
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={RootHome} />
        <Stack.Screen name="Detail" component={Detail} />
        <Stack.Screen name="AddOrder" component={AddOrder} />
        <Stack.Screen name="Account" component={Account} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
