import { Link } from 'expo-router';
import { View, Button, StyleSheet } from 'react-native';
import HomeScreen from './home';

export default function Index() {
    return (
        <View style={styles.container}>
            <HomeScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
});
