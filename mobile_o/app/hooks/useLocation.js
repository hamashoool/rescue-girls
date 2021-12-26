import { useState, useEffect } from "react";
import * as Location from "expo-location";

export default (callbaack) => {
    const [err, setErr] = useState(null);

    const startWatching = async () => {
        try{
            await Location.requestForegroundPermissionsAsync();

            await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.BestForNavigation,
                    timeInterval: 1000,
                    distanceInterval: 10
                },
                callbaack
            );
        } catch (e) {
            setErr(e);
        }
    };

    useEffect(()=>{
        startWatching();
    }, []);

    return [err];
};