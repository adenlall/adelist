import { Stack } from 'expo-router/stack';
import {Platform} from "react-native";
import { PaperProvider, Text } from 'react-native-paper';

export default function AppLayout() {
    return (
        <PaperProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="index" options={{ headerShown: false }}  />
                <Stack.Screen name="search" options={{ headerShown: true }}  />
                <Stack.Screen name="screens/Profile/ProfilePopup" options={{presentation: 'modal', headerShown: false , ...(Platform.OS === 'android' && {animation: 'slide_from_bottom'})}}/>
            </Stack>
        </PaperProvider>
    );
}