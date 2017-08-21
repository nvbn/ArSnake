// @flow
import React, { PureComponent } from "react";
import { Text, View, TouchableOpacity, Modal } from "react-native";
import { noop } from "lodash";
import styles from "./styles";

export default class extends PureComponent {
  props: {
    visible: boolean,
    no: () => void,
    startGame: () => void,
  };

  render() {
    return (
      <Modal
        visible={this.props.visible}
        onRequestClose={noop}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>START A NEW GAME?</Text>
          <View style={styles.restartHolder}>
            <TouchableOpacity
              onPress={this.props.startGame}
              style={styles.button}
            >
              <Text style={styles.buttonText}>YES!</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.props.no} style={styles.button}>
              <Text style={styles.buttonText}>NO!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}
