import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import RequestScreen from '../screens/RequestScreen';
import DestinationScreen from '../screens/DestinationScreen';
import VehicleDetailScreen from '../screens/VehicleDetailScreen';
import PaymentScreen from '../screens/PaymentScreen';
import DriverTrackScreen from '../screens/DriverTrackScreen';
import GoogleScreen from '../screens/GoogleScreen';
import PhonePeScreen from '../screens/PhonepeScreen';
import PaytmScreen from '../screens/PaytmScreen';
import LoginScreen from '../screens/Login';
import Signup from '../screens/SignUp';
import ReviewScreen from '../screens/ReviewScreen';


const Home = createNativeStackNavigator();
export function HomeStack(){
    return(
        <Home.Navigator>
            <Home.Screen
                name="LoginScreen"
                component ={LoginScreen}
                options={{headerShown:false}}
            />
             <Home.Screen
                name="Signup"
                component ={Signup}
                options={{headerShown:false}}
            />
            <Home.Screen
                name="HomeScreen"
                component ={HomeScreen}
                options={{headerShown:false}}
            />
             <Home.Screen
                name="RequestScreen"
                component ={RequestScreen}
                options={{headerShown:false}}
            />
            <Home.Screen
                name="DestinationScreen"
                component ={DestinationScreen}
                options={{headerShown:false}}
            />
            <Home.Screen
                name="VehicleDetailScreen"
                component ={VehicleDetailScreen}
                options={{headerShown:false}}
            />
            <Home.Screen
                name="PaymentScreen"
                component ={PaymentScreen}
                options={{headerShown:false}}
            />
             <Home.Screen
                name="DriverTrackScreen"
                component ={DriverTrackScreen}
                options={{headerShown:false}}
            />
            <Home.Screen
                name="GoogleScreen"
                component={GoogleScreen}
                options={{headerShown:false}}
            />
            <Home.Screen
                name="PhonePeScreen"
                component={PhonePeScreen}
                options={{headerShown:false}}
            />
            <Home.Screen
                name="PaytmScreen"
                component={PaytmScreen}
                options={{headerShown:false}}
            />
             <Home.Screen
                name="ReviewScreen"
                component ={ReviewScreen}
                options={{headerShown:false}}
            />
        </Home.Navigator>
            
    )
}
