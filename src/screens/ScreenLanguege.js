import React from 'react';
import {View, Text, Image, FlatList, Alert} from 'react-native';
import {languege} from '../assetes/styles/screens/languege';
import {Actions} from 'react-native-router-flux';
import {setLanguege} from '../redux/actions';
import {Container} from 'native-base';
import AppHeader from '../components/layout/AppHeader';
import ItemLanguege from '../components/Items/ItemLanguege';
import Headers from '../utils/config/Helper';
import * as RNLocalize from 'react-native-localize';
import {EventRegister} from 'react-native-event-listeners';
import {connect} from 'react-redux';
import Helper from '../utils/config/Helper';
import AppFooter from '../components/layout/AppFooter';

class Languege extends React.Component {
  constructor(props) {
    super(props);
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
    const LanguegeList = [
      {
        country: 'Deutsch',
        value: 'gr',
        id: '3',
      },
      // {
      //   country: 'Français',
      //   value: 'fc',
      //   id: '2',
      // },
      {
        country: 'English',
        value: 'en',
        id: '1',
      },
      // {
      //   country: 'Español',
      //   value: 'es',
      //   id: '4',
      // },
    ];
    return (
      <Container>
        <AppHeader
          showIconBack={true}
          backTitle=""
          mainTitle={Helper.translate('Choose your Language')}
          subTitle=""
          dontShowIcon={true}
          showTitleHeader={true}
        />
        <View style={languege.container}>
          <FlatList
            data={LanguegeList}
            renderItem={this.renderItems.bind(this)}
            keyExtractor={(item) => item.id}
          />
        </View>
        <AppFooter active="setting" />
      </Container>
    );
  }

  async componentDidMount() {
    await Helper.getData('languege').then((responseData) => {
      if (
        responseData === null ||
        responseData === 'undefined' ||
        responseData === ''
      ) {
        this.props.setLanguege({id: '1', value: 'en', country: 'English'});
      } else {
        this.props.setLanguege(responseData);
      }
    });
  }

  // ---- render item list ----
  renderItems(languege) {
    return (
      <ItemLanguege
        languege={languege}
        onPressItem={() => this.setLanguege(languege)}
      />
    );
  }

  // ---- set languege ----
  setLanguege(languege) {
    this.props.setLanguege(languege.item);
    console.log(languege.item);
    this.handleLocalizationChange(languege.item.value);
    Helper.setData('languege', languege.item);
    setTimeout(() => this.changeLanguege(), 100);
  }

  changeLanguege() {
    EventRegister.emit('changeLanguege', 'change languege');
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

export default connect(mapStateToProps, mapDisPatchToProps)(Languege);
