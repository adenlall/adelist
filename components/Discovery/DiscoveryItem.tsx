import { Image, View } from "react-native";
import * as React from "react";
import { Link } from "expo-router";
import { Text, useTheme } from "react-native-paper";

export default function DiscoveryItem({ SourceImage, Title, Id, type, noMarging, width, height, lines }: any) {
    return (
        <>
            <Link href={"/"+(type??"anime")+"/"+(Id??"")} style={noMarging?{}:{marginLeft: 8, marginBottom: 10}} >
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <Image source={{ uri: SourceImage }} style={{ borderRadius: 10, width: width??110, height: height??160 }} />
                    <View style={{ width: width??110 }}>
                        <Text variant="labelMedium" numberOfLines={lines??0} style={{ marginTop: 5, textAlign: 'center' }}>{Title}</Text>
                    </View>
                </View>
            </Link>
        </>
    );
}