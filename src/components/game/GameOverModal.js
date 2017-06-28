// @flow
import React, { PureComponent } from "react";
import { Text, View, TouchableOpacity, Modal } from "react-native";
import { noop } from "lodash";
import styles from "./styles";

export default class extends PureComponent {
  props: {
    isOver: boolean,
    score: number,
    startGame: () => void,
  };

  render() {
    return (
      <Modal
        visible={this.props.isOver}
        onRequestClose={noop}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>GAME OVER</Text>
          <Text style={styles.finalScore}>
            SCORE: {this.props.score}
          </Text>
          <TouchableOpacity
            onPress={this.props.startGame}
            style={styles.button}
          >
            <Text style={styles.buttonText}>TRY AGAIN?</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}
