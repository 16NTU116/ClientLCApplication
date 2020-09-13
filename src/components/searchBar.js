import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';

/** Redux */
import { connect } from 'react-redux';
import { searchPosts } from '../store/actions/post-action';


class SearchBar extends Component {

    state = {
        form: {
            search: { value: '' },
            id: { value: '' }
        },
    }

    updateInput = (name, text) => {
        let formCopy = this.state.form;

        formCopy[name].value = text;

        this.setState({
            form: formCopy,
        });
    };

    async submitUser() {
        const { form } = this.state;
        const { searchPosts, user } = this.props;

        let formToSubmit = {};
        
        form['id'].value = user._id;
        // return console.log("Form is: ", form);
        let formCopy = form;

        for (let key in formCopy) {
            formToSubmit[key] = formCopy[key].value;
        }

        const { search } = formToSubmit;

        if (!search) {
            ToastAndroid.show('Fill all credentials', ToastAndroid.LONG);
            return search;
        } else {
            return await searchPosts(formToSubmit);
        }
    }

    render() {

        return (
            <View style={styles.container}>

                <TextInput
                    value={this.state.search}
                    underlineColorAndroid='rgba(0, 0, 0, 0)'
                    style={styles.input}
                    placeholder="Search Discription"
                    onChangeText={text => this.updateInput('search', text)}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.submitUser().then(res =>{
                        console.log("Response is: ", res);
                        if(res != '')
                            this.props.search(this.state.form.search.value);
                    })}
                >
                    <Text style={{ color: "white", justifyContent: "center", textAlign: "center" }}>Search</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.client,
});

export default connect(mapStateToProps, { searchPosts })(SearchBar);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "flex-end",
        flexDirection: "row"
    },
    input: {
        width: 250,
        height: 45,
        backgroundColor: '#d3d3d3',
        marginVertical: 10,
        paddingHorizontal: 16,
        borderColor: "black",
        borderRadius: 30,
        borderColor: "black",
        fontSize: 16,
    },
    button: {
        width: 80,
        height: 45,
        backgroundColor: "#263238",
        marginVertical: 10,
        padding: 10,
        borderRadius: 30,
    },
});