import EStyleSheet from 'react-native-extended-stylesheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import fonts from '../../../utils/common/fonts';

export const home = EStyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  containerTotalPatient: {
    flex: 1,
    paddingLeft: 20,
    marginLeft: 25,
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  countPatient: {
    paddingRight: 15,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  countPatientText: {
    fontSize: 35,
    fontFamily: fonts.fontMain,
  },
  countPatientTextTitle: {
    fontSize: 16,
    fontFamily: fonts.fontMain,
  },
  containerTotalPatientRequest: {
    flex: 1,
    marginLeft: 25,
    marginBottom: 10,
    marginRight: 25,
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 30,
    backgroundColor: '$colorFarbe1',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerTotalPatientDefineRequest: {
    flex: 1,
    marginLeft: 25,
    marginBottom: 20,
    marginRight: 25,
    borderRadius: 10,
    paddingLeft: 15,
    paddingRight: 30,
    backgroundColor: '$colorFarbe2',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleStyle: {
    color: '$colorWhite',
    fontSize: 18,
    fontFamily: fonts.fontMain,
  },
  valueStyle: {
    color: '$colorWhite',
    fontSize: 32,
    fontWeight: 'bold',
  },
  topSection: {
    flex: 1,
  },
  containerCurentRequest: {
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  curentRequestNav: {
    flexDirection: 'row',
  },
  containerArrowBack: {
    marginRight: 40,
  },
  curentRequestTitle: {
    fontSize: 25,
    fontFamily: fonts.fontMain,
  },
  bottomSection: {
    flex: 1,
    marginLeft: 25,
    marginRight: 25,
  },

  messageStyle: {
    fontFamily: fonts.fontMain,
  },
});
