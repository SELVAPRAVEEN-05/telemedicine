import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const DoctorProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },

  // Header Card
  headerCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    borderWidth: 3,
    borderColor: '#FF6B00',
  },
  headerInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  specialization: {
    fontSize: 16,
    color: '#FF6B00',
    fontWeight: '600',
    marginBottom: 4,
  },
  doctorId: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },

  // Quick Stats
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  star: {
    fontSize: 16,
    color: '#f39c12',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginLeft: 4,
  },

  // Status Button
  statusButton: {
    backgroundColor: '#FF6B00',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  statusButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  // Cards
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },

  // Info Rows
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    minHeight: 24,
  },
  infoLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    fontWeight: '500',
    width: 100,
    marginRight: 12,
  },
  infoValue: {
    fontSize: 14,
    color: '#2c3e50',
    flex: 1,
    fontWeight: '400',
  },

  // Degree Tags
  degreeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    gap: 6,
  },
  degreeTag: {
    backgroundColor: '#e8f4fd',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  degreeText: {
    fontSize: 12,
    color: '#3498db',
    fontWeight: '600',
  },

  // Language Tags
  languageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    gap: 6,
  },
  languageTag: {
    backgroundColor: '#f0f9ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  languageText: {
    fontSize: 12,
    color: '#2980b9',
    fontWeight: '500',
  },

  // Credits
  creditsValue: {
    fontSize: 14,
    color: '#27ae60',
    fontWeight: 'bold',
    flex: 1,
  },

  // Approval Status
  approvalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  approvalDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  approvalText: {
    fontSize: 14,
    fontWeight: '600',
  },
  roleText: {
    fontSize: 14,
    color: '#8e44ad',
    fontWeight: 'bold',
    flex: 1,
  },

  // Action Buttons
  actionButtons: {
    marginTop: 8,
    gap: 12,
  },
  editButton: {
    borderWidth: 2,
    borderColor: '#F97316',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#3498db',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  editButtonText: {
    color: '#F97316',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#F97316',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#e74c3c',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
