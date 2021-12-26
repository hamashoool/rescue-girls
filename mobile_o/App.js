import React, {useEffect, useState} from 'react';
import WelcomeScreen from "./app/screens/WelcomeScreen";
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import LoginScreen from "./app/screens/LoginScreen";
import {Playball_400Regular, useFonts} from "@expo-google-fonts/playball";
import AppLoadingPlaceholder from "expo/build/launch/AppLoadingPlaceholder";
import RegistrationScreenOne, {RegistrationScreenThree, RegistrationScreenTwo} from "./app/screens/RegistrationScreen";
import {createSharedElementStackNavigator} from "react-navigation-shared-element";
import {CardStyleInterpolators} from '@react-navigation/stack';
import HomeScreen from "./app/screens/HomeScreen";
import {AuthContext, TokenContext, DataContext} from "./app/context/context";
import * as SecureStore from "expo-secure-store";
import {createDrawerNavigator} from "@react-navigation/drawer";
import SearchSavior from "./app/screens/SearchSavior";
import ViewContacts from "./app/screens/ViewContacts";
import DrawerContent from "./app/components/DrawerContent";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import AlertsScreen from "./app/screens/Alerts";
import {myColors} from "./app/utilities/colors";
import * as Location from "expo-location";

const Stack = createSharedElementStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
    const urls = {
        registrationUrl: 'http://192.168.0.90:8000/api/registration/',
        loginUrl: 'http://192.168.0.90:8000/api/login/',
        apiUrl: 'http://192.168.0.90:8000/api/',
        getUserUrl: 'http://192.168.0.90:8000/api/user/',
        search: 'http://192.168.0.90:8000/api/search/?search=osman'
    };
    let [fontLoaded, error] = useFonts({Playball_400Regular});
    let [userInfo, setUserInfo] = useState({
        name: null,
        token: null,
        email: null,
        userType: null,
        username: null,
    });
    const [loginValid, setLoginValid] = useState(true);
    const [registrationValid, setRegistrationValid] = useState(true);
    const [regError, setRegError] = useState(null);
    const data = {
        LoginCheck: loginValid,
        RegistrationCheck: registrationValid,
        RegError: regError,
    };

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
            let response = fetch(urls.loginUrl, {
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
                    if (json.error) {
                        setLoginValid(false);
                    }
                    if (json.username) {
                        try {
                            await SecureStore.setItemAsync('userToken', json.token);
                            await SecureStore.setItemAsync('userName', json.username);
                            await SecureStore.setItemAsync('Name', json.name);
                            await SecureStore.setItemAsync('Email', json.email);
                            await SecureStore.setItemAsync('userType', json.user_type);
                            setUserInfo(prevState => {
                                return {
                                    ...prevState,
                                    name: json.name,
                                    token: json.token,
                                    email: json.email,
                                    userType: json.user_type,
                                    username: json.username,
                                };
                            });
                            setLoginValid(true);
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
        signUp: (PersonalInfo, LoginInfo, UserType) => {
            let is_girl = false;
            let is_savior = false;
            if (UserType === 'girl') {
                is_girl = true;
            }
            if (UserType === 'savior') {
                is_savior = true;
            }
            if (UserType === '') {
                return alert('Choose User Type.')
            }
            if (is_girl !== false || is_savior !== false) {
                fetch(urls.registrationUrl, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: PersonalInfo.email,
                        username: LoginInfo.username,
                        first_name: PersonalInfo.firstName,
                        last_name: PersonalInfo.lastName,
                        password: LoginInfo.password,
                        password2: LoginInfo.password2,
                        is_girl: is_girl,
                        is_savior: is_savior,
                    })
                }).then(response => response.json())
                    .then(async json => {
                        if (!json.response) {
                            setRegistrationValid(false);
                            setRegError(json);
                            console.log(json);
                        }
                        if (json.Token) {
                            try {
                                await SecureStore.setItemAsync('userToken', json.Token);
                                await SecureStore.setItemAsync('userName', json.username);
                                await SecureStore.setItemAsync('Name', json.name);
                                await SecureStore.setItemAsync('Email', json.email);
                                await SecureStore.setItemAsync('userType', json.user_type);
                                setUserInfo(prevState => {
                                    return {
                                        ...prevState,
                                        name: json.name,
                                        token: json.Token,
                                        email: json.email,
                                        userType: json.user_type,
                                        username: json.username,
                                    };
                                });
                                dispatch({type: 'REGISTER', token: json.Token});
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    });
            }
        },
        closeError: () => {
            setLoginValid(true);
            setRegistrationValid(true);
        },
    }), []);

    const getUser = async (userToken) => {
        fetch(getUserUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + userToken
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
        let userName;
        let email;
        let Name;
        let userType;
        userToken = null;
        userName = null;
        email = null;
        Name = null;
        userType = null;
        try {
            userToken = await SecureStore.getItemAsync('userToken');
            userName = await SecureStore.getItemAsync('userName');
            email = await SecureStore.getItemAsync('Email');
            Name = await SecureStore.getItemAsync('Name');
            userType = await SecureStore.getItemAsync('userType');
            setUserInfo(prevState => {
                return {
                    ...prevState,
                    name: Name,
                    token: userToken,
                    email: email,
                    username: userName,
                    userType: userType,
                };
            });
        } catch (error) {
            console.log(error);
        }

        dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
        await Location.requestForegroundPermissionsAsync();
    }, []);

    const MyTheme = {
        ...DarkTheme,
        colors: {
            ...DarkTheme.colors,
            background: 'rgb(16,28,28)',
            text: '#ffffff',
        }
    }


    if (!fontLoaded) {
        return <AppLoadingPlaceholder/>
    }
    return (
        // <LocationProvider>
        <AuthContext.Provider value={authContext}>
            {loginState.userToken == null ? (
                    <DataContext.Provider value={data}>
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
                    </DataContext.Provider>
                ) :
                <TokenContext.Provider value={userInfo}>
                    <NavigationContainer theme={MyTheme}>
                        <Drawer.Navigator
                            initialRouteName="Home"
                            drawerContent={props => <DrawerContent {...props} />}
                            screenOptions={{
                                drawerActiveBackgroundColor: '#09614F',
                                drawerActiveTintColor: '#6CFFDB',
                                drawerInactiveTintColor: '#A9ABAB',
                                drawerLabelStyle: {marginLeft: -25},
                                headerTintColor: myColors.white,
                            }}
                        >

                            <Drawer.Screen options={{
                                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                                drawerIcon: ({color}) => (
                                    <MaterialCommunityIcon
                                        name="home-outline"
                                        color={color}
                                        size={22}/>
                                )
                            }} name="Home" component={HomeScreen}/>

                            <Drawer.Screen options={{
                                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                                drawerIcon: ({color}) => (
                                    <MaterialCommunityIcon
                                        name="contacts-outline"
                                        color={color}
                                        size={22}/>
                                )
                            }} name="View Contacts" component={ViewContacts}/>

                            {userInfo.userType == 'savior' ?
                                <Drawer.Screen options={{
                                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                                    drawerIcon: ({color}) => (
                                        <MaterialCommunityIcon
                                            name="eye-outline"
                                            color={color}
                                            size={22}/>
                                    )
                                }} name="View Alerts" component={AlertsScreen}/>
                                :
                                <Drawer.Screen options={{
                                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                                    drawerIcon: ({color}) => (
                                        <MaterialCommunityIcon
                                            name="account-plus-outline"
                                            color={color}
                                            size={22}/>
                                    )
                                }} name="Add Savior" component={SearchSavior}/>
                            }
                        </Drawer.Navigator>
                    </NavigationContainer>
                </TokenContext.Provider>
            }
        </AuthContext.Provider>
        // </LocationProvider>
    );
}