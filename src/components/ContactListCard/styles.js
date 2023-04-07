import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  cardContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    borderRadius: 10,
  },
  nameContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 10,
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
  catalogTextContainer: {
    width: "100%",
    paddingLeft: 5,
  },
  catalogText: {
    color: "#A09FA6",
    fontSize: 15,
  },
  tinyLogo: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },
});

export default styles;
