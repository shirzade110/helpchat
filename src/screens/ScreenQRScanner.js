import React from 'react';
import {View, Animated, Easing, Text, ImageBackground} from 'react-native';
import {RNCamera} from 'react-native-camera';
import AppButtonPrimarySmall from '../components/buttons/AppButtonPrimarySmall';
import {setUserId, setUserName, setActivateQRLogin} from '../redux/actions';
import {Actions} from 'react-native-router-flux';
import Helper from '../utils/config/Helper';
import {EventRegister} from 'react-native-event-listeners';
import base64 from 'react-native-base64';

import {connect} from 'react-redux';

class QRScanner extends React.Component {
  constructor(props) {
    super(props);
    (this.state = {
      activeScanner: true,
    }),
      (this.animatedValue = new Animated.Value(0));
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

  animate() {
    this.animatedValue.setValue(0);
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 120,
      easing: Easing.linear,
    }).start(() => this.animate());
  }

  render() {
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 1, 0],
    });
    return (
      <View style={{flex: 1}}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          ref={(cam) => (this.cam = cam)}
          onCameraReady={this.prepareRatio}
          flashMode={'on'}
          barcodeFinderBorderWidth={10}
          barcodeFinderWidth={350}
          barcodeFinderHeight={400}
          autoFocus={'on'}
          mirrorImage={false}
          barcodeFinderVisible={true}
          onBarCodeRead={
            this.state.activeScanner ? this.onBarCodeRead.bind(this) : null
          }
          type={RNCamera.Constants.Type.back}
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
            }}>
            <View
              style={{
                width: '100%',
                height: '20%',
                backgroundColor: '#6d6dd6',
              }}></View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                height: '40%',
              }}>
              <View
                style={{
                  height: '100%',
                  width: '10%',
                }}>
                <ImageBackground
                  style={{width: '100%', height: '100%'}}
                  imageStyle={{
                    width: '100%',
                  }}
                  source={require('../assetes/img/hc_background_scanner_right.png')}></ImageBackground>
              </View>
              <View
                style={{
                  height: '100%',
                  width: '80%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                }}>
                <Animated.View
                  style={{
                    opacity,
                    height: 1,
                    width: '100%',
                    backgroundColor: '#4ee31c',
                  }}
                />
              </View>
              <View
                style={{
                  backgroundColor: '#6d6dd6',
                  height: '100%',
                  width: '10%',
                }}></View>
            </View>
            <View
              style={{
                width: '100%',
                height: '40%',
                backgroundColor: '#6a6ad4',
              }}>
              <ImageBackground
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}
                imageStyle={{
                  width: '100%',
                }}
                source={require('../assetes/img/hc_background_scanner.png')}>
                <AppButtonPrimarySmall
                  title={Helper.translate('Go back')}
                  buttonPressed={() => this.goBack()}
                />
              </ImageBackground>
            </View>
          </View>
        </RNCamera>
      </View>
    );
  }

  // ---- scan QR code ----

  onBarCodeRead(scanResult) {
    this.setState({
      activeScanner: false,
    });
    let deCodeData = base64.decode(scanResult.data);
    let mainInformation = JSON.parse(deCodeData);
    this.props.setUserName(mainInformation.username);
    this.props.setActivateQRLogin(true);
    Actions.push('loginWithUserName');
  }

  // ---- go back ----
  goBack() {
    Actions.push('selectMethod');
  }
}

const mapDisPatchToProps = (dispatch) => {
  return {
    setUserId: (userId) => dispatch(setUserId(userId)),
    setUserName: (userName) => dispatch(setUserName(userName)),
    setActivateQRLogin: (activeQRLogin) =>
      dispatch(setActivateQRLogin(activeQRLogin)),
  };
};

const mapStateToProps = (state) => {
  return {
    appLanguege: state.langueges.appLanguege,
  };
};

export default connect(mapStateToProps, mapDisPatchToProps)(QRScanner);
