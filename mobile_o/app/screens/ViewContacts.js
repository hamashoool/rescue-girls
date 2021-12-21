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
    TouchableHighlight
} from 'react-native';
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";
import styleSheet from "../styles/MainStyles";
import {myColors} from "../utilities/colors";

const marginBottomItem = 10;
const paddingItem = 10;
const imgHeight = 100;
const sizeOfItem = imgHeight + paddingItem * 2 + marginBottomItem;

const BASE_URL = 'https://dummyapi.io/data/v1/';
const APP_ID = '61bfb9fc0cf732c27692468d';

function ViewContacts(props) {
    const [data, setData] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    const Yscroll = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        setIsloading(true);
        getAllUsers();
        return () => {

        }
    }, []);

    getAllUsers = () => {
        fetch(`${BASE_URL}/user`, {headers: {'app-id': APP_ID}})
            .then((res) => res.json())
            .then((resJson) => {
                setData(resJson.data), console.log(resJson)
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
                    source={{uri: item.picture}}
                    resizeMode='contain'
                    contentContainerStyle={{padding: 20}}
                />
                    <View style={styles.wrapText}>
                        <Text style={styles.fontSize}>@username</Text>
                        <Text style={styles.fontSize}>{item.firstName} {item.lastName}</Text>
                        <Text style={styles.fontSize}>user@email.com</Text>
                        <Text style={styles.fontSize}> +8801111111111</Text>
                    </View>
                <View style={{justifyContent: 'center'}}>
                    <TouchableHighlight
                        onPress={() => {console.log('delete')}}
                        style={styles.Delete}
                        underlayColor='rgba(119,0,0,0.35)'>
                        <MaterialCommunityIcon name="delete-outline" color={'red'} size={30} />
                    </TouchableHighlight>
                </View>
            </Animated.View>
        )

    }


    return (
        <SafeAreaView style={styles.container}>
            {
                isLoading ? <ActivityIndicator/> : (
                    <Animated.FlatList
                        data={data}
                        keyExtractor={item => `key-${item.id}`}
                        renderItem={renderUser}
                        contentContainerStyle={{
                            padding: 20
                        }}
                        onScroll={
                            Animated.event(
                                [{nativeEvent: {contentOffset: {y: Yscroll}}}],
                                {useNativeDriver: true}
                            )}
                    />
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
        fontSize: 18,
        color: myColors.white
    },
    image: {
        width: 100,
        height: imgHeight,
        borderRadius: 50
    },
    wrapText: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center'
    },
    Inline:{
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
