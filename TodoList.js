import React, { Component } from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ListView,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const DOMAIN = 'http://localhost:3000';

export default class App extends Component {
  state = {
    inputValue: '',
    todoList: []
  };

  async componentDidMount() {
    const res = await fetch(`${DOMAIN}/api/users/${this.props.username}/tasks`);
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

    const res = await fetch(`${DOMAIN}/api/users/${this.props.username}/tasks/create`, {
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
        <Text style={styles.greeting}>{`${
          this.props.username
        }, 寫下想做的事情吧`}</Text>
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
                <TouchableOpacity
                  onPress={() => {
                    this._handleDeleteButtonPress(item.id);
                  }}
                  style={styles.deleteButton}
                >
                  <Icon name="ios-trash" color="red" size={30} />
                </TouchableOpacity>
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
    paddingTop: 0,
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
    flex: 1,
    flexDirection: 'row'
  },
  todoText: {
    flex: 1
  },
  greeting: {
    padding: 20,
    color: '#555'
  }
});
