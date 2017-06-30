// @flow
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Game from "../components/game";
import { startGame, requestCandy } from "../actions";

const mapStateToProps = ({ game, position }) => ({
  game,
  position,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      startGame,
      requestCandy,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Game);
