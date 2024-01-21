/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import configureStore from "./src/redux/config/configureStore";
import React from "react";
import { Provider } from "react-redux";
import {decode, encode} from 'base-64'

const store = configureStore();

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

const RNRedux = () => (
  <Provider store = {store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
