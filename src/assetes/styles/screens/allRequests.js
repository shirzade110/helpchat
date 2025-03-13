import EStyleSheet from 'react-native-extended-stylesheet';

export const allRequests = EStyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    width: '100%',
    height: '100%',
  },
  messageContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 10,
    width: '94%',
    height: 100,
    marginBottom: 5,
    marginHorizontal: 10,
    marginTop: 5,
    backgroundColor: '$colorWhite',
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
