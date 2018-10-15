/** @format */
import React from 'react';
import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import TodoList from './containers/TodoList';

import {name as appName} from '../app.json';

export const store = configureStore();

const App = () => (
  <Provider store={store}>
    <TodoList />
  </Provider>
);

AppRegistry.registerComponent(appName, () => App);
