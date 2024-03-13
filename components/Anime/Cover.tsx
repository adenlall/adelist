import { ImageBackground, View } from "react-native"
import { TouchableRipple, useTheme } from "react-native-paper"

export default function Cover({source}:any) {
  return (
    <>
      <View style={{ padding: 10 }}>
        <TouchableRipple
          style={{
            backgroundColor: useTheme().colors.backdrop,
            width: 140,
            height: 229,
            borderRadius: useTheme().roundness * 2,
          }}
          onPress={() => {}}
          rippleColor='rgba(0, 0, 0, .32)'
        >
          <View
            style={{
              backgroundColor: useTheme().colors.backdrop,
              width: 140,
              height: 229,
              borderRadius: useTheme().roundness * 2,
            }}
          >
            <ImageBackground
              imageStyle={{ borderRadius: useTheme().roundness * 2 }}
              style={{ flex: 1, justifyContent: 'center', borderRadius: useTheme().roundness * 2 }}
              source={source}
              resizeMode='cover'
            />
          </View>
        </TouchableRipple>
      </View>
    </>
  )
}
