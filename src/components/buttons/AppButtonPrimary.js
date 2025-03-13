import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {buttonsStyle} from '../../assetes/styles/components/buttons';

class AppButtonPrimary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={
          this.props.type == 'QR'
            ? buttonsStyle.primaryButtonQRStyle
            : buttonsStyle.primaryButtonStyle
        }
        onPress={() => this.props.buttonPressed()}>
        <Text
          style={
            this.props.type == 'QR'
              ? buttonsStyle.primaryButtonQRTextStyle
              : buttonsStyle.primaryButtonTextStyle
          }>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default connect(null, null)(AppButtonPrimary);
