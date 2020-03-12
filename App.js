import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import 'react-native-gesture-handler';
import {createStackNavigator} from 'react-navigation-stack';
import {Provider} from 'react-redux';
import Homescreen from './components/pages/Home';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
import editProduct from './components/pages/Product/editProduct';
import addProduct from './components/pages/Product/addProduct';
import Cart from './components/pages/Cart';
import Payment from './components/pages/Cart/Payment';
import filterProduct from './components/pages/Product/filterProduct';

import store from './components/redux/store';

const homeNavigator = createStackNavigator({
  Home: {
    screen: Homescreen,
    navigationOptions: {
      header: null,
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  Dashboard: Dashboard,
  editProduct: editProduct,
  addProduct: addProduct,
  Cart: Cart,
  Payment: Payment,
  Filter: filterProduct,
});

const AppNavigator = createSwitchNavigator({
  Home: homeNavigator,
});

const AppContainer = createAppContainer(AppNavigator);
console.disableYellowBox = true;
function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

export default App;
