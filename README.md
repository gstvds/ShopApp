# The Shop App

## Initial Setup

For the initial setup, we started creating an App with expo init and installing some packages:

```bash
yarn add redux react-redux react-navigation react-navigation-header-buttons react-navigation-drawer react-navigation-tabs react-navigation-stack

expo install react-native-gesture-handler react-native-reanimated
```

First we need to connect react-redux with our app, using createStore, combineReducers and Provider. Then we create our reducer using our dummy-data to provide our initialState

Then, to start with navigation, we create our navigator using createStackNavigator imported from 'react-navigation-stack'

In order to create our products screen, we need a product component. We could create this component inside our screen file, but as our product isn't small, we create a separated file to store this component (= ProductItem.js).
To fix our price with two decimal numbers, we can use toFixed(2).

To use custom fonts, we first need to add expo-fonts by installing it

```bash
expo install expo-fonts
```

Then create a constant to store our fonts in a javascript object inside Font.loadAsync. Then, with useState and AppLoading we set our app to start after the font is loaded.

To manage our cart products we will also use redux. So we create a new reducer/action called cart

useReducer is a hook that helps with state managment and we use it when we have connected states or more complex state and dont want to have a bunch of individuals states. It is not redux reducer.
Tip: use useReducer outside of our component so it will no be rendered every time to avoid unecessary recreation of this fuction.
