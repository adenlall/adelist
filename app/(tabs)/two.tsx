import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from 'react'
import AppBar from '../../components/Interface/AppBar'
import AnimeWide from '../../components/UI/AnimeWide'
import { Kitsu } from '../../utils/Kitsu'
import { ScrollView, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { Link } from 'expo-router'
import ListView from '../../components/UI/ListView'

const Page = () => {
  const [data, setData] = useState([]) as any

  const getMovies = async () => {
    try {
      let dd = []
      const kitsu = new Kitsu('manga')
      const current = await kitsu.getRatedAnimes(5, [['status', 'current']])
      dd.push(current.data)
      const popular = await kitsu.getPopularAnimes(5)
      dd.push(popular.data)
      const animes = await kitsu.getPopularAnimes(5, [['status', 'upcoming']])
      dd.push(animes.data)
      const fins = await kitsu.getAnimes(6,'averageRating',true, [['subtype', 'manhwa']])
      dd.push(fins.data)
      const swqssw = await kitsu.getAnimes(6,'userCount',true, [['subtype', 'novel']])
      dd.push(swqssw.data)
      setData(dd)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getMovies()
  }, [])

  return (
    <ScrollView style={{backgroundColor:useTheme().colors.background}}>
      <AppBar
        title='Home'
        search={() => {
          console.log('searchk')
        }}
        more={() => {
          console.log('moree')
        }}
      />
      <View style={{marginVertical:10}}>
        <Text style={{paddingLeft:20}} variant='titleMedium'>Top Manhwa</Text>
        <ListView
          type='manga'
          data={[
            {
              name: 'Finished',
              icon: '',
              data: [data[3]]
            },
          ]}
        />
      </View>
      <ListDisplay title={'Top Airing Animes'} data={data[0]} />
      <View style={{marginVertical:10}}>
        <Text style={{paddingLeft:20}} variant='titleMedium'>Top Novels</Text>
        <ListView
          type='manga'
          data={[
            {
              name: 'Finished',
              icon: '',
              data: [data[4]]
            },
          ]}
        />
      </View>
      <ListDisplay title={'Most Popular Animes'} data={data[1]} />
      <ListDisplay title={'Top Upcoming Anime'} data={data[2]} />
    </ScrollView>
  )
}
type ListDisplay = {
  title: string
  data: any
}
const ListDisplay = (ListDisplay: {
  data: any[]
  title:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined
}) => (
  <>
    {ListDisplay.data ? (
      <View style={{ marginVertical: 30 }}>
        <Text style={{ marginLeft: 20 }} variant='titleLarge'>
          {ListDisplay.title}
        </Text>
        {ListDisplay.data?.map((item: any, i: number) => (
          <AnimeWide
            type='manga'
            key={i}
            id={item?.id}
            cover={item?.attributes?.coverImage?.large ?? item?.attributes?.posterImage?.large}
            title={item?.attributes?.titles?.en_jp ?? item?.attributes?.titles?.en}
          />
        ))}
      </View>
    ) : (
      ''
    )}
  </>
)
export default Page
