// import '../utilities/_mockLocation';

import React, {useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableHighlight} from "react-native-gesture-handler";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import * as Location from "expo-location";
import {TokenContext} from "../context/context";

const GirlHome = (props) => {
    const userInfo = React.useContext(TokenContext);
    const [live, setLive] = useState(false);
    const [subscriber, setSubscriber] = useState(null);
    let [alertId, setAlertId] = useState(null);

    const createLocation = (location) => {
        // console.log(alertId)

        //create alert and return alert id, then save it.
        fetch('http://192.168.0.90:8000/api/create/location/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + userInfo.token
            },
            body: JSON.stringify({
                alertId: alertId,
                croods: location
            })
        })
            .then(response => response.json())
            .then(data => console.log(data));
    }

    const createAlert = async () => {

        // create alert and return alert id, then save it.
        fetch('http://192.168.0.90:8000/api/create/alert/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + userInfo.token
            },
        })
            .then(response => response.json())
            .then(async data => await setAlertId(data.alert_id));

        // start watching the user
        // if (alertId) {
        try {
            const sub = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.BestForNavigation,
                    timeInterval: 1000,
                    distanceInterval: 10
                },
                location => {
                    createLocation(location);
                }
            );
            setSubscriber(sub);
        } catch (e) {
            setErr(e);
        }
        // }
    }
    const stopWatch = () => {
        if (subscriber) {
            subscriber.remove();
        }
        console.log('Stoped.')
    }

    useEffect(() => {
        if (live) {
            createAlert();
        } else {
            stopWatch();
        }
    }, [live]);

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

            <View style={{
                width: 250,
                height: 280,
                aspectRatio: 1 * 1,
                position: 'absolute'

            }}>
                {live ?
                    <Text style={{color: '#fff', fontSize: 30}}>Watching...</Text>
                    :
                    <Text style={{color: '#fff', fontSize: 30}}>Not Watching.</Text>
                }
                <Image
                    source={require('../assets/bg-alert1.png')}
                    style={{
                        resizeMode: 'cover',
                        width: '100%',
                        height: '100%'

                    }}
                />
            </View>
            <TouchableHighlight
                onPress={() => {
                    live ? (setLive(false)) : (setLive(true))
                }}
                style={[styles.button, live ? styles.bgGreen : styles.bgRed]}
                underlayColor='rgb(73,13,13)'
            >
                <MaterialCommunityIcons name="alert-rhombus-outline" size={140} color="white"/>
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
    bgRed: {
        backgroundColor: 'rgb(194,0,0)',
    },
    bgGreen: {
        backgroundColor: 'rgb(0,147,91)',
    },
    button: {
        borderRadius: 150,
        padding: 20,
        borderColor: '#000',
        borderWidth: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

export default GirlHome;
