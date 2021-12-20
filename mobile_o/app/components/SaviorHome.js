import React from 'react';

import {Dimensions, Text, View} from 'react-native';
import {myColors} from "../utilities/colors";
import {ContributionGraph, LineChart, PieChart, ProgressChart} from "react-native-chart-kit";
import styleSheet from "../styles/MainStyles";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const SaviorHome = (props) => {
    const screenWidth = Dimensions.get("window").width;
    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100
                ]
            }
        ]
    }
    const data1 = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43],
                color: (opacity = 1) => `rgba(219, 89, 42, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        legend: ["Rainy Days"] // optional
    };
    const data2 = {
        labels: ["Swim", "Run"], // optional
        data: [0.4, 0.8]
    };
    const data3 = [
        {
            name: "Alerts",
            population: 89,
            color: myColors.darkerColor,
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Contacts",
            population: 28,
            color: myColors.mainColor,
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }
    ];
    const commitsData = [
        { date: "2017-01-02", count: 1 },
        { date: "2017-01-03", count: 2 },
        { date: "2017-01-04", count: 3 },
        { date: "2017-01-05", count: 4 },
        { date: "2017-01-06", count: 5 },
        { date: "2017-01-30", count: 2 },
        { date: "2017-01-31", count: 3 },
        { date: "2017-03-01", count: 2 },
        { date: "2017-04-02", count: 4 },
        { date: "2017-03-05", count: 2 },
        { date: "2017-02-30", count: 4 }
    ];
    const chartConfig1 = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={styleSheet.AlertGraphs}>
                <View style={styleSheet.Inline}>
                    <Text style={styleSheet.AlertTitle}>Information</Text>
                    <MaterialCommunityIcons name="information-outline" size={30} color={myColors.secondColor} />
                </View>

                <PieChart
                    data={data3}
                    width={screenWidth}
                    height={100}
                    chartConfig={chartConfig1}
                    accessor={"population"}
                    backgroundColor={'transparent'}
                    paddingLeft={"15"}
                    absolute
                />
            </View>
            <View style={styleSheet.AlertGraphs}>
                <View style={styleSheet.Inline}>
                    <Text style={styleSheet.AlertTitle}>Alerts</Text>
                    <MaterialCommunityIcons name="alert-outline" size={30} color={myColors.secondColor} />
                </View>
                <LineChart
                    data={data1}
                    width={screenWidth} // from react-native
                    height={220}
                    yAxisLabel="$"
                    yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={chartConfig1}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 5,
                        // margin: 10
                    }}
                />
            </View>
        </View>
    );
};

export default SaviorHome;
