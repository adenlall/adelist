import { JSXElementConstructor, ReactElement } from 'react'
import { StyleSheet, Text } from 'react-native'
import { TouchableRipple, useTheme } from 'react-native-paper'
type CardType = {
    children:string|null|undefined
}
export default function Card({children}:CardType) {
  const theme = useTheme()
  if (!children) {
    return <></>
  }
  return (
    <>
      <TouchableRipple onPress={()=>{}} style={{borderRadius:theme.roundness*2}} rippleColor="rgba(0, 0, 0, .32)">
        <Text
          style={{
            borderRadius: theme.roundness*2,
            backgroundColor: theme.colors.onPrimary,
            color: theme.colors.primary,
            fontSize: 13,
            ...styles.main,
          }}
        >
          {children}
        </Text>
      </TouchableRipple>
    </>
  )
}
const styles = StyleSheet.create({
  main: {
    padding:5
  },
})
