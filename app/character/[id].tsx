import { ActivityIndicator } from 'react-native-paper'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import AppBar from '../../components/Interface/AppBar'
import { getCharacterById } from '../api/queries/DiscoveryQueries'
import GetAnime from '../api/Meta/GetAnime'



export default function Page() {

    const navigation = useNavigation()
  navigation.setOptions({ headerShown: false })
  const { id }: any = useLocalSearchParams()

  const GraphQLQuery = getCharacterById;

  const { handleApiCall, apiData } = GetAnime(GraphQLQuery, {
    id: id
  }, "char-"+id) as any;
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



    </ScrollView>
  )
}
const styles = StyleSheet.create({
    
})
