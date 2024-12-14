import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
            <Stack.Screen name="screens/ChatScreen" />
        </Stack>
        // <Stack>
        //     <Stack.Screen 
        //         name="index" 
        //         options={{ headerShown: false }} 
        //     />
        //     <Stack.Screen 
        //         name="login" 
        //         options={{ 
        //             title: 'Connexion',
        //             headerStyle: { backgroundColor: '#6200ee' },
        //             headerTintColor: '#fff'
        //         }} 
        //     />
        //     <Stack.Screen 
        //         name="register" 
        //         options={{ 
        //             title: 'Inscription',
        //             headerStyle: { backgroundColor: '#6200ee' },
        //             headerTintColor: '#fff'
        //         }} 
        //     />
        // </Stack>
    );
}
