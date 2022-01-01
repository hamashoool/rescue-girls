// import '../utilities/_mockLocation';
import React, {useState, useContext, useEffect, useRef} from 'react';

import {StyleSheet, ActivityIndicator, FlatList, SafeAreaView, Text, View, RefreshControl} from 'react-native';
import {myColors} from "../utilities/colors";
import {TouchableHighlight, TouchableOpacity} from "react-native-gesture-handler";
import styleSheet from "../styles/MainStyles";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import MapScreen from "./MapScreen";
import MapView, {Circle, Marker} from "react-native-maps";
import ActionButton from "react-native-action-button";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";
import {AuthContext, TokenContext} from "../context/context";
import * as Animatable from 'react-native-animatable';

const AlertsScreen = (props) => {
    const userInfo = React.useContext(TokenContext);
    const [alertData, setAlertData] = useState(null);
    const [mapRegion, setMapRegion] = useState(null);
    const [mapControl, setMapControl] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const ws = useRef();

    const getAlerts = () => {
        fetch('http://192.168.0.90:8000/api/get/alerts/', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + userInfo.token
            }
        })
            .then(response => response.json())
            .then(data => setAlertData(data))
            .finally(() => setIsloading(false));
    }

    const getLocation = async (alertId) => {
        await fetch(`http://192.168.0.90:8000/api/get/location/${alertId}/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + userInfo.token
            }
        })
            .then(response => response.json())
            .then(data => setMapRegion(data));
        console.log(mapRegion);
    }

    const connectWS = (alertId) => {
        ws.current = new WebSocket(`ws://192.168.0.90:8000/ws/alert/${alertId}/?token=${userInfo.token}`);

        ws.current.onmessage = async (e) => {
            // a message was received
            const dataObj = JSON.parse(e.data)
            if (dataObj.action){
                await setMapRegion(prevState => ({
                    ...prevState,
                    status: 'false'
                }));
                await console.log('map',mapRegion)
            }else{
                await setMapRegion(dataObj)
            }

            if (dataObj.latitude !== null) {
                await setMapControl(true)
            }

            console.log('message', dataObj);
        };
        ws.current.onopen = (e) => {
            // a message was received
            console.log('open', e);
            // ws.send(JSON.stringify({msg: 'From savior'}))
        };
        ws.current.onerror = (e) => {
            // a message was received
            console.log('error', e);
        };
        ws.current.onclose = (e) => {
            // a message was received
            console.log('close', e);
        };
    }

    const Item = ({name, date, live, alertId}) => (
        <TouchableOpacity style={styles.item} onPress={() => {
            // getLocation(alertId)
            connectWS(alertId)
        }}>
            <Text style={[styles.title, {textAlign: 'center', fontWeight: 'bold', paddingBottom: 5,}]}>
                {name}</Text>
            <View style={styleSheet.Inline}>
                {live ?
                    <Animatable.View animation="fadeIn" easing="ease-in-out" iterationCount="infinite">
                        <MaterialCommunityIcons name="checkbox-blank-circle" size={24} color="#22ff00"/>
                    </Animatable.View>
                    :
                    <MaterialCommunityIcons name="checkbox-blank-circle" size={24} color={myColors.white}/>
                }
                {live ?
                    <Text style={[styles.title, {color: '#22ff00',}]}>Live Now</Text>
                    :
                    <Text style={[styles.title]}>Offline</Text>
                }
                <Text style={styles.title}>{new Date(Date.parse(date)).toDateString()}</Text>
                <MaterialCommunityIcons name="alert" size={24} color="orange"/>
            </View>
        </TouchableOpacity>
    );

    const renderItem = ({item}) => (
        <Item
            name={item.alert.girl.first_name + ' ' + item.alert.girl.last_name}
            date={item.alert.date}
            live={item.alert.is_live}
            alertId={item.alert.uuid}
        />
    );

    useEffect(() => {
        setIsloading(true);
        getAlerts();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {mapControl ?
                <View style={{flex: 1}}>
                    <MapView
                        style={{ flex: 3}}
                        region={{
                            latitude: mapRegion.latitude,
                            longitude: mapRegion.longitude,
                            latitudeDelta: mapRegion.latitudeDelta,
                            longitudeDelta: mapRegion.longitudeDelta
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: mapRegion.latitude,
                                longitude: mapRegion.longitude,
                                latitudeDelta: mapRegion.latitudeDelta,
                                longitudeDelta: mapRegion.longitudeDelta
                            }}
                            title='Marker'
                            pinColor={'#ff4b00'}
                        />
                        <Circle
                            center={{
                                latitude: mapRegion.latitude,
                                longitude: mapRegion.longitude,
                                latitudeDelta: mapRegion.latitudeDelta,
                                longitudeDelta: mapRegion.longitudeDelta
                            }}
                            radius={40}
                            strokeColor={'rgb(0,136,93)'}
                            fillColor={'rgba(0,136,93,0.2)'}
                        />
                    </MapView>
                    <View style={{padding: 10, flex: 1}}>
                        <Text style={{fontSize: 30, color:myColors.white}}>{mapRegion.name}</Text>
                        <Text style={{fontSize: 20, color:myColors.white}}>{mapRegion.date}</Text>
                        { mapRegion.status === 'true' ?
                            <Animatable.Text animation="fadeIn" easing="ease-in-out" iterationCount="infinite"
                                style={{fontSize: 30, color:'#22ff00'}}>Live</Animatable.Text>
                            :
                            <Text style={{fontSize: 30, color:myColors.white}}>Offline</Text>
                        }
                    </View>
                    <ActionButton
                        buttonColor={myColors.secondColor}
                        onPress={() => {
                            setMapControl(false);
                            ws.current.close();
                            getAlerts();
                        }}
                        renderIcon={active => active ? (
                            <MaterialCommunityIcon name="close-thick" color={myColors.white} size={30}/>) : (
                            <MaterialCommunityIcon name="close-thick" color={myColors.white} size={30}/>)}
                    >

                    </ActionButton>
                </View>
                : [
                    (isLoading ?
                            <ActivityIndicator/>
                            :
                            <FlatList
                                data={alertData}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                                refreshControl={
                                    <RefreshControl refreshing={isLoading} onRefresh={getAlerts}/>
                                }
                            />
                    )
                ]
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: myColors.weekColor,
        padding: 20,
        marginHorizontal: 5,
        marginVertical: 3,
        borderRadius: 5,
    },
    title: {
        fontSize: 18,
        color: myColors.white,
    },
});

export default AlertsScreen;
