import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Picker } from '@react-native-community/picker';
import { NavigationActions, StackActions } from 'react-navigation';

// Redux
import { connect } from 'react-redux';
import { sendPost } from '../store/actions/post-action';

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: { value: '' },
                id: { value: '' },
                title: { value: '' },
                details: { value: '' },
                contact: { value: '' },
                // avatarSource: { value: '' },
                type: { value: 'Criminal' },
            },
        };
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
        let formToSubmit = {};
        // const name = email.trim();

        form['name'].value = this.props.user.name;
        // return console.log(this.props.user._id);
        form['id'].value = this.props.user._id;

        // return console.log(form);

        let formCopy = form;

        for (let key in formCopy) {
            formToSubmit[key] = formCopy[key].value;
        }
        return await this.props.sendPost(formToSubmit);
    };

    onUploadImage = () => {

        ImagePicker.showImagePicker({}, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // const source = { uri: response.uri };
                const source = response.uri;

                console.log("Picture is", source);
                this.setState({
                    form: {

                    }
                });
            }
        });
    }
    getnavigate() {
        const { navigation } = this.props;
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'drawerApp' })],
        });
        navigation.dispatch(resetAction);
    }

    creaetePost = () => {
        this.props.navigation.navigate("Dashboard");
    }

    render() {
        console.disableYellowBox = true;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <TextInput
                        value={this.state.title}
                        underlineColorAndroid='rgba(0, 0, 0, 0)'
                        style={styles.input}
                        placeholder="Enter Case Title"
                        onChangeText={text => this.updateInput('title', text)}
                    />
                    <TextInput
                        placeholder="Enter Case Details"
                        multiline={true}
                        numberOfLines={10}
                        value={this.state.details}
                        underlineColorAndroid='rgba(0, 0, 0, 0)'
                        style={styles.input}
                        onChangeText={text => this.updateInput('details', text)}

                    />
                    <TextInput
                        value={this.state.contact}
                        underlineColorAndroid='rgba(0, 0, 0, 0)'
                        style={styles.input}
                        placeholder="Enter Contact Number"
                        keyboardType="phone-pad"
                        onChangeText={text => this.updateInput('contact', text)}
                    />
                    <View style={styles.dropdown}>
                        <Picker
                            selectedValue={this.state.form.type.value}
                            style={{ height: 50, width: "100%" }}
                            prompt="Type"
                            onValueChange={(itemValue) =>
                                this.updateInput('type', itemValue)
                            }>
                            <Picker.Item label="Criminal" value="criminal" />
                            <Picker.Item label="Divorce" value="divorce" />
                            <Picker.Item label="Consultant" value="consultant" />
                            <Picker.Item label="Other" value="other" />
                        </Picker>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                        <Image style={styles.image} source={this.state.avatarSource || require('../image/noimage.png')}></Image>
                        <TouchableOpacity
                            style={styles.uploadButton}
                            onPress={this.onUploadImage}
                        >
                            <Text style={{ fontSize: 12 }, styles.buttonText}>Upload</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            this.submitUser().then(() => {
                                setTimeout(() => {
                                    this.getnavigate()
                                }, 1000)
                            })
                        }
                        }
                    >
                        <Text style={styles.buttonText}>Create Post</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.client,
});

export default connect(mapStateToProps, { sendPost })(CreatePost);

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        width: "88%",
        backgroundColor: 'rgba(255, 255, 255, 1.8)',
        marginVertical: 10,
        paddingHorizontal: 16,
        borderColor: "#303331",
        borderRadius: 25,
        fontSize: 16,
        borderWidth: 1,
        textAlignVertical: "top",
        marginStart: "6%",
        marginEnd: "6%"
    },
    button: {
        width: 300,
        backgroundColor: '#000a12',
        marginVertical: 10,
        paddingVertical: 12,
        borderRadius: 25,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: "#ffffff",
        textAlign: "center"
    },
    button: {
        width: "60%",
        backgroundColor: "#263238",
        marginVertical: 40,
        paddingVertical: 12,
        borderRadius: 25,
        marginStart: "20%",
        marginEnd: "20%"
    },
    uploadButton: {
        width: "44%",
        backgroundColor: "#263238",
        paddingVertical: 6,
        borderRadius: 25,
        paddingTop: 15,
        height: 'auto',
        marginStart: "10%",
        marginEnd: "10%"
    },
    image: {
        width: "16%",
        height: 50,
        marginRight: 30,
        alignItems: 'center',
        marginStart: "10%",
        marginEnd: "10%"
    },
    dropdown: {
        marginStart: "6%",
        marginEnd: "6%"
    }
});