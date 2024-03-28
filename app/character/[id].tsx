import { ActivityIndicator, Text, useTheme } from 'react-native-paper'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import AppBar from '../../components/Interface/AppBar'
import { getCharacterById } from './../../api/queries/DiscoveryQueries'
import GetAnime from './../../api/Meta/GetAnime'
import ChacacterHead from '../../components/UI/CharacterHead'
import ScrollAnimes from '../../components/Interface/ScrollAnimes'



export default function Page() {

  const theme = useTheme();

  const navigation = useNavigation();
  navigation.setOptions({ headerShown: false });
  const { id }: any = useLocalSearchParams();

  const GraphQLQuery = getCharacterById;

  const { handleApiCall, apiData } = GetAnime(GraphQLQuery, {
    id: id
  }, "character-" + id) as any;
  const [isLoading, setIsLoading] = useState(true);
  
  const hasFetchedData = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!hasFetchedData.current) {
          await handleApiCall();
          hasFetchedData.current = true;
          setIsLoading(false);
          console.log(apiData?.data?.Character?.media?.edges[0].node);
          
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [GraphQLQuery, handleApiCall, apiData]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.colors.background , margin: 'auto', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <ScrollView style={{ backgroundColor: theme.colors.background }}>
      <AppBar
        more={null}
        search={null}
        title='Character'
        back={() => {
          navigation.goBack()
        }}
      />
      <ChacacterHead data={apiData?.data?.Character} />
      {
        apiData?.data?.Character?.media?.edges ? (
          <View style={{paddingHorizontal:10}}>
            <Text variant="headlineSmall" style={{ textAlign: 'left', marginVertical: 10, marginLeft: 5 }}>Character Apparences</Text>
            <ScrollAnimes data={apiData?.data?.Character?.media?.edges} />
          </View>
        ) : ''
      }
    </ScrollView>
  )
}
const styles = StyleSheet.create({

})
