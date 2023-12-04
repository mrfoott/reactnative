import { StyleSheet, Text, View } from 'react-native';

const Header = () => {
    return (
        <View style={ styles.container }>
            <Text >This is header</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#16ff41',
        alignItems: 'center',
        marginTop: 100,
        color: '#ff0c18',
        height: 200
    }
})

export default Header