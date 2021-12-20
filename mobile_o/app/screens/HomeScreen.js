import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {TokenContext} from "../components/context";
import SaviorHome from "../components/SaviorHome";
import GirlHome from "../components/GirlHome";

function HomeScreen(props) {
    const userInfo = React.useContext(TokenContext);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} style={{padding: 5}}>
            {userInfo.userType === 'savior' ?
                <SaviorHome/>
                :
                <GirlHome/>
            }
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default HomeScreen;