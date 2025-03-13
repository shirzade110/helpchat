import EStyleSheet from 'react-native-extended-stylesheet';
import fonts from '../../../../utils/common/fonts';

export const itemHomeSliderStyle = EStyleSheet.create({
  container: {
    backgroundColor: '$colorBackSlider',
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 10,
    flex: 1,
    height: 230,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  ImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '$colorIconFarbe',
  },
  imageStyle: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  timeText: {
    fontWeight: 'bold',
    fontFamily: fonts.fontMain,
    color: '$colorMinutenFarbe',
  },
});
