import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161618',
  },
  scrollView: {
    paddingBottom: 30,
    paddingTop: 20,
    gap: 30,
    paddingHorizontal: 10,
  },
  labeledContainer: {
    width: '100%',
    gap: 10,
  },
  profilePictureContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  labeledContainerContent: {
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
    paddingHorizontal: 10,
  },
  horizontalContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  inputContainer: {
    flex: 10,
  },
  textContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: '#A09FA6',
    fontSize: 15,
    fontWeight: 500,
  },
  options: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#161618',
  },
  button: {
    height: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verticalSeparator: {
    width: 1,
    height: '80%',
    backgroundColor: '#34343A',
  },
  buttonText: { color: '#fff', fontSize: 15 },
});

export default styles;
