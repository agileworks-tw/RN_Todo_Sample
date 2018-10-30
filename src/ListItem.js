import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default class ListItem extends Component {
  static propTypes = {
    item: PropTypes.string.isRequired,
  }

  render() {
    return (
      <View style={styles.todoItem}>
        <Text style={styles.todoText}>{this.props.item}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  todoItem: {
    alignItems: 'center',
    padding: 8,
    width: 320,
    borderBottomWidth: 1.5,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
  },
  todoText: {
    flex: 1,
  },
});