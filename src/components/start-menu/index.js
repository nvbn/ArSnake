// @flow
import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

export default class extends PureComponent {
  props: {
    startGame: () => void,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>AR SNAKE</Text>
        <TouchableOpacity onPress={this.props.startGame} style={styles.button}>
          <Text style={styles.buttonText}>START GAME</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
