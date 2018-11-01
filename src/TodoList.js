import React, { Component } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TextInput,
  Button
} from "react-native";
import ListItem from "./ListItem";

export default class App extends Component {
  state = {
    inputValue: "",
    todoList: [],
    enableScrolling: true
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
    console.log(this.state.todoList);
    this.setState(prevState => {
      const todoList = prevState.todoList.filter(
        (item, i) => parseInt(id) !== i
      );
      console.log("after", todoList);
      return {
        todoList
      };
    });
  };

  setEnableScrolling = status => {
    this.setState({ enableScrolling: status });
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
          renderItem={({ item, index }) => (
            <ListItem
              item={item}
              delete={() => {
                console.log(index);
                this._handleDeleteButtonPress(index);
              }}
              setEnableScrolling={this.setEnableScrolling}
            />
          )}
          keyExtractor={(item, index) => `${item}`}
          scrollEnabled={this.state.enableScrolling}
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
  listView: {
    // backgroundColor: 'blue'
  }
});
