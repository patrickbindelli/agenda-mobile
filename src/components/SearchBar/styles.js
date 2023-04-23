import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#232326',
    borderRadius: 15,
  },
  textInput: {
    flex: 1,
    height: 30,
    color: '#fff',
    fontSize: 15,
  },
  text: {
    color: '#fff',
  },
});

export default styles;
