import { Platform } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducers';

let composeEnhancers = compose;
if (__DEV__) {
  // GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
  // GLOBAL.FormData = GLOBAL.originalFormData

  // /* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
  // const installDevTools = require('immutable-devtools');

  // installDevTools(Immutable);

  // Use it if Remote debugging with RNDebugger, otherwise use remote-redux-devtools
  /* eslint-disable no-underscore-dangle */
  composeEnhancers = (
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    || require('remote-redux-devtools').composeWithDevTools
  )({
    name: Platform.OS,
    ...require('../package.json').remotedev,
    // actionCreators,
  });
  /* eslint-enable no-underscore-dangle */
}
const enhancer = composeEnhancers(applyMiddleware());

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, enhancer);
  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(require('./reducers').default);
    });
  }
  return store;
}
