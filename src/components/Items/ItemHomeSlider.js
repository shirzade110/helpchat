import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {connect} from 'react-redux';
import {itemHomeSliderStyle} from '../../assetes/styles/components/items/itemhomeSliderStyle';
import {buttonsStyle} from '../../assetes/styles/components/buttons';
import {Actions} from 'react-native-router-flux';
import Helper from '../../utils/config/Helper';
import {SvgCssUri} from 'react-native-svg';

class ItemHomeSlider extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const request = this.props.item;
    console.log(request);
    let requestTime = request.created_at.replace(/-/g, '/');
    return (
      <TouchableOpacity
        onPress={() => this.showDetaileRequestPage(this.props.item)}
        style={itemHomeSliderStyle.container}>
        <View style={itemHomeSliderStyle.subContainer}>
          <Text>{request.room_title}</Text>
          <Text>{request.entity_title}</Text>
        </View>
        <View style={itemHomeSliderStyle.subContainer}>
          <Text>{request.item_title}</Text>
          <Text style={itemHomeSliderStyle.timeText}>
            {request.created_at_human}
          </Text>
        </View>
        <View style={itemHomeSliderStyle.subContainer}>
          <View style={itemHomeSliderStyle.ImageContainer}>
            <SvgCssUri
              width="80%"
              height="80%"
              uri={Helper.getImageUrl(request.icon)}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  // ---- show detailes ----
  showDetaileRequestPage(item) {
    Actions.detailesRequest({request_data: item, where: 'Home'});
  }
}

export default connect(null, null)(ItemHomeSlider);
