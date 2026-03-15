import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../route/appNavigator";
type upcomingEventProp = NativeStackNavigationProp<RootStackParamList, 'UpcommingEvents'>;

const MyBookingsPage = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [searchText, setSearchText] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const navigation = useNavigation<upcomingEventProp>();

  const bookingData = [
    {
      id: 1,
      name: 'Nancy John Sarika',
      date: '29 Nov, 2024',
      time: '09:20 AM - 09:30 AM',
      status: 'in 5 mins',
      description: 'Discussion Regarding Portfolio Management',
      image: require('../../assets/Images/image1.png'),
      type: 'upcoming',
    },
    {
      id: 2,
      name: 'Nancy John Sarika',
      date: '28 Nov, 2024',
      time: '05:00 PM - 05:30 PM',
      status: 'Completed',
      description: 'Follow-up consultation about investments',
      image: require('../../assets/Images/image1.png'),
      type: 'completed',
    },
      {
      id: 3,
      name: 'Nancy Wheeler',
      date: '29 Nov, 2024',
      time: '09:20 AM - 09:30 AM',
      status: 'in 5 mins',
      description: 'Discussion Regarding Portfolio Management',
      image: require('../../assets/Images/image1.png'),
      type: 'upcoming',
    },
  ];

  const filteredBookings = bookingData.filter(
    (booking) =>
      booking.type === activeTab &&
      booking.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const TabButton = ({ title, isActive, onPress }: any) => (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.activeTabButton]}
      onPress={onPress}
    >
      <Text style={[styles.tabText, isActive && styles.activeTabText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const BookingCard = ({ booking }: any) => (
    <View style={styles.bookingCard}>
      <View style={styles.statusBadge}>
        <Text style={styles.statusText}>{booking.status}</Text>
      </View>

      <View style={styles.cardContent}>
        <LinearGradient
          colors={['#FFA500', '#FF7F50', '#eea185ff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            height: 90,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 30,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        >
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <Image
                source={booking.image || require('../../assets/Images/image1.png')}
                style={styles.profileImage}
              />
            </View>
          </View>
        </LinearGradient>

        <View style={{ padding: 20 }}>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{booking.name}</Text>
            <Text style={styles.dateTime}>
              {booking.date} | {booking.time}
            </Text>
          </View>

          {booking.type === 'upcoming' ? (
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel Call</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.joinButton}
                onPress={() => setSelectedBooking(booking)}
              >
                <Text style={styles.joinButtonText}>Join Call</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.joinButton}>
                <Text style={styles.joinButtonText}>View Prescription</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={25} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Bookings</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TabButton
          title="Upcoming Calls"
          isActive={activeTab === 'upcoming'}
          onPress={() => setActiveTab('upcoming')}
        />
        <TabButton
          title="Completed Calls"
          isActive={activeTab === 'completed'}
          onPress={() => setActiveTab('completed')}
        />
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search here"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#999"
          />
        </View>

      </View>

      {/* Booking List */}
      <ScrollView
        style={styles.bookingList}
        showsVerticalScrollIndicator={false}
      >
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 20, color: '#666' }}>
            No {activeTab} calls found
          </Text>
        )}
      </ScrollView>

      {/* Join Call Modal */}
      <Modal
        visible={!!selectedBooking}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedBooking(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedBooking && (
              <>
                <Image
                  source={selectedBooking.image}
                  style={styles.modalImage}
                />
                <Text style={styles.modalName}>{selectedBooking.name}</Text>
                <Text style={styles.modalDate}>
                  {selectedBooking.date} | {selectedBooking.time}
                </Text>

                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={styles.modalCancelButton}
                    onPress={() => setSelectedBooking(null)}
                  >
                    <Text style={styles.modalCancelText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.modalJoinButton}
                    onPress={() => {
                      navigation.navigate('Videocall');
                      // 🚀 Handle actual join call logic here
                    }}
                  >
                    <Text style={styles.modalJoinText}>Join Call</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 16,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerTitle: { color: '#000', fontSize: 20, fontWeight: '600' },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF5F2',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 25,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: '#FF6B35',
    elevation: 5,
  },
  tabText: { fontSize: 14, color: '#999', fontWeight: '500' },
  activeTabText: { color: 'white', fontWeight: '600' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: '#333' },
  filterButton: {
    padding: 8,
    backgroundColor: '#F8F9FA',
    borderRadius: 6,
  },
  bookingList: { flex: 1, paddingHorizontal: 16 },
  bookingCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    elevation: 5,
    overflow: 'hidden',
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFE8DC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  statusText: { color: '#FF6B35', fontSize: 12, fontWeight: '600' },
  cardContent: { padding: 0 },
  profileSection: { flexDirection: 'column', alignItems: 'flex-start', gap: 10, marginBottom: 20, height: 90 },
  profileImageContainer: { marginRight: 12 },
  profileImage: { width: 110, height: 90, borderRadius: 10, position: 'absolute', top: 50, right: 50 },
  profileInfo: { flex: 1, marginBottom: 16 },
  profileName: { fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 8 },
  dateTime: { fontSize: 14, color: '#666', marginBottom: 8 },
  actionButtons: { flexDirection: 'row', gap: 12 },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  cancelButtonText: { color: '#666', fontSize: 14, fontWeight: '500' },
  joinButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
  },
  joinButtonText: { color: 'white', fontSize: 14, fontWeight: '600' },

  // ✅ Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  modalImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 16 },
  modalName: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  modalDate: { fontSize: 14, color: '#666', marginBottom: 20 },
  modalActions: { flexDirection: 'row', gap: 12 },
  modalCancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  modalCancelText: { color: '#666', fontSize: 14, fontWeight: '500' },
  modalJoinButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
  },
  modalJoinText: { color: 'white', fontSize: 14, fontWeight: '600' },
});

export default MyBookingsPage;
