import {Text, View} from "react-native";
import * as React from "react";
import { Storage } from "../helpers/Storage";

export default function AnimeHome() {
    React.useEffect(()=>{
        Storage.reset().then(()=>{
            console.log('Storage Cleared');
        });
    },[])
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Latest!</Text>
        </View>
    );
}