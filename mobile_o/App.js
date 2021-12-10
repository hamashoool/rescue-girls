import React from 'react';
import WelcomeScreen from "./app/screens/WelcomeScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./app/screens/LoginScreen";
import {Playball_400Regular, useFonts} from "@expo-google-fonts/playball";
import AppLoadingPlaceholder from "expo/build/launch/AppLoadingPlaceholder";
import RegistrationScreen from "./app/screens/RegistrationScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    let [fontLoaded, error] = useFonts({Playball_400Regular});
    const config = {
        animation: 'spring',
        config: {
            stiffness: 1000,
            damping: 500,
            mass: 3,
            overshootClamping: true,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
        },
    };

    if (!fontLoaded) {
        return <AppLoadingPlaceholder/>
    }
    return (
        <NavigationContainer>
            <Stack.Navigator options={{
                transitionSpec: {
                    open: config,
                    close: config,
                },
            }}>
                <Stack.Screen options={{headerShown: false}} name="Welcome" component={WelcomeScreen}/>
                <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
                <Stack.Screen options={{headerShown: false}} name="Registration" component={RegistrationScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}