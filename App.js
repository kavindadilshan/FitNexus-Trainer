import React, {Component} from 'react';
import {StyleSheet,Platform} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Colors,} from 'react-native/Libraries/NewAppScreen';
import {connect} from 'react-redux';
import Orientation from 'react-native-orientation';

import SignIn from './src/components/Login/SignInContent';
import Main from './src/components/MainNavigator/MainNavigator';
import VerifyNumber from "./src/components/VerifyNumber/VerifyNumber";
import PasswordReset from "./src/components/PasswordReset/PasswordReset";
import Loading from "./src/components/UiElements/Loading/Loading";
import ChangeDescription from "./src/components/MainNavigator/Screens/Profile/ChangeUI/ChangeDescription";
import ChangeMobile from "./src/components/MainNavigator/Screens/Profile/ChangeUI/ChangeMobile";
import ChangeEmail from "./src/components/MainNavigator/Screens/Profile/ChangeUI/ChangeEmail";
import ChangePassword from "./src/components/MainNavigator/Screens/Profile/ChangeUI/ChangePassword";
import ChangeID from "./src/components/MainNavigator/Screens/Profile/ChangeUI/ChangeID";
import ChangeName from "./src/components/MainNavigator/Screens/Profile/ChangeUI/ChangeName";
import {setLoading} from "./src/redux/actions/LoadingActions";
import {setUsername} from "./src/redux/actions/UsernameActions";
import Classes from "./src/components/MainNavigator/Screens/Session/Classes/Classes";
import ListStudents from "./src/components/MainNavigator/Screens/Session/Classes/ListStudents";
import Personal from "./src/components/MainNavigator/Screens/Session/Personal/Personal";
import SessionUpdate from "./src/components/MainNavigator/Screens/Session/Classes/SessionUpdate/SessionUpdateContent";
import ChangeCountry from "./src/components/MainNavigator/Screens/Profile/ChangeUI/ChangeCountry";
import ChangeLanguage from "./src/components/MainNavigator/Screens/Profile/ChangeUI/ChangeLanguage";
import ForgotPassword from "./src/components/PasswordReset/ForgotPassword/ForgotPassword";
import ForgotPasswordReset from "./src/components/PasswordReset/ForgotPasswordReset/ForgotPasswordReset";
import ChangeGender from "./src/components/MainNavigator/Screens/Profile/ChangeUI/ChangeGender";
import ClassProfile from "./src/components/MainNavigator/Screens/Session/ClassProfile/ClassProfile";
import StudioProfile from "./src/components/MainNavigator/Screens/Session/StudioProfile/StudioProfile";
import FirstScreen from "./src/components/FirstScreen/FirstScreen";
import PhysicalClasses from "./src/components/MainNavigator/Screens/Session/PhysicalClasses/PhysicalClasses";
import PhysicalSessionUpdate from "./src/components/MainNavigator/Screens/Session/Classes/PhysicalSessionUpdate/physicalSessionUpdateContent";
import PhysicalClassProfile from "./src/components/MainNavigator/Screens/Session/ClassProfile/PhysicalClassProfile";
import OneSignal from "react-native-onesignal";
import {ONE_SIGNAL_APP_ID} from "./src/const/Constants";
import UpcomingClasses from "./src/components/MainNavigator/Screens/Session/UpcomingClasses/UpcomingClasses";
import {HardwareBackUtil} from "./src/util/HardwareBackUtil";
import AppConfirmModal from "./src/components/UiElements/Modals/AppConfirmModal/AppConfirmModal";

function myiOSPromptCallback(permission) {
    // do something with permission value
}

class App extends Component {

    render() {
        return (
            <>
                <AppContainer isUsernameChange={this.props.username}/>
                <Loading isVisible={this.props.isLoading}/>

                <AppConfirmModal
                    message={'Something went wrong. Please check your connection and try again.'}
                    onClose={() => {
                        this.setState({showTryModal: false})
                    }}
                    onYes={() => this.tryAgainHandler()}
                    onNo={() => {
                        this.setState({showTryModal: false});
                        HardwareBackUtil.exitApp()
                    }}
                    try={true}
                    visible={this.state.showTryModal}/>

            </>
        );
    }
}

const MainNavigator = createStackNavigator({
        FirstScreen: {screen: FirstScreen},

    },
    {
        headerMode: 'none',
        initialRouteName: 'FirstScreen'
    },
);

const AppContainer = createAppContainer(MainNavigator);

const styles = StyleSheet.create({
    body: {
        backgroundColor: Colors.white,
    },
});

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    setLoading: (isLoading) => dispatch(setLoading(isLoading)),
    setUsername: (username) => dispatch(setUsername(username)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App)


