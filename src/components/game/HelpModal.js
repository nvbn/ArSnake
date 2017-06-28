// @flow
import React, { PureComponent } from "react";
import { Text, View, Modal } from "react-native";
import { noop } from "lodash";
import styles, { SNAKE_COLOR, CANDY_COLOR } from "./styles";

export default class extends PureComponent {
  props: {
    visible: boolean,
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
          <View style={styles.helpLine}>
            <View
              style={[styles.helpCircle, { backgroundColor: SNAKE_COLOR }]}
            />
            <Text style={styles.modalTitle}>SNAKE</Text>
          </View>
          <View style={styles.helpLine}>
            <View
              style={[styles.helpCircle, { backgroundColor: CANDY_COLOR }]}
            />
            <Text style={styles.modalTitle}>CANDY</Text>
          </View>
        </View>
      </Modal>
    );
  }
}
