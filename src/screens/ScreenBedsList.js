import React from 'react';
import {Container} from 'native-base';
import {View, SafeAreaView, FlatList, Text, Alert} from 'react-native';
import AppFooter from '../components/layout/AppFooter';
import AppHeader from '../components/layout/AppHeader';
import {bedsList} from '../assetes/styles/screens/bedsList';
import ItemBed from '../components/Items/ItemBed';
import {connect} from 'react-redux';
import AppLoading from '../components/AppLoading';
import {
  showSelectionSection,
  selectAllBeds,
  showModalSaveSelectBeds,
  showLoading,
} from '../redux/actions';
import AppButtonPrimarySmall from '../components/buttons/AppButtonPrimarySmall';
import AppButtonInfo from '../components/buttons/AppButtonInfo';
import Modal from 'react-native-modal';
import Helper from '../utils/config/Helper';
import {restApi} from '../utils/config/restApi';
import {EventRegister} from 'react-native-event-listeners';

let selectedNewBeds = [];

class BedsList extends React.Component {
  constructor(props) {
    super(props);
    (this.state = {
      allBedList: [],
      allBedListActive: [],
      adminBeds: [],
      selectedBeds: [],
    }),
      this.props.showSelectionSection(false);
    this.props.selectAllBeds(false);
    this.props.showModalSaveSelectBeds(false);
    selectedNewBeds = [];
  }

  async componentWillMount() {
    this.getAllRooms();
    this.getAdminRooms();
    this.listener = EventRegister.addEventListener('changeLanguege', () => {
      this.handleLocalizationChange(this.props.appLanguege.value);
    });

    this.listener = EventRegister.addEventListener('getAllActiveRooms', () => {
      this.getAllRoomsActive();
    });
  }

  getAllRoomsActive() {
    let allListRooms = [];
    allListRooms = this.state.allBedListActive;
    let finalListRooms = [];

    allListRooms.map((item) => {
      finalListRooms.push({
        id: item.id,
        title: item.title,
        active: true,
        department_id: item.department_id,
      });
      selectedNewBeds.push(item.id);
    });

    this.setState({
      allBedListActive: finalListRooms,
    });
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
  }

  handleLocalizationChange = (lang) => {
    Helper.setI18nConfig(lang);
    this.forceUpdate();
  };

  //  ---- get all of rooms ----
  getAllRooms() {
    this.props.showLoading(true);
    Helper.makeRequest({
      url: restApi.GET_ROOM_LIST,
      method: 'GET',
      data: '',
    }).then((response) => {
      console.log('alllll', response);
      this.setState({
        allBedList: response.data,
      });
    });
  }

  // ---- get rooms of admin ----
  getAdminRooms() {
    this.props.showLoading(true);
    Helper.makeRequest({
      url: restApi.GET_ROOM_ACTIVE,
      method: 'GET',
      data: '',
    }).then((response) => {
      console.log('Injaaaaaa', response);
      this.state.adminBeds = response.data;
      this.getListAllRooms(this.state.allBedList, response.data);
    });
  }

  // ---- update  beds of admin ----
  updateAdminBeds() {
    let entitiesData = [];
    this.props.showLoading(true);
    if (this.props.selectAllBedsFlag) {
      this.state.allBedListActive.map((item) => {
        entitiesData.push(item.id);
      });
      entitiesData = {
        rooms: entitiesData,
      };
    } else {
      entitiesData = {
        rooms: selectedNewBeds,
      };
      this.props.selectAllBeds(false);
    }

    Helper.makeRequest({
      url: restApi.GET_BEDS_LIST,
      method: 'PUT',
      data: entitiesData,
    }).then((response) => {
      this.props.showLoading(false);
      if (response.errors == undefined) {
        this.props.showSelectionSection(false);
        this.props.showModalSaveSelectBeds(false);
        Helper.showToast('Rooms adding successfully');
        selectedNewBeds = [];
      } else {
        Helper.showToast('error');
      }
    });
  }

