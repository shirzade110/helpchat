import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {inputTextStyle} from '../assetes/styles/components/inputText';
import {profile} from '../assetes/styles/screens/profile';
import {Actions} from 'react-native-router-flux';
import {Container} from 'native-base';
import ToggleSwitch from 'toggle-switch-react-native';
import AppButtonLogOut from '../components/buttons/AppButtonLogOut';
import AppButtonPrimarySmall from '../components/buttons/AppButtonPrimarySmall';
import AppButtonInfo from '../components/buttons/AppButtonInfo';
import AppHeader from '../components/layout/AppHeader';
import {showLoading} from '../redux/actions';
import AppLoading from '../components/AppLoading';
import Modal from 'react-native-modal';
import Helper from '../utils/config/Helper';
import {validators} from '../utils/common/validationFunctions';
import {restApi} from '../utils/config/restApi';
import {connect} from 'react-redux';
import {EventRegister} from 'react-native-event-listeners';
import AppFooter from '../components/layout/AppFooter';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogoutModal: false,
      userInformation: {},
      editUserInformation: false,
      userInformation: this.props.navigation.getParam('userInfo', ''),
      name: this.props.navigation.getParam('userInfo', '').name,
      family: this.props.navigation.getParam('userInfo', '').family,
      username: this.props.navigation.getParam('userInfo', '').username,
    };
  }

  async componentDidMount() {
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

  // ---- logout ----
  logout() {
    this.props.showLoading(true);
    Helper.makeRequest({
      url: restApi.API_LOGOUT,
      method: 'GET',
    }).then((response) => {
      this.props.showLoading(false);
      if (response.data.result) {
        Helper.removeData('token');
        Helper.removeData('infoUser');
        this.showLogoutModal(false);
        Actions.selectMethod();
      } else {
        Helper.showToast('Error');
      }
    });
  }

  // ---- end attendence ----
  endAtteendance() {
    Helper.makeRequest({
      url: restApi.API_ATTENDANCE,
      method: 'PUT',
    }).then((response) => {
      this.props.showLoading(false);
      this.logout();
    });
  }

  // ---- handle name ----
  handleName = (text) => {
    this.setState({
      name: text,
    });
  };

  // ---- handle family ----
  handleFamily = (text) => {
    this.setState({
      family: text,
    });
  };

  // ---- handle username ----
  handleUserName = (text) => {
    this.setState({
      username: text,
    });
  };

  render() {
    return (
      <Container>
        <AppHeader
          showIconBack={true}
          backTitle=""
          mainTitle={Helper.translate('Account')}
          subTitle=""
          dontShowIcon={true}
          showTitleHeader={true}
        />
        <AppLoading />
        <View style={profile.container}>
          <View style={profile.subContainer}>
            <View
              style={
                this.state.editUserInformation
                  ? profile.notShow
                  : profile.firstSection
              }>
              <View style={profile.nameSection}>
                <View>
                  <Text style={profile.nameLabelStyle}>
                    {this.state.userInformation.name}
                    {'   '}
                    {this.state.userInformation.family}
                  </Text>
                  <Text>{this.state.userInformation.mobile}</Text>
                </View>
                <View>
                  <Image
                    style={{width: 60, height: 60, resizeMode: 'contain'}}
                    source={{
                      uri: Helper.getImageUrl(
                        this.state.userInformation.avatar
                          ? this.state.userInformation.avatar
                          : '',
                      ),
                    }}
                  />
                </View>
              </View>
              <View style={profile.infoSection}>
                <Text style={profile.infoLabelStyle}>
                  You Can edit your Account
                </Text>
                <Text style={profile.infoLabelStyle}>Name here.</Text>
              </View>
            </View>

            {/* ----  edit information ---- */}

            <View
              style={
                this.state.editUserInformation
                  ? [profile.firstSection, profile.centerItemStyle]
                  : profile.notShow
              }>
              <TextInput
                placeholderTextColor="#E9E0E080"
                placeholder={Helper.translate('password')}
                onChangeText={this.handleName}
                value={this.state.name}
                style={inputTextStyle.containerProfile}
              />
              <TextInput
                placeholderTextColor="#E9E0E080"
                placeholder={Helper.translate('password')}
                value={this.state.family}
                onChangeText={this.handleFamily}
                style={inputTextStyle.containerProfile}
              />
              <TextInput
                placeholderTextColor="#E9E0E080"
                value={this.state.username}
                placeholder={Helper.translate('password')}
                onChangeText={this.handleUserName}
                style={inputTextStyle.containerProfile}
              />
            </View>

            {/* ----   end edit information ---- */}
            <TouchableOpacity
              onPress={() =>
                this.state.editUserInformation
                  ? this.submitChanges()
                  : this.enableEditInfo()
              }
              style={profile.secondSection}>
              <Image source={require('../assetes/img/hc_profile_edit.png')} />
              <Text style={profile.label}>
                {this.state.editUserInformation
                  ? Helper.translate('Done')
                  : Helper.translate('Edit')}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={profile.logOutSection}>
            <AppButtonLogOut
              title="Logout"
              buttonPressed={() => this.showLogoutModal(true)}
            />
          </View>

          <Modal
            style={{
              justifyContent: 'flex-end',
              margin: 0,
              alignContent: 'center',
              alignItems: 'center',
            }}
            swipeDirection="down"
            backdropColor="#ffffff"
            backdropOpacity={0.0}
            scrollOffsetMax={50}
            isVisible={this.state.showLogoutModal}>
            <View style={profile.containerLogoutModal}>
              <View style={profile.textContainerModal}>
                <Text style={profile.textModalStyle}>
                  {Helper.translate('Do you sure for Logout?')}
                </Text>
              </View>
              <View style={profile.containerButtonModal}>
                <AppButtonPrimarySmall
                  title={Helper.translate('cancele')}
                  buttonPressed={() => this.showLogoutModal(false)}
                />
                <AppButtonInfo
                  title={Helper.translate('yes')}
                  buttonPressed={() => this.endAtteendance()}
                />
              </View>
            </View>
          </Modal>
        </View>
        <AppFooter active="setting" />
      </Container>
    );
  }

  // ----  enable edit informaition ----
  enableEditInfo() {
    this.setState({
      editUserInformation: true,
    });
  }

  // ---- submit changes ----
  submitChanges() {
    this.props.showLoading(true);
    if (
      validators.checkNotNull('Name ', this.state.name.trim()) &&
      validators.checkNotNull('Family', this.state.family.trim())
    ) {
      var userData = {
        name: this.state.name,
        family: this.state.family,
        password: '',
        password_confirmation: '',
        address: '',
        mobile: '',
        phone: '',
        avatar: '',
      };

      Helper.makeRequest({
        url: restApi.GET_USER_INFO,
        method: 'PUT',
        data: userData,
      }).then((response) => {
        console.log('DD', response);
        this.props.showLoading(false);
        this.setState({
          editUserInformation: false,
        });
      });
    } else {
      this.props.showLoading(false);
      Helper.showToast('Enter Name and Family');
    }
  }

  // ---- show exit modal ----
  showLogoutModal(flag) {
    this.setState({
      showLogoutModal: flag,
    });
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

export default connect(mapStateToProps, mapDisPatchToProps)(Profile);
