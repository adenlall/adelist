import { Link } from 'expo-router'
import { styled } from 'nativewind'
import * as React from 'react'
import { ViewProps, View, StyleProp, ViewStyle, StyleSheet } from 'react-native'
import { Avatar, Card, IconButton, TouchableRipple, useTheme } from 'react-native-paper'
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon'
import { ThemeProp } from 'react-native-paper/lib/typescript/src/types'

const LeftContent = (
  props: JSX.IntrinsicAttributes &
    ViewProps &
    React.RefAttributes<View> & {
      icon: IconSource
      size?: number | undefined
      color?: string | undefined
      style?: StyleProp<ViewStyle>
      theme?: ThemeProp | undefined
    }
) => <Avatar.Icon {...props} icon='folder' />

const Anime = (props: { type?:string, id:number, title: string; subtitle: string; cover: string }) => (
  <Link href={(props.type??'anime')+'/'+props.id} style={{width:'100%', paddingHorizontal:20}}>
    <Card mode='contained' style={{width:'100%',...styles.card}}>
      <TouchableRipple
        style={{ borderRadius: useTheme().roundness }}
        onPress={() => {}}
        rippleColor='rgba(0, 0, 0, .32)'
      >
        <Card.Content style={styles.content}>
          <Card.Cover style={styles.cover} source={props.cover} />
          <Card.Title
            title={props.title}
            subtitle={props.subtitle}
            titleVariant='titleMedium'
            style={styles.title}
          />
          <IconButton style={{ right: 0, position: 'absolute' }} icon={'bookmark-outline'} />
        </Card.Content>
      </TouchableRipple>
    </Card>
  </Link>
)

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 16,
  },
  card: {
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

export default Anime