  //  ---- return active and un active Rooms ----
  getListAllRooms(allRooms, activeRooms) {
    let allListRooms = [];
    allRooms.map((item) => {
      allListRooms.push({
        id: item.id,
        title: item.title,
        active: false,
        department_id: item.department_id,
      });
    });

    activeRooms.map((item) => {
      for (let i = 0; i < allListRooms.length; i++) {
        if (allListRooms[i].id == item.id) {
          allListRooms[i].active = true;
        }
      }
    });

    this.setState({
      allBedListActive: allListRooms,
    });
    this.props.showLoading(false);
  }

  render() {
    return (
      <Container>
        <AppHeader
          showIconBack={true}
          backTitle=""
          mainTitle={Helper.translate('Choose your Rooms')}
          subTitle={
            this.state.allBedList.length +
            ' ' +
            Helper.translate('Rooms are available')
          }
          showTitleHeader={true}
        />
        <AppLoading />
        <SafeAreaView style={bedsList.container}>
          <FlatList
            data={this.state.allBedListActive}
            contentContainerStyle={{flexGrow: 1, alignItems: 'center'}}
            numColumns={2}
            renderItem={this.renderItems.bind(this)}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
        <Modal
          backdropColor="#ffffff"
          backdropOpacity={0.5}
          isVisible={this.props.showModalSaveSelectBedsFlag}>
          <View style={bedsList.modalSaveStyle}>
            <View style={bedsList.textContainerModal}>
              <Text style={bedsList.textModalStyle}>
                {Helper.translate('Do You confirm') +
                  ' ' +
                  selectedNewBeds.length +
                  ' ' +
                  Helper.translate('selected rooms')}
              </Text>
            </View>
            <View style={bedsList.buttonsContainerModal}>
              <AppButtonPrimarySmall
                title="cancele"
                buttonPressed={() => this.canceleSelected()}
              />
              <AppButtonInfo
                title={Helper.translate('save')}
                buttonPressed={() => this.saveSelectedItem()}
              />
            </View>
          </View>
        </Modal>
        <AppFooter active="beds" selectSection={true} />
      </Container>
    );
  }

  // ---- render item list ----
  renderItems(bed) {
    return <ItemBed selectedItemBed={() => this.selectedBed(bed)} bed={bed} />;
  }

  // ---- cancele ----
  canceleSelected() {
    this.props.showSelectionSection(false);
    this.props.selectAllBeds(false);
    this.props.showModalSaveSelectBeds(false);
  }

  // ---- save selected items ----
  saveSelectedItem() {
    this.updateAdminBeds();
  }

  // ---- selected bed ----
  selectedBed(room) {
    selectedNewBeds = [];

    allListRooms = this.state.allBedListActive;
    let finalListRooms = [];

    // console.log('FDDFD', allListRooms);

    this.state.allBedListActive.map((item) => {
      if (item.id === room.item.id) {
        finalListRooms.push({
          id: item.id,
          title: item.title,
          active: item.active ? false : true,
          department_id: item.department_id,
        });
      } else {
        finalListRooms.push(item);
      }
    });

    this.setState({
      selectedBeds: [],
    });

    finalListRooms.map((item) => {
      if (item.active) {
        selectedNewBeds.push(item.id);
      }
    });

    // if (!room.item.active) selectedNewBeds.push(room.item.id);
    // else selectedNewBeds.pop(room.item.id);

    this.setState({
      allBedListActive: finalListRooms,
    });
    this.props.showSelectionSection(true);
    this.setState({
      selectedBeds: selectedNewBeds,
    });
  }
}

const mapDisPatchToProps = (dispatch) => {
  return {
    showSelectionSection: (showSelectionSectionFlag) =>
      dispatch(showSelectionSection(showSelectionSectionFlag)),
    selectAllBeds: (selectAllBedsFlag) =>
      dispatch(selectAllBeds(selectAllBedsFlag)),
    showModalSaveSelectBeds: (showModalSaveSelectBedsFlag) =>
      dispatch(showModalSaveSelectBeds(showModalSaveSelectBedsFlag)),
    showLoading: (showLoadingFlag) => dispatch(showLoading(showLoadingFlag)),
  };
};

const mapStateToProps = (state) => {
  return {
    showModalSaveSelectBedsFlag: state.beds.showModalSaveSelectBedsFlag,
    appLanguege: state.langueges.appLanguege,
    selectAllBedsFlag: state.beds.selectAllBedsFlag,
  };
};

export default connect(mapStateToProps, mapDisPatchToProps)(BedsList);
