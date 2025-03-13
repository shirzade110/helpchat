import React from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import {titleStyle} from '../assetes/styles/components/title';

class AppTitle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={titleStyle.container}>
        <Text style={titleStyle.title}>{this.props.title}</Text>
      </View>
    );
  }
}

export default connect(null, null)(AppTitle);
