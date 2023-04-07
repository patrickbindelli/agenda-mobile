import { StyleSheet } from "react-native";
import { shade } from "polished";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161618",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: shade(0.2, "#2C2250"),
    gap: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderWidth: 1,
    borderColor: "#fff",
  },
  text: {
    color: "#fff",
  },
  profileNameText: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
  },
  content: {
    flex: 1,
    width: "100%",
    padding: 10,
  },
  contentContainerStyle: {
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    paddingBottom: 50,
  },
  verticalContainer: {
    width: "100%",
  },
});

export default styles;
