// @flow
import React, { PureComponent } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import CommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/MaterialIcons";
import MapView from "react-native-maps";
import KeepAwake from "react-native-keep-awake";
import type { Game, Position } from "../../types";
import * as constants from "../../constants";
import GameOverModal from "./GameOverModal";
import RestartModal from "./RestartModal";
import HelpModal from "./HelpModal";
import styles, { ICON_SIZE, SNAKE_COLOR, CANDY_COLOR } from "./styles";

export default class extends PureComponent {
  props: {
    game: Game,
    position: Position,
    startGame: () => void,
    skipCandy: () => void,
  };

  state = {
    wantToRestart: false,
    showHelp: true,
  };

  toCandy = () => {
    if (this.map) {
      this.map.animateToCoordinate({
        latitude: this.props.game.candy.latitude,
        longitude: this.props.game.candy.longitude,
      });
    }
  };

  toHead = () => {
    if (this.map) {
      this.map.animateToCoordinate({
        latitude: this.props.position.latitude,
        longitude: this.props.position.longitude,
      });
    }
  };

  componentDidMount() {
    this.hideHelpTimeout = setTimeout(
      () => this.setState({ showHelp: false }),
      2000,
    );
  }

  componentWillUnmount() {
    if (this.hideHelpTimeout) {
      clearTimeout(this.hideHelpTimeout);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <KeepAwake />
        <View style={styles.header}>
          <Text style={styles.score}>
            SCORE: {this.props.game.score}
          </Text>
          <View style={styles.headerIconsContainer}>
            <TouchableOpacity
              style={styles.headerIcon}
              onPress={this.props.skipCandy}
            >
              <Icon name="navigate-next" size={ICON_SIZE} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.headerIcon}
              onPress={() =>
                this.setState({
                  wantToRestart: true,
                })}
            >
              <CommunityIcon name="reload" size={ICON_SIZE} />
            </TouchableOpacity>
          </View>
        </View>
        {this.props.position.latitude &&
          <MapView
            ref={map => (this.map = map)}
            style={styles.map}
            region={{
              latitude: this.props.position.latitude,
              longitude: this.props.position.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            zoomEnabled={false}
          >
            {this.props.game.snake.positions.length &&
              <MapView.Polyline
                coordinates={[
                  this.props.position,
                  ...this.props.game.snake.positions,
                ]}
                strokeColor={SNAKE_COLOR}
                strokeWidth={10}
              />}
            <MapView.Circle
              center={{
                latitude: this.props.position.latitude,
                longitude: this.props.position.longitude,
              }}
              radius={10}
              fillColor={SNAKE_COLOR}
              strokeColor={SNAKE_COLOR}
            />
            {this.props.game.candy.latitude &&
              <MapView.Circle
                center={{
                  latitude: this.props.game.candy.latitude,
                  longitude: this.props.game.candy.longitude,
                }}
                radius={10}
                fillColor={CANDY_COLOR}
                strokeColor={CANDY_COLOR}
              />}
          </MapView>}
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.overlayButton} onPress={this.toHead}>
            <Icon name="my-location" size={ICON_SIZE} color={SNAKE_COLOR} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.overlayButton} onPress={this.toCandy}>
            <Icon name="my-location" size={ICON_SIZE} color={CANDY_COLOR} />
          </TouchableOpacity>
        </View>

        <GameOverModal
          isOver={this.props.game.status === constants.STATUS_OVER}
          score={this.props.game.score}
          startGame={this.props.startGame}
        />

        <RestartModal
          visible={this.state.wantToRestart}
          no={() => this.setState({ wantToRestart: false })}
          startGame={this.props.startGame}
        />

        <HelpModal visible={this.state.showHelp} />
      </View>
    );
  }
}
