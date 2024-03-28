import { ScrollView, View, SafeAreaView, StyleSheet, Image } from "react-native";
import * as React from "react";

import { ActivityIndicator, Button, useTheme, Text } from "react-native-paper";
import AppBar from "../../components/Interface/AppBar";
import { Link, useNavigation } from "expo-router";
import { CharactersQ } from "../../api/queries/BigQueries";
import { Fetch } from "../../helpers/Fetch";
import DiscoveryItem from "../../components/Discovery/DiscoveryItem";

export default function Characters() {

    const navigation = useNavigation();
    navigation.setOptions({ headerShown: false });

    const GraphQLQuery = CharactersQ;

    const theme = useTheme();

    const [page, setPage] = React.useState(1);
    const [reactData, setReactData] = React.useState([]) as any;

    const andata = [] as any;

    const fetchIt = async (GraphQLQ: any, Variables: any, key: any, remeber = 1) => {
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
            try {
                if (1) {
                    const data = await fetchIt(GraphQLQuery, { page: page }, 'chars-' + page, 0) as any;
                    for (let i = 0; i < data?.data?.Page?.characters?.length; i++) {
                        andata.push(data?.data?.Page?.characters[i]);
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
                title='Characters'
            />
            <SafeAreaView style={{ paddingBottom: 65, backgroundColor: theme.colors.background }}>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={{ gap: 8, paddingHorizontal: 2, paddingBottom: 5, ...styles.grid }}>
                        {
                            reactData?.map((item: any, i: number) => (
                                <Link href={"/character/" + item?.id} key={i} style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', margin: 5 }}>
                                    <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                        <Image style={{ width: 88, height: 88, borderRadius: 100 }} source={item?.image?.meduim ?? item?.image?.large} src={item?.image?.meduim ?? item?.image?.large} />
                                        <Text numberOfLines={2} style={{ maxWidth: 88, textAlign: 'center', margin: 'auto' }} ellipsizeMode='clip' >{item?.name?.full ?? item?.name?.first ?? item?.name?.userPreferred ?? item?.name?.native}</Text>
                                    </View>
                                </Link>
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
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    }
});