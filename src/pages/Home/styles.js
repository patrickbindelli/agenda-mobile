import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161618",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    gap: 10,
  },
  scrollView: {
    rowGap: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  searchBarContainer: {
    width: "100%",
    flexDirection: "row",
    gap: 5,
  },
  text: {
    color: "#fff",
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
  },
  content: {
    flex: 1,
    width: "100%",
    alignContent: "center",
  },
});

export default styles;
