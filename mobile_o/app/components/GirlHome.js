// import '../utilities/_mockLocation';

import React, {useContext, useEffect, useState, useRef} from 'react';
import {DevSettings, Image, StyleSheet, Text, View} from 'react-native';
import {TouchableHighlight} from "react-native-gesture-handler";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import * as Location from "expo-location";
import {TokenContext} from "../context/context";
import * as Updates from "expo-updates";

const GirlHome = (props) => {
    const delUrl = 'http://192.168.0.90:8000/api/delete/alert/';
    const userInfo = useContext(TokenContext);
    const [live, setLive] = useState(false);
    const [subscriber, setSubscriber] = useState(null);
    let [alertId, setAlertId] = useState(null);
    const ws = useRef(null);

    const updateAlert = () => {

        //create alert and return alert id, then save it.
        fetch('http://192.168.0.90:8000/api/update/alert/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + userInfo.token
            },
            body: JSON.stringify({
                alertId: alertId,
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.done){
                    setAlertId(null);
                }
            });
    }

    const createAlert = () => {
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
            .then(data => setAlertId(data.alert_id));
    }

    const startWatching = async () => {
        try {
            const sub = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.BestForNavigation,
                    timeInterval: 1000,
                    distanceInterval: 1
                },
                async location => {
                    // createLocation(location);
                    location.action = 'open'
                    try {
                        await ws.current.send(JSON.stringify(location));
                    } catch (error) {
                        console.log(error);
                        await fetch(delUrl, {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': 'Token ' + userInfo.token
                            },
                            body: JSON.stringify({
                                alert_id: alertId
                            })
                        });
                        await Updates.reloadAsync();
                    }
                }
            );
            setSubscriber(sub);
        } catch (e) {
            console.log(e);
        }
    }

    const stopWatch = () => {
        if (subscriber) {
            subscriber.remove();
            // updateAlert();
            ws.current.send(JSON.stringify({action: 'close'}));
            ws.current.close();
            setAlertId(null);
        }
        console.log('Stoped.')
    }

    useEffect(() => {
        if (live) {
            if (alertId !== null) {
                startWatching();
                ws.current = new WebSocket(`ws://192.168.0.90:8000/ws/alert/${alertId}/${userInfo.username}/?token=${userInfo.token}`);
            } else {
                createAlert();
            }

        } else {
            stopWatch();
        }
    }, [live, alertId]);

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
