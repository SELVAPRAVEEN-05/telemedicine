import { StyleSheet } from 'react-native';

const ORANGE = '#F97316';

export const Landingstyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFF7ED',
  },
  imageContainer: {
    paddingTop: 10,
    backgroundColor: '#ffb75aff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  image: {
    width: '100%',
    height: 380,
    marginRight: 20,
  },
  contentSection: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: ORANGE,
    textAlign: 'center',
    marginBottom: 15,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#78350F',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 40,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  featureText: {
    fontSize: 16,
    color: '#7C2D12',
    fontWeight: '500',
    flex: 1,
  },
  primaryButton: {
    backgroundColor: ORANGE,
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 15,
    marginBottom: 15,
    width: '100%',
    maxWidth: 300,
    shadowColor: ORANGE,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  primaryText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: ORANGE,
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 15,
    width: '100%',
    maxWidth: 300,
    marginBottom: 30,
  },
  secondaryText: {
    color: ORANGE,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#9A3412',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
