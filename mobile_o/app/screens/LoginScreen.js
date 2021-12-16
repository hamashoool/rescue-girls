import React, {useState} from 'react';
import {
    ImageBackground,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput, TouchableHighlight,
    View
} from 'react-native';
import AwesomeAlert from "react-native-awesome-alerts";
import * as SecureStore from "expo-secure-store";
import {AuthContext} from "../components/context";

function LoginScreen(props) {
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    let navigation = props.navigation;

    const { signIn } = React.useContext(AuthContext);

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground blurRadius={6} source={require('../assets/bg-2.jpg')} style={styles.background}>
                <View style={styles.Content}>
                    <Text style={styles.LogoText}>Rescue Girls</Text>

                    <Text style={styles.LoginTitle}>Login</Text>

                    <TextInput
                        style={[styles.Username, styles.InputCommon]}
                        placeholder="Username"
                        placeholderTextColor="#c0c0c0"
                        onChangeText={setUsername}
                    />

                    <TextInput
                        style={[styles.Password, styles.InputCommon]}
                        placeholder="Password"
                        placeholderTextColor="#c0c0c0"
                        secureTextEntry={true}
                        onChangeText={setPassword}
                    />

                    <TouchableHighlight style={styles.LoginContainer} onPress={() => {
                        signIn(Username, Password)
                    }}>
                        <View style={styles.LoginButton}>
                            <Text style={styles.LoginText}>Login</Text>
                        </View>
                    </TouchableHighlight>

                    <Text
                        style={styles.RegisterLink}
                        onPress={() => navigation.navigate('Registration')}
                    >Don't have an account?</Text>
                    {/*<AwesomeAlert*/}
                    {/*    show={true}*/}
                    {/*    showProgress={false}*/}
                    {/*    title="AwesomeAlert"*/}
                    {/*    message="I have a message for you!"*/}
                    {/*    closeOnTouchOutside={true}*/}
                    {/*    closeOnHardwareBackPress={false}*/}
                    {/*    showCancelButton={true}*/}
                    {/*    showConfirmButton={true}*/}
                    {/*    cancelText="No, cancel"*/}
                    {/*    confirmText="Yes, delete it"*/}
                    {/*    confirmButtonColor="#DD6B55"*/}
                    {/*    onCancelPressed={() => {*/}
                    {/*        this.hideAlert();*/}
                    {/*    }}*/}
                    {/*    onConfirmPressed={() => {*/}
                    {/*        this.hideAlert();*/}
                    {/*    }}*/}
                    {/*/>*/}
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        // alignItems: 'center',
    },
    Content: {},
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    InputCommon: {
        height: 60,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(5,15,26,0.6)',
        color: '#c0c0c0',
        fontSize: 20
    },
    LoginButton: {
        height: 60,
        backgroundColor: '#0e3b60',
        justifyContent: 'center', //Centered horizontally
        alignItems: 'center', //Centered vertically
        borderRadius: 50
    },
    LoginContainer: {
        margin: 12,
        borderRadius: 50
    },
    LoginText: {
        fontSize: 20,
        color: '#fff'
    },
    LogoText: {
        width: '100%',
        height: 100,
        // position: 'absolute',
        top: -70,
        fontFamily: 'Playball_400Regular',
        fontSize: 60,
        textAlign: "center",
        color: '#fff'
    },
    LoginTitle: {
        marginBottom: 20,
        fontSize: 40,
        textAlign: "center",
        color: '#fff'
    },
    Username: {},
    Password: {},
    RegisterLink: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20
    },
    Text: {
        fontFamily: 'Playball_400Regular'
    },
});

export default LoginScreen;