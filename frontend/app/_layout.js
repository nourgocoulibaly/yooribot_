import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen 
                name="index" 
                options={{ headerShown: false }} 
            />
            <Stack.Screen 
                name="login" 
                options={{ 
                    title: 'Connexion',
                    headerStyle: { backgroundColor: '#6200ee' },
                    headerTintColor: '#fff'
                }} 
            />
            <Stack.Screen 
                name="register" 
                options={{ 
                    title: 'Inscription',
                    headerStyle: { backgroundColor: '#6200ee' },
                    headerTintColor: '#fff'
                }} 
            />
        </Stack>
    );
}
