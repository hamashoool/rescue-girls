import React from 'react';
import WelcomeScreen from "./app/screens/WelcomeScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./app/screens/LoginScreen";
import {Playball_400Regular, useFonts} from "@expo-google-fonts/playball";
import AppLoadingPlaceholder from "expo/build/launch/AppLoadingPlaceholder";

const Stack = createNativeStackNavigator();

export default function App() {
    let [fontLoaded, error] = useFonts({Playball_400Regular});

    if (!fontLoaded) {
        return <AppLoadingPlaceholder/>
    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options={{headerShown: false}} name="Welcome" component={WelcomeScreen}/>
                <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}