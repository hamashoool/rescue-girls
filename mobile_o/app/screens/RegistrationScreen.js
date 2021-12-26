import React, {useState} from 'react';
import {
    ImageBackground, Modal,
    Platform, Pressable,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput, TouchableHighlight, TouchableOpacity,
    View
} from 'react-native';
import {MaterialIcons, FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import {AuthContext, DataContext} from "../context/context";
import styleSheet from "../styles/MainStyles";

function RegistrationScreenOne(props) {
    let navigation = props.navigation;

    let info = {
        username: null,
        password: null,
        password2: null
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground blurRadius={6} source={require('../assets/black1.jpg')} style={styles.background}>
                <View style={styles.HeaderS}>
                    <Text style={styles.LogoText}>Rescue Girls</Text>
                </View>
                <View style={styles.Footer}>
                    <View style={styles.Content}>
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
                        <View style={[styles.LoginButton, styles.InlineButtons]}>
                            <Text style={styles.LoginText}>Next</Text>
                            <MaterialIcons name="arrow-forward" size={30} color="#09614F"/>
                        </View>
                    </TouchableHighlight>

                    <Text
                        style={[styles.RegisterLink, styles.Linke]}
                        onPress={() => navigation.navigate('Login')}
                    >Already have an account?</Text>
                </View>
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
            <ImageBackground blurRadius={6} source={require('../assets/black1.jpg')} style={styles.background}>
                <View style={styles.HeaderS}>
                    <Text style={styles.LogoText}>Rescue Girls</Text>
                </View>
                <View style={styles.Footer}>
                    <View style={styles.Content}>

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
                                <MaterialIcons name="arrow-back" size={30} color="#09614F"/>
                                <Text style={[styles.LoginText]}>Back</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.LoginContainer1}
                                            onPress={() => [navigation.navigate('RegistrationThree',
                                                {PersonalInfo, LoginInfo})]}>
                            <View style={[styles.LoginButton, styles.InlineButtons]}>
                                <Text style={[styles.LoginText]}>Next</Text>
                                <MaterialIcons name="arrow-forward" size={30} color="#09614F"/>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <Text
                        style={styles.RegisterLink}
                    >We are almost there.</Text>
                </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    )
}

