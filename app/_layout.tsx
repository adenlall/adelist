import { Stack } from "expo-router";
import { Provider as PaperProvider, Text } from 'react-native-paper';

export default function AppLayout() {
    return (
        <PaperProvider settings={{ rippleEffectEnabled: true }}>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="search" options={{ headerShown: true }} />
                {/* <Stack.Screen name="screens/Profile/ProfilePopup" options={{ presentation: 'modal', headerShown: false, ...(Platform.OS === 'android' && { animation: 'slide_from_bottom' }) }} /> */}
            </Stack>
        </PaperProvider>
    );
}