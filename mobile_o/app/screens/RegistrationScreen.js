import React, {useState} from 'react';
import {
    ImageBackground,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput, TouchableHighlight, TouchableOpacity,
    View
} from 'react-native';
import {MaterialIcons, FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';

let UserInfo = {};

function RegistrationScreenOne(props) {
    let navigation = props.navigation;

    let info = {
        username: null,
        password: null,
        password2: null
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground blurRadius={6} source={require('../assets/bg-2.jpg')} style={styles.background}>
                <View style={styles.Content}>
                    <Text style={styles.LogoText}>Rescue Girls</Text>

                    <Text style={styles.LoginTitle}>Sign Up</Text>

                    <TextInput
                        style={[styles.Username, styles.InputCommon]}
                        placeholder="Username"
                        placeholderTextColor="#c0c0c0"
                        onChangeText={(text) => info.username = text}
                    />

                    <TextInput
                        style={[styles.Password, styles.InputCommon]}
                        placeholder="Password"
                        placeholderTextColor="#c0c0c0"
                        secureTextEntry={true}
                        onChangeText={(text) => info.password = text}
                    />

                    <TextInput
                        style={[styles.Password, styles.InputCommon]}
                        placeholder="Confirm Password"
                        placeholderTextColor="#c0c0c0"
                        secureTextEntry={true}
                        onChangeText={(text) => info.password2 = text}
                    />

                    <TouchableHighlight style={styles.LoginContainer2}
                                        onPress={() => [navigation.navigate('RegistrationTwo', {info})]}>
                        <View style={styles.LoginButton}>
                            <Text style={styles.LoginText}>Next</Text>
                            <View style={styles.ArrowIcon}>
                                <MaterialIcons name="arrow-forward" size={30} color="white"/>
                            </View>
                        </View>
                    </TouchableHighlight>

                    <Text
                        style={styles.RegisterLink}
                        onPress={() => navigation.navigate('Login')}
                    >Already have an account?</Text>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

function RegistrationScreenTwo(props) {
    const navigation = props.navigation;
    const LoginInfo = props.route.params.info;

    let PersonalInfo = {
        firstName: null,
        lastName: null,
        email: null
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground blurRadius={6} source={require('../assets/bg-2.jpg')} style={styles.background}>
                <View style={styles.Content}>
                    <Text style={styles.LogoText}>Rescue Girls</Text>

                    <Text style={styles.LoginTitle}>Personal Info</Text>
                    {/*<Text style={styles.LoginTitle}>{ props.route.params.info.username}</Text>*/}

                    <TextInput
                        style={[styles.Username, styles.InputCommon]}
                        placeholder="First Name"
                        placeholderTextColor="#c0c0c0"
                        onChangeText={(text) => PersonalInfo.firstName = text}
                    />

                    <TextInput
                        style={[styles.Username, styles.InputCommon]}
                        placeholder="Last Name"
                        placeholderTextColor="#c0c0c0"
                        onChangeText={(text) => PersonalInfo.lastName = text}
                    />

                    <TextInput
                        style={[styles.Username, styles.InputCommon]}
                        placeholder="Email"
                        placeholderTextColor="#c0c0c0"
                        keyboardType={'email-address'}
                        onChangeText={(text) => PersonalInfo.email = text}
                    />

                    <View style={styles.InlineButtons}>
                        <TouchableHighlight style={styles.LoginContainer1} onPress={() => navigation.goBack()}>
                            <View style={[styles.LoginButton, styles.InlineButtons]}>
                                <View style={[styles.ArrowIcon, styles.InlineArrowBack]}>
                                    <MaterialIcons name="arrow-back" size={30} color="white"/>
                                </View>
                                <Text style={[styles.LoginText, styles.InlineArrowTextBack]}>Back</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.LoginContainer1}
                                            onPress={() => [navigation.navigate('RegistrationThree',
                                                {PersonalInfo, LoginInfo})]}>
                            <View style={[styles.LoginButton, styles.InlineButtons]}>
                                <Text style={[styles.LoginText, styles.InlineArrowTextNext]}>Next</Text>
                                <View style={[styles.ArrowIcon, styles.InlineArrowNext]}>
                                    <MaterialIcons name="arrow-forward" size={30} color="white"/>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <Text
                        style={styles.RegisterLink}
                    >We are almost there.</Text>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

function RegistrationScreenThree(props) {
    const navigation = props.navigation
    const [BackgroundColorGirl, setBackgroundColorGirl] = useState('white')
    const [BackgroundColorSavior, setBackgroundColorSavior] = useState('white')
    const [pressedGirl, setpressedGirl] = useState(false)
    const [pressedSavior, setpressedSavior] = useState(false)
    const [UserType, setUserType] = useState('')

    const LoginInfo = props.route.params.LoginInfo;
    const PersonalInfo = props.route.params.PersonalInfo;

    function changeColorGirl(){
        if(!pressedGirl){
            setpressedGirl(true);
            setpressedSavior(false);
            setBackgroundColorGirl('rgb(255,149,110)');
            setBackgroundColorSavior('white');
            setUserType('girl');
        } else {
            setpressedGirl(false);
            setBackgroundColorGirl('white');
        }
    }

    function changeColorSavior(){
        if(!pressedSavior){
            setpressedSavior(true);
            setpressedGirl(false);
            setBackgroundColorSavior('rgb(255,149,110)');
            setBackgroundColorGirl('white');
            setUserType('savior');
        } else {
            setpressedSavior(false);
            setBackgroundColorSavior('white');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground blurRadius={6} source={require('../assets/bg-2.jpg')} style={styles.background}>
                <View style={styles.Content}>
                    <Text style={styles.LogoText}>Rescue Girls</Text>

                    <Text style={styles.LoginTitle}>Choose One</Text>

                    <View style={styles.ChoiceContainer}>
                        <TouchableOpacity
                            style={[{backgroundColor:BackgroundColorSavior, padding: 15}, styles.ChoiceSavior]}
                            onPress={()=>{changeColorSavior(); console.log(pressedSavior)}}>

                            <Text style={styles.ChoiceSaviorText}>Savior</Text>
                            <View style={styles.ChoiceSaviorIcon}>
                                <MaterialCommunityIcons name="human-greeting" size={150} color="black" />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[{backgroundColor:BackgroundColorGirl, padding: 15}, styles.ChoiceGirl]}
                            onPress={()=>{changeColorGirl(); console.log(pressedGirl)}}>

                            <Text style={styles.ChoiceFemaleText}>Female</Text>
                            <View style={styles.ChoiceFemaleIcon}>
                                <FontAwesome name="female" size={130} color="black" />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.InlineButtons}>
                        <TouchableHighlight style={styles.LoginContainer1} onPress={() => navigation.goBack()}>
                            <View style={[styles.LoginButton, styles.InlineButtons]}>
                                <View style={[styles.ArrowIcon, styles.InlineArrowBack]}>
                                    <MaterialIcons name="arrow-back" size={30} color="white"/>
                                </View>
                                <Text style={[styles.LoginText, styles.InlineArrowTextBack]}>Back</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.LoginContainer1} onPress={() => {createAccount('Dashboard', PersonalInfo, LoginInfo, navigation, UserType)}}>
                            <View style={[styles.LoginButton, styles.InlineButtons, styles.OrangeBackground]}>
                                <Text style={[styles.LoginText, styles.InlineArrowTextNext]}>Done</Text>
                                <View style={[styles.ArrowIcon, styles.InlineArrowNext]}>
                                    <MaterialIcons name="arrow-forward" size={30} color="white"/>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </View>

                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    ArrowIcon: {
        position: 'absolute',
        right: '35%'
    },
    background: {
        flex: 1,
        justifyContent: "center",
        // alignItems: 'center',
    },
    ChoiceContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
    },
    ChoiceSaviorText:{
        fontSize: 40,
    },
    ChoiceSaviorIcon:{
        position: 'absolute',
        bottom: -10,
        right: -5,
    },
    ChoiceFemaleText:{
        fontSize: 40,
    },
    ChoiceFemaleIcon:{
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    ChoiceSavior:{
        flex: 1,
        margin: 5,
        height: 200,
        borderRadius: 7,
    },
    ChoiceGirl:{
        flex: 1,
        margin: 5,
        height: 200,
        borderRadius: 7,
    },
    Content: {},
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    Flexe1: {
        flex: 1,
    },
    InlineArrowBack:{
        left: '20%',
        width: '100%'
    },
    InlineArrowNext:{
        left: '56%',
        width: '100%'
    },
    InlineArrowTextNext:{
        left: '80%',
        width: '100%'
    },
    InlineArrowTextBack:{
        left: '130%',
        width: '100%'
    },
    InlineButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        backgroundColor: '#09263f',
        justifyContent: 'center', //Centered horizontally
        alignItems: 'center', //Centered vertically
        borderRadius: 50,
    },
    LoginContainer1: {
        margin: 12,
        borderRadius: 50,
        flex: 1
    },
    LoginContainer2: {
        margin: 12,
        borderRadius: 50,
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
    OrangeBackground:{
        backgroundColor: 'rgb(255,112,51)',
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


export default RegistrationScreenOne;
export {RegistrationScreenTwo, RegistrationScreenThree};

done = (screenName, PersonalInfo, LoginInfo, navigation, UserType) => {
    navigation.navigate(screenName)
    return(console.log(PersonalInfo, LoginInfo, screenName, UserType))
}


const urls = {
    registrationUrl: 'http://192.168.0.90:8000/api/registration/',
    loginUrl: 'http://192.168.0.90:8000/api/login/',
    apiUrl: 'http://192.168.0.90:8000/api/',
}
createAccount = (screenName, PersonalInfo, LoginInfo, navigation, UserType) => {
    let is_girl = false;
    let is_savior = false;
    if (UserType === 'girl'){
        is_girl = true;
    }
    if (UserType === 'savior'){
        is_savior = true;
    }
    if (UserType === ''){
        return alert('Choose User Type.')
    }
    if (is_girl !== false || is_savior !== false){
        fetch(urls.registrationUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: PersonalInfo.email,
                username: LoginInfo.username,
                first_name: PersonalInfo.firstName,
                last_name: PersonalInfo.lastName,
                password: LoginInfo.password,
                password2: LoginInfo.password2,
                is_girl: is_girl,
                is_savior: is_savior,
            })
        });
    }
}