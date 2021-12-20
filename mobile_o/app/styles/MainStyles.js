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
        backgroundColor: myColors.grayColor,
        marginBottom: 10
    },
    Inline: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginRight: 15,
        marginLeft: 10
    },
});

export default styleSheet;