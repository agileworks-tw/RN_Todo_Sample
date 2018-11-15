/** @format */

import { AppRegistry } from 'react-native';
import codePush from "react-native-code-push";
import App from './App';
import { name as appName } from './app.json';

const CodePushApp = codePush({
  // options
  updateDialog: false
})(App);

AppRegistry.registerComponent(appName, () => CodePushApp);
