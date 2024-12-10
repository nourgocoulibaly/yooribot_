import { Link } from 'expo-router';
import { View, Button, StyleSheet } from 'react-native';

export default function Index() {
    return (
        <View style={styles.container}>
            <Link href={{ pathname: 'login' }} asChild>
                <Button title="Se connecter" />
            </Link>
            <Link href={{ pathname: 'register' }} asChild>
                <Button title="S'inscrire" />
            </Link>
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
