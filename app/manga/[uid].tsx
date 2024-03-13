import { ActivityIndicator, MD2Colors, Searchbar, Text, TouchableRipple } from 'react-native-paper'
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import AppBar from '../../components/Interface/AppBar'
import { useEffect, useState } from 'react'
import { Kitsu } from '../../utils/Kitsu'
import { ImageBackground, ScrollView, View } from 'react-native'
import Cover from '../../components/Anime/Cover'
import { StyleSheet } from 'react-native'
import { Head } from '../../components/Anime/Head'
import { Info } from '../../components/Anime/Info'
import { States } from '../../components/Anime/States'
import { Synopsis } from '../../components/Anime/Synopsis'
import { Episodes } from '../../components/Anime/Episodes'
import { Chapters } from '../../components/Manga/Chapters'

export default function Page() {
  const navigation = useNavigation()
  navigation.setOptions({ headerShown: false })
  const { uid }: any = useLocalSearchParams()
  const [data, setData] = useState(false) as any

  const [loading, setLoading] = useState(true) as any

  const getMovies = async () => {
    try {
      const kitsu = new Kitsu('manga')
      const animes = await kitsu.getAnimeData(uid)

      if (animes?.error) {
        setLoading('error')
        return
      }
      setData(animes.data)
    } catch (error) {
      console.error(error)
      setLoading('error')
      return
    }
  }

  useEffect(() => {
    getMovies()
  }, [])

  useEffect(() => {
    if (data) {
      setLoading(false)
    }
  }, [data])

  if (loading === 'error') {
    return (
      <Text variant='titleLarge' style={{ margin: 'auto' }}>
        Error with connection!
      </Text>
    )
  } else if (loading) {
    return <ActivityIndicator style={{ margin: 'auto' }} size={60} animating={true} />
  }
  return (
    <ScrollView>
      <AppBar
        more={null}
        search={null}
        title='Anime'
        back={() => {
          navigation.goBack()
        }}
      />
      <Head data={data} />
      <View style={styles.container}>
        <Cover source={data?.attributes?.posterImage?.large} />
        <Info data={data} />
      </View>
      <States data={data} />
      <Synopsis data={data?.attributes?.synopsis} />
      <Chapters id={uid} cover={data?.attributes?.posterImage?.large} />
    </ScrollView>
  )
}
export const styles = StyleSheet.create({
  container: {
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
