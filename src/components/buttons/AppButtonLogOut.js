import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {buttonsStyle} from '../../assetes/styles/components/buttons';
import {Actions} from 'react-native-router-flux';

class AppButtonLogOut extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={buttonsStyle.logoutButtonStyle}
        onPress={() => this.props.buttonPressed()}>
        <Text style={buttonsStyle.logoutButtonTextStyle}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }

  // //   ---- manage click event ----
  // manageClick(clickEvent) {
  //   switch (clickEvent) {
  //     case 'LOGIN_WITH_CODE':
  //       Actions.reset('loginWithCode');
  //       break;
  //     case 'LOGIN_WITH_USERNAME':
  //       Actions.reset('home');
  //       break;
  //   }
  // }
}

export default connect(null, null)(AppButtonLogOut);
