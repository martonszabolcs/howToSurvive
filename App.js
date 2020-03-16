import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import AppNavigator from './src/Navigator';
import {SafeAreaView, StyleSheet, StatusBar, BackHandler, ToastAndroid} from 'react-native';

import rootReducer from './src/redux/reducers/index';
const middlewares = [thunk];
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

class App extends Component {
  handleBackPress = () => {
    ToastAndroid.showWithGravity(
      "Don't cheat! 🙃",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
    return true;
  };
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
