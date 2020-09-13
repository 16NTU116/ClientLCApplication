import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    ScrollView
} from 'react-native';

// import AsyncStorage from '@react-native-community/async-storage';

// Redux
import { connect } from 'react-redux'
import { getPosts } from '../store/actions/post-action'
import { receiveOrderClient } from '../store/actions/order-action'

import SearchBar from '../components/searchBar';
import PostStrcture from '../components/postStructure';
import postImage from "../image/logo.png";

class ClientDashBoard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            post: [],
        };
    }

    navigateToSearch = (searchitem) => {
        setTimeout(() => this.props.navigation.navigate('SearchedPost', { search: searchitem }), 1000);
    }

    navigateToChat = (item) => {
        this.props.navigation.navigate('Chatting', { id: item });
    }


    componentDidMount() {
        const { user, posts, getPosts, receiveOrderClient } = this.props;

        this.setState(() => ({ post: posts || "Nothing to Show" }));

        const item = { id: user._id };
        getPosts(item);
        receiveOrderClient({ clientId: user._id });
    }

    render() {
        console.disableYellowBox = true;
        return (
            <View style={styles.engine}>
                <StatusBar
                    backgroundColor="#000a12"
                    barStyle="light-content"
                />
                <SearchBar search={this.navigateToSearch} />
                <ScrollView>
                    {this.state.post.map((value, index) => (
                        <PostStrcture
                            key={index}
                            caseid={value._id}
                            name={value.name}
                            caseTitle={value.title}
                            caseDetails={value.details}
                            postImage={value.postImage}
                            navigateToChat={this.navigateToChat}
                        />
                    ))}
                </ScrollView>
            </View>
        );
    }
};

const mapStateToProps = state => ({
    posts: state.post.posts,
    user: state.user.client,
});

export default connect(mapStateToProps, { getPosts, receiveOrderClient })(ClientDashBoard);

const styles = StyleSheet.create({
    engine: {
        flex: 1,
        // justifyContent: "center",
        backgroundColor: 'white',
        alignItems: 'center'
    },
    postButton: {
        width: 300,
        height: 45,
        backgroundColor: "#263238",
        marginVertical: 10,
        padding: 10,
        borderRadius: 30,
    },
    postButtonText: {
        color: "white",
        justifyContent: "center",
        textAlign: "center",
        paddingTop: 4
    }
});