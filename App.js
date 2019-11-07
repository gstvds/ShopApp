import React, { useState } from "react";
import { StatusBar } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import ReduxThunk from "redux-thunk";

import productsReducer from "./src/store/reducers/products";
import cartReducer from "./src/store/reducers/cart";
import ordersReducer from "./src/store/reducers/orders";
import ShopNavigator from "./src/navigation/ShopNavigator";

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./src/assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./src/assets/fonts/OpenSans-Bold.ttf")
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <ShopNavigator />
    </Provider>
  );
}
