import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import React from "react";
import {APP_FONT_SEMIBOLD} from "../../../const/Fonts";
import {APP_COLOR_BLACK, APP_COLOR_WHITE} from "../../../const/Colors";

const AppButton = (props) => {

  return (
    <View style={styles.buttons}>
      <TouchableOpacity
        style={styles.btnStyle}
        onPress={() => props.onPress()}
      >
        <Text style={styles.buttonText}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );

};

const styles = StyleSheet.create({
  buttons: {
    // paddingLeft: 15,
    // paddingRight: 15,
  },

  btnStyle: {
    marginTop: 30,
    backgroundColor: APP_COLOR_BLACK,
    height: 55,
    justifyContent: 'center',
    borderRadius: 10,
  },

  buttonText: {
    fontSize: 18,
    textAlign: 'center',
    color: APP_COLOR_WHITE,
    fontFamily: APP_FONT_SEMIBOLD
  },
});

export default AppButton;
