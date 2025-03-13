import EStyleSheet from 'react-native-extended-stylesheet';
import fonts from '../../../../utils/common/fonts';

export const itemBedStyle = EStyleSheet.create({
  container: {
    height: 72,
    width: 165,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '$colorBorder',
    borderWidth: 2,
    flexDirection: 'row',
    marginTop: 8,
    marginHorizontal: 5,
  },
  selectContainer: {
    height: 72,
    width: 165,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '$colorBorder',
    borderColor: '$colorBorder',
    borderWidth: 2,
    flexDirection: 'row',
    marginTop: 8,
    marginHorizontal: 5,
  },
  textStyle: {
    fontFamily: fonts.fontMain,
  },
});
