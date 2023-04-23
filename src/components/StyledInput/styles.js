import { shade } from "polished";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 5,
    paddingVertical: 5,
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  text: {
    color: "#A09FA6",
    fontSize: 15,
  },
  errorText: {
    color: "#E54D2E",
    fontSize: 12,
  },
  input: {
    flex: 1,
    height: 30,
    color: "#fff",
    fontSize: 15,
  },
  inputOnFocus: {
    flex: 1,
    height: 30,
    color: "#fff",
    fontSize: 15,
  },
});

export default styles;
