import React from 'react';
import {Text, View, ImageBackground, TextInput, Keyboard} from 'react-native';
import {login} from '../assetes/styles/screens/login';
import {inputTextStyle} from '../assetes/styles/components/inputText';
import AppButtonPrimarySmall from '../components/buttons/AppButtonPrimarySmall';
import AppButtonInfo from '../components/buttons/AppButtonInfo';
import AppLoading from '../components/AppLoading';
import {Actions} from 'react-native-router-flux';
import {validators} from '../utils/common/validationFunctions';
import Helper from '../utils/config/Helper';
import {restApi} from '../utils/config/restApi';
import {showLoading, setUserName} from '../redux/actions';
import {EventRegister} from 'react-native-event-listeners';
import {connect} from 'react-redux';
import OneSignal from 'react-native-onesignal';
import ImagesPath from '../utils/config/ImagePaths';
let deviceToken = '';
class LoginWithUserName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  async componentDidMount() {
    deviceToken = await OneSignal.getDeviceState();
    this.listener = EventRegister.addEventListener('changeLanguege', () => {
      this.handleLocalizationChange(this.props.appLanguege.value);
    });
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
  }

  handleLocalizationChange = (lang) => {
    Helper.setI18nConfig(lang);
    this.forceUpdate();
  };

  render() {
    return (
      <ImageBackground
        style={login.container}
        imageStyle={{width: '100%', height: '100%', resizeMode: 'stretch'}}
        source={ImagesPath.background_img}>
        <AppLoading />
        <View style={login.inputsContainer}>
          {this.showMessageToUser()}
          {this.showUserNameInput()}
          <TextInput
            placeholderTextColor="#E9E0E080"
            placeholder={Helper.translate('password')}
            onChangeText={this.handlePassword}
            style={inputTextStyle.container}
            secureTextEntry={true}
          />
        </View>
        <View style={login.buttonsConntainer}>
          <View style={login.buttons}>
            <AppButtonPrimarySmall
              title={Helper.translate('Go back')}
              buttonPressed={() => this.goBack()}
            />

            <AppButtonInfo
              title={Helper.translate('Login')}
              buttonPressed={() => this.login()}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }

  // ---- show message to user
  showMessageToUser() {
    if (!this.props.activeQRLogin)
      return (
        <View style={login.containerTitle}>
          <Text style={login.titleStyle}>
            {Helper.translate('Enter your username and')}
          </Text>
          <Text style={login.titleStyle}>
            {Helper.translate('password for login')}
          </Text>
        </View>
      );
    else
      return (
        <View style={login.containerTitle}>
          <Text style={login.titleStyle}>
            {Helper.translate('Enter password for login.')}
          </Text>
        </View>
      );
  }

  // ---- show input username input
  showUserNameInput() {
    if (!this.props.activeQRLogin)
      return (
        <TextInput
          placeholderTextColor="#E9E0E080"
          placeholder={Helper.translate('username')}
          onChangeText={this.handleUsername}
          style={inputTextStyle.container}
        />
      );
    else return null;
  }

  // ---- handler username  ----
  handleUsername = (text) => {
    this.props.setUserName(text);
  };

  // ---- handlre password ----
  handlePassword = (text) => {
    this.setState({
      password: text,
    });
  };
  // ---- go back ----
  goBack() {
    Actions.push('selectMethod');
  }

  // ---- login function ----
  login() {
    Keyboard.dismiss();
    if (
      validators.checkNotNull('Username ', this.props.userName) &&
      validators.checkNotNull('Password', this.state.password)
    ) {
      var data = {
        grant_type: 'password',
        client_id: '2',
        client_secret: 'wDoOfAU8uuZpTukHwvorDbYJRJSBA9rkZrtgC0HI',
        username: this.props.userName,
        password: this.state.password,
        scope: '',
      };
    }
    this.props.showLoading(true);
    Helper.makeRequest({
      url: restApi.API_LOGIN,
      method: 'POST',
      data: data,
    }).then((response) => {
      if (response.token_type == 'Bearer') {
        Helper.setData('token', response.access_token);
        Helper.setData('infoUser', [this.props.userName, this.state.password]);
        this.setDeviceToken();
      } else {
        this.props.showLoading(false);
        Helper.showToast('there is no User with this information');
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
}

const mapDisPatchToProps = (dispatch) => {
  return {
    showLoading: (showLoadingFlag) => dispatch(showLoading(showLoadingFlag)),
    setUserName: (userName) => dispatch(setUserName(userName)),
  };
};

const mapStateToProps = (state) => {
  return {
    userId: state.user.userId,
    userName: state.user.userName,
    activeQRLogin: state.user.activeQRLogin,
    appLanguege: state.langueges.appLanguege,
  };
};

export default connect(mapStateToProps, mapDisPatchToProps)(LoginWithUserName);
