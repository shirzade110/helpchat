import React from 'react';
import {Container, TabHeading} from 'native-base';
import AppHeader from '../components/layout/AppHeader';
import {
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {detailesRequest} from '../assetes/styles/screens/detailesRequest';
import {connect} from 'react-redux';
import AppLoading from '../components/AppLoading';
import {showLoading} from '../redux/actions';
import Helper from '../utils/config/Helper';
import {restApi} from '../utils/config/restApi';
import {labelStyle} from '../assetes/styles/components/label';
import ImagesPath from '../utils/config/ImagePaths';
import {SvgCssUri} from 'react-native-svg';
import {Actions} from 'react-native-router-flux';
import {EventRegister} from 'react-native-event-listeners';

class DetailesRequest extends React.Component {
  constructor(props) {
    super(props);

    console.log('INJAAAAAAA', this.props.navigation.getParam('where', ''));
    this.state = {
      request_data: this.props.navigation.getParam('request_data', ''),
      request_where: this.props.navigation.getParam('where', ''),
      requestStatus: this.getStatus(
        this.props.navigation.getParam('request_data', '').status_id,
      ),
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

  getStatus(state) {
    switch (state) {
      case 0:
        return 'DRAFT';
        break;
      case 1:
        return 'ACCEPT';
        break;
      case 2:
        return 'DONE';
        break;
      case 3:
        return 'SHARE';
        break;
    }
  }

  render() {
    const infoRequest = this.state.request_data;
    console.log(this.state.request_data.icon);
    let requestTime = this.state.request_data.created_at.replace(/-/g, '/');
    return (
      <Container>
        <AppHeader
          showIconBack={true}
          backTitle={Helper.translate('Return')}
          mainTitle={Helper.translate('Request of')}
          subTitle={
            this.state.request_data.room_title +
            '-' +
            this.state.request_data.entity_title
          }
          showTitleHeader={true}
        />
        <AppLoading />
        <View style={detailesRequest.container}>
          <View style={detailesRequest.containerRequetInfo}>
            <View
              style={
                this.state.requestStatus === 'REJECT'
                  ? detailesRequest.containerRejectRequest
                  : detailesRequest.containerImage
              }>
              {this.showStatusRequest()}
            </View>
            <View style={detailesRequest.containerLabels}>
              <Text style={detailesRequest.labelStyle}>
                {infoRequest.item_title}
              </Text>
              <Text style={detailesRequest.subLabelStyle}>
                {infoRequest.item_description}
              </Text>
            </View>
            <View style={detailesRequest.containerTime}>
              <Text style={detailesRequest.timeStyle}>
                {Helper.getDiffrenceTime(requestTime)}
              </Text>
            </View>
          </View>
          <View style={detailesRequest.containerAction}>
            <TouchableOpacity
              onPress={() => this.changeStateRequests('DONE')}
              style={
                Platform.OS == 'ios'
                  ? detailesRequest.buttonStyles
                  : detailesRequest.buttonStylesAndroid
              }>
              <TouchableOpacity
                onPress={() =>
                  this.state.requestStatus === 'DONE'
                    ? this.changeStateRequests('DRAFT')
                    : null
                }
                style={detailesRequest.containerIconButton}>
                <Image
                  source={
                    this.state.requestStatus === 'DONE'
                      ? ImagesPath.img_reject
                      : ImagesPath.img_tick
                  }
                />
              </TouchableOpacity>
              <Text style={detailesRequest.labelButton}>
                {Helper.translate('Request Done')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.changeStateRequests('SHARED')}
              style={
                this.state.requestStatus === 'REJECT'
                  ? detailesRequest.activeButtonStyles
                  : this.state.requestStatus === 'DONE'
                  ? detailesRequest.unActiveButtonStyles
                  : Platform.OS == 'ios'
                  ? detailesRequest.buttonStyles
                  : detailesRequest.buttonStylesAndroid
              }>
              <TouchableOpacity style={detailesRequest.containerIconButton}>
                <Image source={ImagesPath.img_not_tick} />
              </TouchableOpacity>
              <Text style={detailesRequest.labelButton}>
                {Helper.translate('Share Request')}{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Container>
    );
  }

  // ----  change state requests  ----
  changeStateRequests(stateRequest) {
    switch (stateRequest) {
      case 'DRAFT':
        this.setState({
          requestStatus: 'DRAFT',
        });
        {
          // this.props.showLoading(true);
          this.changeRequestStateServer(1, this.state.request_data.id);
        }
        break;
      case 'DONE':
        {
          // this.props.showLoading(true);
          this.changeRequestStateServer(2, this.state.request_data.id);
        }

        break;
      case 'SHARED':
        {
          // this.props.showLoading(true);
          this.changeRequestStateServer(4, this.state.request_data.id);
        }

        break;
    }
  }

  // ---- show status request ----
  showStatusRequest() {
    switch (this.state.requestStatus) {
      case 'DRAFT':
        return (
          <SvgCssUri
            width="80%"
            height="80%"
            uri={Helper.getImageUrl(this.state.request_data.icon)}
          />
        );
        break;
      case 'DONE':
        return (
          <View style={detailesRequest.containerAcceptRequest}>
            <Image source={ImagesPath.img_big_tick} />
          </View>
        );
        break;
      case 'ACCEPT':
        return (
          <SvgCssUri
            width="80%"
            height="80%"
            uri={Helper.getImageUrl(this.state.request_data.icon)}
          />
        );
        break;
      case 'SHARE':
        return (
          <SvgCssUri
            width="80%"
            height="80%"
            uri={Helper.getImageUrl(this.state.request_data.icon)}
          />
        );
        break;
    }
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
      console.log(response);
      if (response.data.result) {
        this.props.showLoading(false);
        this.changeIcon(state);
      }
    });
  }

  // ---- change icon ----
  changeIcon(state) {
    switch (state) {
      case 1:
        this.setState({
          requestStatus: 'ACCEPT',
        });
        Helper.showToast('Request is Accept');
        break;
      case 2:
        this.setState({
          requestStatus: 'DONE',
        });
        Helper.showToast('Request is Done');
        break;
      case 4:
        this.setState({
          requestStatus: 'SHARE',
        });
        Helper.showToast('Request is Share');
        break;
    }
    Actions.pop();
    if (this.state.request_where == 'Home')
      EventRegister.emit('getInformationHomePage', 'get requests');
    else EventRegister.emit('getAllRequests', 'get requests');
  }
}

const mapDisPatchToProps = (dispatch) => {
  return {
    showLoading: (showLoadingFlag) => dispatch(showLoading(showLoadingFlag)),
  };
};

const mapStateToProps = (state) => {
  return {
    showSelectionSectionFlag: state.beds.showSelectionSectionFlag,
    appLanguege: state.langueges.appLanguege,
  };
};

export default connect(mapStateToProps, mapDisPatchToProps)(DetailesRequest);
