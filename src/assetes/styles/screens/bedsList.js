import EStyleSheet from 'react-native-extended-stylesheet';

export const bedsList = EStyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginTop: 20,
    alignSelf: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  modalSaveStyle: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '$colorBarButton',
  },
  buttonsContainerModal: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  textContainerModal: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  textModalStyle: {
    color: '$colorWhite',
    fontSize: 17,
  },
});
