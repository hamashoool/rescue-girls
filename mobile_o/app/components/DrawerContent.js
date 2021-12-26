import React from 'react';
import {
    Title,
    Caption,
    Paragraph,
    Drawer, Avatar,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem, DrawerItemList
} from '@react-navigation/drawer';
import {StyleSheet, View} from 'react-native';
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";
import {AuthContext, TokenContext} from "../context/context";
import {LinearGradient} from "expo-linear-gradient";

function DrawerContent (props) {
    const { signOut } = React.useContext(AuthContext);
    const userInfo = React.useContext(TokenContext);

    // const { signOut, toggleTheme } = React.useContext(AuthContext);

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <LinearGradient
                            // Background Linear Gradient
                            colors={['#09614F', 'transparent']}
                            style={styles.background}
                        />
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image
                                source={{
                                    uri: 'https://hamashool.com/static/images/1.png'
                                }}
                                size={60}
                                style={{backgroundColor: 'rgba(255,255,255,0)'}}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{userInfo.name}</Title>
                                <Caption style={styles.caption}>@{userInfo.username}</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>150</Paragraph>
                                <Caption style={styles.caption}>Alerts</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>50</Paragraph>
                                <Caption style={styles.caption}>Contacts</Caption>
                            </View>
                        </View>
                    </View>
                    <View style={styles.drawerSection}>
                        <DrawerItemList {...props}/>
                    </View>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color, size}) => (
                        <MaterialCommunityIcon
                            name="exit-to-app"
                            color="#A9ABAB"
                            size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {signOut()}}
                />
            </Drawer.Section>
        </View>
    );
}

export default DrawerContent;

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 130,
    },
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
        backgroundColor: '#021414'
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
        color: 'white'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        color: 'white'
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#A0D4B6',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
