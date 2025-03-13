import EStyleSheet from 'react-native-extended-stylesheet';
import fonts from '../../../utils/common/fonts';

export const languege = EStyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 30,
  },
  itemsStyle: {
    width: '100%',
    height: 63,
    borderColor: '$colorNavbarBack',
    borderWidth: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
    flexDirection: 'row',
  },
  labelStyle: {
    marginLeft: 20,
    fontSize: 13,
    color: '$colorFont',
    fontFamily: fonts.fontMain,
  },
});
