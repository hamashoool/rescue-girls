import React, {useEffect, useState} from 'react';

import {
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Image,
    SafeAreaView,
    Animated,
    Text,
    View,
    TouchableHighlight, RefreshControl, Modal
} from 'react-native';
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";
import styleSheet from "../styles/MainStyles";
import {myColors} from "../utilities/colors";
import {TokenContext} from "../context/context";

const marginBottomItem = 10;
const paddingItem = 10;
const imgHeight = 100;
const sizeOfItem = imgHeight + paddingItem * 2 + marginBottomItem;

const BASE_URL = 'http://192.168.0.90:8000/api/';
const APP_ID = '61bfb9fc0cf732c27692468d';

function ViewContacts(props) {
    const userInfo = React.useContext(TokenContext);
    const [data, setData] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const [contactDelete, setContactDelete] = useState(false);
    const Yscroll = React.useRef(new Animated.Value(0)).current;
    const [tempUser, setTempUser] = useState(null)

    const deleteContact = async (username) => {
        const addUrl = 'http://192.168.0.90:8000/api/delete/';
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
                getAllUsers()
            })
    }

    useEffect(() => {
        setIsloading(true);
        getAllUsers();
        return () => {

        }
    }, []);

    const getAllUsers = async () => {
        await fetch(`${BASE_URL}get/contacts`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + userInfo.token
            }
        })
            .then((res) => res.json())
            .then((resJson) => {
                setData(resJson.people)
                console.log(resJson.people)
            })
            .catch(console.error)
            .finally(() => setIsloading(false));
    }

    const renderUser = ({item, index}) => {
        const scale = Yscroll.interpolate({
            inputRange: [
                -1, 0,
                sizeOfItem * index,
                sizeOfItem * (index + 5)
            ],
            outputRange: [1, 1, 1, 0]
        })
        return (
            <Animated.View style={
                [styles.item,
                    {
                        transform: [{scale}]
                    }
                ]
            }>
                <Image
                    style={styles.image}
                    // source={{uri: item.picture}}
                    source={{uri: 'https://hamashool.com/static/images/1.png'}}
                    resizeMode='contain'
                    contentContainerStyle={{padding: 20}}
                />
                <View style={styles.wrapText}>
                    <Text style={styles.fontSize}>@{item.username}</Text>
                    <Text style={styles.fontSize}>{item.first_name} {item.last_name}</Text>
                    <Text style={styles.fontSize}>{item.email}</Text>
                    <Text style={styles.fontSize}> +8801111111111</Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                    <TouchableHighlight
                        onPress={() => {
                            setContactDelete(true)
                            setTempUser(item.username)
                        }}
                        style={styles.Delete}
                        underlayColor='rgba(119,0,0,0.35)'>
                        <MaterialCommunityIcon name="delete-outline" color={'red'} size={30}/>
                    </TouchableHighlight>
                </View>
            </Animated.View>
        )

    }


    return (
        <SafeAreaView style={styles.container}>
            {
                isLoading ? <ActivityIndicator/> : (
                    <View>
                        <Animated.FlatList
                            data={data}
                            keyExtractor={item => `key-${item.username}`}
                            renderItem={renderUser}
                            contentContainerStyle={{
                                padding: 20
                            }}
                            onScroll={
                                Animated.event(
                                    [{nativeEvent: {contentOffset: {y: Yscroll}}}],
                                    {useNativeDriver: true}
                                )}
                            refreshControl={
                                <RefreshControl refreshing={isLoading} onRefresh={getAllUsers}/>
                            }
                        />
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={contactDelete}
                        >
                            <View style={styleSheet.centeredView}>
                                <View style={styleSheet.modalView}>
                                    <Text
                                        style={{
                                            fontSize:20,
                                            fontWeight: 'bold',
                                            color: myColors.white,
                                            marginBottom: 10,
                                            textAlign: 'center'
                                        }}>
                                        Are you sure? you want to delete this user.
                                    </Text>

                                    <View style={styleSheet.Inline}>
                                        <TouchableHighlight
                                            underlayColor='#4AFFDB'
                                            style={styleSheet.ModelClose}
                                            onPress={() => {setContactDelete(false)}}
                                        >
                                            <Text style={{color: '#09614F', fontSize: 19}}>cancel</Text>
                                        </TouchableHighlight>
                                        <TouchableHighlight
                                            underlayColor='rgba(255,32,0,0.5)'
                                            style={styleSheet.ModelCloseRed}
                                            onPress={() => {deleteContact(tempUser), setContactDelete(false)}}
                                        >
                                            <Text style={{color: '#ff2000', fontSize: 19}}>delete</Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                )
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    Delete: {
        borderRadius: 50,
        padding: 10
    },
    fontSize: {
        fontSize: 16,
        color: myColors.white
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 50
    },
    wrapText: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center'
    },
    Inline: {
        // flexDirection: 'row',
        justifyContent: 'space-between'
    },
    item: {
        flexDirection: 'row',
        marginBottom: marginBottomItem,
        borderRadius: 10,
        backgroundColor: 'rgba(0,0,0,0.4)',
        shadowColor: '#fff',
        shadowOffset: {
            width: 0,
            height: 5
        },
        shadowOpacity: .3,
        shadowRadius: 30,
        padding: paddingItem
    },
    container: {
        flex: 1
    }

});


export default ViewContacts;
