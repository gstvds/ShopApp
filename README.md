# The Shop App

## Initial Setup

For the initial setup, we started creating an App with expo init and installing some packages:

```bash
yarn add redux react-redux react-navigation react-navigation-header-buttons react-navigation-drawer react-navigation-tabs react-navigation-stack

expo install react-native-gesture-handler react-native-reanimated
```

First we need to connect react-redux with our app, using createStore, combineReducers and Provider. Then we create our reducer using our dummy-data to provide our initialState

Then, to start with navigation, we create our navigator using createStackNavigator imported from 'react-navigation-stack'
