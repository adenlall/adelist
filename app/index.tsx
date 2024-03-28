import React from "react";
import { View, StyleSheet } from "react-native";
import HandleAnilistAuthButton from "./../api/Authentication/HandleAnilistAuth";
import { Link } from "expo-router";
import { Storage } from "../helpers/Storage";
import { Button, Text, useTheme } from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { LinearGradient } from "expo-linear-gradient";


export default function Index() {

    const theme = useTheme();
    Storage.reset()

    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            {/* <StatusBar style="light" /> */}
            {/* <ImageBackground source={require('../assets/images/storm.jpg')} style={{ flex: 1 }} blurRadius={5}> */}
            {/* Add the centered box here */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5 }}>
                <View style={{ width: '90%', height: '90%', gap: 15, padding: 0, backgroundColor: theme.colors.onSecondary, borderWidth: 5, borderColor: theme.colors.secondary, borderRadius: 15 }}>
                    <View style={{ padding: 0 }}>
                        <Text style={{ textAlign: 'center', padding: 10 }} variant="headlineLarge">Browes and Track your Animes</Text>
                        <View style={{ padding: 10, ...styles.block}}>
                            <View style={{ backgroundColor: theme.colors.secondary, ...styles.item }}></View>
                            <View style={{ backgroundColor: theme.colors.secondary, ...styles.item }}></View>
                            <View style={{ backgroundColor: theme.colors.secondary, ...styles.item }}></View>
                            <View style={{ backgroundColor: theme.colors.secondary, ...styles.item }}></View>
                        </View>
                        <LinearGradient style={{ height: 110, position: 'absolute', bottom: -15, width: '100%', opacity: 1, margin: 0, padding: 0 }} colors={["#00000000", theme.colors.secondary, theme.colors.secondary]} />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', width:'100%', gap:10, alignContent:'center', backgroundColor: theme.colors.secondary, alignItems: 'center' }}>
                        <Link href={'/Discovery'}>
                            <Button mode="contained-tonal">Discover</Button>
                        </Link>
                        <HandleAnilistAuthButton />
                    </View>
                </View>
            </View>
            {/* </ImageBackground> */}
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        gap: 15
    },
    item: {
        width: '44%',
        height: 140,
        borderRadius: 10
    }
})