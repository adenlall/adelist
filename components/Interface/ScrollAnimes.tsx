import { ScrollView, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import DiscoveryItem from "../Discovery/DiscoveryItem";
import AnilistDiscoveryGridCall from "../../api/Discovery/DiscoveryAPI";
import { useEffect, useRef, useState } from "react";


export default function ScrollAnimes({data, type}:any) {
    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ScrollView horizontal={true} nestedScrollEnabled={true} showsHorizontalScrollIndicator={false}>
                    {data.map((item:any, index:number) => (
                            <DiscoveryItem
                                type={type??(item?.node?.type==='MANGA'?'manga':'anime')}
                                Id={item?.node?.mediaRecommendation?.id??item?.node?.id}
                                key={index}
                                SourceImage={item?.node?.mediaRecommendation?.coverImage?.extraLarge??item?.node?.mediaRecommendation?.coverImage?.large??item?.node?.mediaRecommendation?.coverImage?.meduim??item?.node?.coverImage?.meduim??item?.node?.coverImage?.large}
                                Title={item?.node?.mediaRecommendation?.title?.romaji ?? item?.node?.mediaRecommendation?.title?.english ?? item?.node?.title?.romaji ?? item?.node?.title?.english}
                            />
                        ))}
                </ScrollView>
        </View>
    )
}