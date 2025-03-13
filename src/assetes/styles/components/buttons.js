import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions} from 'react-native';
import fonts from '../../../utils/common/fonts';
const {width, height} = Dimensions.get('window');

export const buttonsStyle = EStyleSheet.create({
  primaryButtonStyle: {
    width: width < 330 ? '85%' : 330,
    height: 40,
    justifyContent: 'center',
    paddingLeft: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 20,
    borderColor: '$colorWhite',
  },
  primaryButtonQRStyle: {
    width: width < 330 ? '85%' : 330,
    height: 40,
    justifyContent: 'center',
    paddingLeft: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 20,
    backgroundColor: '$colorWhite',
    borderColor: '$colorWhite',
  },
  primaryButtonTextStyle: {
    color: '$colorWhite',
    fontFamily: fonts.fontMain,
  },
  primaryButtonQRTextStyle: {
    color: '$colorBarButton',
    fontFamily: fonts.fontMain,
  },
  primaryButtonSmallStyle: {
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: '$colorWhite',
    borderWidth: 1,
  },
  primaryButtonSmallTextStyle: {
    color: '$colorWhite',
    fontFamily: fonts.fontMain,
  },
  infoButtonStyle: {
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: '$colorFarbe2',
    borderWidth: 1,
    backgroundColor: '$colorWhite',
  },
  infoButtonTextStyle: {
    color: '$colorButtonText',
    fontFamily: fonts.fontMain,
  },
  logoutButtonStyle: {
    width: 128,
    height: 40,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: '$colorBarButton',
    borderWidth: 2,
    backgroundColor: '$colorWhite',
  },
  logoutButtonTextStyle: {
    color: '$colorBarButton',
    fontFamily: fonts.fontMain,
  },
});
