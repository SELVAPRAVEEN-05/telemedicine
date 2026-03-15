import { StyleSheet } from 'react-native';
export const HealthRecordStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    padding: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2, 
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#b3b1b0ff',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  date: {
    fontSize: 13,
    color: '#888',
    marginBottom: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  desc: {
    fontSize: 14,
    color: '#555',
  },
});
