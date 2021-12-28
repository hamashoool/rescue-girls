// import '../utilities/_mockLocation';
import React, {useState, useContext, useEffect} from 'react';

import {StyleSheet, ActivityIndicator, FlatList, SafeAreaView, Text, View} from 'react-native';
import {myColors} from "../utilities/colors";
import {TouchableHighlight, TouchableOpacity} from "react-native-gesture-handler";
import styleSheet from "../styles/MainStyles";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import MapScreen from "./MapScreen";
import MapView, {Circle, Marker} from "react-native-maps";
import ActionButton from "react-native-action-button";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";
import {AuthContext, TokenContext} from "../context/context";

const AlertsScreen = (props) => {
    const userInfo = React.useContext(TokenContext);
    const [ alertData, setAlertData ] = useState(null);
    const [mapRegion, setMapRegion] = useState(null);
    const [mapControl, setMapControl] = useState(false);

    const getAlerts = () => {
        fetch('http://192.168.0.90:8000/api/get/alerts/',{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + userInfo.token
            }
        })
            .then(response => response.json())
            .then(data => setAlertData(data));
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
        const ws = new WebSocket(`ws://192.168.0.90:8000/ws/alert/${alertId}/?token=${userInfo.token}`);

        ws.onmessage = async (e) => {
            // a message was received
            const dataObj = JSON.parse(e.data)
            await setMapRegion(dataObj)

            if (dataObj.latitude !== null) {
                await setMapControl(true)
            }

            console.log('message', dataObj);
        };
        ws.onopen = (e) => {
            // a message was received
            console.log('open', e);
            // ws.send(JSON.stringify({msg: 'From savior'}))
        };
        ws.onerror = (e) => {
            // a message was received
            console.log('error', e);
        };
        ws.onclose = (e) => {
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
                <MaterialCommunityIcons name="alert" size={24} color="orange"/>
                {live ?
                    <Text style={[styles.title, {color: '#22ff00',}]}>Live Now</Text>
                    :
                    <Text style={styles.title}>Offline</Text>
                }
                <Text style={styles.title}>{new Date(Date.parse(date)).toDateString()}</Text>
                <MaterialCommunityIcons name="alert" size={24} color="orange"/>
            </View>
        </TouchableOpacity>
    );

    const renderItem = ({item}) => (
        <Item
            name={item.alert.girl.first_name+' '+item.alert.girl.last_name}
            date={item.alert.date}
            live={item.alert.is_live}
            alertId={item.alert.uuid}
        />
    );

    useEffect(()=>{
        getAlerts();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {!mapControl ?
                <FlatList
                    data={alertData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
                :
                <View>
                    <MapView
                        style={{alignSelf: 'stretch', height: '100%'}}
                        region={mapRegion}
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
                            center={mapRegion}
                            radius={40}
                            strokeColor={'rgb(0,136,93)'}
                            fillColor={'rgba(0,136,93,0.2)'}
                        />
                    </MapView>
                    <ActionButton
                        buttonColor={myColors.darkerColor}
                        onPress={() => {
                            setMapControl(false)
                        }}
                        renderIcon={active => active ? (
                            <MaterialCommunityIcon name="close-thick" color={myColors.white} size={30}/>) : (
                            <MaterialCommunityIcon name="close-thick" color={myColors.white} size={30}/>)}
                    >

                    </ActionButton>
                </View>
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
