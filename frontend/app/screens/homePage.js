import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
    return (
        <View style={styles.layout}>
            <Text style={styles.text}>Bienvenue sur</Text>
            <Text style={styles.text}>Yoori Bot</Text>
            <View style={styles.connectLayout}>
                <TouchableOpacity style={styles.button}>
                    <Link href="../login">
                        <Text style={styles.buttonText}>Se Connecter</Text>
                    </Link>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonScrib}>
                    <Link href="../register">
                        <Text style={styles.buttonTextScrib}>S'inscrire</Text>
                    </Link>
                </TouchableOpacity>
            
            <Text style={styles.textScrib}>Continuer avec un compte</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    connectLayout: {
        position: 'absolute',
        bottom: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 46,
        fontWeight: 300,     
    },
    textScrib: {
        marginTop: 35,
        fontSize: 16,
        fontWeight: 400, 
    },
    button: {
       borderRadius:50,
        shadowColor: '#ADD8E6',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.7,
        shadowRadius: 10,
        elevation: 5,
        marginTop: 20,
        backgroundColor: '#000000',
        padding: 10,
        width: '90%',
    },
    buttonScrib: {
        marginTop: 15,
        backgroundColor: 'transparent',
        borderColor: '#000000',
        borderWidth: 1,
        padding: 10,
        borderRadius: 50,
        shadowColor: 'blue',
        width: '90%',
    },
    buttonText: {
        color: "#f1f1f1",
        fontSize: 16,
        fontWeight: 500,
        textAlign: 'center',
    },
    buttonTextScrib: {
        color: "#000000",
        fontSize: 16,
        fontWeight: 500,
        textAlign: 'center',
    },
    flexContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: 10,
    },
    flexButton: {
       flex: 1,
    },

});
