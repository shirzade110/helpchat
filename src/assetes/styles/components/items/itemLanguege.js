import EStyleSheet from 'react-native-extended-stylesheet';
import fonts from '../../../../utils/common/fonts';

export const itemLanguege = EStyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    marginTop: 10,
    flexDirection: 'row',
  },
  containerActive: {
    flex: 1,
    width: '100%',
    height: '100%',
    marginTop: 10,
    flexDirection: 'row',
    backgroundColor: '$colorNavbarBack',
  },
  containerCountryName: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  containerCheck: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 20,
  },
  itemsStyle: {
    flex: 1,
    height: 63,
    borderColor: '$colorNavbarBack',
    borderWidth: 1,
    justifyContent: 'space-between',
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
    fontWeight: 'bold',
  },
});
