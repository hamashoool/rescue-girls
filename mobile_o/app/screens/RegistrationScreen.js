import React from 'react';
import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';

function LoginScreen(props) {
    return (
        <View style={styles.container}>
            <Text style={styles.Text}>
                Login Screen
            </Text>
            <Text>Hey</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    Text:{
        fontFamily: 'Playball_400Regular'
    }
});

export default LoginScreen;