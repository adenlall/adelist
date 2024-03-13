import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'
import { Kitsu } from '../../utils/Kitsu'
import { StreamPlat } from './StreamPlat'

export const Platforms = ({ anime }: any) => {
  const [data, setData] = useState(false) as any

  const [loading, setLoading] = useState(true) as any

  const getMovies = async () => {
    try {
      const kitsu = new Kitsu()
      const animes = await kitsu.getAnimeStreamers(anime)
      if (animes?.errors) {
        setLoading('error')
        return
      }
      setData(animes.data)
      console.log(animes.data)
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
    return <></>
  } else if (loading) {
    return <ActivityIndicator style={{ margin: 'auto' }} size={20} animating={true} />
  } else if (!data.length) {
    return <></>
  }
  return (
    <>
      <Text variant='titleLarge'>Anime Stremers :</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}>
        {data?.map((item: any, i: number) => (
          <StreamPlat key={i} link={item.attributes.url} />
        ))}
      </View>
    </>
  )
}
