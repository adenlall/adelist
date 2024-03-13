import * as React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import { Card, IconButton, SegmentedButtons, useTheme } from 'react-native-paper'
import Anime from './Anime'

const ListView = (props: { data: any[]; type?: string }) => {
  const [value, setValue] = React.useState(props.data[0].name)

  function getData(value: string): ArrayLike<any> {
    for (let i = 0; i < props.data.length; i++) {
      const item = props.data[i]
      if (item.name === value) {
        return item.data[0]
      }
    }
    return []
  }

  return (
    <View style={styles.container}>
      {props.data.length - 1 ? (
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={props.data.map((item, i) => {
            return {
              value: item.name,
              label: item.name,
              style: styles.button,
              icon: item.icon,
              showSelectedCheck: true,
            }
          })}
          style={styles.group}
        />
      ) : (
        ''
      )}
      <FlatList
        data={getData(value)}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => {
          return (
            <Anime
              type={props.type ?? 'anime'}
              id={item?.id}
              title={
                item?.attributes?.titles?.en_jp ??
                item?.attributes?.titles?.en ??
                item?.attributes?.titles?.en_us ??
                item?.attributes?.titles?.en_cn ??
                item?.attributes?.titles?.en_kr
              }
              subtitle={
                item?.attributes?.titles?.en ??
                item?.attributes?.titles?.en_jp ??
                item?.attributes?.titles?.en_us ??
                item?.attributes?.titles?.en_cn ??
                item?.attributes?.titles?.en_kr
              }
              cover={item?.attributes?.posterImage?.large ?? ''}
            />
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 16,
  },
  card: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  cover: {
    width: 72,
    height: 72,
  },
  title: {
    flexShrink: 1,
    marginVertical: 0,
  },
  button: {
    flex: 1,
  },
  group: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingBottom: 8,
  },
})

export default ListView
