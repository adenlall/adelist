import { ActivityIndicator, Button, Text } from 'react-native-paper'
import { StyleSheet, View } from 'react-native'
import { useEffect, useState } from 'react'
import { Kitsu } from '../../utils/Kitsu'
import { Fetch } from '../../utils/Fetch'
import { EpisodeCard } from './EpisodeCard'

export const Episodes = ({ id, cover, type }: any) => {
  const [data, setData] = useState(false) as any
  const [loading, setLoading] = useState(true) as any
  const [next, setNext] = useState(true) as any

  const getMovies = async () => {
    try {
      const kitsu = new Kitsu(type??'anime')
      const animes = await kitsu.getAnimeEpisodes(id)
      setData(animes.data)
      setNext(animes?.links?.next)
    } catch (error) {
      console.error(error)
    }
  }
  const morefetch = async () => {
    try {
      const fetch = new Fetch()
      const animes = await fetch.use(next)
      for (let i = 0; i < animes.data.length; i++) {
        data?.push(animes.data[i])
      }

      setNext(animes?.links?.next ?? false)
    } catch (error) {
      console.error(error)
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

  const LoadNext = async () => {
    await morefetch()
  }

  if (loading) {
    return <ActivityIndicator style={{ margin: 'auto' }} size={20} animating={true} />
  }
  return (
    <>
      {data?.length ? (
        <>
          <Text variant='titleMedium' style={{ padding: 10 }}>
            Episodes :
          </Text>
          <View style={styles.cont}>
            {data.map((item: any, i: number) => (
              <EpisodeCard key={i} cover={cover} xdata={item.attributes} anime={id} id={item.id} />
            ))}
            {next ? (
              <Button
                onPress={async () => {
                  LoadNext()
                }}
              >
                Load More
              </Button>
            ) : (
              ''
            )}
          </View>
        </>
      ) : (
        ''
      )}
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
