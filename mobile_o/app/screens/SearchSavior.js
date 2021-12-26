import React, {useState} from 'react';

import {FlatList, Image, Modal, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {SearchBar} from "react-native-elements";
import styleSheet from "../styles/MainStyles";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {myColors} from "../utilities/colors";
import {TokenContext} from "../context/context";

function SearchSavior(props) {
    const [search, setSearch] = useState("");
    const userInfo = React.useContext(TokenContext);
    const url = 'http://192.168.0.90:8000/api/search/?search=' + search
    const [result, setResult] = useState(null);
    const [saviorExist, setSaviorExist] = useState(false);
    const [saviorAdded, setSaviorAdded] = useState(false);

    const addSavior = async (username) => {
        const addUrl = 'http://192.168.0.90:8000/api/add/';
        await fetch(addUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + userInfo.token
            },
            body: JSON.stringify({
                username: username
            })
        })
            .then(response => response.json())
            .then(json => {
                if (json.error) {
                    setSaviorExist(true);
                }
                if (json.success) {
                    setSaviorAdded(true);
                }
            })
    }

    const Item = ({first_name, last_name, username}) => (
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
                        <Text style={styles.title}>{first_name} {last_name}</Text>
                        <Text style={styles.title}>@{username}</Text>
                    </View>
                </View>
                <TouchableHighlight
                    onPress={() => addSavior(username)}
                    style={styles.Button}
                    underlayColor={'rgba(255,86,14,0.42)'}>
                    <MaterialCommunityIcons name="account-plus-outline" size={24} color="orange"/>
                </TouchableHighlight>
            </View>
        </View>
    );
    const renderItem = ({item}) => (
        <Item
            first_name={item.first_name}
            last_name={item.last_name}
            username={item.username}
        />
    );

    const searchSavior = async () => {
        await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + userInfo.token
            }
        })
            .then(response => response.json())
            .then(data => setResult(data))
    }

    return (
        <View>
            <SearchBar
                placeholder="Type Here..."
                onChangeText={(text) => {
                    setSearch(text)
                }}
                onSubmitEditing={() => searchSavior()}
                value={search}
            />
            {!result ?
                <View style={styleSheet.Center}>
                    <Text style={{fontSize: 30, color: '#626b62'}}>Search By Username or Email</Text>
                </View>
                : [
                    (result.count === 0 ?
                            <View style={styleSheet.Center}>
                                <Text style={{fontSize: 30, color: '#fff'}}>{search}</Text>
                                <Text style={{fontSize: 30, color: '#626b62'}}>Was not found</Text>
                            </View>
                            :
                            <View>
                                <FlatList
                                    data={result.results}
                                    renderItem={renderItem}
                                    keyExtractor={item => item.username}
                                    style={{marginTop: 15}}
                                />
                                <Modal
                                    animationType="fade"
                                    transparent={true}
                                    visible={saviorExist}
                                >
                                    <View style={styleSheet.centeredView}>
                                        <View style={styleSheet.modalView}>
                                            <Text style={{fontSize:22, fontWeight: 'bold', color: 'rgba(255,86,14,0.7)', marginBottom: 10}}>
                                                This user is already in your contacts.
                                            </Text>

                                            <TouchableHighlight
                                                underlayColor='#4AFFDB'
                                                style={styleSheet.ModelClose}
                                                onPress={() => {setSaviorExist(false)}}
                                            >
                                                <Text style={{color: '#09614F', fontSize: 19}}>Close</Text>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                </Modal>
                                <Modal
                                    animationType="fade"
                                    transparent={true}
                                    visible={saviorAdded}
                                >
                                    <View style={styleSheet.centeredView}>
                                        <View style={styleSheet.modalView}>
                                            <Text
                                                style={{
                                                    fontSize:22,
                                                    fontWeight: 'bold',
                                                    color: myColors.mainColor,
                                                    marginBottom: 10
                                                }}>
                                                New user has been added.
                                            </Text>

                                            <TouchableHighlight
                                                underlayColor='#4AFFDB'
                                                style={styleSheet.ModelClose}
                                                onPress={() => {setSaviorAdded(false)}}
                                            >
                                                <Text style={{color: '#09614F', fontSize: 19}}>Close</Text>
                                            </TouchableHighlight>
                                        </View>
                                    </View>
                                </Modal>
                            </View>
                    ),
                ]
            }
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
