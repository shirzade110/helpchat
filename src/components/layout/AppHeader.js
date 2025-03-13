import React from 'react';
import {
  ImageBackground,
  TouchableOpacity,
  Text,
  Image,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {headerStyle} from '../../assetes/styles/components/header';
import {Actions} from 'react-native-router-flux';

class AppHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={headerStyle.container}>
        <ImageBackground
          imageStyle={{width: '100%', height: '100%', resizeMode: 'stretch'}}
          style={headerStyle.imageBackground}
          source={require('../../assetes/img/hc_header_back.png')}>
          {this.showBackIcon(this.props.showIconBack)}
        </ImageBackground>
        {this.showTitleHeader(this.props.showTitleHeader)}
      </View>
    );
  }

  // ---- show title header ----
  showTitleHeader(showTitleHeader) {
    if (showTitleHeader)
      return (
        <View style={headerStyle.titleHeader}>
          {this.showIcon(this.props.dontShowIcon)}

          <View style={headerStyle.containerTitle}>
            <Text style={headerStyle.mainTitle}>{this.props.mainTitle}</Text>
            <Text style={headerStyle.subTitle}>{this.props.subTitle}</Text>
          </View>
        </View>
      );
    else return null;
  }

  //show icone header
  showIcon(dontShowIcon) {
    if (!dontShowIcon)
      return (
        <View>
          <Image source={require('../../assetes/img/hc_header_peaple.png')} />
        </View>
      );
    else return null;
  }

  // ----   show back icon ----
  showBackIcon(showIconBack) {
    if (showIconBack)
      return (
        <TouchableOpacity
          onPress={() => Actions.pop()}
          style={headerStyle.containerBack}>
          <Image
            source={require('../../assetes/img/hc_header_icon_back.png')}
          />
          <Text style={headerStyle.titleBack}>{this.props.backTitle}</Text>
        </TouchableOpacity>
      );
    else return null;
  }
}

export default connect(null, null)(AppHeader);
