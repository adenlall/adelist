import { useTheme } from 'react-native-paper';
import { Image, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const Head = ({ data, cover }: any) => (
    <View style={{ marginTop: 0 }}>
        <Image
            style={{
                zIndex: 0,
                position: 'absolute',
                width: '100%',
                height: 120,
            }}
            source={cover??data?.attributes?.coverImage?.large} />
        <LinearGradient
            colors={[useTheme().colors.elevation.level1, useTheme().colors.elevation.level1]}
            style={{ zIndex: 1, opacity: 0.5, position: 'absolute', width: '100%', height: 200 }} />
        <LinearGradient
            colors={['transparent', useTheme().colors.elevation.level1]}
            style={{ zIndex: 1, position: 'absolute', width: '100%', height: 120 }} />
    </View>
);
