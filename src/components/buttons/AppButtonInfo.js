import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {buttonsStyle} from '../../assetes/styles/components/buttons';
import {Actions} from 'react-native-router-flux';

class AppButtonInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={buttonsStyle.infoButtonStyle}
        onPress={() => this.props.buttonPressed()}>
        <Text style={buttonsStyle.infoButtonTextStyle}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

export default connect(null, null)(AppButtonInfo);
