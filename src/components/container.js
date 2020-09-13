import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    Button,
    ScrollView,
    Image,
    View
} from 'react-native';

class Card extends React.Component {
    render() {
        this.state = {

        }
        return (
            <View>
                <Text style={styles.headingText}>{this.props.contents}</Text>
                <View style={styles.container}>

                        <Text style={styles.name}>{this.props.clientName}</Text>
                        <Text style={styles.name}>{this.props.title}</Text>
                        <Text style={styles.name}>{this.props.discription}</Text>
                        <Text style={styles.name}>{this.props.status}</Text>

                    {this.props.showButton && this.props.status === "pending" ?
                        <View style={styles.innerView}>
                            <TouchableOpacity
                                style={styles.chatButton}
                                onPress={() => this.props.sendOrder({status: "Rejected", id: this.props.caseId})}
                            >
                                <Text style={styles.chatButtonText}>Reject</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.orderButton}
                                onPress={() => this.props.sendOrder({status: "Accepted", id: this.props.caseId, person: "client"})}
                            >
                                <Text style={styles.chatButtonText}>Accept</Text>
                            </TouchableOpacity>
                        </View> : null}
                </View>
            </View >
        );
    }
}

export default Card;

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-end",
        borderColor: "black",
        padding: 18,
        borderWidth: 1,
        justifyContent: 'center',
        paddingLeft: 20,
        width: '90%',
        flexGrow: 1,
        marginLeft: 20,
        padding: -50
    },
    name: {
        fontSize: 20,
        color: 'black'
    },
    headingText: {
        fontFamily: 'sans-serif',
        fontSize: 20,
        fontWeight: '900',
        color: 'black',
        marginHorizontal: 70,
    },
    innerView: {
        flexDirection: 'row',
        marginBottom: -5
    },
    chatButton: {
        flex: 1,
        backgroundColor: '#B80F0A',
        padding: 5,
        marginStart: -18,
        // marginEnd: -8,
        marginBottom: -12,
        borderBottomStartRadius: 5,
        borderBottomEndRadius: 5,
    },
    orderButton: {
        flex: 1,
        backgroundColor: '#39FF14',
        padding: 15,
        // marginStart: -18,
        marginBottom: -8,
        justifyContent: 'center',
        borderBottomStartRadius: 5,
        borderStartWidth: 2,
        borderBottomEndRadius: 5,
        borderStartColor: '#000',
    },
    chatButtonText: {
        textAlign: 'center',
        fontSize: 15,
        color: '#fff'
    },
});