import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {AuthContext, TokenContext} from "../components/context";

function HomeScreen(props) {
    const { signOut } = React.useContext(AuthContext);
    const userInfo = React.useContext(TokenContext);

    return (
        <View style={styles.container}>
            <Button title={'sign out'} onPress={()=>{signOut()}}/>
            <Text>
                Hello {userInfo.name}, your api token is: {userInfo.token}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color: 'white'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow',
    },
});

export default HomeScreen;