import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Dimensions,
    StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
// import { navigateToChat } from '../utils/navigationHelper';

const { width } = Dimensions.get('window');

export default function AssistantAI() {
    const [activeCategory, setActiveCategory] = useState('Tout');
    const router = useRouter();

    const categories = [
        { id: '1', name: 'Tout', icon: 'grid-outline' },
        // { id: '2', name: 'Santé', icon: 'medical-outline' },
        // { id: '3', name: 'Sports', icon: 'basketball-outline' },
        { id: '2', name: 'Coding', icon: 'code-slash-outline' },
        { id: '3', name: 'Social Media', icon: 'share-social-outline' },
    ];

    const sections = [
        {
            title: 'Coding',
            icon: 'code-slash-outline',
            items: [
                {
                    name: 'Generer du Code',
                    description: 'Generer du code en fonction de ce que vous voulez',
                    icon: 'code-slash-outline',
                    color: '#000000'
                },
                {
                    name: 'Code Review',
                    description: 'Analyser et améliorer votre code',
                    icon: 'git-branch-outline',
                    color: '#007AFF'
                },
                {
                    name: 'Debug',
                    description: 'Trouver et corriger les bugs',
                    icon: 'bug-outline',
                    color: '#34C759'
                },
                {
                    name: 'Documentation',
                    description: 'Générer de la documentation',
                    icon: 'document-text-outline',
                    color: '#5856D6'
                }
            ]
        },
        {
            title: 'Social Media',
            icon: 'share-social-outline',
            items: [
                {
                    name: 'TikTok',
                    description: 'Générer les hashtags de ma vidéo',
                    icon: 'logo-tiktok',
                    color: '#FF0050'
                },
                {
                    name: 'Facebook',
                    description: 'Créer des légendes engageantes',
                    icon: 'logo-facebook',
                    color: '#336699'
                },
                {
                    name: 'Instagram',
                    description: 'Créer des légendes engageantes',
                    icon: 'logo-instagram',
                    color: '#C13584'
                },
                {
                    name: 'LinkedIn',
                    description: 'Optimiser votre profil',
                    icon: 'logo-linkedin',
                    color: '#0077B5'
                }
            ]
        }
    ];

    const handleCategoryPress = (category) => {
        setActiveCategory(category);
    };

    const filteredSections = sections.filter(section => {
        if (activeCategory === 'Tout') {
            return true; // Affiche toutes les sections
        }
        return section.title === activeCategory; // Affiche uniquement la section correspondante
    });

    const renderCard = ({ item }) => {
        const chatType = item.name.toLowerCase().replace(/ /g, '-');
        
        return (
            <TouchableOpacity 
                style={[styles.card, { backgroundColor: item.color || '#FFFFFF' }]}
                onPress={() => router.push(`/screens/chat/${chatType}`)}
            >
                <View style={styles.cardIconContainer}>
                    <Ionicons name={item.icon} size={28} color={item.color ? '#FFF' : '#000'} />
                </View>
                <Text style={[styles.cardTitle, item.color && { color: '#FFF' }]}>
                    {item.name}
                </Text>
                <Text style={[styles.cardDescription, item.color && { color: '#FFF' }]}>
                    {item.description}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            
            {/* Header amélioré */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Assistant AI</Text>
                <TouchableOpacity style={styles.headerButton}>
                    <Ionicons name="search-outline" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Catégories avec icônes */}
            <View style={styles.categoryWrapper}>
                <FlatList
                    horizontal
                    data={categories}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.categoryButton,
                                activeCategory === item.name && styles.activeCategory
                            ]}
                            onPress={() => handleCategoryPress(item.name)}
                        >
                            <Ionicons 
                                name={item.icon} 
                                size={20} 
                                color={activeCategory === item.name ? '#FFF' : '#000'} 
                            />
                            <Text style={[
                                styles.categoryText,
                                activeCategory === item.name && styles.activeCategoryText
                            ]}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

            {/* Contenu principal */}
            <ScrollView style={styles.mainContent}>
                {filteredSections.map((section, index) => (
                    <View key={index} style={styles.sectionContainer}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.sectionTitleContainer}>
                                <Ionicons name={section.icon} size={24} color="#000" />
                                <Text style={styles.sectionTitle}>{section.title}</Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={styles.seeAllButton}>Voir tout</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            horizontal
                            data={section.items}
                            renderItem={renderCard}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, idx) => `${section.title}-${idx}`}
                        />
                    </View>
                ))}
            </ScrollView>

            {/* Navigation bar améliorée */}
            <View style={styles.navbar}>
                {[
                    { icon: 'home-outline', route: '/screens/dashboard' },
                    { icon: 'grid-outline', route: '/screens/assistantAi' },
                    { icon: 'time-outline', route: '/screens/history' },
                    { icon: 'person-outline', route: '/screens/account' },
                ].map((item, index) => (
                    <TouchableOpacity 
                        key={index}
                        style={styles.navItem}
                        onPress={() => router.push(item.route)}
                    >
                        <Ionicons name={item.icon} size={24} color="#000" />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: '#FFF',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    categoryWrapper: {
        backgroundColor: '#FFF',
        paddingVertical: 15,
        marginBottom: 20,
    },
    categoryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 8,
        borderRadius: 25,        
        backgroundColor: '#F0F0F0',
    },
    activeCategory: {
        backgroundColor: '#000',
    },
    activeCategoryText: {
        color: '#FFF',
    },
    categoryText: {
        marginLeft: 8,
        fontSize: 16,
    },
    card: {
        width: width * 0.4,
        padding: 20,
        marginRight: 15,
        borderRadius: 16,
        elevation: 3,
    },
    cardIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    mainContent: {
        flex: 1,
        paddingTop: 10,
    },
    sectionContainer: {
        marginBottom: 25,
    },

});
