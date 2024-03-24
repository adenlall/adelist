import { ActivityIndicator, MD2Colors, Searchbar, Text, TouchableRipple } from 'react-native-paper'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import AppBar from '../components/Interface/AppBar'
import { GetMangaById } from '../api/queries/DiscoveryQueries'
import GetAnime from '../api/Meta/GetAnime'
import AnimePoser from '../components/UI/AnimePoster'
import { AnimePoserMeta } from '../components/UI/AnimePosterMeta'
import { ExtraInfo } from '../components/UI/ExtraInfo'
import { Synopsis } from '../components/UI/Synopsis'
import ScrollAnimes from '../components/Interface/ScrollAnimes'
import { Charcters } from '../components/Interface/Characters'
export default function Page() {
  const navigation = useNavigation()
  navigation.setOptions({ headerShown: false })
  const { id }: any = useLocalSearchParams()

  const GraphQLQuery = GetMangaById;

  const { handleApiCall, apiData } = GetAnime(GraphQLQuery, {
    id: id
  }, "manga-"+id+"-gen") as any;
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
    return(
      <View style={{flex:1, margin:'auto', justifyContent:'center', alignItems:'center', alignContent:'center'}}>
        <ActivityIndicator/>
      </View>
    )
  }

  return (
    <ScrollView>
      <AppBar
        more={null}
        search={null}
        title='Manga'
        back={() => {
          navigation.goBack()
        }}
      />

        <View style={styles.poster}>
          <AnimePoser source={apiData?.data?.Media?.coverImage?.extraLarge} />
          <AnimePoserMeta 
            titles={apiData?.data?.Media?.title}
            synonyms={apiData?.data?.Media?.synonyms}
            attr={apiData?.data?.Media}
          />
        </View>
        <ExtraInfo attr={apiData?.data?.Media} genres={apiData?.data?.Media?.genres} />
        <Charcters type={'manga'} id={id} />
        <Synopsis data={apiData?.data?.Media?.description} />
        {
            apiData?.data?.Media?.recommendations?.edges?.length?(
              <View>
                <Text variant="headlineSmall" style={{textAlign: 'left', marginVertical: 10, marginLeft: 5}}>This Manga Recomendation</Text>
                <ScrollAnimes data={apiData?.data?.Media?.recommendations?.edges} type={'manga'} />
              </View>      
            ):''
          }
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  poster: {
    zIndex: 2,
    // flex: 1,
    flexDirection: 'row',
    // justifyContent:'center',
    // alignContent: 'center',
    // alignItems: 'flex-start',
  },
  data: {
    paddingTop: 12,
    flex: 0.95,
  },
  badge: {
    // flex: 1,
    flexDirection: 'row',
    // justifyContent:'center',
    alignContent: 'center',
    alignItems: 'flex-start',
    marginVertical: 5,
  },
})
