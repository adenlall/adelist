import { ActivityIndicator, Searchbar, SegmentedButtons, Text, useTheme } from 'react-native-paper'
import { useNavigation, useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import AppBar from '../components/Interface/AppBar'
import { Fetch } from '../helpers/Fetch'
import { SearchData } from '../api/queries/BigQueries'
import DiscoveryItem from '../components/Discovery/DiscoveryItem'

export default function Page() {
    const navigation = useNavigation()
    navigation.setOptions({ headerShown: false })

    const theme = useTheme();

    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(false) as any
    const [raw, setraw] = useState([]) as any
    const [data, setData] = useState([]) as any
    const [page, setPage] = useState(1) as any
    const [value, setValue] = useState(false) as any

    useEffect(() => {
        setLoading(true)

        const delayDebounceFn = setTimeout(() => {
            if (searchQuery && searchQuery !== '') {
                Search(searchQuery);
            } else {
                setLoading(false)
            }
        }, 2000)

        return () => clearTimeout(delayDebounceFn)
    }, [searchQuery])

    useEffect(() => {
        console.log('Test Loading')

        if (data) {
            console.log('Set to false')

            setLoading(false)
        }
        console.log('Set to none', data)
    }, [data])


    const fetch = async (GraphQLQ: any, Variables: any, key: any, remeber = 1) => {
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

    const Search = async (q: string) => {
        try {

            const data = await fetch(SearchData, { search: q, page: page }, "qeary-" + q.replace(/ /g, '') + "-" + page, 3);
            console.log(data?.data?.Page?.media[0]);

            setData(data?.data?.Page?.media);
            setraw(data?.data?.Page?.media);

        } catch (error) {
            console.error(error)
            setLoading('error')
            return
        }
    }

    const filter = (filter:any) => {
        let filteredArray = raw.filter(function(itm:any){
            return itm.type === filter;
          });
          setData(filteredArray)
    }

    if (loading === 'error') {
        return (
            <Text variant='titleLarge' style={{ margin: 'auto' }}>
                Error with connection!
            </Text>
        )
    }

    return (
        <>
            <AppBar
                more={null}
                search={null}
                title='Search'
            />
            <View style={{ padding: 10, gap: 10, backgroundColor: theme.colors.background, flex: 1 }}>
                <Searchbar placeholder='Search' onChangeText={setSearchQuery} value={searchQuery} />

                {
                    loading ? (
                        <ActivityIndicator style={{ margin: 'auto' }} size={60} animating={true} />
                    ) : (
                        <>
                            {
                                (searchQuery && raw && raw.length && searchQuery !== '') ? (

                                    <ScrollView contentContainerStyle={styles.container}>
                                        <SegmentedButtons
                                            value={value}
                                            onValueChange={setValue}
                                            buttons={[
                                                {
                                                    value: 'ANIME',
                                                    label: 'Anime',
                                                    icon: 'youtube-tv',
                                                    onPress: ()=>{filter('ANIME')}
                                                },
                                                {
                                                    value: 'MANGA',
                                                    label: 'Manga',
                                                    icon: 'book',
                                                    onPress: ()=>{filter('MANGA')}
                                                }
                                            ]}
                                        />
                                        <View style={{ gap: 8, paddingHorizontal: 2, paddingBottom: 5, ...styles.grid }}>
                                            {
                                                data?.map((item: any, i: number) => (
                                                    <DiscoveryItem
                                                        width={90}
                                                        lines={2}
                                                        height={135}
                                                        type={item?.type === 'MANGA' ? 'manga' : 'anime'}
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
                                ) : (
                                    <></>
                                )
                            }

                        </>
                    )
                }



            </View >
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