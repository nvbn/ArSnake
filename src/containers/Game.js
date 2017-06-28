// @flow
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Game from "../components/game";
import { startGame, skipCandy } from "../actions";

const mapStateToProps = ({ game, position }) => ({
  game,
  position,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      startGame,
      skipCandy,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Game);
