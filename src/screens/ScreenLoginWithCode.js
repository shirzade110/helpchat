import React from 'react';
import {Text, View, Image, TextInput} from 'react-native';
import {selectMethod} from '../assetes/styles/screens/selectMethod';
import {inputTextStyle} from '../assetes/styles/components/inputText';
import AppButtonPrimary from '../components/buttons/AppButtonPrimary';
import AppButtonInfo from '../components/buttons/AppButtonInfo';
import AppTitle from '../components/AppTitle';
import {connect} from 'react-redux';

class LoginWithCode extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={selectMethod.container}>
        <View style={selectMethod.firstSection}>
          <View style={selectMethod.titleScreen}>
            <AppTitle title="QR-Code eingeben" />
          </View>
          <TextInput
            placeholderTextColor="#1F243350"
            placeholder="Code eingeben"
            style={inputTextStyle.container}
          />
        </View>
        <View style={selectMethod.secondSection}>
          <Image
            style={selectMethod.secondSectionBackground}
            source={require('../assetes/img/hc_select_method_screen_background.png')}
          />
        </View>
        <View style={selectMethod.thridSection}>
          <View style={selectMethod.containerButtons}>
            <AppButtonInfo title="Abbrechen" clickEvent="LOGIN_WITH_CODE" />
            <AppButtonPrimary title="Login" clickEvent="LOGIN_WITH_USERNAME" />
          </View>
        </View>
        <View style={selectMethod.brandName}>
          <Text style={selectMethod.brandNameText}>Medventi</Text>
        </View>
      </View>
    );
  }
}

export default connect(null, null)(LoginWithCode);
