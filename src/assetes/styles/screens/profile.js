import EStyleSheet from 'react-native-extended-stylesheet';
import fonts from '../../../utils/common/fonts';

export const profile = EStyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 30,
  },
  subContainer: {
    backgroundColor: '$colorNavbarBack',
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  firstSection: {
    flex: 4,
    borderBottomColor: '$colorWhite',
    borderLeftColor: '$colorNone',
    borderRightColor: '$colorNone',
    borderTopColor: '$colorNone',
    borderWidth: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  centerItemStyle: {
    alignItems: 'center',
  },
  nameSection: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoSection: {
    flex: 1,
    paddingHorizontal: 20,
  },
  secondSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 20,
    alignContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginLeft: 15,
    color: '$colorFont',
    fontFamily: fonts.fontMain,
  },
  nameLabelStyle: {
    fontSize: 17,
    color: '$colorFont',
    fontWeight: 'bold',
    fontFamily: fonts.fontMain,
  },
  infoLabelStyle: {
    fontSize: 14,
    color: '$colorFont',
    fontFamily: fonts.fontMain,
  },
  logOutSection: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    alignItems: 'center',
  },
  containerLogoutModal: {
    width: '85%',
    height: 150,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 0,
    backgroundColor: '$colorBarButton',
  },
  containerButtonModal: {
    width: '78%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  textContainerModal: {
    width: '78%',
    justifyContent: 'center',
    marginBottom: 30,
  },
  textModalStyle: {
    color: '$colorWhite',
    fontSize: 17,
    fontFamily: fonts.fontMain,
  },
  notShow: {
    display: 'none',
  },
});
