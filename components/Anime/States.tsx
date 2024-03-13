import { Chip } from 'react-native-paper';
import { View } from 'react-native';

export const States = ({ data }: any) => (
    <View style={{ flexDirection: 'row', gap: 10, paddingLeft: 10 }}>
        <Chip icon='star' onPress={() => { }}>
            {Math.floor(data?.attributes?.averageRating) ?? 0}%
        </Chip>
        <Chip icon='arrow-top-right-thick' onPress={() => { }}>
            {data?.attributes?.ratingRank ?? 0}
        </Chip>
        <Chip icon='heart' onPress={() => { }}>
            {data?.attributes?.favoritesCount ?? 0}
        </Chip>
        <Chip icon='account' onPress={() => { }}>
            {data?.attributes?.userCount ?? 0}
        </Chip>
    </View>
);
