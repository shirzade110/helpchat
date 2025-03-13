import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {setting} from '../assetes/styles/screens/settingScreen';
import {Actions} from 'react-native-router-flux';
import {Container} from 'native-base';
import ToggleSwitch from 'toggle-switch-react-native';
import AppFooter from '../components/layout/AppFooter';
import AppHeader from '../components/layout/AppHeader';
import {restApi} from '../utils/config/restApi';
import Helper from '../utils/config/Helper';
import {connect} from 'react-redux';
import AppLoading from '../components/AppLoading';
import {EventRegister} from 'react-native-event-listeners';
import {showLoading} from '../redux/actions';
import SystemSetting from 'react-native-system-setting';

const {width, height} = Dimensions.get('window');

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '-',
      userInfo: '',
      notificationState: true,
      volomeState: true,
      vibrationState: true,
    };
  }

  async componentDidMount() {
    this.getUserInfo();
    await Helper.getData('languege').then((responseData) => {
      if (
        responseData === null ||
        responseData === 'undefined' ||
        responseData === ''
      ) {
        this.setState({country: 'English'});
      } else {
        this.setState({country: responseData.country});
      }
    });

    this.getNotificationSetting();
    this.getVolumeSetting();
    this.getVibrationSetting();

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

  // -----  get setting  notification -----
  async getNotificationSetting() {
    await Helper.getData('settingNotification').then((responseData) => {
      if (
        responseData === null ||
        responseData === 'undefined' ||
        responseData === ''
      ) {
        this.setState({
          notificationState: true,
        });
      } else {
        this.setState({
          notificationState: responseData,
        });
      }
    });
  }

  // -----  get setting volume ----
  async getVolumeSetting() {
    await Helper.getData('settingVolume').then((responseData) => {
      if (
        responseData === null ||
        responseData === 'undefined' ||
        responseData === ''
      ) {
        this.setState({
          volomeState: true,
        });
      } else {
        this.setState({
          volomeState: responseData,
        });
      }
    });
  }

  // -----   get vibration setting -----
  async getVibrationSetting() {
    await Helper.getData('settingVibration').then((responseData) => {
      if (
        responseData === null ||
        responseData === 'undefined' ||
        responseData === ''
      ) {
        this.setState({
          vibrationState: true,
        });
      } else {
        this.setState({
          vibrationState: responseData,
        });
      }
    });
  }

  // ----  change setting ----
  changeSetting(item) {
    switch (item) {
      case 1:
        this.setState({
          notificationState: !this.state.notificationState,
        });
        Helper.setData('settingNotification', !this.state.notificationState);
        break;
      case 2:
        {
          if (!this.state.volomeState)
            SystemSetting.setVolume(1.0, {
              type: 'notification',
              playSound: true,
              showUI: true,
            });
          else
            SystemSetting.setVolume(0, {
              type: 'notification',
              playSound: true,
              showUI: true,
            });
          this.setState({
            volomeState: !this.state.volomeState,
          });
          Helper.setData('settingVolume', !this.state.volomeState);
        }
        break;
      case 3:
        this.setState({
          vibrationState: !this.state.vibrationState,
        });
        Helper.setData('settingVibration', !this.state.vibrationState);
        break;

      default:
        break;
    }

    Helper.showToast(Helper.translate('Done Setting'));
  }

  // ---- get user info ----
  getUserInfo() {
    this.props.showLoading(true);
    Helper.makeRequest({
      url: restApi.GET_USER_INFO,
      method: 'GET',
    }).then((response) => {
      console.log(response);
      let userInfo = response.data;
      this.props.showLoading(false);
      this.setState({userInfo: response.data});
      let fullName = userInfo.name + ' ' + userInfo.family;
      this.setState({
        name: fullName,
      });
      Helper.setData('userInfo', response.data);
    });
  }

  render() {
    return (
      <Container>
        <AppHeader
          showIconBack={true}
          backTitle=""
          mainTitle={Helper.translate('setting')}
          subTitle=""
          dontShowIcon={true}
          showTitleHeader={true}
        />
        <AppLoading />
        <ScrollView style={setting.container}>
          <View style={setting.settingItems}>
            <View style={setting.settingSubItem}>
              <Image source={require('../assetes/img/hc_setting_user.png')} />
              <Text style={setting.labelSubItem}>
                {Helper.translate('Account')}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                Actions.push('profile', {userInfo: this.state.userInfo})
              }
              style={setting.settingSuItem}>
              <Text style={setting.valueLabel}>{this.state.name}</Text>
            </TouchableOpacity>
          </View>
          <View style={setting.settingItems}>
            <View style={setting.settingSubItem}>
              <Image source={require('../assetes/img/hc_setting_lang.png')} />
              <Text style={setting.labelSubItem}>
                {Helper.translate('Languege')}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => Actions.push('languege')}
              style={setting.settingSuItem}>
              <Text style={setting.valueLabel}>
                {this.props.appLanguege.country}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={setting.settingItems}>
            <View style={setting.settingSubItem}>
              <Image
                source={require('../assetes/img/hc_setting_notification.png')}
              />
              <Text style={setting.labelSubItem}>
                {Helper.translate('Notification')}
              </Text>
            </View>
            <View style={setting.settingSuItem}>
              <ToggleSwitch
                isOn={this.state.notificationState}
                onColor="#A3E098"
                offColor="#e1e1e1"
                label=""
                labelStyle={{color: 'black', fontWeight: '900'}}
                size="medium"
                onToggle={(isOn) => this.changeSetting(1)}
              />
            </View>
          </View>
          <View style={setting.settingItems}>
            <View style={setting.settingSubItem}>
              <Image source={require('../assetes/img/hc_setting_volume.png')} />
              <Text style={setting.labelSubItem}>
                {Helper.translate('Volume')}
              </Text>
            </View>
            <View style={setting.settingSuItem}>
              <ToggleSwitch
                isOn={this.state.volomeState}
                onColor="#A3E098"
                offColor="#e1e1e1"
                size="medium"
                onToggle={(isOn) => this.changeSetting(2)}
              />
            </View>
          </View>
          <View style={setting.settingItems}>
            <View style={setting.settingSubItem}>
              <Image source={require('../assetes/img/hc_setting_vib.png')} />
              <Text style={setting.labelSubItem}>
                {Helper.translate('Vibration')}
              </Text>
            </View>
            <View style={setting.settingSuItem}>
              <ToggleSwitch
                isOn={this.state.vibrationState}
                onColor="#A3E098"
                offColor="#e1e1e1"
                size="medium"
                onToggle={(isOn) => this.changeSetting(3)}
              />
            </View>
          </View>
          <View style={setting.settingItems}>
            <View style={setting.settingSubItem}>
              <Image source={require('../assetes/img/hc_setting_help.png')} />
              <Text style={setting.labelSubItem}>
                {Helper.translate('Help')}
              </Text>
            </View>
            <View style={setting.settingSuItem}>
              <Text>{Helper.translate('Questions?')} </Text>
            </View>
          </View>
        </ScrollView>
        <AppFooter active="setting" />
      </Container>
    );
  }
}

const mapDisPatchToProps = (dispatch) => {
  return {
    showLoading: (showLoadingFlag) => dispatch(showLoading(showLoadingFlag)),
  };
};

const mapStateToProps = (state) => {
  return {
    appLanguege: state.langueges.appLanguege,
  };
};

export default connect(mapStateToProps, mapDisPatchToProps)(Setting);