function RegistrationScreenThree(props) {
    const navigation = props.navigation
    const [BackgroundColorGirl, setBackgroundColorGirl] = useState('rgb(98,94,94)')
    const [BackgroundColorSavior, setBackgroundColorSavior] = useState('rgb(98,94,94)')
    const [pressedGirl, setpressedGirl] = useState(false)
    const [pressedSavior, setpressedSavior] = useState(false)
    const [UserType, setUserType] = useState('')
    const data = React.useContext(DataContext);

    const LoginInfo = props.route.params.LoginInfo;
    const PersonalInfo = props.route.params.PersonalInfo;

    const { signUp, closeError } = React.useContext(AuthContext);

    function changeColorGirl(){
        if(!pressedGirl){
            setpressedGirl(true);
            setpressedSavior(false);
            setBackgroundColorGirl('rgb(255,149,110)');
            setBackgroundColorSavior('rgb(98,94,94)');
            setUserType('girl');
        } else {
            setpressedGirl(false);
            setBackgroundColorGirl('rgb(98,94,94)');
        }
    }

    function changeColorSavior(){
        if(!pressedSavior){
            setpressedSavior(true);
            setpressedGirl(false);
            setBackgroundColorSavior('rgb(255,149,110)');
            setBackgroundColorGirl('rgb(98,94,94)');
            setUserType('savior');
        } else {
            setpressedSavior(false);
            setBackgroundColorSavior('rgb(98,94,94)');
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground blurRadius={6} source={require('../assets/black1.jpg')} style={styles.background}>
                <View style={styles.HeaderS}>
                    <Text style={styles.LogoText}>Rescue Girls</Text>
                </View>
                <View style={styles.Footer}>
                    <View style={styles.Content}>

                        <Text style={styles.LoginTitle}>Choose One</Text>

                        <View style={styles.ChoiceContainer}>
                            <TouchableOpacity
                                style={[{backgroundColor:BackgroundColorSavior, padding: 15}, styles.ChoiceSavior]}
                                onPress={()=>{changeColorSavior(); console.log(pressedSavior)}}>

                                <Text style={styles.ChoiceSaviorText}>Savior</Text>
                                <View style={styles.ChoiceSaviorIcon}>
                                    <MaterialCommunityIcons name="human-greeting" size={100} color="#DB592A" />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[{backgroundColor:BackgroundColorGirl, padding: 15}, styles.ChoiceGirl]}
                                onPress={()=>{changeColorGirl(); console.log(pressedGirl)}}>

                                <Text style={styles.ChoiceFemaleText}>Female</Text>
                                <View style={styles.ChoiceFemaleIcon}>
                                    <FontAwesome name="female" size={100} color="#DB592A" />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.InlineButtons}>
                            <TouchableHighlight style={styles.LoginContainer1} onPress={() => navigation.goBack()}>
                                <View style={[styles.LoginButton, styles.InlineButtons]}>
                                    <MaterialIcons name="arrow-back" size={30} color="#09614F"/>
                                    <Text style={[styles.LoginText]}>Back</Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.LoginContainer1} onPress={() => {signUp(PersonalInfo, LoginInfo, UserType)}}>
                                <View style={[styles.LoginButton, styles.InlineButtons, styles.DoneBackground]}>
                                    <Text style={[styles.LoginText, styles.DoneText]}>Done</Text>
                                    <MaterialIcons name="arrow-forward" size={30} color="#4AFFDB"/>
                                </View>
                            </TouchableHighlight>
                        </View>

                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={!data.RegistrationCheck}
                        >
                            <View style={styles.centeredView}>
                                <View style={styleSheet.modalView}>
                                    <Text style={{fontSize:22, fontWeight: 'bold', color: '#09614F'}}>
                                        Invalid Registration Information!
                                    </Text>
                                    {!data.RegError ? null :
                                        Object.entries(data.RegError).map(([key,value]) => (
                                            <View style={styles.ErrorItem}>
                                                <Text style={styles.ErrorKey}>
                                                    {key} =>
                                                </Text>
                                                <Text style={styles.ErrorValue}>
                                                    {value}
                                                </Text>
                                            </View>
                                    ))
                                    }
                                    <TouchableHighlight
                                        underlayColor='#4AFFDB'
                                        style={styleSheet.ModelClose}
                                        onPress={() => {closeError(); console.log(data.RegError)}}
                                    >
                                        <Text style={{color: '#09614F', fontSize: 19}}>Close</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </Modal>
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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    ChoiceContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
    },
    ChoiceSaviorText:{
        fontSize: 35,
    },
    ChoiceSaviorIcon:{
        position: 'absolute',
        bottom: -5,
        right: 0,
        padding: 15
    },
    ChoiceFemaleText:{
        fontSize: 35,
    },
    ChoiceFemaleIcon:{
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: 15
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
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },
    DoneBackground:{
        backgroundColor: '#09614F',
    },
    DoneText:{
        color: '#4AFFDB'
    },
    ErrorItem:{
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
    },
    ErrorKey:{
        color: '#DB592A',
        fontWeight: 'bold',
        padding: 5,
        fontSize: 18
    },
    ErrorValue:{
        color: 'white',
        padding: 5
    },
    Flexe1: {
        flex: 1,
    },
    Footer: {
        flex: 3,
    },
    HeaderS: {
        flex: 1,
        justifyContent: 'center',
    },
    InlineButtons: {
        flexDirection: 'row',
    },
    InputCommon: {
        height: "11%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'rgb(51,49,49)',
        color: '#c0c0c0',
        fontSize: 20
    },
    Linke:{
        color: '#DB592A',
    },
    LoginButton: {
        height: 50,
        backgroundColor: '#2ADBB7',
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
        color: '#09614F',
        // flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
    },
    LogoText: {
        width: '100%',
        height: 100,
        fontFamily: 'Playball_400Regular',
        fontSize: 60,
        textAlign: "center",
        color: '#4AFFDB'
    },
    LoginTitle: {
        marginBottom: 20,
        fontSize: 40,
        textAlign: "center",
        color: '#4AFFDB'
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
