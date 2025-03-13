import React, {Component} from 'react';
import {Modal, Platform, View} from 'react-native';
import {loadingStyle} from '../assetes/styles/components/loading';
import {Spinner} from 'native-base';
import {connect} from 'react-redux';

class AppLoading extends Component {
  state = {
    modalVisible: false,
  };
  toggleModal(visible) {
    this.setState({modalVisible: visible});
  }
  render() {
    return (
      <View>
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={this.props.showLoadingFlag}>
          <View
            style={
              Platform.OS == 'ios'
                ? loadingStyle.modal
                : loadingStyle.modalAndroid
            }>
            <Spinner />
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showLoadingFlag: state.loading.showLoadingFlag,
  };
};

export default connect(mapStateToProps, null)(AppLoading);
