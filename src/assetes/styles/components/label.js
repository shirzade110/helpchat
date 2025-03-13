import EStyleSheet from 'react-native-extended-stylesheet';

export const labelStyle = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
  },
  title: {
    fontSize: 20,
    marginTop: 13,
    color: '$colorFarbe2',
  },
  subTitle: {
    fontSize: 11,
    color: '$colorFarbe2',
  },
});
