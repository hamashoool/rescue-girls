import React from 'react';
import {
    StyleSheet, ImageBackground, Text, View, TouchableHighlight,
    Platform, StatusBar, SafeAreaView
} from 'react-native';
import * as Animatable from 'react-native-animatable';

function WelcomeScreen(props) {
    let navigation = props.navigation;

    return (

        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000" />
            <ImageBackground
                style={styles.background}
                source={require('../assets/welcome2.jpg')}>

                <Animatable.Text animation="zoomInUp" duration={2000} style={styles.LogoText}>Rescue
                    Girls</Animatable.Text>

                <Animatable.View animation="zoomIn" duration={2000} style={styles.TitleContainer}>
                    <Text style={styles.TitleOne}>Save The Day</Text>
                    <Text style={styles.TitleTwo}>Rescue the girls</Text>
                </Animatable.View>

                <Animatable.View animation="bounceInLeft" duration={2000} style={styles.FullWidth}>
                    <TouchableHighlight style={styles.FullWidth} onPress={() => navigation.navigate('Login')}>
                        <View style={styles.LoginButton}>
                            <Text style={styles.LoginText}>Login</Text>
                        </View>
                    </TouchableHighlight>
                </Animatable.View>

                <Animatable.View animation="bounceInRight" duration={2000} style={styles.FullWidth}>
                    <TouchableHighlight style={styles.FullWidth} onPress={() => navigation.navigate('Registration')}>
                        <View style={styles.RegistrationButton}>
                            <Text style={styles.RegisterText}>Sign Up</Text>
                        </View>
                    </TouchableHighlight>
                </Animatable.View>

            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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