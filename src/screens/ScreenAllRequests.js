import React from 'react';
import {Container} from 'native-base';
import {
  View,
  FlatList,
  SafeAreaView,
  UIManager,
  LayoutAnimation,
  Text,
  Alert,
} from 'react-native';
import AppFooter from '../components/layout/AppFooter';
import AppHeader from '../components/layout/AppHeader';
import {allRequests} from '../assetes/styles/screens/allRequests';
import ItemRequest from '../components/Items/ItemRequest';
import {showLoading} from '../redux/actions';
import AppLoading from '../components/AppLoading';
import Helper from '../utils/config/Helper';
import {restApi} from '../utils/config/restApi';
import {EventRegister} from 'react-native-event-listeners';
import {connect} from 'react-redux';
import OneSignal from 'react-native-onesignal';

class AllRequests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestList: [],
      refreshing: false,
      swiping: false,
      showMessage: false,
    };
  }

  componentWillMount() {
    this.getRequests();
    this.listener = EventRegister.addEventListener('getAllRequests', () => {
      this.getRequests();
      this.setState({
        requestList: [],
      });
    });

    OneSignal.setNotificationWillShowInForegroundHandler(
      (notifReceivedEvent) => {
        this.getRequests();
        this.setState({
          requestList: [],
        });

        let notif = notifReceivedEvent.getNotification();
        setTimeout(() => notifReceivedEvent.complete(notif), 0);
      },
    );
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
  }

  doneRequest(item) {
    this.changeRequestStateServer(2, item.id);
  }

  reactiveRequest(item) {
    this.changeRequestStateServer(4, item.id);
  }

  renderItems(request) {
    return (
      <ItemRequest
        key={request.id}
        swipingCheck={(swiping) => this.setState({swiping})}
        request={request}
        id={request.id}
        leftButtonPressed={() => this.doneRequest(request.item)}
        rightButtonPressed={() => this.reactiveRequest(request.item)}
      />
    );
  }

  // ---- accept request ----
  changeRequestStateServer(state, requestId) {
    var data = {
      request_item_id: requestId,
      status: state,
    };

    Helper.makeRequest({
      url: restApi.ACCEPT_ORDERS,
      method: 'PUT',
      data: data,
    }).then((response) => {
      if (response.data.result) {
        this.setState({
          requestList: [],
        });
        this.props.showLoading(false);
      }
      if (state == 2) {
        Helper.showToast('This Request Done');
      } else if (state == 4) {
        Helper.showToast('This Request Shared');
      }
      this.getRequests();
    });
  }

  // ---- get requests ----
  getRequests() {
    this.props.showLoading(true);
    Helper.makeRequest({
      url: restApi.GET_ALL_REQUEST,
      method: 'GET',
      type: '',
      data: '',
    }).then((response) => {
      if (response.data.length > 0) {
        this.setState({
          requestList: response.data,
        });
      } else {
        this.setState({
          showMessage: true,
        });
      }
      this.props.showLoading(false);
    });
  }

  render() {
    return (
      <Container>
        <AppHeader
          showIconBack={true}
          backTitle="         "
          mainTitle="Alle Anfragen"
          subTitle={this.state.requestList.length + 'Patienten im Helpchat'}
          showTitleHeader={true}
        />
        <AppLoading />
        <SafeAreaView style={allRequests.container}>
          <FlatList
            style={
              this.state.requestList.length > 0
                ? {margin: 5}
                : {display: 'none'}
            }
            data={this.state.requestList}
            renderItem={this.renderItems.bind(this)}
          />
          <View
            style={
              this.state.showMessage
                ? allRequests.messageContainer
                : {display: 'none'}
            }>
            <Text>{Helper.translate('Message No requests')}</Text>
          </View>
        </SafeAreaView>

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

export default connect(null, mapDisPatchToProps)(AllRequests);
