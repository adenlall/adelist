import { Image, StyleSheet, View } from 'react-native'
import { Card, Text, TouchableRipple, useTheme } from 'react-native-paper'
import Badge from './Badge'
import { Link } from 'expo-router'

const AnimeWide = (props: { type?: string; title: string; cover: string; id: number }) => (
  <Card mode='contained' style={styles.card}>
    <TouchableRipple
      style={{ borderRadius: useTheme().roundness }}
      onPress={() => {}}
      rippleColor='rgba(0, 0, 0, .32)'
    >
      <Link style={{ width: '100%' }} href={(props.type ?? 'anime') + '/' + props.id}>
        <Card.Content style={styles.content}>
          <Card.Cover style={styles.cover} source={props.cover} />
          <View style={styles.text}>
            <Text style={{ marginRight: 25 }} variant='bodyLarge' numberOfLines={1}>
              {props.title}
            </Text>
            <Badge />
          </View>
          {/* <IconButton style={{ }} icon={'bookmark-outline'} /> */}
        </Card.Content>
      </Link>
    </TouchableRipple>
  </Card>
)

const styles = StyleSheet.create({
  container: {
    marginVertical: 0,
    flex: 0,
  },
  contentContainer: {
    paddingBottom: 16,
  },
  card: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 0,
  },
  text: {
    flexDirection: 'row',
    width: '90%',
    gap: 5,
    alignContent: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  cover: {
    width: '100%',
    height: 100,
  },
  title: {},
  button: {
    flex: 1,
  },
  group: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    paddingBottom: 8,
  },
})
export default AnimeWide
