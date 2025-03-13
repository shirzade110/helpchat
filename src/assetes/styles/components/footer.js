import EStyleSheet from 'react-native-extended-stylesheet';
import fonts from '../../../utils/common/fonts';

export const footerStyle = EStyleSheet.create({
  shadowContainer: {
    width: '100%',
  },
  container: {
    height: 100,
    width: '100%',
    backgroundColor: '$colorWhite',
  },
  subContainer: {
    position: 'relative',
    height: 100,
    backgroundColor: '$colorNavbarBack',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 0,
    marginVertical: 1,
    overflow: 'hidden',
  },
  titleMenu: {
    color: '$colorFont',
    fontSize: 9,
    marginTop: 5,
    fontFamily: fonts.fontMain,
  },
  containerSelectItems: {
    flex: 1,
    flexDirection: 'row',
    width: '90%',
    left: '5%',
    position: 'absolute',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 0,
    bottom: 0,
    zIndex: 10,
    height: 117,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    // elevation: 10,
    backgroundColor: '$colorBarButton',
  },
  subContainerSelectItems: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  labelStyleSelectSection: {
    marginTop: 10,
    color: '$colorWhite',
  },
  modalSaveStyle: {
    width: '100%',
    height: 185,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '$colorBarButton',
  },
});
