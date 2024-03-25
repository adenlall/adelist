import {ScrollView, View, RefreshControl, SafeAreaView} from "react-native";
import * as React from "react";


import DiscoveryGrid from "../../components/Discovery/DiscoveryGrid";
import {
    AllTimePopularAnimeQuery,
    AllTimePopularMangaQuery,
    PopularAnimeThisSeasonQuery,
    PopularManhwaQuery,
    trendingAnimeQuery,
    trendingMangaQuery,
    UpcomingAnimeNextSeasonQuery
} from "../api/queries/DiscoveryQueries";

import {useState} from "react";
import { Text, useTheme } from "react-native-paper";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";

export default function Discovery() {
    var CurrentSeason = "Winter 2024";
    var UpcomingSeason = "Spring 2024";

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        // Simulate an asynchronous data fetching process
        // TODO - Implement actual functionality to Refresh GridData - May Need a Rewrite
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    };

    return (
        <SafeAreaView style={{marginTop:24, flex: 1, backgroundColor: useTheme().colors.background}}>
            <ScrollView  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <Text variant="headlineSmall" style={{textAlign: 'left', marginVertical: 10, marginLeft: 5}}>Now Trending Anime</Text>
                <DiscoveryGrid queryName={'trendingAnimeQuery'} GraphQLQuery={trendingAnimeQuery}/>
                <Text variant="headlineSmall" style={{textAlign: 'left', marginVertical: 10, marginLeft: 5}}>Popular This Season - {CurrentSeason}</Text>
                <DiscoveryGrid queryName={'PopularAnimeThisSeasonQuery'} GraphQLQuery={PopularAnimeThisSeasonQuery}/>
                <Text variant="headlineSmall" style={{textAlign: 'left', marginVertical: 10, marginLeft: 5}}>Upcoming Next Season - {UpcomingSeason}</Text>
                <DiscoveryGrid queryName={'UpcomingAnimeNextSeasonQuery'} GraphQLQuery={UpcomingAnimeNextSeasonQuery}/>
                <Text variant="headlineSmall" style={{textAlign: 'left', marginVertical: 10, marginLeft: 5}}>All Time Popular Anime</Text>
                <DiscoveryGrid queryName={'AllTimePopularAnimeQuery'} GraphQLQuery={AllTimePopularAnimeQuery}/>
                {/*End Of Anime Lists - Manga Lists Below*/}
                <Text variant="headlineSmall" style={{textAlign: 'left', marginVertical: 10, marginLeft: 5}}>Now Trending Manga</Text>
                <DiscoveryGrid queryName={'trendingMangaQuery'} GraphQLQuery={trendingMangaQuery}/>
                <Text variant="headlineSmall" style={{textAlign: 'left', marginVertical: 10, marginLeft: 5}}>All Time Popular Manga</Text>
                <DiscoveryGrid queryName={'AllTimePopularMangaQuery'} GraphQLQuery={AllTimePopularMangaQuery}/>
                <Text variant="headlineSmall" style={{textAlign: 'left', marginVertical: 10, marginLeft: 5}}>Popular Manhwa</Text>
                <DiscoveryGrid queryName={'PopularManhwaQuery'} GraphQLQuery={PopularManhwaQuery}/>
            </ScrollView>
        </SafeAreaView>
    )
}