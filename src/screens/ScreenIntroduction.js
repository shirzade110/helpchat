import React from 'react';
import {Text, View, Image} from 'react-native';
import {introduction} from '../assetes/styles/screens/introduction';
import AppLabel from '../components/AppLabel';
import AppTitle from '../components/AppTitle';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';

class Introduction extends React.Component {
  constructor(props) {
    super(props);
    setTimeout(() => {
      Actions.reset('selectMethod');
    }, 2000);
  }

  render() {
    return (
      <View style={introduction.container}>
        <View style={introduction.topSection}>
          <AppTitle title="Helpchat ist kinderleicht" />
          <View style={introduction.rowFlex}>
            <AppLabel
              icon="HOME"
              title="Meine Station"
              subTitle="In der Übersicht sind"
            />
            <AppLabel
              icon="BED"
              title="Zimmer Wählen"
              subTitle="deine Patienten siehst du "
            />
          </View>
          <View style={introduction.rowFlex}>
            <AppLabel
              icon="CHAT"
              title="Nachrichten"
              subTitle="In der Übersicht sind sich"
            />
            <AppLabel
              icon="SITTING"
              title="Einstellungen"
              subTitle="Hier Sprachen, notification etc"
            />
          </View>
        </View>
        <View style={introduction.bottomSection}>
          <Image
            style={introduction.bottomSectionBackground}
            source={require('../assetes/img/hc_introduction_screen_background.png')}
          />
        </View>
      </View>
    );
  }
}

export default connect(null, null)(Introduction);
