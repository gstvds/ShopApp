import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage
} from "react-native";
import { useDispatch } from "react-redux";

import { Colors } from "../constants/Colors";
import * as authActions from "../store/actions/auth";

const StartupScreen = props => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        props.navigation.navigiate("Auth");
        return;
      }
      const transformedData = JSON.parse(userData); // parses a string in JSON format and converts to a JS object or array
      const { token, userId, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigiate("Auth");
        return;
      }

      props.navigation.navigate("Shop");
      dispatch(authActions.authenticate(userId, token));
      f;
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default StartupScreen;
