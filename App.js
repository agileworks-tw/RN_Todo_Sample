/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Router, Stack, Scene } from 'react-native-router-flux';
import TodoList from './TodoList';
import SignIn from './SignIn';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="signIn" component={SignIn} title="Sign In" initial />
          <Scene key="todoList" component={TodoList} title="ToDo List" />
        </Stack>
      </Router>
    );
  }
}

const styles = StyleSheet.create({});
