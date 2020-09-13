import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native';

class Categories extends React.Component {
    render() {
        return (
            <View style={styles.container}>

                <View>
                    <Text style={styles.headingText}>
                        Lawyer's Categories
                    </Text>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Criminal Lawyer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Divorse Lawyer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Family Lawyer</Text>
                </TouchableOpacity>

            </View>
        );
    }
}
export default Categories;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#263238",
    },
    headingText: {
        fontFamily: 'sans-serif',
        fontSize: 30,
        fontWeight: '900',
        color : 'white'
    },
    button: {
        width: 190,
        backgroundColor: '#d3dce8',
        marginVertical: 15,
        paddingVertical: 12,
        borderRadius: 25,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: "black",
        textAlign: "center"
    }
});