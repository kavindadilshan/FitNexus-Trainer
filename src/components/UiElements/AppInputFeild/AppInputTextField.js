import {StyleSheet, TextInput, View} from "react-native";
import React from "react";
import {APP_FONT_MEDIUM} from "../../../const/Fonts";
import {APP_COLOR_BLACK, APP_COLOR_LIGHT_GRAY_3, APP_COLOR_RED, APP_COLOR_WHITE} from "../../../const/Colors";

const AppInputTextField = (props) => {

  return (
    <View style={{marginTop: 10}}>
      <View style={{
        minHeight: 55,
        borderColor: props.invalid ? APP_COLOR_RED : APP_COLOR_LIGHT_GRAY_3,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: APP_COLOR_WHITE,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
      }}>
        <TextInput
          placeholderTextColor={APP_COLOR_LIGHT_GRAY_3}
          onChangeText={(value) => props.onChangeText(value)}
          value={props.value}
          style={styles.input}
          keyboardType={props.keyboardType}
          placeholder={props.title}
          password={props.password}
          secureTextEntry={props.password}
        />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({

  input: {
    flex: 1,
    paddingLeft: 20,
    fontSize: 15,
    fontFamily: APP_FONT_MEDIUM,
    alignItems: 'center',
    color: APP_COLOR_BLACK,
  },
});

export default AppInputTextField;
