import React, {useState} from 'react';
import {
    ImageBackground,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput, TouchableHighlight,
    View
} from 'react-native';
import AwesomeAlert from "react-native-awesome-alerts";
import * as SecureStore from "expo-secure-store";
import {AuthContext, DataContext} from "../context/context";
import {FontAwesome} from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable';

function LoginScreen(props) {
    let navigation = props.navigation;
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const {signIn, closeError} = React.useContext(AuthContext);
    const data = React.useContext(DataContext);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000" />
            <ImageBackground blurRadius={6} source={require('../assets/black1.jpg')} style={styles.background}>
                <View style={styles.HeaderS}>
                    <Text style={styles.LogoText}>Rescue Girls</Text>
                </View>
                <View style={styles.Footer}>
                    <View style={styles.Content}>
                        <Text style={styles.LoginTitle}>Login</Text>

                        <TextInput
                            style={[styles.Username, styles.InputCommon]}
                            placeholder="Username"
                            placeholderTextColor="#c0c0c0"
                            onChangeText={setUsername}
                        />

                        <TextInput
                            style={[styles.Password, styles.InputCommon]}
                            placeholder="Password"
                            placeholderTextColor="#c0c0c0"
                            secureTextEntry={true}
                            onChangeText={setPassword}
                        />
                        {data.LoginCheck ? null :
                            <Animatable.View animation="bounceIn" style={styles.ErrorView}>
                                <View style={styles.ErrorInner}>
                                    <Text style={styles.ErrorText}>Invalid Login Information.</Text>
                                    <Text style={styles.CloseError} onPress={() => {closeError()}}>
                                        <FontAwesome name="close" size={24} color="rgb(255,37,37)"/>
                                    </Text>
                                </View>
                            </Animatable.View>
                        }

                        <TouchableHighlight style={styles.LoginContainer} onPress={() => {
                            signIn(Username, Password)
                        }}>
                            <View style={styles.LoginButton}>
                                <Text style={styles.LoginText}>Login</Text>
                            </View>
                        </TouchableHighlight>

                        <Text
                            style={styles.RegisterLink}
                            onPress={() => navigation.navigate('Registration')}
                        >Don't have an account?</Text>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
    },
    Content: {},
    container: {
        flex: 1,
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    CloseError: {
        position: 'absolute',
        right: '4%',
        top: '30%'
    },
    ErrorView: {
        justifyContent: 'center',
        alignItems: "center"
    },
    ErrorInner:{
        borderRadius: 5,
        borderColor: 'rgb(255,37,37)',
        borderWidth: 2,
        paddingTop: '2%',
        paddingBottom: '2%',
        paddingRight: '10%',
        paddingLeft: '10%',
        backgroundColor: 'rgba(119,0,0,0.35)',
    },
    ErrorText: {
        fontSize: 19,
        color: 'rgb(255,37,37)',

    },
    Footer: {
        flex: 2,
    },
    HeaderS: {
        flex: 1,
        justifyContent: 'center',
    },

    InputCommon: {
        height: "14%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'rgb(51,49,49)',
        color: '#c0c0c0',
        fontSize: 20
    },
    LoginButton: {
        height: 50,
        backgroundColor: '#2ADBB7',
        justifyContent: 'center', //Centered horizontally
        alignItems: 'center', //Centered vertically
        borderRadius: 50
    },
    LoginContainer: {
        margin: 10,
        borderRadius: 50
    },
    LoginText: {
        fontSize: 25,
        color: '#09614F'
    },
    LogoText: {
        width: '100%',
        fontFamily: 'Playball_400Regular',
        fontSize: 60,
        textAlign: "center",
        color: '#4AFFDB'
    },
    LoginTitle: {
        marginBottom: 20,
        fontSize: 40,
        textAlign: "center",
        color: '#4AFFDB'
    },
    Username: {},
    Password: {},
    RegisterLink: {
        color: '#DB592A',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20
    },
    Text: {
        fontFamily: 'Playball_400Regular'
    },
});

export default LoginScreen;