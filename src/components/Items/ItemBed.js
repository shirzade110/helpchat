import React from 'react';
import {Text, View, TouchableOpacity, Image, Animated} from 'react-native';
import {connect} from 'react-redux';
import {itemBedStyle} from '../../assetes/styles/components/items/itemBedStyle';
import {showSelectionSection} from '../../redux/actions';

class ItemBed extends React.Component {
  constructor(props) {
    super(props);
    this.delayValue = 500;
    this.state = {
      selectBed: false,
      animatedValue: new Animated.Value(0),
    };
  }

  componentDidMount = () => {
    Animated.spring(this.state.animatedValue, {
      toValue: 1,
      tension: 20,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const RoomInfo = this.props.bed.item;
    this.delayValue = this.delayValue + 500;
    const translateX = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [this.delayValue, 1],
    });
    return (
      <Animated.View style={[{transform: [{translateX}]}]}>
        <TouchableOpacity
          onPress={() =>
            this.onPressItem(this.state.selectBed, () =>
              this.props.selectedItemBed(),
            )
          }
          style={
            RoomInfo.active
              ? itemBedStyle.selectContainer
              : itemBedStyle.container
          }>
          <Text>{RoomInfo.title.substring(0, 13)}</Text>
          <Image source={require('../../assetes/img/hc_bed_item.png')} />
        </TouchableOpacity>
      </Animated.View>
    );
  }

  //  ---- press item ----
  onPressItem(value, callback) {
    this.setState({
      selectBed: !value,
    });
    callback();
  }
}

const mapDisPatchToProps = (dispatch) => {
  return {
    showSelectionSection: (showSelectionSectionFlag) =>
      dispatch(showSelectionSection(showSelectionSectionFlag)),
  };
};

const mapStateToProps = (state) => {
  return {
    selectAllBedsFlag: state.beds.selectAllBedsFlag,
  };
};

export default connect(mapStateToProps, mapDisPatchToProps)(ItemBed);
