import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import fonts from '../../../utils/common/fonts';

export const inputTextStyle = EStyleSheet.create({
  container: {
    height: 40,
    width: width < 327 ? '85%' : 327,
    borderColor: '$colorWhite',
    borderWidth: 1,
    paddingLeft: 25,
    borderRadius: 30,
    marginBottom: 20,
    fontFamily: fonts.fontMain,
  },
  containerProfile: {
    height: 40,
    width: width < 250 ? '85%' : 250,
    borderColor: '$colorBack',
    backgroundColor: '$colorWhite',
    borderWidth: 1,
    paddingLeft: 35,
    borderRadius: 30,
    marginBottom: 8,
    fontFamily: fonts.fontMain,
  },
});
