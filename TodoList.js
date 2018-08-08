import React, { Component } from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ListView
} from 'react-native';

const DOMAIN = 'http://localhost:3000';
const USERNAME = 'React-Native';

export default class App extends Component {
  state = {
    inputValue: '',
    todoList: []
  };

  async componentDidMount() {
    const res = await fetch(`${DOMAIN}/api/users/${USERNAME}/tasks`);
    const result = await res.json();
    this.setState({ todoList: result.tasks });
  }

  _handleTextChange = value => {
    console.log('change');
    const inputValue = value;
    this.setState(() => ({
      inputValue
    }));
  };

  _handleSendButtonPress = async () => {
    if (!this.state.inputValue) {
      return;
    }

    const data = {
      title: this.state.inputValue,
      completed: false
    };

    const res = await fetch(`${DOMAIN}/api/users/${USERNAME}/tasks/create`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    this.setState(
      prevState => ({ todoList: [...prevState.todoList, result.task] }),
      () => {
        this.setState({ inputValue: null });
      }
    );
  };

  _handleDeleteButtonPress = async id => {
    const res = await fetch(`${DOMAIN}/api/task/${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await res.json();
    console.log('result', result);
    // this.setState(prevState => ({ todoList: [...prevState.todoList, result.task ]}));
    this.setState(prevState => {
      const todoList = prevState.todoList.filter(
        (item, i) => `${id}` !== `${item.id}`
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
          keyExtractor={item => `${item.id}`}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.todoItem}>
                <Text style={styles.todoText}>{item.title}</Text>
                <Button
                  title="Delete"
                  onPress={() => {
                    this._handleDeleteButtonPress(item.id);
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    backgroundColor: '#eee'
  },
  formView: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 8
  },
  inputForm: {
    backgroundColor: '#fff',
    width: 320,
    height: 40,
    padding: 8,
    marginBottom: 8
  },
  todoItem: {
    alignItems: 'center',
    padding: 8,
    width: 320,
    borderBottomWidth: 1.5,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    // border: '1 solid #333',
    flex: 1,
    flexDirection: 'row'
  },
  todoText: {
    flex: 1
  }
});
