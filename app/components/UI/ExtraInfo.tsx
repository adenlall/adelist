import { Chip } from 'react-native-paper';
import { ScrollView, View } from 'react-native';

export const ExtraInfo = ({ attr, genres }: any) => (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row', gap: 10, paddingLeft: 10 }}>
        {
            attr?.averageScore?(
                <Chip style={{margin:2}} icon='star' onPress={() => { }}>
                    {Math.floor(attr?.averageScore) ?? 0}%
                </Chip>
            ):''
        }
        <Chip style={{margin:2}} icon='arrow-top-right-thick' onPress={() => { }}>
            {attr?.popularity ?? 0}
        </Chip>
        <Chip style={{margin:2}} icon='heart' onPress={() => { }}>
            {attr?.favourites ?? 0}
        </Chip>
        {
            attr?.isAdult?(
                <Chip style={{margin:2}} icon='account' onPress={() => { }}>
                    Adult
                </Chip>
            ):''
        }
        {
            genres?.map((genre:string)=>(
                <Chip icon={'palette'} style={{margin:2}} onPress={() => { }}>
                    {genre}
                </Chip>
            ))
        }
    </ScrollView>
);
