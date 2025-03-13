import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {buttonsStyle} from '../../assetes/styles/components/buttons';
import {Actions} from 'react-native-router-flux';
import {showModalSaveSelectBeds} from '../../redux/actions';

class AppButtonPrimarySmall extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        style={buttonsStyle.primaryButtonSmallStyle}
        onPress={() => this.props.buttonPressed()}>
        <Text style={buttonsStyle.primaryButtonSmallTextStyle}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }

  //   ---- manage click event ----
  // manageClick(clickEvent) {
  //   switch (clickEvent) {
  //     case 'GO_BACK':
  //       Actions.reset('selectMethod');
  //       break;
  //     case 'CLOSE_MODAL_SAVE_BEDS':
  //       this.props.showModalSaveSelectBeds(false);
  //       break;
  //   }
  // }
}

const mapDisPatchToProps = (dispatch) => {
  return {
    showModalSaveSelectBeds: (showModalSaveSelectBedsFlag) =>
      dispatch(showModalSaveSelectBeds(showModalSaveSelectBedsFlag)),
  };
};

export default connect(null, mapDisPatchToProps)(AppButtonPrimarySmall);
