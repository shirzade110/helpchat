import EStyleSheet from 'react-native-extended-stylesheet';
import fonts from '../../../utils/common/fonts';

export const setting = EStyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingHorizontal: 30,
  },
  settingItems: {
    width: '100%',
    height: 63,
    marginTop: 15,
    backgroundColor: '$colorNavbarBack',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  settingSubItem: {
    flexDirection: 'row',
  },
  valueLabel: {
    fontSize: 12,
    fontFamily: fonts.fontMain,
  },
  labelSubItem: {
    marginLeft: 20,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: fonts.fontMain,
    color: '$colorFont',
  },
});
