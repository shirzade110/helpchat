import React from 'react';
import {Image, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {labelStyle} from '../assetes/styles/components/label';

class AppLabel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={labelStyle.container}>
        {this.manageImage(this.props.icon)}
        <Text style={labelStyle.title}>{this.props.title}</Text>
        <Text style={labelStyle.subTitle}>{this.props.subTitle}</Text>
      </View>
    );
  }

  // --------------------------- manage images  ----------------------------
  manageImage(icon) {
    switch (icon) {
      case 'HOME':
        return (
          <Image
            source={require('../assetes/img/hc_introduction_screen_home.png')}
          />
        );
        break;
      case 'SITTING':
        return (
          <Image
            source={require('../assetes/img/hc_introduction_screen_sitting.png')}
          />
        );
        break;
      case 'CHAT':
        return (
          <Image
            source={require('../assetes/img/hc_introduction_screen_chat.png')}
          />
        );
        break;
      case 'BED':
        return (
          <Image
            source={require('../assetes/img/hc_introduction_screen_bed.png')}
          />
        );
        break;
    }
  }
}

export default connect(null, null)(AppLabel);
