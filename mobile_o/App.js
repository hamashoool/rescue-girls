import React, {useEffect, useState} from 'react';
import WelcomeScreen from "./app/screens/WelcomeScreen";
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from "./app/screens/LoginScreen";
import {Playball_400Regular, useFonts} from "@expo-google-fonts/playball";
import AppLoadingPlaceholder from "expo/build/launch/AppLoadingPlaceholder";
import RegistrationScreenOne, {RegistrationScreenThree, RegistrationScreenTwo} from "./app/screens/RegistrationScreen";
import {createSharedElementStackNavigator} from "react-navigation-shared-element";
import {CardStyleInterpolators} from '@react-navigation/stack';
import HomeScreen from "./app/screens/HomeScreen";
import {AuthContext, TokenContext} from "./app/components/context";
import * as SecureStore from "expo-secure-store";

const Stack = createSharedElementStackNavigator();

export default function App() {
    const getUserUrl = 'http://192.168.0.90:8000/api/user/'
    const loginUrl = 'http://192.168.0.90:8000/api/login/';
    let [fontLoaded, error] = useFonts({Playball_400Regular});
    let [Token, setToken] = useState(null);
    let [userInfo, setUserInfo] = useState({
        name: null,
        token: null,
    })

    const initialLoginState = {
        userToken: null,
    };

    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                }
            case 'LOGIN':
                return {
                    ...prevState,
                    userToken: action.token,
                }
            case 'LOGOUT':
                return {
                    ...prevState,
                    userToken: null,
                }
            case 'REGISTER':
                return {
                    ...prevState,
                    userToken: action.token,
                }
        }
    };

    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

    const authContext = React.useMemo(() => ({
        signIn: async (username, pass) => {
            let response = fetch(loginUrl, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: pass,
                })
            }).then((response) => response.json())
                .then(async (json) => {
                    // console.log(json);
                    if (json.error) {
                        alert('Invalid Login Information.');
                        console.log(json);
                    }
                    if (json.name) {
                        try {
                            await SecureStore.setItemAsync('userToken', json.token);
                            setUserInfo(prevState => {
                                return{
                                    ...prevState,
                                    name: json.name,
                                    token: json.token,
                                };
                            });
                            dispatch({type: 'LOGIN', token: json.token});
                        } catch (error) {
                            console.log(error);
                        }
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        signOut: async () => {
            try {
                await SecureStore.deleteItemAsync('userToken');
            } catch (error) {
                console.log(error);
            }
            dispatch({type: 'LOGOUT'})
        },
        signUp: () => {

        },
    }), []);

    const getUser = async (userToken) => {
        fetch(getUserUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token '+userToken
            },
            body: JSON.stringify({
                token: userToken,
            })
        }).then((response) => response.json()).then(async (json) => {
            if (json.error) {
                alert('Invalid Login Information.');
                console.log(json);
            }
            if (json.name) {
                try {
                    setUserInfo(prevState => {
                        return {
                            ...prevState,
                            name: json.name,
                            token: userToken,
                        };
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(async () => {
        let userToken;
        userToken = null;
        try {
            userToken = await SecureStore.getItemAsync('userToken');
        } catch (error) {
            console.log(error);
        }

        if (userToken !== null){
            getUser(userToken);
        }

        dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, []);


    if (!fontLoaded) {
        return <AppLoadingPlaceholder/>
    }
    return (
        <AuthContext.Provider value={authContext}>
            {loginState.userToken == null ? (
                    <NavigationContainer>
                        <Stack.Navigator>
                            <Stack.Screen options={{headerShown: false}} name="Welcome" component={WelcomeScreen}/>

                            <Stack.Screen options={{
                                headerShown: false,
                                cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid
                            }} name="Login" component={LoginScreen}/>

                            <Stack.Screen options={{
                                headerShown: false,
                                cardStyleInterpolator: CardStyleInterpolators.forBottomSheetAndroid
                            }} name="Registration" component={RegistrationScreenOne}/>

                            <Stack.Screen options={{
                                headerShown: false,
                                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                            }} name="RegistrationTwo" component={RegistrationScreenTwo}/>

                            <Stack.Screen options={{
                                headerShown: false,
                                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                            }} name="RegistrationThree" component={RegistrationScreenThree}/>

                        </Stack.Navigator>

                    </NavigationContainer>
                ) :
                <TokenContext.Provider value={userInfo}>
                    <NavigationContainer>
                        <Stack.Navigator>
                            <Stack.Screen options={{
                                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                            }} name="Dashboard" component={HomeScreen}/>
                        </Stack.Navigator>
                    </NavigationContainer>
                </TokenContext.Provider>
            }
        </AuthContext.Provider>
    );
}