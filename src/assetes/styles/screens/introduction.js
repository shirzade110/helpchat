import EStyleSheet from 'react-native-extended-stylesheet';
import fonts from '../../../utils/common/fonts';

export const introduction = EStyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    flex: 7,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  bottomSection: {
    flex: 6,
  },
  bottomSectionBackground: {
    width: '100%',
    resizeMode: 'cover',
    height: '100%',
  },

  rowFlex: {
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30,
  },
});
