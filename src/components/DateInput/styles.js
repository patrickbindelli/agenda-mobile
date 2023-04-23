import { shade } from "polished";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 5,
    paddingVertical: 10,
  },
  text: {
    color: "#A09FA6",
    fontSize: 15,
  },
  textActive: {
    color: "#fff",
    fontSize: 15,
  },
  input: {
    width: "100%",

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
    color: "#fff",
    fontSize: 15,
  },
  errorText: {
    color: "#E54D2E",
    fontSize: 12,
  },
});

export default styles;
