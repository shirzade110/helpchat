import React from 'react';
import {Image, Dimensions, View, TouchableOpacity, Alert} from 'react-native';
import {connect} from 'react-redux';
import {FooterTab, Footer, Button, Text} from 'native-base';
import {footerStyle} from '../../assetes/styles/components/footer';
import {Actions} from 'react-native-router-flux';
import {BoxShadow} from 'react-native-shadow';
import {selectAllBeds, showModalSaveSelectBeds} from '../../redux/actions';
import Helper from '../../utils/config/Helper';
import {EventRegister} from 'react-native-event-listeners';

class AppFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAll: false,
      saveItems: false,
    };
  }

  async componentDidMount() {
    this.listener = EventRegister.addEventListener('changeLanguege', () => {
      this.handleLocalizationChange(this.props.appLanguege.value);
    });
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
  }

  handleLocalizationChange = (lang) => {
    Helper.setI18nConfig(lang);
    this.forceUpdate();
  };

  render() {
    const shadowOpt = {
      width: Dimensions.get('window').width,
      height: 80,
      color: '#1F2433',
      border: 30,
      radius: 20,
      opacity: 0.1,
      x: 2,
      y: 3,
      style: {marginVertical: 5},
    };
    return (
      <View>
        <BoxShadow setting={shadowOpt} style={footerStyle.shadowContainer}>
          <FooterTab style={footerStyle.subContainer}>
            <Button
              vertical
              onPress={
                this.props.active != 'home'
                  ? () => this.navigation('home')
                  : null
              }>
              <Image
                style={{width: 30, height: 30, resizeMode: 'contain'}}
                source={
                  this.props.active === 'home'
                    ? require('../../assetes/img/hc_home_menu_active.png')
                    : require('../../assetes/img/hc_home_menu.png')
                }
              />
              <Text style={footerStyle.titleMenu}>
                {Helper.translate('My Ward')}
              </Text>
            </Button>
            <Button
              vertical
              onPress={
                this.props.active != 'beds'
                  ? () => this.navigation('beds')
                  : null
              }>
              <Image
                style={{width: 40, height: 40, resizeMode: 'contain'}}
                source={
                  this.props.active === 'beds'
                    ? require('../../assetes/img/hc_bed_menu_active.png')
                    : require('../../assetes/img/hc_bed_menu.png')
                }
              />
              <Text style={footerStyle.titleMenu}>
                {Helper.translate('Choose Rooms')}
              </Text>
            </Button>
            {/* <Button vertical>
              <Image source={require('../../assetes/img/hc_chat_menu.png')} />
              <Text style={footerStyle.titleMenu}>Nachrichten</Text>
            </Button> */}
            <Button
              vertical
              onPress={
                this.props.active != 'setting'
                  ? () => this.navigation('setting')
                  : null
              }>
              <Image
                style={{width: 35, height: 35, resizeMode: 'contain'}}
                source={
                  this.props.active === 'setting'
                    ? require('../../assetes/img/hc_setting_menu_active.png')
                    : require('../../assetes/img/hc_setting_menu.png')
                }
              />
              <Text style={footerStyle.titleMenu}>
                {Helper.translate('Setting')}
              </Text>
            </Button>
          </FooterTab>
        </BoxShadow>

        {this.showSelectionSection()}
      </View>
    );
  }

  // ----  show bottom modal ----
  showSelectionSection() {
    if (this.props.showSelectionSectionFlag && this.props.selectSection)
      return (
        <View style={footerStyle.containerSelectItems}>
          <TouchableOpacity
            onPress={() => this.selectAllItems()}
            style={footerStyle.subContainerSelectItems}>
            <Image
              source={
                this.state.selectedAll
                  ? require('../../assetes/img/hc_select_all_active.png')
                  : require('../../assetes/img/hc_select_all.png')
              }
            />
            <Text style={footerStyle.labelStyleSelectSection}>Select all</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.saveSelectedItems()}
            style={footerStyle.subContainerSelectItems}>
            <Image
              source={
                this.state.saveItems
                  ? require('../../assetes/img/hc_select_one_active.png')
                  : require('../../assetes/img/hc_select_one.png')
              }
            />
            <Text style={footerStyle.labelStyleSelectSection}>Save</Text>
          </TouchableOpacity>
        </View>
      );
  }

  // ---- select all beds ----
  selectAllItems() {
    this.props.selectAllBeds(true);
    EventRegister.emit('getAllActiveRooms', 'change languege');
    this.setState({
      selectedAll: true,
    });
  }

  // ---- save selected items ----
  saveSelectedItems() {
    this.setState({
      saveItems: true,
    });
    this.props.showModalSaveSelectBeds(true);
  }

  // ---- navigation pages ----
  navigation(page) {
    switch (page) {
      case 'home':
        Actions.push('home');
        break;
      case 'beds':
        Actions.push('bedsList');
        break;
      case 'setting':
        Actions.push('setting');
        break;
    }
  }
}
const mapDisPatchToProps = (dispatch) => {
  return {
    selectAllBeds: (selectAllBedsFlag) =>
      dispatch(selectAllBeds(selectAllBedsFlag)),
    showModalSaveSelectBeds: (showModalSaveSelectBedsFlag) =>
      dispatch(showModalSaveSelectBeds(showModalSaveSelectBedsFlag)),
  };
};

const mapStateToProps = (state) => {
  return {
    showSelectionSectionFlag: state.beds.showSelectionSectionFlag,
    appLanguege: state.langueges.appLanguege,
  };
};

export default connect(mapStateToProps, mapDisPatchToProps)(AppFooter);
