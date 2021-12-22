import React from 'react';

import {Text, TouchableOpacity, View} from 'react-native';

const MapScreen = ({value}) => {
    return (
        <View>
            <TouchableOpacity onPress={() => {value=false}}>
                <Text>Here</Text>
            </TouchableOpacity>
        </View>
    );
};

export default MapScreen;
