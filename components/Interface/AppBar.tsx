import { Link, router } from 'expo-router'
import * as React from 'react'
import { Platform, View } from 'react-native'
import { Appbar, IconButton, Menu } from 'react-native-paper'

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical'

const AppBar = (props: { back?: any | null; title?: string; search?: any; more?: any }) => {

  const [menu, setMenu] = React.useState(false) as any;

  return (
    <View>
      <Appbar.Header style={{ zIndex: 2 }}>
        {props.back ? <Appbar.BackAction disabled={!props.back} onPress={props.back} /> : null}
        {props.title ? <Appbar.Content title={props.title} /> : null}
        <Link href={'/search'}><IconButton icon={'magnify'} /></Link>
        <Link href={'/Discovery'}><IconButton icon={'home'} /></Link>

        <Menu
          visible={menu}
          onDismiss={() => { setMenu(false) }}
          anchor={
            <Appbar.Action icon={MORE_ICON} onPress={() => { setMenu(!menu) }} />
          }>
          <Menu.Item onPress={() => {router.push('https://github.com/adenlall')}} leadingIcon={'information'} title="About" />
          <Menu.Item onPress={() => {router.push('https://github.com/adenlall')}} leadingIcon={'code-braces-box'} title="Developer" />
          <Menu.Item onPress={() => {router.push('https://ar.hooanime.com')}} leadingIcon={'open-in-new'} title="Find out more" />
        </Menu>

      </Appbar.Header>
    </View>
  )
}

export default AppBar
