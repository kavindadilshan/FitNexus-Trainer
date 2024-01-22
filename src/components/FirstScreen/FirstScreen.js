import React, { Component } from 'react';
import { Dimensions, Image, ImageBackground, SafeAreaView, StatusBar, Platform } from 'react-native';
import { APP_COLOR_WHITE } from "../../const/Colors";
import { StorageUtil } from "../../util/StorageUtil";
import {
  STORAGE_KEY_ACCESS_TOKEN,
  STORAGE_KEY_SHOW_ONLINE_CLASSES, STORAGE_KEY_USER,
  STORAGE_KEY_USER_STATUS
} from "../../const/StorageKeys";
import { VERSION } from "../../const/Constants";
import { USER_STATUS_PENDING } from "../../const/Constants";
import { NavigationActions, StackActions } from "react-navigation";
import SplashScreen from "react-native-splash-screen";
import axios from "../../axios/axios-order";
import AppConfirmModal from "../UiElements/Modals/AppConfirmModal/AppConfirmModal";
import { HardwareBackUtil } from "../../util/HardwareBackUtil";
import { ToastUtil } from "../../util/ToastUtil";
import { Client as TwilioChatClient } from "twilio-chat";
import { setNotificationCount } from "../../redux/actions/NotificationActions";
import { setTwillioClient } from "../../redux/actions/TwillioClientActions";
import { setLoading } from "../../redux/actions/LoadingActions";
import { connect } from "react-redux";
import AppAlertModal from '../UiElements/Modals/AppAlertModal2/AppAlertModal2';
import RNExitApp from 'react-native-exit-app';

const { width, height } = Dimensions.get('window');

class FirstScreen extends Component {

  state = {
    showTryModal: false,
    showAlert: false
  };


  async componentDidMount(): void {
    SplashScreen.hide();
    if (await StorageUtil.getData(STORAGE_KEY_ACCESS_TOKEN)) {
      this.getAllTokens();
    } else {
      this.getAppVersion();
    }
  }

  getAppVersion = () => {
    const versionType = 'COACH_' + Platform.OS.toUpperCase();
    axios.get('/application/version/mobile?appType=' + versionType)
      .then(async response => {
        if (response.data.success) {
          const currentVersion = response.data.body[0].version;
          if (VERSION < currentVersion) {
            this.setState({ showAlert: true })
          } else {
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'SignIn' })],
            }));
          }
        }
      })
  }

  getTwillioToken = async () => {
    const user = JSON.parse(await StorageUtil.getData(STORAGE_KEY_USER));
    return new Promise((resolve, reject) => {
      axios.get('/coach/twilio/token/' + user.userId)
        .then(async response => {
          if (response.data.success) {
            resolve(response.data.body);
          } else {
            console.log('GET_TWILLIO_TOKEN: Failed', response.data);
            reject();
          }
        })
        .catch(error => {
          console.log('GET_TWILLIO_TOKEN: Network Error' + error);
          reject();
        });
    });
  };

  getAllTokens = () => {
    axios.get('/coach/class/online-classes/visibility')
      .then(async response => {
        if (response.data.success) {

          await StorageUtil.setData(STORAGE_KEY_SHOW_ONLINE_CLASSES, response.data.body + '');
          let result = response.data.body;
          if (result === true) {
            axios.get('/coach/instructor/package/enroll/state')
              .then(async response => {
                if (response.data.success) {
                  console.log(response.data);
                  if (response.data.body) {
                    const twillioToken = await this.getTwillioToken();
                    if (twillioToken) {
                      const client = await TwilioChatClient.create(twillioToken)
                        .catch(reason => {
                          console.log(reason);
                          ToastUtil.showErrorToast('Failed to create chat token');
                        });
                      if (client) {
                        client.on(
                          'tokenAboutToExpire',
                          async () => {
                            const twillioToken2 = await this.getTwillioToken();
                            client.updateToken(twillioToken2);
                          }
                        );
                        this.props.setTwillioClient(client);

                        console.log('*********************************************');

                        console.log(this.props.twillioClient);

                        if (await StorageUtil.getData(STORAGE_KEY_USER_STATUS) === USER_STATUS_PENDING) {
                          this.props.navigation.dispatch(StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: 'PasswordReset' })],
                          }));
                        } else {
                          this.props.navigation.dispatch(StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: 'Main' })],
                          }));
                        }
                      }
                    } else {
                      ToastUtil.showErrorToast('Failed to retrieve chat token');
                    }
                  } else {
                    console.log('not initialized twillio');
                    this.props.navigation.dispatch(StackActions.reset({
                      index: 0,
                      actions: [NavigationActions.navigate({ routeName: 'Main' })],
                    }));
                  }
                } else {
                  console.log('checkTwilioError: ', response.data);
                  ToastUtil.showServerErrorToast();
                }
              })
              .catch(error => {
                console.log('check twilio catch : ', error);
                ToastUtil.showNetworkErrorToast();
              });
          } else {
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'Main' })],
            }));
          }
        } else {
          this.setState({
            showTryModal: true
          })
        }
      })
      .catch(error => {
        this.setState({
          showTryModal: true
        })
      });
  };

  tryAgainHandler = () => {
    this.setState({
      showTryModal: false
    });
    this.getAllTokens();
  };

  hideAlert=()=>{
    RNExitApp.exitApp();
  }

  render() {
    return (
      <>
        <ImageBackground
          source={require('../../assests/backgroundImage.png')}
          style={{
            height: null,
            width: width,
            resizeMode: "cover",
            overflow: "hidden",
            flex: 1
          }}
        >
          <SafeAreaView
            style={{
              flex: 1,
              position: 'relative',
              backgroundColor: APP_COLOR_WHITE,
              opacity: 0.8,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <StatusBar barStyle="light-content" backgroundColor={APP_COLOR_WHITE} />
            <Image style={{ width: 120, height: 120, borderRadius: 10 }}
              source={require('../../assests/FitNexusLogo2.png')} />
          </SafeAreaView>
        </ImageBackground>

        <AppConfirmModal
          message={'Something went wrong. Please check your connection and try again.'}
          onClose={() => {
            this.setState({ showTryModal: false })
          }}
          onYes={() => this.tryAgainHandler()}
          onNo={() => {
            this.setState({ showTryModal: false });
            HardwareBackUtil.exitApp()
          }}
          try={true}
          visible={this.state.showTryModal} />

        <AppAlertModal
          message={'Please upgrade mobile application to latest version'}
          onYes={this.hideAlert}
          visible={this.state.showAlert} />

      </>

    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  setNotificationCount: (count) => dispatch(setNotificationCount(count)),
  setTwillioClient: (client) => dispatch(setTwillioClient(client)),
  setLoading: (isLoading) => dispatch(setLoading(isLoading)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FirstScreen);
