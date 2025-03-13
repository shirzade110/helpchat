import React from 'react';
import {ImageBackground, View, Dimensions, Text} from 'react-native';
import {splash} from '../assetes/styles/screens/splash';
import {Actions} from 'react-native-router-flux';
import Helper from '../utils/config/Helper';
import {EventRegister} from 'react-native-event-listeners';
import * as RNLocalize from 'react-native-localize';
import ImagesPath from '../utils/config/ImagePaths';
import {connect} from 'react-redux';
import {setLanguege, showLoading} from '../redux/actions';
import {restApi} from '../utils/config/restApi';
import OneSignal from 'react-native-onesignal';

const {width, height} = Dimensions.get('window');
let deviceToken = '';
class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoged: false,
      userInfo: [],
    };
  }

  async componentDidMount() {
    deviceToken = await OneSignal.getDeviceState();

    await Helper.getData('languege').then((responseData) => {
      if (
        responseData === null ||
        responseData === 'undefined' ||
        responseData === ''
      ) {
        this.handleLocalizationChange(this.props.appLanguege.value);
      } else {
        this.handleLocalizationChange(responseData.value);
        this.props.setLanguege(responseData);
      }

      this.getUser();
    });

    RNLocalize.addEventListener(
      'change',
      this.handleLocalizationChange(this.props.appLanguege.value),
    );
  }

  componentWillUnmount() {
    RNLocalize.removeEventListener('change', this.handleLocalizationChange);
  }

  handleLocalizationChange = (lang) => {
    Helper.setI18nConfig(lang);
    this.forceUpdate();
  };

  async getUser() {
    await Helper.getData('infoUser').then((responseData) => {
      if (
        responseData === null ||
        responseData === 'undefined' ||
        responseData === ''
      ) {
        Actions.replace('selectMethod');
      } else {
        Helper.removeData('token');
        this.login(responseData[0], responseData[1]);
      }
    });
  }

  // ---- login function ----
  login(username, password) {
    var data = {
      grant_type: 'password',
      client_id: '2',
      client_secret: 'wDoOfAU8uuZpTukHwvorDbYJRJSBA9rkZrtgC0HI',
      username: username,
      password: password,
      scope: '',
    };
    this.props.showLoading(true);
    Helper.makeRequest({
      url: restApi.API_LOGIN,
      method: 'POST',
      data: data,
    }).then((response) => {
      if (response.token_type == 'Bearer') {
        Helper.setData('token', response.access_token);
        // this.setDeviceToken();
        this.startAtteendance();
      } else {
        this.props.showLoading(false);
        Helper.showToast('there is no User with this information');
        Actions.replace('selectMethod');
      }
    });
  }

  // ---- set device token ----
  setDeviceToken() {
    let formData = new URLSearchParams();
    formData.append('token', deviceToken.userId);
    let data = formData.toString();
    Helper.makeRequest({
      url: restApi.API_SET_DEVICE_TOKEN,
      method: 'FORMDATA',
      data: data,
    }).then((response) => {
      this.props.showLoading(false);
      if (response.status) this.startAtteendance();
    });
  }

  // ---- start attendence ----
  startAtteendance() {
    Helper.makeRequest({
      url: restApi.API_ATTENDANCE,
      method: 'POST',
    }).then((response) => {
      this.props.showLoading(false);
      if (response.admin_id) {
        Actions.replace('home');
      }
    });
  }

  render() {
    return (
      <ImageBackground
        style={splash.splashBackground}
        imageStyle={{width: '100%', height: '100%', resizeMode: 'stretch'}}
        source={width > 650 ? ImagesPath.splashIpade : ImagesPath.splashIphone}>
        <View style={splash.containerWelcomText}>
          <Text style={splash.titleStyle}>{Helper.translate('wellcome')}</Text>
          <Text style={splash.titleStyle}>Helpchat</Text>
        </View>
      </ImageBackground>
    );
  }
}

const mapDisPatchToProps = (dispatch) => {
  return {
    setLanguege: (appLanguege) => dispatch(setLanguege(appLanguege)),
    showLoading: (showLoadingFlag) => dispatch(showLoading(showLoadingFlag)),
  };
};

const mapStateToProps = (state) => {
  return {
    appLanguege: state.langueges.appLanguege,
  };
};

export default connect(mapStateToProps, mapDisPatchToProps)(Splash);
