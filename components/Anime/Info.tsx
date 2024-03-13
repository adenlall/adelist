import { Text, useTheme } from 'react-native-paper';
import Badge from '../UI/Badge';
import { View } from 'react-native';
import { styles } from '../../app/anime/[uid]';

export const Info = ({ data }: any) => (
    <View style={styles.data}>
        <Text
            style={{
                textShadowColor: useTheme().colors.surface,
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 10,
                fontWeight: 800,
            }}
            numberOfLines={2}
            variant='titleMedium'
        >
            {data?.attributes?.titles?.en_jp ?? data?.attributes?.titles?.en}
        </Text>
        <Text numberOfLines={1} variant='bodyMedium'>
            {data?.attributes?.canonicalTitle ?? data?.attributes?.slug?.replace('-', ' ')}
        </Text>
        <View style={{ padding: 5 }} />
        <Text variant='bodyMedium' style={styles.badge}>
            Type : <Badge>{data?.attributes?.subtype ?? 'NaN'}</Badge>
        </Text>
        <Text variant='bodyMedium' style={styles.badge}>
            Status : <Badge>{data?.attributes?.status ?? 'NaN'}</Badge>
        </Text>
        <Text variant='bodyMedium' style={styles.badge}>
            Age Rating : <Badge>{data?.attributes?.ageRating ?? 'NaN'}</Badge>
        </Text>
        <Text variant='bodyMedium' style={styles.badge}>
            Episodes Count : <Badge>{data?.attributes?.episodeCount ?? 'NaN'}</Badge>
        </Text>
        <Text variant='bodyMedium' style={styles.badge}>
            Start Date : <Badge>{data?.attributes?.startDate?.replace(/-/g, ' ') ?? 'NaN'}</Badge>
        </Text>
    </View>
);
