import { ActivityIndicator, Button, Text } from 'react-native-paper'
import { Link, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import AppBar from '../../components/Interface/AppBar'
import { useEffect, useState } from 'react'
import { Kitsu } from '../../utils/Kitsu'
import { ScrollView, View } from 'react-native'
import Cover from '../../components/Anime/Cover'
import { StyleSheet } from 'react-native'
import { Head } from '../../components/Anime/Head'
import { Info } from '../../components/Anime/Info'
import Card from '../../components/UI/Card'
import { ChipHelper } from '../../components/UI/ChipHelper'
import { StreamPlat } from '../../components/Anime/StreamPlat'
import { Platforms } from '../../components/Anime/Platforms'

export default function Page() {
  const navigation = useNavigation()
  navigation.setOptions({ headerShown: false })

  const { epData, anime }: any = useLocalSearchParams();
  let episode = {} as any;
  try {
    episode = JSON.parse(epData)
  } catch (error) {
    useRouter().back();
  }
  const [data, setData] = useState(false) as any

  const [loading, setLoading] = useState(true) as any

  const getMovies = async () => {
    try {
      const kitsu = new Kitsu('manga')
      const animes = await kitsu.getAnimeData(anime)
      if (animes?.errors) {
        setLoading('error')
        return
      }
      setData(animes.data)
    } catch (error) {
      console.error(error)
      setLoading('error')
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
        title='Episode'
        back={() => {
          navigation.goBack()
        }}
      />
      <Head
        cover={episode?.thumbnail?.original ?? data?.attributes?.posterImage?.large}
        data={data}
      />
      <View style={styles.container}>
        <Cover source={data?.attributes?.posterImage?.large} />
        <Info data={data} />
      </View>
      <View style={{ padding: 10, gap: 15 }}>
        <Text numberOfLines={2} variant='titleLarge'>
          Chapter {episode?.number} : {episode?.titles?.en ?? episode?.titles?.en_jp}
        </Text>
        <Card>{episode?.synopsis ?? ''}</Card>

        <ScrollView horizontal={true} style={{ flexDirection: 'row', gap: 10 }}>
          <ChipHelper icon={'calendar-range'} data={episode?.airdate} />
          <ChipHelper data={episode?.length} sublabel={'min'} />
          <ChipHelper icon={'film'} data={episode?.seasonNumber} label={'season'} />
          <ChipHelper icon={'gamepad-circle'} data={episode?.number} label={'ch'} />
        </ScrollView>
        <Link href={'/anime/' + anime} style={{ width: '100%' }}>
          <Button mode='contained' style={{ width: '100%' }} onPress={() => {}}>
            Chapter Page
          </Button>
        </Link>
        <Platforms anime={anime} />
      </View>
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
