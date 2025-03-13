import React from 'react';
import {Text, View, TouchableOpacity, Image, Animated} from 'react-native';
import {connect} from 'react-redux';
import {setLanguege} from '../../redux/actions';
import {itemLanguege} from '../../assetes/styles/components/items/itemLanguege';

class ItemLanguege extends React.Component {
  constructor(props) {
    super(props);
    this.delayValue = 500;
    this.state = {
      selectLanguege: false,
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
    this.delayValue = this.delayValue + 500;
    const translateX = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [this.delayValue, 1],
    });

    return (
      <Animated.View
        style={[itemLanguege.mainContainer, {transform: [{translateX}]}]}>
        <TouchableOpacity
          onPress={() => this.props.onPressItem()}
          style={
            this.props.appLanguege.id === this.props.languege.item.id
              ? itemLanguege.containerActive
              : itemLanguege.container
          }>
          <View style={itemLanguege.itemsStyle}>
            <View style={itemLanguege.containerCountryName}>
              <Image
                source={this.getImageCountry(this.props.languege.item.id)}
              />
              <Text style={itemLanguege.labelStyle}>
                {this.props.languege.item.country}
              </Text>
            </View>
            <View style={itemLanguege.containerCheck}>
              <Image
                source={
                  this.props.appLanguege.id === this.props.languege.item.id
                    ? require('../../assetes/img/hc_tich_dark.png')
                    : null
                }
              />
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // ---- show image ----
  getImageCountry(id) {
    switch (id) {
      case '3':
        return require('../../assetes/img/hc_lang_gemany.png');
        break;
      case '2':
        return require('../../assetes/img/hc_lang_frenc.png');
        break;
      case '1':
        return require('../../assetes/img/hc_lang_eng.png');
        break;
      case '4':
        return require('../../assetes/img/hc_lang_spanish.png');
        break;
    }
  }
}

const mapDisPatchToProps = (dispatch) => {
  return {
    setLanguege: (appLanguege) => dispatch(setLanguege(appLanguege)),
  };
};

const mapStateToProps = (state) => {
  return {
    appLanguege: state.langueges.appLanguege,
  };
};

export default connect(mapStateToProps, mapDisPatchToProps)(ItemLanguege);
