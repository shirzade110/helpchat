import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions} from 'react-native';

export const headerStyle = EStyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 0,
    borderColor: '$colorWhite',
    backgroundColor: '$colorWhite',
  },
  imageBackground: {
    width: Dimensions.get('window').width,
    height: 100,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  titleHeader: {
    height: 60,
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '$colorBorder',
    borderLeftColor: '$colorWhite',
    borderRightColor: '$colorWhite',
    borderTopColor: '$colorWhite',
    borderWidth: 1,
    paddingLeft: 25,
    paddingBottom:10
  },
  containerTitle: {
    paddingLeft: 20,
  },
  mainTitle: {
    fontSize: 25,
  },
  subTitle: {
    fontSize: 14,
    color: '$colorMinutenFarbe',
  },
  containerBack: {
    flexDirection: 'row',
    paddingLeft: 25,
  },
  titleBack: {
    marginLeft: 15,
  },
});
