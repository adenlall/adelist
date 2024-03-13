import { Chip } from 'react-native-paper';

export const ChipHelper = ({ data, label, sublabel, icon }: any) => (
    <>
        {data ? (
            <Chip style={{ margin: 5 }} icon={icon ?? 'ticket-confirmation'} onPress={() => { }}>
                {label} {data} {sublabel}
            </Chip>
        ) : (
            ''
        )}
    </>
);
