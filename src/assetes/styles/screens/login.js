import EStyleSheet from 'react-native-extended-stylesheet';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import fonts from '../../../utils/common/fonts';

export const login = EStyleSheet.create({
  container: {
    flex: 1,
  },
  inputsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  buttonsConntainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttons: {
    width: width < 300 ? '85%' : 300,
    marginTop: 180,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  containerTitle: {
    width: width < 330 ? '85%' : 330,
    marginVertical: 50,
    fontFamily: fonts.fontMain,
  },
  titleStyle: {
    color: '$colorWhite',
    fontSize: 20,
    fontFamily: fonts.fontMain,
  },
});
