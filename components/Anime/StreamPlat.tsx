import { TouchableRipple, useTheme } from 'react-native-paper'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { Link } from 'expo-router'

const plats = [
    {
      name: 'hulu',
      source: 'https://aoi.mediaplacepartners.com/wp-content/uploads/2020/05/hulu-logo-980x980.jpg',
    },
    {
      name: 'amazon',
      source: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1ki4YK.img',
    },
    {
      name: 'crunchyroll',
      source: 'https://steamuserimages-a.akamaihd.net/ugc/1999068878731423889/7ADE1D28B8F034B348705DABF7811A9973815D94/?imw=512&amp;&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=false',
    },
    {
        name:'funimation',
        source:'https://fontmeme.com/images/funimation_logo.png'
    },
    {
        name:'tubi',
        source:'https://i.pinimg.com/originals/35/09/1b/35091b62344787534e492d0a78c076b9.png'
    },
    {
        name:'netflix',
        source:'https://www.thecordcutterlife.com/wp-content/uploads/2017/08/N-icon.png'
    },
    {
        name:'vrv',
        source:'https://m.media-amazon.com/images/I/31PPrqGIHAL._AC_UL800_QL65_.png'
    },
    {
      name:'animelab',
      source:'https://i.vimeocdn.com/video/1678471307-186f9388cd101f7fc4523ed1a675c8f4d09ac08b633dd42da52b184924ce4724-d'
    },
    {
      name:'youtube',
      source:'https://www.absolutegeeks.com/wp-content/uploads/2023/09/YouTube_social_red_square_2017.svg.png'
    }
]

export const StreamPlat = ({ link }: { link: string }) => {
  
  const getSource = () => {
    for (let i = 0; i < plats.length; i++) {
        console.log(i);
      if (link.match(plats[i].name)) {
        console.log('found', plats[i]);
        
        return plats[i].source
      }
    }

    console.log('not found', plats, link);
    return '';
  }

  return (
    <>
      <Link href={link ?? ''}>
        <View
          style={{
            borderRadius: useTheme().roundness * 2,
            ...styles.res,
          }}
        >
          <TouchableRipple
            style={{
              backgroundColor: useTheme().colors.backdrop,
              borderRadius: useTheme().roundness * 2,
              ...styles.res,
            }}
            onPress={() => {}}
            rippleColor='rgba(0, 0, 0, .32)'
          >
            <View
              style={{
                backgroundColor: useTheme().colors.backdrop,
                borderRadius: useTheme().roundness * 2,
                ...styles.res,
              }}
            >
              <ImageBackground
                imageStyle={{ borderRadius: useTheme().roundness * 2 }}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  borderRadius: useTheme().roundness * 2,
                }}
                source={getSource()}
                resizeMode='cover'
              />
            </View>
          </TouchableRipple>
        </View>
      </Link>
    </>
  )
}

const styles = StyleSheet.create({
  res: {
    width: 120,
    height: 120,
  },
})
