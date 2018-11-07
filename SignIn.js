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
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk';
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

  //Create response callback.
  _responseInfoCallback(error, result) {
    if (error) {
      console.log('Error fetching data: ' + error.toString());
    } else {
      console.log('Success fetching data: ' , result);
      const { name } = result;
      Actions.todoList({
        username: name,
        title: `Hi, ${name}`
      });
    }
  }

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
        <View style={{ paddingVertical: 30 }}>
          <LoginButton
            onLoginFinished={(error, result) => {
              if (error) {
                console.log('login has error: ' + result.error);
              } else if (result.isCancelled) {
                console.log('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then(data => {
                  console.log(data);
                  console.log(data.accessToken.toString());
                  // Create a graph request asking for user information with a callback to handle the response.
                  const infoRequest = new GraphRequest(
                    '/me',
                    null,
                    this._responseInfoCallback
                  );
                  // Start the graph request.
                  new GraphRequestManager().addRequest(infoRequest).start();
                });
              }
            }}
            onLogoutFinished={() => console.log('logout.')}
          />
        </View>
      </View>
    );
  }
}
