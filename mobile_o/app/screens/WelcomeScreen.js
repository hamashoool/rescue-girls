import React from 'react';
import {
    StyleSheet, ImageBackground, Text, View, TouchableHighlight,
    Platform, StatusBar
} from 'react-native';


function WelcomeScreen(props) {
    let navigation = props.navigation;

    return (
        <View style={styles.container}>
            <ImageBackground
                style={styles.background}
                source={require('../assets/welcome2.jpg')}>

                <Text style={styles.LogoText}>Rescue Girls</Text>

                <View style={styles.TitleContainer}>
                    <Text style={styles.TitleOne}>Save The Day</Text>
                    <Text style={styles.TitleTwo}>Rescue the girls</Text>
                </View>

                <TouchableHighlight style={styles.FullWidth} onPress={() => navigation.navigate('Login')}>
                    <View style={styles.LoginButton}>
                        <Text style={styles.LoginText}>Login</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight style={styles.FullWidth} onPress={() => console.log('Register')}>
                    <View style={styles.RegistrationButton}>
                        <Text style={styles.RegisterText}>Register</Text>
                    </View>
                </TouchableHighlight>

            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    FullWidth: {
        width: '100%'
    },
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: 'center',
    },
    LoginButton: {
        width: '100%',
        height: 70,
        backgroundColor: '#62d5ff',
        justifyContent: 'center', //Centered horizontally
        alignItems: 'center', //Centered vertically
    },
    LogoText: {
        width: '100%',
        height: 100,
        position: 'absolute',
        top: 70,
        fontFamily: 'Playball_400Regular',
        fontSize: 60,
        textAlign: "center",
        color: '#fff'
    },
    LoginText: {
        fontSize: 25,
        color: '#000'
    },
    RegistrationButton: {
        width: '100%',
        height: 70,
        backgroundColor: '#003459',
        justifyContent: 'center', //Centered horizontally
        alignItems: 'center', //Centered vertically
    },
    RegisterText: {
        fontSize: 25,
        color: '#fff'
    },
    TitleContainer: {
        bottom: 70
    },
    TitleOne: {
        fontSize: 30,
        textAlign: "center",
        color: '#fff'
    },
    TitleTwo: {
        fontSize: 20,
        textAlign: "center",
        color: '#f0c808'
    }
});

export default WelcomeScreen;