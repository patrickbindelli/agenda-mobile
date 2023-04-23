import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161618',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    gap: 10,
  },
  scrollView: {
    gap: 10,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 100,
  },
  searchBarContainer: {
    width: '100%',
    flexDirection: 'row',
    gap: 5,
  },
  text: {
    color: '#fff',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  content: {
    width: '100%',
    alignContent: 'center',
  },
});

export default styles;
