import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import React from 'react';
import store from './src/store/index'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { Provider } from "react-redux";

const appRedux = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(appRedux));