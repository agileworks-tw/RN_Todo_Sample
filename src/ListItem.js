import React, { Component } from "react";
import {
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
  PanResponder
} from "react-native";
import PropTypes from "prop-types";
const { width } = Dimensions.get("window");
export default class ListItem extends Component {
  static propTypes = {
    item: PropTypes.string.isRequired
  };

  state = {
    position: new Animated.ValueXY({ x: 0, y: 0 })
  };

  gestureDelay = -35;

  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => false,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderTerminationRequest: (evt, gestureState) => false,
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dx > 35) {
        this.props.setEnableScrolling(false);
        let newX = gestureState.dx + this.gestureDelay;
        this.state.position.setValue({ x: newX, y: 0 });
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx < 150) {
        Animated.timing(this.state.position, {
          toValue: { x: 0, y: 0 },
          duration: 150
        }).start(() => {
          this.props.setEnableScrolling(true);
        });
      } else {
        Animated.timing(this.state.position, {
          toValue: { x: width, y: 0 },
          duration: 300
        }).start(() => {
          this.props.delete();
          this.props.setEnableScrolling(true);
        });
      }
    }
  });

  render() {
    console.log(this.panResponder);
    return (
      <Animated.View
        style={[styles.todoItem, this.state.position.getLayout()]}
        {...this.panResponder.panHandlers}
        {...this.props}
      >
        <Text style={styles.todoText}>{this.props.item}</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  todoItem: {
    alignItems: "center",
    padding: 8,
    height: 40,
    width: 320,
    borderBottomWidth: 1.5,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "row"
  },
  todoText: {
    flex: 1
  }
});
