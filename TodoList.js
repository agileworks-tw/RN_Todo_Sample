import React, { Component } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert
} from "react-native";
import firebase, { Notification } from "react-native-firebase";

export default class App extends Component {
  state = {
    inputValue: "",
    todoList: [],
    fcmToken: null
  };

  componentDidMount() {
    this.getFcmToken();
    this.checkMessagingPermission();
    this.notificationListener = firebase
      .notifications()
      .onNotification((notification: Notification) => {
        // Process your notification as required
        console.log("onNotification");
        console.log(notification);
        Alert.alert("推播訊息: " + notification.title, notification.body);
      });
  }

  componentWillUnmount() {
    this.notificationListener();
  }

  getFcmToken = async () => {
    const fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      // user has a device token
      console.log(fcmToken);
      this.setState({ fcmToken });
    } else {
      // user doesn't have a device token yet
    }
  };

  checkMessagingPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      // user has permissions
    } else {
      // user doesn't have permission
      await firebase.messaging().requestPermission();
    }
  };

  _handleTextChange = value => {
    const inputValue = value;
    this.setState(() => ({
      inputValue
    }));
  };

  _handleSendButtonPress = () => {
    if (!this.state.inputValue) {
      return;
    }
    this.setState(prevState => ({
      todoList: [...prevState.todoList, this.state.inputValue],
      inputValue: ""
    }));
  };

  _handleDeleteButtonPress = id => {
    this.setState(prevState => {
      const todoList = prevState.todoList.filter(
        (item, i) => parseInt(id) !== i
      );
      return {
        todoList
      };
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formView}>
          <TextInput
            style={styles.inputForm}
            value={this.state.inputValue}
            onChangeText={this._handleTextChange}
            placeholder="Input todo"
          />
          <Button title="Add" onPress={this._handleSendButtonPress} />
        </View>
        <FlatList
          data={this.state.todoList}
          style={styles.listView}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.todoItem}>
                <Text style={styles.todoText}>{item}</Text>
                <Button
                  title="Delete"
                  onPress={() => {
                    this._handleDeleteButtonPress(index);
                  }}
                  style={styles.deleteButton}
                />
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
    backgroundColor: "#eee"
  },
  formView: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 8
  },
  inputForm: {
    backgroundColor: "#fff",
    width: 320,
    height: 40,
    padding: 8,
    marginBottom: 8
  },
  todoItem: {
    alignItems: "center",
    padding: 8,
    width: 320,
    borderBottomWidth: 1.5,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
    // border: '1 solid #333',
    flex: 1,
    flexDirection: "row"
  },
  todoText: {
    flex: 1
  }
});
