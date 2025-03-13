import React from 'react';
import {
  View,
  Text,
  Dimensions,
  Animated,
  PanResponder,
  TouchableOpacity,
  Easing,
  Image,
  Alert,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {itemRequest} from '../../assetes/styles/components/items/itemRequestStyle';
import {BoxShadow} from 'react-native-shadow';
import {SvgCssUri} from 'react-native-svg';
import Helper from '../../utils/config/Helper';

const SCREEN_WIDTH = Dimensions.get('window').width;
const RIGHT_BUTTON_THRESHOLD = -SCREEN_WIDTH / 15;
const FORCE_TO_OPEN_THRESHOLD = SCREEN_WIDTH / 3.5;
const FORCING_DURATION = 350;
const SCROLL_THRESHOLD = SCREEN_WIDTH / 15;
const LEFT_BUTTONS_THRESHOLD = SCREEN_WIDTH / 15;

class ItemRequest extends React.Component {
  constructor(props) {
    super(props);
    console.log('TESTSTSTST', this.props.request.item);
    this.state = {
      statusOrder: this.getStatus(this.props.request.item.status_id),
    };

    const position = new Animated.ValueXY(0, 0);
    this.scrollStopped = false;

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => false, // we don't want the item to be animated with a touch
      onMoveShouldSetPanResponder: () => true, // we want to animate the item with a movement
      onResponderTerminationRequest: () => false,
      onPanResponderGrant: () => {
        this.position.setOffset({x: this.position.x._value, y: 0}); // we specify the offset to continue swiping from the place where user left.
        this.position.setValue({x: 0, y: 0}); // clearing the position
      },
      onPanResponderMove: (event, gesture) => {
        if (gesture.dx >= SCROLL_THRESHOLD) {
          this.enableScrollView(true);
          const x = gesture.dx - SCROLL_THRESHOLD;
          this.position.setValue({x, y: 0});
        } else if (gesture.dx <= -SCROLL_THRESHOLD) {
          this.enableScrollView(true);
          const x = gesture.dx + SCROLL_THRESHOLD;
          this.position.setValue({x, y: 0});
        }
      },
      onPanResponderRelease: (event, gesture) => {
        this.position.flattenOffset(); // adding animated value to the offset value then it reset the offset to 0.
        if (gesture.dx > 0) {
          this.userSwipedRight(gesture);
        } else {
          this.userSwipedLeft(gesture);
        }
      },
      onPanResponderTerminate: () => {
        Animated.spring(this.position, {
          toValue: {x: 0, y: 0},
        }).start();
      },
    });

    this.position = position;
    this.panResponder = panResponder;
  }

  getRightButtonProps() {
    const opacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH, -120, -35],
      outputRange: [0, 1, 0.25],
    });
    const width = this.position.x.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });

    return {
      opacity,
      width,
    };
  }

  getLeftButtonProps() {
    const opacity = this.position.x.interpolate({
      inputRange: [35, 75, 320],
      outputRange: [0, 1, 0.25],
    });
    const width = this.position.x.interpolate({
      inputRange: [0, 70],
      outputRange: [0, 70],
    });
    return {
      opacity,
      width,
    };
  }

  resetPosition() {
    Animated.timing(this.position, {
      toValue: {x: 0, y: 0},
      duration: 200,
    }).start();
  }

  resetPositionLeft() {
    Animated.timing(this.position, {
      toValue: {x: -400, y: 0},
      duration: 200,
    }).start();
  }

  completeSwipe(dimension, callback) {
    console.log(dimension);
    const x = dimension === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.position, {
      toValue: {x, y: 0},
      duration: FORCING_DURATION,
    }).start();
    callback();
  }

  enableScrollView(isEnabled) {
    if (this.scrollView !== isEnabled) {
      this.props.swipingCheck(isEnabled);
      this.scrollView = isEnabled;
    }
  }

  userSwipedLeft(gesture) {
    console.log(gesture.moveX);
    console.log(SCREEN_WIDTH / 1.5);
    if (gesture.moveX < 195) {
      // this.resetPositionLeft();
      this.completeSwipe('left', this.props.leftButtonPressed.bind(this));
    }
    // if(gesture.moveX)
    // if (gesture.dx >= FORCE_TO_OPEN_THRESHOLD) {
    //   this.completeSwipe('left', this.props.rightButtonPressed.bind(this));
    // } else if (
    //   gesture.dx <= -LEFT_BUTTONS_THRESHOLD &&
    //   gesture.dx - FORCE_TO_OPEN_THRESHOLD
    // ) {
    //   this.showButton('left');
    // } else {
    //   this.resetPositionLeft();
    // }
  }

  userSwipedRight(gesture) {
    console.log(gesture.moveX);
    if (gesture.moveX > 280) {
      this.completeSwipe('right', this.props.rightButtonPressed.bind(this));
    }
    // else {
    //   this.showButton('right');
    // }
    // alert('SSS');
    // if (gesture.dx >= FORCE_TO_OPEN_THRESHOLD) {
    //   this.completeSwipe('right', this.props.leftButtonPressed.bind(this));
    // } else if (
    //   gesture.dx >= LEFT_BUTTONS_THRESHOLD &&
    //   gesture.dx < FORCE_TO_OPEN_THRESHOLD
    // ) {
    //   this.showButton('right');
    // } else {
    //   this.resetPosition();
    // }
  }

  showButton(side) {
    const x = side === 'right' ? SCREEN_WIDTH / 4 : -SCREEN_WIDTH / 4; // 4 from 4.5 // BURASI DEĞİŞTİRİLECEK
    Animated.timing(this.position, {
      toValue: {x, y: 0},
      duration: 400,
      easing: Easing.out(Easing.quad),
    }).start(() => this.enableScrollView(false));
  }

  showDetaileRequestPage(item) {
    Actions.push('detailesRequest', {request_data: item});
  }

  render() {
    const infoRequest = this.props.request.item;
    return (
      <View>
        <Animated.View
          style={[itemRequest.leftButtonContainer, this.getLeftButtonProps()]}>
          <TouchableOpacity
            onPress={() =>
              this.completeSwipe('right', () => this.props.leftButtonPressed())
            }>
            <Text style={itemRequest.textStyle} numberOfLines={1}>
              Re-Activate Request
            </Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[itemRequest.valueContainer, this.position.getLayout()]}
          {...this.panResponder.panHandlers}>
          <TouchableOpacity
            onPress={() => this.showDetaileRequestPage(this.props.request.item)}
            style={[
              itemRequest.containerStyle,
              this.getValueStyle(this.props.request.item.status_id),
            ]}>
            <View style={itemRequest.roomContainer}>
              <Text style={itemRequest.labelStyle} numberOfLines={1}>
                {infoRequest.room_title}
              </Text>
              <Text style={itemRequest.labelStyle} numberOfLines={1}>
                {infoRequest.entity_title}
              </Text>
            </View>
            <View style={itemRequest.serviceContainer}>
              <View style={itemRequest.serviceValue}>
                <View style={itemRequest.titleService}>
                  <Text style={itemRequest.labelStyle} numberOfLines={1}>
                    {infoRequest.item_title.substring(0, 25)}
                  </Text>
                  <Text style={itemRequest.subLabeleStyle} numberOfLines={1}>
                    {/* {infoRequest.description} */}
                  </Text>
                  <Text style={itemRequest.timeLabelStyle}>
                    {infoRequest.created_at_human}
                  </Text>
                </View>
                <View style={itemRequest.imageService}>
                  {this.showImageRequest(this.state.statusOrder)}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[
            itemRequest.rightButtonContainer,
            this.getRightButtonProps(),
          ]}>
          <TouchableOpacity
            onPress={() =>
              this.completeSwipe('left', () => this.props.leftButtonPressed())
            }>
            <Text style={itemRequest.textStyle} numberOfLines={1}>
              Request Done
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
  // ---- get value style ----
  getValueStyle(statusId) {
    if (statusId == 2) return itemRequest.valueStyleAccept;
    else if (statusId == 1) return itemRequest.valueStyle;
    else if (statusId == 0) return itemRequest.valueStyle;
    else if (statusId == 3) return itemRequest.valueStyle;
    else if (statusId == 4) return itemRequest.valueStyle;
  }
  // ---- get status ----
  getStatus(statusId) {
    if (statusId == 2) return 'Done';
    else if (statusId == 0) return 'Accepted';
    else if (statusId == 4) return 'Shared';
  }

  // ---- show image request ----
  showImageRequest(status) {
    if (status == 'Done')
      return (
        <View style={itemRequest.imageAcceptServiceContainer}>
          <Image source={require('../../assetes/img/hc_tick_items.png')} />
        </View>
      );
    else
      return (
        <View style={itemRequest.imageServiceContainer}>
          <SvgCssUri
            width="80%"
            height="80%"
            uri={Helper.getImageUrl(this.props.request.item.icon)}
          />
        </View>
      );
  }
}

export default ItemRequest;
