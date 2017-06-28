import { StyleSheet } from "react-native";

export const ICON_SIZE = 30;

export const SNAKE_COLOR = "#00a1ff";

export const CANDY_COLOR = "#ff6470";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
  },
  headerIconsContainer: {
    flexDirection: "row",
  },
  headerIcon: {
    paddingRight: 5,
  },
  score: {
    fontSize: 20,
  },
  map: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  overlayButton: {
    padding: 5,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "space-between",
    marginTop: 150,
    marginBottom: 150,
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  modalTitle: {
    fontSize: 50,
  },
  finalScore: {
    fontSize: 40,
  },
  button: {
    backgroundColor: "#00a1ff",
    padding: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 40,
  },
  restartHolder: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  helpLine: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  helpCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
