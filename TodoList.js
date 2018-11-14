import React, { Component } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Linking
} from "react-native";


export default class App extends Component {
  state = {
    inputValue: "",
    todoList: [],
    geolocation: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.receiveGeolocation);
  }

  receiveGeolocation = geolocation => {
    console.log(geolocation);
    this.setState({ geolocation });
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

  showLocationOnMap = () => {
    const url = `https://www.google.com.tw/maps?q=${
      this.state.geolocation.coords.latitude
    },${this.state.geolocation.coords.longitude}`;
    console.log(url);
    Linking.openURL(url);
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.geolocation ? (
          <Text style={{ marginBottom: 15 }}>
            {`lng: ${this.state.geolocation.coords.longitude}, lat: ${
              this.state.geolocation.coords.latitude
            }`}
          </Text>
        ) : null}
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
        {this.state.geolocation ? (
          <Button
            title="Show Location On Map"
            onPress={this.showLocationOnMap}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
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
