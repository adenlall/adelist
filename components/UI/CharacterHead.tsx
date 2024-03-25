import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native'
import { Chip, Text, useTheme } from 'react-native-paper'
import { Synopsis } from './Synopsis'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Badge from './Badge'
import Markdown from 'react-native-markdown-display'

export default function ChacacterHead({ data }: any) {
    const theme = useTheme();
    return (
        <>
            {/* <TouchableRipple onPress={() => console.log('Pressed')} rippleColor="rgba(0, 0, 0, .32)"> */}
            <View
                style={{ justifyContent: 'center', padding: 10, alignContent: 'center', alignItems: 'center' }}
            >
                <View style={{
                    borderRadius: 100,
                    borderColor: useTheme().colors.elevation.level5,
                    ...styles.main,
                }}
                >
                    <ImageBackground
                        imageStyle={{ borderRadius: 100 }}
                        style={{ flex: 1, borderRadius: 100 }}
                        resizeMode='cover'
                        src={data?.image?.large ?? data?.image?.meduim}
                        source={data?.image?.large ?? data?.image?.meduim}
                    />
                </View>
                <Text variant='titleMedium'>{data?.name?.first ?? data?.name?.full} - {data?.name?.native ?? ''}</Text>
                <Text variant='labelMedium'>{data?.name?.userPreferred ?? data?.name?.native}</Text>
            </View>
            <View>
                <View style={{ margin: 'auto', justifyContent: 'center', alignContent: 'center', flexDirection: 'row' }}>
                    {
                        data?.age ? (
                            <Chip icon={'calendar-range'} style={{ margin: 2 }} onPress={() => { }}>
                                age : 10
                            </Chip>
                        ) : ''
                    }{
                        data?.gender ? (
                            <Chip icon={'gender-male-female'} style={{ margin: 2 }} onPress={() => { }}>
                                Male
                            </Chip>
                        ) : ''
                    }{
                        data?.favourites ? (
                            <Chip icon={'heart'} style={{ margin: 2 }} onPress={() => { }}>
                                10293
                            </Chip>
                        ) : ''
                    }
                </View>
                <View style={{ padding: 10 }}>
                    {
                        data?.description ? (
                            <Markdown>
                                {data?.description}
                            </Markdown>
                        ) : ''
                    }
                </View>
                <View style={{ margin: 'auto', paddingHorizontal: 20, marginVertical: 15, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    {
                        data?.dateOfBirth ? (
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center' }}>
                                <MaterialCommunityIcons
                                    color={useTheme().colors.primary}
                                    size={24}
                                    name={'calendar-today'}
                                />
                                <View style={{ padding: 5 }}></View>
                                <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
                                    <Text variant='labelMedium'>Birthday : </Text>
                                    <Badge notAbs={true} >{data?.dateOfBirth?.year ?? ""} {data?.dateOfBirth?.month ?? "xx"}-{data?.dateOfBirth?.day ?? "xx"} </Badge>
                                </View>
                            </View>
                        ) : ''
                    }{
                        data?.blood ? (
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', alignItems: 'center' }}>
                                <MaterialCommunityIcons
                                    color={useTheme().colors.primary}
                                    size={24}
                                    name={'liquid-spot'}
                                />
                                <View style={{ padding: 5 }}></View>
                                <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text variant='labelMedium'>Blood : </Text>
                                    <Badge notAbs={true} >A+</Badge>
                                </View>
                            </View>
                        ) : ''
                    }
                </View>
            </View>
            {/* </TouchableRipple> */}
        </>
    )
}
const styles = StyleSheet.create({
    main: {
        width: 100,
        height: 100,
        borderWidth: 6,
        paddingHorizontal: 4,
        paddingVertical: 0,
    },
})
