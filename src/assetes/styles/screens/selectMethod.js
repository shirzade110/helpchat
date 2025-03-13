import EStyleSheet from 'react-native-extended-stylesheet';
import fonts from '../../../utils/common/fonts';

export const selectMethod = EStyleSheet.create({
  container: {
    flex: 1,
  },
  containerButtons: {
    flex: 1,
    alignItems: 'center',
  },
  containerTilte: {
    marginVertical: 90,
    color: '$colorWhite',
    fontSize: 20,
    fontFamily: fonts.fontMain,
  },
});
