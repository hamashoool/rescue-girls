import React from 'react';

import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableHighlight} from "react-native-gesture-handler";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const GirlHome = (props) => {
    return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{
            width: 250,
            height: 280,
            aspectRatio: 1 * 1,
            position: 'absolute'

        }}>
            <Image
                source={require('../assets/bg-alert1.png')}
                style={{
                    resizeMode: 'cover',
                    width: '100%',
                    height: '100%'

                }}
            />
        </View>
        <TouchableHighlight onPress={() => {console.log('Alert')}} style={styles.button}
                            underlayColor='rgb(73,13,13)'>
            <MaterialCommunityIcons name="alert-rhombus-outline" size={140} color="white" />
        </TouchableHighlight>
    </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'rgb(194,0,0)',
        borderRadius: 150,
        padding: 20,
        borderColor: '#000',
        borderWidth: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default GirlHome;
