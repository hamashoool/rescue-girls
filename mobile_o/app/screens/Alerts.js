import React, {useState} from 'react';

import {StyleSheet, FlatList, SafeAreaView, Text, View} from 'react-native';
import {myColors} from "../utilities/colors";
import {TouchableHighlight, TouchableOpacity} from "react-native-gesture-handler";
import styleSheet from "../styles/MainStyles";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import MapScreen from "./MapScreen";
import MapView, {Marker} from "react-native-maps";
import ActionButton from "react-native-action-button";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";


const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3aad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aaa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-14557a1e29d72',
        title: 'Third Item',
    },
    {
        id: 'bd7acbea-c1b1-46c2-aead5-3aad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-aa4f8-fbd91aaa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bda96-14557a1e29d72',
        title: 'Third Item',
    },
    {
        id: '58694aa0f-3da1-471f-bda96-14557a1e29d72',
        title: 'Third Item',
    },
];

const AlertsScreen = (props) => {
    const [mapControl, setMapControl] = useState(false);
    const Item = ({ title }) => (
        <TouchableOpacity style={styles.item} onPress={() => {setMapControl(true)}}>
            <Text style={[styles.title, {textAlign: 'center', fontWeight: 'bold', paddingBottom: 5, }]}>Nancy Ajram</Text>
            <View style={styleSheet.Inline}>
                <MaterialCommunityIcons name="alert" size={24} color="orange" />
                <Text style={styles.title}>23.111</Text>
                <Text style={styles.title}>90.657</Text>
                <MaterialCommunityIcons name="alert" size={24} color="orange" />
            </View>
        </TouchableOpacity>
    );
    const renderItem = ({ item }) => (
        <Item title={item.title} />
    );
    const [mapRegion, setmapRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    return (
        <SafeAreaView style={styles.container}>
            {!mapControl ?
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
                :
                <View>
                    <MapView
                        style={{ alignSelf: 'stretch', height: '100%' }}
                        region={mapRegion}
                    >
                        <Marker coordinate={mapRegion} title='Marker' />
                    </MapView>
                    <ActionButton
                        buttonColor={myColors.darkerColor}
                        onPress={() => { setMapControl(false)}}
                        icon={<MaterialCommunityIcon name="close-thick" color={myColors.white} size={30} />}
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
