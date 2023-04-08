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
    gap: 5,
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
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
});

export default styles;
