import React from 'react';
import {Container} from 'native-base';
import {View, Image, Text, TouchableOpacity, Alert} from 'react-native';
import AppFooter from '../components/layout/AppFooter';
import AppHeader from '../components/layout/AppHeader';
import ItemHomeSlider from '../components/Items/ItemHomeSlider';
import {home} from '../assetes/styles/screens/home';
import Carousel from 'react-native-snap-carousel';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {restApi} from '../utils/config/restApi';
import {showLoading} from '../redux/actions';
import AppLoading from '../components/AppLoading';
import Helper from '../utils/config/Helper';
import {EventRegister} from 'react-native-event-listeners';
import OneSignal from 'react-native-onesignal';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      allRequestNumber: 0,
      myRequestNumber: 0,
      currentRequests: [],
      showMessage: false,
    };
  }

  async componentWillMount() {
    this.getRequests();
    this.getMyRequestsNumber();
    this.getAllRequestsNumber();

    this.listener = EventRegister.addEventListener('changeLanguege', () => {
      this.handleLocalizationChange(this.props.appLanguege.value);
    });
    this.listener = EventRegister.addEventListener(
      'getInformationHomePage',
      () => {
        this.getRequests();
        this.getMyRequestsNumber();
        this.getAllRequestsNumber();
        this.props.showLoading(false);
      },
    );

    OneSignal.setNotificationWillShowInForegroundHandler(
      (notifReceivedEvent) => {
        this.getRequests();
        this.getMyRequestsNumber();
        this.getAllRequestsNumber();
        this.props.showLoading(false);

        let notif = notifReceivedEvent.getNotification();
        setTimeout(() => notifReceivedEvent.complete(notif), 0);
      },
    );
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
  }

  handleLocalizationChange = (lang) => {
    Helper.setI18nConfig(lang);
    this.forceUpdate();
  };
  // ---- get requests ----
  getRequests() {
    this.props.showLoading(true);
    Helper.makeRequest({
      url: restApi.GET_MY_REQUEST,
      method: 'GET',
    }).then((response) => {
      if (response.data.length > 0) {
        this.setState({
          currentRequests: response.data,
        });
        this.props.showLoading(false);
      } else {
        this.setState({
          showMessage: true,
        });
      }
    });
    this.props.showLoading(false);
  }

  // ---- get number request ----
  getMyRequestsNumber() {
    this.props.showLoading(true);
    Helper.makeRequest({
      url: restApi.GET_NUMBER_MY_REQUEST,
      method: 'GET',
    }).then((response) => {
      this.props.showLoading(false);
      this.setState({
        myRequestNumber: response,
      });
    });
    this.props.showLoading(false);
  }

  // ---- get number request ----
  getAllRequestsNumber() {
    this.props.showLoading(true);
    Helper.makeRequest({
      url: restApi.GET_NUMBER_ALL_REQUEST,
      method: 'GET',
    }).then((response) => {
      this.props.showLoading(false);
      this.setState({
        allRequestNumber: response,
      });
    });
    this.props.showLoading(false);
  }

  _renderItem({item, index}) {
    return <ItemHomeSlider item={item} />;
  }

  navigation(id) {
    if (id === 1) Actions.allRequests();
    else if (id === 2) Actions.myRequests();
  }

  render() {
    return (
      <Container>
        <AppHeader showIconBack={false} showTitleHeader={false} />
        <AppLoading />
        <View style={home.container}>
          <View style={home.topSection}>
            <View style={home.containerTotalPatient}>
              <View style={home.countPatient}>
                <Text style={home.countPatientText}>
                  {this.state.allRequestNumber}
                </Text>
              </View>
              <View>
                <Text style={home.countPatientTextTitle}>
                  {Helper.translate('Patients are logged')}
                </Text>
                <Text style={home.countPatientTextTitle}>
                  {Helper.translate('into Helpchat')}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => this.navigation(1)}
              style={home.containerTotalPatientRequest}>
              <View>
                <Text style={home.titleStyle}>
                  {Helper.translate('All Patients')}
                </Text>
                <Text style={home.titleStyle}>
                  {' '}
                  {Helper.translate('Requests')}
                </Text>
              </View>
              <View>
                <Text style={home.valueStyle}>
                  {this.state.allRequestNumber}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.navigation(2)}
              style={home.containerTotalPatientDefineRequest}>
              <View>
                <Text style={home.titleStyle}>
                  {Helper.translate('All Patients')}
                </Text>
                <Text style={home.titleStyle}>
                  {Helper.translate('Your Patients')}
                </Text>
              </View>
              <View>
                <Text style={home.valueStyle}>
                  {this.state.currentRequests.length}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={home.bottomSection}>
            <View style={home.containerCurentRequest}>
              <Text style={home.curentRequestTitle}>
                {Helper.translate('Current requests')}
              </Text>
              <View style={home.curentRequestNav}>
                <TouchableOpacity
                  onPress={() => {
                    this._carousel.snapToPrev();
                  }}
                  style={home.containerArrowBack}>
                  <Text>
                    <Image
                      source={require('../assetes/img/hc_arrow_back_right_home_slider.png')}
                    />
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this._carousel.snapToNext();
                  }}>
                  <Text>
                    <Image
                      source={require('../assetes/img/hc_arrow_right_home_slider.png')}
                    />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={
                this.state.currentRequests.length > 0
                  ? {flex: 1, flexDirection: 'row', justifyContent: 'center'}
                  : {display: 'none'}
              }>
              <Carousel
                layout={'default'}
                ref={(c) => {
                  this._carousel = c;
                }}
                data={this.state.currentRequests}
                sliderWidth={166}
                itemWidth={166}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                renderItem={this._renderItem.bind(this)}
                onSnapToItem={(index) => this.setState({activeIndex: index})}
              />
            </View>

            <View
              style={
                this.state.showMessage
                  ? {
                      flex: 1,
                      marginTop: 20,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderColor: '#F5F5F5',
                      borderWidth: 1,
                      borderColor: '#F5F5F5',
                      borderRadius: 10,
                      height: 230,
                    }
                  : {
                      display: 'none',
                    }
              }>
              <Text>{Helper.translate('Message No requests')}</Text>
            </View>
          </View>
        </View>
        <AppFooter active="home" />
      </Container>
    );
  }
}

const mapDisPatchToProps = (dispatch) => {
  return {
    showLoading: (showLoadingFlag) => dispatch(showLoading(showLoadingFlag)),
  };
};

const mapStateToProps = (state) => {
  return {
    appLanguege: state.langueges.appLanguege,
  };
};

export default connect(mapStateToProps, mapDisPatchToProps)(Home);
