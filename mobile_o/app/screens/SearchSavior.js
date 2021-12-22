import React, {useState} from 'react';

import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {SearchBar} from "react-native-elements";
import {TouchableHighlight, TouchableOpacity} from "react-native-gesture-handler";
import styleSheet from "../styles/MainStyles";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {myColors} from "../utilities/colors";

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
function SearchSavior (props) {
    const [search, setSearch] = useState("");
    const Item = ({ title }) => (
        <View style={styles.item}>
            <View style={styleSheet.Inline}>
                <View style={{flexDirection: 'row', marginLeft: -30}}>
                    <Image
                        style={styles.image}
                        source={{uri: 'https://hamashool.com/static/images/1.png'}}
                        resizeMode='contain'
                        contentContainerStyle={{padding: 20}}
                    />
                    <View>
                        <Text style={styles.title}>Osman Hamashool</Text>
                        <Text style={styles.title}>@osman</Text>
                    </View>
                </View>
                <TouchableHighlight onPress={() => {console.log('hey')}} style={styles.Button}
                underlayColor={'rgba(255,86,14,0.42)'}>
                    <MaterialCommunityIcons name="account-plus-outline" size={24} color="orange" />
                </TouchableHighlight>
            </View>
        </View>
    );
    const renderItem = ({ item }) => (
        <Item title={item.title} />
    );
    return (
        <View>
            <SearchBar
                placeholder="Type Here..."
                onChangeText={(text)=>{setSearch(text)}}
                onSubmitEditing={()=>console.log(`User typed ${search}`)}
                value={search}
            />
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                style={{marginTop:15}}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    Button: {
        padding: 15,
        alignSelf: "center",
        borderRadius: 50
    },
    container: {
        flex: 1,
    },
    image: {
        width: 100,
        height: 50,
        borderRadius: 50
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
export default SearchSavior;
