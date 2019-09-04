import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Button,
  Text,
  TextInput,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
const USERNAME = 'USERNAME';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    backgroundColor: '#fff',
    height: 40,
    padding: 8,
    marginBottom: 20,
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: '#DDD'
  }
});

export default class SignIn extends Component {
  state = {
    username: null
  };

  onChangeText = text => {
    this.setState({ username: text });
    console.log('text', text);
  };

  async componentDidMount() {
    const username = await AsyncStorage.getItem(USERNAME);
    if (username) {
      this.setState({ username });
    }
  }

  signIn = async () => {
    await AsyncStorage.setItem(USERNAME, this.state.username);
    Actions.todoList({
      username: this.state.username,
      title: `Hi, ${this.state.username}`
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Username"
          value={this.state.username}
          style={styles.input}
          onChangeText={this.onChangeText}
        />
        <Button onPress={this.signIn} title="登入" color="blue" />
      </View>
    );
  }
}
