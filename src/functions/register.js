import React, { Component } from 'react';
import {
    View,
    StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import { getposts } from '../actions/authActions';

class Middlecomponent extends Component {

    componentDidMount(){
        this.props.getposts();
        console.warn("authActions")
    }
    getnavigate(){
      this.props.nanavigation.navigate('Dashboard');
    }

    render() {
        return (
            <View>
                <StatusBar
                    backgroundColor="#000a12"
                    barStyle="light-content"
                />  
                {this.getnavigate()}
            </View>
        );
    }
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {getposts})(Middlecomponent);



