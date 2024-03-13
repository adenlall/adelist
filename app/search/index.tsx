import { ActivityIndicator, Searchbar, Text } from 'react-native-paper'
import { useNavigation, useRouter } from 'expo-router'
import AppBar from '../../components/Interface/AppBar'
import { useEffect, useState } from 'react'
import { Kitsu } from '../../utils/Kitsu'
import ListView from '../../components/UI/ListView'
import Card from '../../components/UI/Card'
import { View } from 'react-native'

export default function Page() {
  const navigation = useNavigation()
  navigation.setOptions({ headerShown: false })

  // useEffect(() => {
  //   navigation.setOptions({ headerShown: false })
  // }, [navigation])

  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false) as any
  const [data, setData] = useState(false) as any

  useEffect(() => {
    setLoading(true)

    const delayDebounceFn = setTimeout(() => {
      if (searchQuery && searchQuery !== '') {
        Search(searchQuery)
      } else {
        setLoading(false)
      }
    }, 2000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  useEffect(() => {
    console.log('Test Loading')

    if (data) {
      console.log('Set to false')

      setLoading(false)
    }
    console.log('Set to none', data)
  }, [data])

  const Search = async (q: string) => {
    try {
      const kitsu = new Kitsu()

      const animes = await kitsu.search(q)

      if (animes?.error) {
        setLoading('error')
        return
      }
      console.log(animes)

      setData(animes.data)
    } catch (error) {
      console.error(error)
      setLoading('error')
      return
    }
  }

  if (loading === 'error') {
    return (
      <Text variant='titleLarge' style={{ margin: 'auto' }}>
        Error with connection!
      </Text>
    )
  }

  return (
    <>
      <AppBar
        more={null}
        search={null}
        title='Search'
        back={() => {
          navigation.goBack()
        }}
      />
      <View style={{ padding: 10, gap: 10 }}>
        <Searchbar placeholder='Search' onChangeText={setSearchQuery} value={searchQuery} />
        {loading ? (
          <ActivityIndicator style={{ margin: 'auto' }} size={60} animating={true} />
        ) : (
          <>
            {searchQuery && data && data.length && searchQuery !== '' ? (
              <ListView
                data={[
                  {
                    name: 'All',
                    icon: 'notification-clear-all',
                    data: [data],
                  },
                ]}
              />
            ) : (
              <>
                {!data.length ? (
                  <>
                    <Card>No Result found</Card>
                  </>
                ) : (
                  ''
                )}
              </>
            )}
          </>
        )}
      </View>
    </>
  )
}
