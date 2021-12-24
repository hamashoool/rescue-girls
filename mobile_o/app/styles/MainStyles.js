import { StyleSheet } from 'react-native';
import {myColors} from "../utilities/colors";
// import { colors, fonts, metrics } from 'styles';

const styleSheet = StyleSheet.create({
    AlertTitle: {
        color: myColors.white,
        fontSize: 30,
        padding: 10
    },
    AlertGraphs: {
        backgroundColor: '#232825',
        marginBottom: 10
    },
    Center:{
        justifyContent: 'center',
        alignItems: 'center',
        height: "80%"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    Inline: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginRight: 15,
        marginLeft: 10
    },
    modalView: {
        margin: 20,
        backgroundColor: "rgba(0,0,0,0.91)",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#DB592A',
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    ModelClose: {
        marginTop: 10,
        marginBottom: -20,
        borderWidth: 1,
        borderColor: '#09614F',
        paddingLeft: 18,
        paddingRight: 18,
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: 5,
        alignSelf: 'center',
        alignItems: 'center'
    },
    ModelCloseRed: {
        marginTop: 10,
        marginBottom: -20,
        borderWidth: 1,
        borderColor: '#ff2000',
        paddingLeft: 18,
        paddingRight: 18,
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: 5,
        alignSelf: 'center',
        alignItems: 'center'
    },
});

export default styleSheet;