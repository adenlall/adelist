import { ScrollView, View, SafeAreaView, StyleSheet } from "react-native";
import * as React from "react";

import { ActivityIndicator, Button, useTheme, Text } from "react-native-paper";
import AppBar from "../../components/Interface/AppBar";
import { useNavigation } from "expo-router";
import { TrendMovies } from "../../api/queries/BigQueries";
import { Fetch } from "../../helpers/Fetch";
import DiscoveryItem from "../../components/Discovery/DiscoveryItem";

export default function Movies() {

    const navigation = useNavigation();
    navigation.setOptions({ headerShown: false });

    const GraphQLQuery = TrendMovies;

    const theme = useTheme();

    const [page, setPage] = React.useState(1);
    const [reactData, setReactData] = React.useState([]) as any;

    const andata = [] as any;

    const fetchIt = async (GraphQLQ: any, Variables: any, key: any, remeber = 1) => {
        console.log('Fetching...');

        const url = 'https://graphql.anilist.co';
        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        };
        const data = await Fetch.post(url, { query: GraphQLQ, variables: Variables }, options, key ?? Variables?.id, remeber);
        return data
    }

    React.useEffect(() => {
        const fetchData = async () => {
            console.log("DATA SYNC::::::::::::::::::::::::::::::::::::::::::::::");

            try {
                if (1) {
                    const data = await fetchIt(GraphQLQuery, { page: page }, 'trend-movies-' + page, 0) as any;
                    for (let i = 0; i < data?.data?.Page?.media?.length; i++) {
                        andata.push(data?.data?.Page?.media[i]);
                    }
                    setReactData(andata);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [page]);

    return (
        <>
            <AppBar
                more={null}
                search={null}
                title='Movies'
            />
            <SafeAreaView style={{ paddingBottom:65, backgroundColor: theme.colors.background }}>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={{ gap: 8, paddingHorizontal: 2 , paddingBottom:5,  ...styles.grid }}>
                        {
                            reactData?.map((item: any, i: number) => (
                                <DiscoveryItem
                                    width={90}
                                    lines={2}
                                    height={135}
                                    type={'anime'}
                                    noMarging={true}
                                    Id={item?.id}
                                    key={i}
                                    SourceImage={item?.coverImage?.extraLarge ?? item?.coverImage?.large ?? item?.coverImage?.meduim}
                                    Title={item?.title?.romaji ?? item?.title?.english ?? item?.title?.native}
                                />
                            ))
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}



const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    grid: {
        flexDirection: 'row',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        flexWrap: 'wrap',
    }
});