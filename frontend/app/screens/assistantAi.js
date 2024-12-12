import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


export default function AssistantAI() {


    // Données pour les catégories et les sections
    const categories = ['Tout', 'Santé', 'Sports', 'Musique'];
    const sections = [
        {
            title: 'Social Media',
            items: [
                { name: 'TikTok', description: 'Générer les hashtags de ma vidéo' },
                { name: 'Telegram', description: 'Générer des canaux populaires dans Telegram' },
                { name: 'Twitter', description: 'Générer mon tweet et hashtags en vogue' },
            ],
        },
        {
            title: 'Santé',
            items: [
                { name: 'Medicine', description: 'Générer un texte pour mes médicaments' },
                { name: 'Maladie', description: 'Générer un texte pour tous les problèmes de maladie' },
                { name: 'Nature', description: 'Générer du texte sur la médecine naturelle' },
            ],
        },
        {
            title: 'Sports',
            items: [
                { name: 'Basketball', description: 'Analyse des performances NBA' },
                { name: 'Football', description: 'Générer des données sur les matchs' },
            ],
        },
    ];

    // Fonction pour gérer les clics
    const router = useRouter();

    const handlePress = (item) => {
        console.log(`${item} sélectionné`);
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => handlePress('Retour')}>
                    <Ionicons name="chevron-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Assistant AI</Text>
            </View>

            {/* Barre de catégories */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryContainer}
            >
                {categories.map((category, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.categoryButton,
                            index === 0 && styles.activeCategory,
                        ]}
                        onPress={() => handlePress(category)}
                    >
                        <Text
                            style={[
                                styles.categoryText,
                                index === 0 && styles.activeCategoryText,
                            ]}
                        >
                            {category}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Contenu principal */}
            <ScrollView style={styles.mainContent}>
                {sections.map((section, sectionIndex) => (
                    <View key={sectionIndex} style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>{section.title}</Text>
                            <Ionicons
                                name="arrow-forward"
                                size={20}
                                color="black"
                                onPress={() => handlePress(section.title)}
                            />
                        </View>
                        {/* Cartes */}
                        <FlatList
                            data={section.items}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => `${sectionIndex}-${index}`}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.card}
                                    onPress={() => handlePress(item.name)}
                                >
                                    <Ionicons name="apps-outline" size={24} color="black" />
                                    <Text style={styles.cardTitle}>{item.name}</Text>
                                    <Text style={styles.cardDescription}>
                                        {item.description}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                ))}
            </ScrollView>

            {/* Navbar */}
            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => router.push('/screens/dashboard')}>
                    <Ionicons name="home-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/screens/assistantAi')}>
                    <Ionicons name="grid-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/screens/history')}>
                    <Ionicons name="time-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/screens/account')}>
                    <Ionicons name="person-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    categoryContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
        height: 60,
        width: '100%',
    },
    categoryButton: {
        marginRight: 10,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#E0E0E0',
        height: 40,
    },
    activeCategory: {
        backgroundColor: '#000000',
    },
    categoryText: {
        fontSize: 14,
        color: '#000',
    },
    activeCategoryText: {
        color: '#FFFFFF',
    },
    mainContent: {
        flex: 1,
        paddingHorizontal: 16,
        marginTop: 0,
        
    },
    sectionContainer: {
        marginBottom: 16,
        marginTop: 8,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    card: {
        width: 120,
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        marginRight: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 8,
        textAlign: 'center',
    },
    cardDescription: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        marginTop: 4,
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
});
