import AppBar from '../../components/Interface/AppBar'
import ListView from '../../components/UI/ListView'
import { useEffect, useState } from 'react'
import { Kitsu } from '../../utils/Kitsu'
import { View } from 'react-native'
import { useTheme } from 'react-native-paper'

const Page = () => {
  const [data, setData] = useState(false) as any

  const getMovies = async () => {
    try {
      let dd = [];
      const kitsu = new Kitsu()

      const animes = await kitsu.getAnimes(20, 'averageRating', true, [['status','current']])
      dd.push([animes.data]);

      const tv = await kitsu.getAnimes(20, 'createdAt', true, [['subtype', 'tv'],['status','current']])
      dd.push([tv.data]);

      const ova = await kitsu.getAnimes(20, 'createdAt', true, [['subtype', 'ova'],['status','current']])
      dd.push([ova.data]);

      const films = await kitsu.getAnimes(20, 'createdAt', true, [['subtype', 'movie'],['status','current']])
      dd.push([films.data])

      setData(dd);
      
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getMovies()
  }, [])

  return (
    <View style={{backgroundColor:useTheme().colors.background}}>
      <AppBar
        title='Latest Anime'
        search={() => {
          console.log('searchk')
        }}
        more={() => {
          console.log('moree')
        }}
      />

      {
      data? (
        <>
        <ListView
          data={[
            {
              name: 'All',
              icon: 'notification-clear-all',
              data: data[0],
            },
            {
              name: 'TV',
              icon: 'television-box',
              data: data[1],
            },
            {
              name: 'OVA',
              icon: 'disc',
              data: data[2],
            },
            {
              name: 'Movies',
              icon: 'movie',
              data: data[3],
            },
          ]}
          />
          </>
      ) : (
        ''
      )}
    </View>
  )
}

export default Page
