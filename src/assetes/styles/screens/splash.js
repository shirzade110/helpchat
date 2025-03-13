import EStyleSheet from 'react-native-extended-stylesheet';
import fonts from '../../../utils/common/fonts';

export const splash = EStyleSheet.create({
  splashBackground: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  containerWelcomText: {
    marginTop: 60,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    fontSize: 20,
    marginTop: 5,
    color: '$colorWhite',
    fontFamily: fonts.fontMain,
  },
});
