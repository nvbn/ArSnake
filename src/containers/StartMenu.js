// @flow
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import StartMenu from "../components/start-menu";
import { startGame } from "../actions";

const mapStateToProps = ({ game }) => ({ game });

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      startGame,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(StartMenu);
