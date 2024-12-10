import {Text, View, StyleSheet} from 'react-native'

export default function Dashboard () {
    return (
        <View style={styles.layout}>
            <Text>Ravie de vous voir</Text>
        </View>
    )
} 

const styles = StyleSheet.create ({
    layout: {
        flex: 1,
        justifyContent: 'flex-start',
        width: '100%',
        paddingHorizontal: 30,
    }
})
