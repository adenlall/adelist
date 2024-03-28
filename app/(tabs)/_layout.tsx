import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { BottomBarPaper } from '../../layout/BottomBarPaper'
import { useTheme } from 'react-native-paper'


export const unstable_settings = {
  initialRouteName: 'index',
}

export default function Layout() {
  return (
      <BottomBarPaper
        safeAreaInsets={{ bottom: 0 }}
        screenOptions={
          {}
        }
      >
      <BottomBarPaper.Screen
        name='Latest'
        options={{
          tabBarLabel: 'Latest',
          tabBarIcon(props) {
            return (
              <MaterialCommunityIcons
                color={props.color}
                size={24}
                name={props.focused ? 'rss-box' : 'rss'}
              />
            )
          },
        }}
      />
      <BottomBarPaper.Screen
        name='Movies'
        options={{
          tabBarLabel: 'Movies',
          tabBarIcon(props) {
            return (
              <MaterialCommunityIcons
                color={props.color}
                size={24}
                name={props.focused ? 'youtube-tv' :'television'}
              />
            )
          },
        }}
      />
      <BottomBarPaper.Screen
        name='Discovery'
        options={{
          tabBarLabel: 'Discovery',
          tabBarIcon(props) {
            return (
              <MaterialCommunityIcons
                color={props.color}
                size={24}
                name={props.focused ? 'account-supervisor-circle' : 'account-supervisor-circle-outline'}
              />
            )
          },
        }}
      />
      <BottomBarPaper.Screen
        name='Manga'
        options={{
          tabBarLabel: 'Manga',
          tabBarIcon(props) {
            return (
              <MaterialCommunityIcons
                color={props.color}
                size={24}
                name={props.focused ? 'book' : 'book-outline'}
              />
            )
          },
        }}
      />
      <BottomBarPaper.Screen
        name='Characters'
        options={{
          tabBarLabel: 'Characters',
          tabBarIcon(props) {
            return (
              <MaterialCommunityIcons
                color={props.color}
                size={24}
                name={props.focused ? 'account-group' : 'account-group-outline'}
              />
            )
          },
        }}
      />
      </BottomBarPaper>
  )
}
