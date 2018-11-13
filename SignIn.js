import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Button,
  Text,
  TextInput,
  View,
  Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
const USERNAME = 'USERNAME';
const JWT_TOKEN = 'JWT_TOKEN';

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
    width: '50%',
    padding: 8,
    marginBottom: 20,
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: '#DDD',
    textAlign: 'center'
  }
});

export default class SignIn extends Component {
  state = {
    username: null,
    password: null
  };

  onChangeUsername = text => {
    this.setState({ username: text });
  };

  onChangePassword = text => {
    this.setState({ password: text });
  };

  async componentDidMount() {
    const username = await AsyncStorage.getItem(USERNAME);
    if (username) {
      this.setState({ username });
    }
  }

  signIn = async () => {
    try {
      const { username, password } = this.state;
      await AsyncStorage.setItem(USERNAME, username);
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        })
      });
      console.log('res', res);
      const result = await res.json();
      console.log('result', result);
      if(!result.success) {
        throw new Error(result.error.msg)
      }
      const token = result.token;
      await AsyncStorage.setItem(JWT_TOKEN, token);
      Actions.todoList({
        username: this.state.username,
        title: `Hi, ${this.state.username}`
      });
    } catch (error) {
      console.dir(error)
      Alert.alert('登入失敗', error.message);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Username"
          value={this.state.username}
          style={styles.input}
          onChangeText={this.onChangeUsername}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={this.state.password}
          style={styles.input}
          onChangeText={this.onChangePassword}
          autoCapitalize="none"
        />
        <Button onPress={this.signIn} title="登入" color="blue" />
      </View>
    );
  }
}
