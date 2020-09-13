import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import SearchBar from '../components/searchBar';
import PostStrcture from '../components/postStructure';
// import postImage from "../image/logo.png";

// Redux
import { connect } from 'react-redux'
import { getAssignedPosts } from '../store/actions/post-action'

class AssignedCase extends Component {
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

    async componentDidMount() {
        const { user, posts, getAssignedPosts } = this.props;

        this.setState(() => ({ post: posts || "Nothing to Show" }));

        const item = { id: user._id };
        getAssignedPosts(item);
    }

    render() {
        return (
            <View style={styles.engine}>
                <StatusBar
                    backgroundColor="#000a12"
                    barStyle="light-content"
                />
                <SearchBar search={this.navigateToSearch} />
                <ScrollView>
                    {this.state.post.map((value, index) => (
                        <PostStrcture key={index}
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
    posts: state.post.assignedPosts,
    user: state.user.client,
});

export default connect(mapStateToProps, { getAssignedPosts })(AssignedCase);

const styles = StyleSheet.create({
    engine: {
        flex: 1,
        // justifyContent: "center",
        backgroundColor: 'white',
        alignItems: 'center'
    },
});
