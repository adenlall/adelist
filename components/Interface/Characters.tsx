import { ActivityIndicator, Avatar, Button, Card, Text } from 'react-native-paper'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { getAnimeChacters, getMangaChacters } from '../../app/api/queries/DiscoveryQueries';
import GetAnime from '../../app/api/Meta/GetAnime';

export const Charcters = ({ id, type='anime' }: any) => {

    const GraphQLQuery = type==='anime'?getAnimeChacters:getMangaChacters;

    const { handleApiCall, apiData } = GetAnime(GraphQLQuery, {
        id: id
    }, type+"-"+id+"-chars", 1) as any;
    const [isLoading, setIsLoading] = useState(true);
    const hasFetchedData = useRef(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!hasFetchedData.current) {
                    await handleApiCall();
                    hasFetchedData.current = true;
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        
    }, [GraphQLQuery, handleApiCall, apiData]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, margin: 'auto', justifyContent: 'center', alignItems: 'center', alignContent: 'center', paddingVertical:20 }}>
                <ActivityIndicator />
            </View>
        )
    }


    return (
        <>
            <View style={{ padding:15, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ScrollView horizontal={true} nestedScrollEnabled={true} showsHorizontalScrollIndicator={false}>
                    {apiData?.data?.Media?.characters?.edges?.map((item: any, index: number) => (
                        <View style={{ justifyContent:'center', alignContent:'center', alignItems:'center', margin:5 }}>
                            <Image style={{width:55, height:55, borderRadius: 30}} key={index} source={item?.node?.image?.meduim??item?.node?.image?.large} src={item?.node?.image?.meduim??item?.node?.image?.large} />
                            <Text style={{maxWidth:55, height:15, textAlign:'center', margin:'auto'}} ellipsizeMode='clip' >{item?.node?.name?.first??item?.node?.name?.last??item?.node?.name?.userPreferred??item?.node?.name?.native}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    cont: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        justifyContent: 'center',
        marginBottom: 20,
    },
})
