import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { BottomBarPaper } from '../../layouts/BottomBarPaper'
import AppBar from '../../components/Interface/AppBar'

export const unstable_settings = {
  initialRouteName: 'index',
}

export default function Layout() {
  return (
    <>
      <BottomBarPaper
        safeAreaInsets={{ bottom: 0 }}
        screenOptions={
          {
            // API Reference: https://reactnavigation.org/docs/material-bottom-tab-navigator#options
          }
        }
      >
      <BottomBarPaper.Screen
        name='index'
        options={{
          tabBarLabel: 'Home',
          tabBarIcon(props) {
            return (
              <MaterialCommunityIcons
                color={props.color}
                size={24}
                name={props.focused ? 'home' : 'home-outline'}
              />
            )
          },
        }}
      />
      <BottomBarPaper.Screen
        name='latest'
        options={{
          tabBarLabel: 'Latest',
          tabBarIcon(props) {
            return (
              <MaterialCommunityIcons
                color={props.color}
                size={24}
                name={'history'}
              />
            )
          },
        }}
      />
        <BottomBarPaper.Screen
          name='two'
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
      </BottomBarPaper>
    </>
  )
}
