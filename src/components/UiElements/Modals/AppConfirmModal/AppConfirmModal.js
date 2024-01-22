import {Dimensions, Image, Modal, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import React from "react";
import {APP_FONT_REGULAR, APP_FONT_SEMIBOLD} from "../../../../const/Fonts";
import {APP_COLOR_BLACK, APP_COLOR_LIGHT_BLACK_12, APP_COLOR_WHITE} from "../../../../const/Colors";

const {width, height} = Dimensions.get('window');

const AppConfirmModal = (props) => {

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.visible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={{position: 'absolute', right: 20, top: 20}}
            onPress={() => props.onClose()}
          >
            <Image
              source={require('../../../../assests/close2.png')}
            />
          </TouchableOpacity>
          <Text style={styles.modalText}>{props.message}</Text>
          <View style={{
            flexDirection: 'row',
            width: '100%',
            height: 40,
            justifyContent: 'center',
            marginTop: 10,
          }}>
            <TouchableHighlight
              style={{
                ...styles.openButton,
                backgroundColor: APP_COLOR_BLACK,
                marginRight: 10,
              }}
              onPress={() => {
                props.onYes();
              }}
            >
              <Text style={styles.textStyle}>{props.try ? 'Retry' : 'Yes'}</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{
                ...styles.openButton,
                backgroundColor: APP_COLOR_BLACK,
              }}
              onPress={() => {
                props.onNo();
              }}
            >
              <Text style={styles.textStyle}>{props.try ? 'Close' : 'No'}</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );

};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: APP_COLOR_LIGHT_BLACK_12
  },
  modalView: {
    margin: 20,
    backgroundColor: APP_COLOR_WHITE,
    borderRadius: 10,
    padding: 35,
    shadowColor: APP_COLOR_BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxWidth: width - 80
  },
  openButton: {
    backgroundColor: APP_COLOR_BLACK,
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    flex: 1
  },
  textStyle: {
    color: APP_COLOR_WHITE,
    fontFamily: APP_FONT_SEMIBOLD,
    textAlign: "center"
  },
  modalText: {
    marginTop: 5,
    marginBottom: 15,
    textAlign: "center",
    fontFamily: APP_FONT_REGULAR
  }
});

export default AppConfirmModal;
