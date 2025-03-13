import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Alert} from 'react-native';
// screens
import Splash from './src/screens/ScreenSplash';
import Introduction from './src/screens/ScreenIntroduction';
import SelectMethod from './src/screens/ScreenSelectMethod';
import LoginWithCode from './src/screens/ScreenLoginWithCode';
import LoginWithUserName from './src/screens/ScreenLoginWithUserName';
import QRScanner from './src/screens/ScreenQRScanner';
import Home from './src/screens/ScreenHome';
import BedsList from './src/screens/ScreenBedsList';
import AllRequests from './src/screens/ScreenAllRequests';
import DetailesRequest from './src/screens/ScreenDetailesRequest';
import Setting from './src/screens/ScreenSetting';
import Profile from './src/screens/ScreenProfile';
import MyRequests from './src/screens/ScreenMyRequests';
import Languege from './src/screens/ScreenLanguege';
import {RootSiblingParent} from 'react-native-root-siblings';
import OneSignal from 'react-native-onesignal';
import {Router, Scene, Stack} from 'react-native-router-flux';
import store from './src/redux/store';
import {connect, Provider} from 'react-redux';

// main colors
EStyleSheet.build({
  $colorFont: '#1F2433',
  $colorBett: '#4A4A9A',
  $colorNavbar: '#535391',
  $colorFarbe2: '#8080D5',
  $colorMinutenFarbe: '#4F4FC9',
  $colorIconFarbe: '#C5C7F4',
  $colorEinstellungen: '#F0F0F5',
  $colorFarbe1: '#A3DDD2',
  $colorZimmer: '#DBF0EC',
  $colorDef: '#F2F5F8',
  $colorTitle: '#656873',
  $colorWhite: '#ffffff',
  $colorNone: '#ffffff00',
  $colorBlack: '#000000',
  $colorButtonText: '#4F5267',
  $colorNavbarBack: '#F7F7F7',
  $colorBackSlider: '#F5F5F5',
  $colorBorder: '#D5D6EA',
  $colorUnActive: '#E4E4E4',
  $colorUnActiveBorder: '#82D0C1',
  $colorBarButton: '#322F91',
  $colorSuccesfull: '#A3E098',
  $colorBack: '#6a6ad4',
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      isSubscribed: false,
      requiresPrivacyConsent: false,
      isLocationShared: false,
      inputValue: '',
      consoleValue: '',
    };
  }

  async componentDidMount() {
    /* O N E S I G N A L   S E T U P */
    OneSignal.setAppId('f3df671c-0ad1-437c-99d5-7de58d82c169');
    OneSignal.setLogLevel(6, 0);
    OneSignal.setRequiresUserPrivacyConsent(false);

    const deviceState = await OneSignal.getDeviceState();

    this.setState({
      isSubscribed: deviceState.isSubscribed,
    });
  }

  render() {
    const RouterWithRedux = connect()(Router);
    return (
      <RootSiblingParent>
        <Provider store={store}>
          <RouterWithRedux>
            <Stack hideNavBar>
              <Scene key="splash" component={Splash} initial />
              <Scene key="introduction" component={Introduction} />
              <Scene key="selectMethod" component={SelectMethod} />
              <Scene key="loginWithCode" component={LoginWithCode} />
              <Scene key="loginWithUserName" component={LoginWithUserName} />
              <Scene key="qrScanner" component={QRScanner} />
              <Scene key="home" component={Home} />
              <Scene key="bedsList" component={BedsList} />
              <Scene key="allRequests" component={AllRequests} />
              <Scene key="myRequests" component={MyRequests} />
              <Scene key="detailesRequest" component={DetailesRequest} />
              <Scene key="setting" component={Setting} />
              <Scene key="profile" component={Profile} />
              <Scene key="languege" component={Languege} />
            </Stack>
          </RouterWithRedux>
        </Provider>
      </RootSiblingParent>
    );
  }
}
