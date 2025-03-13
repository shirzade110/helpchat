import React from 'react';
import {Text, View, Image, ImageBackground} from 'react-native';
import {selectMethod} from '../assetes/styles/screens/selectMethod';
import AppButtonPrimary from '../components/buttons/AppButtonPrimary';
import AppButtonInfo from '../components/buttons/AppButtonInfo';
import AppTitle from '../components/AppTitle';
import {setActivateQRLogin} from '../redux/actions';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {EventRegister} from 'react-native-event-listeners';
import ImagesPath from '../utils/config/ImagePaths';
import Helper from '../utils/config/Helper';

class SelectMethod extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
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
        style={selectMethod.container}
        imageStyle={{width: '100%', height: '100%', resizeMode: 'stretch'}}
        source={ImagesPath.background_img}>
        <View style={selectMethod.containerButtons}>
          <Text style={selectMethod.containerTilte}>
            {Helper.translate('APP_NAME')}
          </Text>
          <AppButtonPrimary
            title={Helper.translate('Scan QR-Code')}
            type="QR"
            buttonPressed={() => this.selectMethod(true)}
          />
          <AppButtonPrimary
            title={Helper.translate('Enter Username and Password')}
            buttonPressed={() => this.selectMethod(false)}
          />
        </View>
      </ImageBackground>
    );
  }

  // ---- select method ----
  selectMethod(activeQRLogin) {
    if (activeQRLogin) {
      Actions.push('qrScanner');
      this.props.setActivateQRLogin(true);
    } else {
      Actions.push('loginWithUserName');
      this.props.setActivateQRLogin(false);
    }
  }
}

const mapDisPatchToProps = (dispatch) => {
  return {
    setActivateQRLogin: (activeQRLogin) =>
      dispatch(setActivateQRLogin(activeQRLogin)),
  };
};

const mapStateToProps = (state) => {
  return {
    appLanguege: state.langueges.appLanguege,
  };
};

export default connect(mapStateToProps, mapDisPatchToProps)(SelectMethod);
