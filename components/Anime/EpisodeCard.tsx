import { Text, TouchableRipple, useTheme } from 'react-native-paper'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Link } from 'expo-router'

export const EpisodeCard = ({ xdata, id, cover, anime, type }: any) => (
  <>
    {xdata ? (
      <Link href={{
        pathname: "/"+(type??"episode")+"/"+id,
        params: { epData: JSON.stringify(xdata), anime:anime },
      }}>
        <TouchableRipple onPress={() => {}} style={{borderRadius:useTheme().roundness*2}} rippleColor='rgba(0, 0, 0, .32)'>
          <View
            style={{
              backgroundColor: useTheme().colors.backdrop,
              borderRadius: useTheme().roundness * 2,
              ...styles.card,
            }}
          >
            <ImageBackground
              imageStyle={{ borderRadius: useTheme().roundness * 2 }}
              style={{
                flex: 1,
                justifyContent: 'center',
                borderRadius: useTheme().roundness * 2,
              }}
              source={
                xdata?.thumbnail?.original
                  ? xdata?.thumbnail?.original
                  : xdata?.thumbnail?.large ?? cover
              }
              resizeMode='cover'
            >
              <LinearGradient
                colors={[useTheme().colors.primary, useTheme().colors.primary]}
                style={{
                  zIndex: -1,
                  opacity: 0.5,
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius:useTheme().roundness*2
                }}
              />
              <Text variant='titleLarge' style={{ fontWeight: 800, margin: 'auto', color:useTheme().colors.onPrimary }}>
                {type==='chapter'?'Ch':'Ep'} {xdata?.number}
              </Text>
            </ImageBackground>
          </View>
        </TouchableRipple>
      </Link>
    ) : (
      ''
    )}
  </>
)

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 90,
  },
})
