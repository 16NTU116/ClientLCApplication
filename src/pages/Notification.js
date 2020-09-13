import React from 'react';
import {
    View,
    ScrollView,
    Text,
} from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';

// Redux
import { connect } from 'react-redux'
import { receiveOrderClient, sendstatus } from '../store/actions/order-action'

// Structures
import Container from '../components/container';

class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ordersclient: [],
        };
    }

    componentDidMount() {
        const { orderClient, receiveOrderClient, user } = this.props;
        this.setState(() => ({ ordersclient: orderClient || "Nothing to Show" }));

        receiveOrderClient({ clientId: user._id });
    }

    sendOrder = async (item) => {
        const { navigation } = this.props;
        await this.props.sendstatus(item)
        // console.log("Data is Here: ", item)
        setTimeout(() => {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'isLoading' })],
            });
            navigation.dispatch(resetAction)
        }, 1000)
    }

    render() {
        return (
            <View>
                <Text style={{ backgroundColor: '#263238', color: '#fff', padding: 10, fontSize: 30, textAlign: 'center' }}>Notification</Text>
                <ScrollView>
                    {this.state.ordersclient.map((value, index) => (
                        <Container
                            key={index}
                            contents="Order Received"
                            caseId={value._id}
                            clientName={value.clientName}
                            title={value.title}
                            discription={value.discription}
                            status={value.status}
                            showButton={true}
                            sendOrder={this.sendOrder}
                        />
                    ))}
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    orderClient: state.order.receivedOrders,
    user: state.user.client,
});

export default connect(mapStateToProps, { receiveOrderClient, sendstatus })(Notification);