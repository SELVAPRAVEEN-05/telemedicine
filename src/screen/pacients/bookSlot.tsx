import React, { useState, useRef } from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../route/appNavigator";

const { width } = Dimensions.get('window');

interface Doctor {
  name: string;
  speciality: string;
  qualifications: string;
  bio: string;
  profileImage: any;
  consultationFee: number;
  availableTimes: string[];
  experience: string;
  totalCalls: number;
  callDuration: string;
  rating: number;
  isActive: boolean;
  languages: string[];
  credits: number;
  creditsPerMin: number;
}

const doctor: Doctor = {
  name: 'Nancy John Sarikha',
  speciality: 'Credit Management',
  qualifications: 'MBA Finance, CFA',
  bio: 'Experienced financial advisor with 5+ years in credit management and financial planning.',
  profileImage: require('../../assets/Images/image1.png'),
  consultationFee: 500,
  availableTimes: ['8:00 AM', '9:20 AM', '12:00 AM', '4:00 AM', '5:00 AM'],
  experience: '5 Years Experience',
  totalCalls: 85,
  callDuration: '150 Mins',
  rating: 4.5,
  isActive: true,
  languages: ['Tamil', 'English'],
  credits: 45,
  creditsPerMin: 35,
};
type AppointmentRouteProp = RouteProp<RootStackParamList, "bookSlot">;
const DoctorBookingScreen: React.FC = () => {
  const { params } = useRoute<AppointmentRouteProp>();
    const { doctors } = params

  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('Today');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const scrollRef = useRef<ScrollView>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollTo({ x: 0, animated: true });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollToEnd({ animated: true });
  };

  const dates = [
    { day: 'SAT', date: 'Today', slots: 3 },
    { day: 'MON', date: '12 Nov', slots: 5 },
    { day: 'TUES', date: '13 Nov', slots: 5 },
    { day: 'SAT', date: 'Today', slots: 3 },
    { day: 'MON', date: '12 Nov', slots: 5 },
    { day: 'TUES', date: '13 Nov', slots: 5 },
  ];

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setBookingSuccess(false);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleBookAppointment = () => {
    if (!selectedTime) {
      Alert.alert('Select a time slot', 'Please select a time slot before booking.');
      return;
    }
    setBookingSuccess(true);
    Alert.alert('Booking Confirmed', `Your appointment is booked for ${selectedTime}`);
  };

  return (
    <View style={styles.container}>
     
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.profileCard}>
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
            <Image source={doctor.profileImage} style={styles.profileImage} />
            <View style={styles.ratingBadge}>
              <Icon name="star" size={12} color="#fff" />
              <Text style={styles.ratingText}>{doctor.rating}</Text>
            </View>
          </LinearGradient>

          <View style={{ padding: 20 }}>
            {/* Speciality */}
            <View style={styles.specialityContainer}>
              <Icon name="briefcase" size={16} color="#FF6B35" />
              <Text style={styles.specialityText}>Specialized in {doctor.speciality}</Text>
            </View>

            {/* Doctor Name and Status */}
            <View style={styles.nameContainer}>
              <Text style={styles.doctorName}>{doctor.name}</Text>
              <View style={styles.statusContainer}>
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: doctor.isActive ? '#4CAF50' : '#FFA726' },
                  ]}
                />
                <Text style={styles.statusText}>{doctor.isActive ? 'Active' : 'Busy'}</Text>
              </View>
            </View>

            {/* Experience */}
            <View style={styles.infoRow}>
              <Icon name="clock" size={14} color="#666" />
              <Text style={styles.infoText}>{doctor.experience}</Text>
            </View>

            {/* Services */}
            <View style={styles.infoRow}>
              <Icon name="dollar-sign" size={14} color="#666" />
              <Text style={styles.infoText}>Finance Management, Credit Advise +2 more</Text>
            </View>

            {/* Languages */}
            <View style={styles.infoRow}>
              <Icon name="globe" size={14} color="#666" />
              <Text style={styles.infoText}>{doctor.languages.join(', ')}</Text>
            </View>

            {/* Credits */}
            <View style={styles.creditsContainer}>
              <View>
                <Text style={styles.creditsLabel}>{doctor.credits} credits</Text>
                <Text style={styles.creditsRate}>{doctor.creditsPerMin} Credits /Min</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Overall Stats of Nancy</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Icon name="phone" size={20} color="#FF6B35" />
              </View>
              <Text style={styles.statLabel}>Calls Attended</Text>
              <Text style={styles.statValue}>{doctor.totalCalls}</Text>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Icon name="clock" size={20} color="#FF6B35" />
              </View>
              <Text style={styles.statLabel}>Total Calls Duration</Text>
              <Text style={styles.statValue}>{doctor.callDuration}</Text>
            </View>
          </View>
        </View>

        {/* Schedule Section */}
        <View style={styles.scheduleContainer}>
          <Text style={styles.scheduleTitle}>Schedule Call</Text>
          <Text style={styles.scheduleSubtitle}>
            Book 1st session to discuss more about your financial doubts
          </Text>

         <View style={{ marginVertical: 20,paddingBottom:10 }}>
      {/* Header with scroll controls */}
      <View style={{ marginBottom: 16 ,paddingBottom:10}}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: '#1a1a1a'
          }}>
            Available dates
          </Text>
          <View style={{
            flexDirection: 'row',
            // backgroundColor: '#f5f5f5',
            borderRadius: 20,
            gap: 8,
            padding: 2
          }}>
            <TouchableOpacity 
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 2,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2
              }}
              onPress={scrollLeft}
            >
              <Icon name="chevron-left" size={20} color="#666" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 2,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2
              }}
              onPress={scrollRight}
            >
              <Icon name="chevron-right" size={20} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Scrollable dates */}
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          gap: 12
        }}
        style={{ flexGrow: 0, paddingBottom:10 }}
      >
        {dates.map((dateItem, index) => (
          <TouchableOpacity
            key={index}
            style={{
              width: 80,
              paddingVertical: 16,
              paddingHorizontal: 12,
              backgroundColor: selectedDate === dateItem.date ? '#007AFF' : '#fff',
              borderRadius: 16,
              alignItems: 'center',
              borderWidth: 1,
              borderColor: selectedDate === dateItem.date ? '#007AFF' : '#e5e5e5',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 4,
              elevation: 3,
              marginRight: 12,
              transform: selectedDate === dateItem.date ? [{ scale: 1.02 }] : [{ scale: 1 }]
            }}
            onPress={() => handleDateSelect(dateItem.date)}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: '500',
                color: selectedDate === dateItem.date ? '#fff' : '#666',
                marginBottom: 4,
                textTransform: 'uppercase'
              }}
            >
              {dateItem.day}
            </Text>
            <View style={{height:50 , display:'flex', justifyContent:'center'}}>
              <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: selectedDate === dateItem.date ? '#fff' : '#1a1a1a',
                marginBottom: 8
              }}
            >
              {dateItem.date}
            </Text>
            </View>
            
            <View style={{
              width: '100%',
              alignItems: 'center'
            }}>
              <View style={{
                backgroundColor: selectedDate === dateItem.date 
                  ? 'rgba(255, 255, 255, 0.2)' 
                  : '#f0f9ff',
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: selectedDate === dateItem.date 
                  ? 'rgba(255, 255, 255, 0.3)' 
                  : '#e0f2fe'
              }}>
                <Text style={{
                  fontSize: 10,
                  fontWeight: '600',
                  color: selectedDate === dateItem.date ? '#fff' : '#0284c7',
                  textAlign: 'center'
                }}>
                  {dateItem.slots} Slots
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
          {/* Available Time Slots */}
          <Text style={styles.sectionTitle}>Available slots</Text>
          <View style={styles.timeSlotsContainer}>
            {doctor.availableTimes.map((time, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.timeSlotSelected,
                ]}
                onPress={() => handleTimeSelect(time)}
              >
                <Text
                  style={[
                    styles.timeSlotText,
                    selectedTime === time && styles.timeSlotTextSelected,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Book Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookAppointment}>
          <Text style={styles.bookButtonText}>
            Schedule Call For Today, {selectedTime || '09:30 AM'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DoctorBookingScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  profileCard: {
    position: 'relative',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  profileImage: {
    top: 30,
    left: 20,
    width: 120,
    height: 100,
    borderRadius: 5,
    marginBottom: 12,
    position: 'absolute',
  },
  ratingBadge: {
    position: 'absolute',
    top: 100,
    left: 25,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: { color: '#fff', fontSize: 14, fontWeight: 'bold', marginLeft: 2 },
  specialityContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  specialityText: { fontSize: 14, color: '#FF6B35', marginLeft: 8, fontWeight: '500' },
  nameContainer: { marginBottom: 12 },
  doctorName: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  statusContainer: { flexDirection: 'row', alignItems: 'center' },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  statusText: { fontSize: 14, color: '#4CAF50', fontWeight: '500' },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  infoText: { fontSize: 14, color: '#666', marginLeft: 8 },
  creditsContainer: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  creditsLabel: { fontSize: 14, color: '#666', marginBottom: 4 },
  creditsRate: { fontSize: 16, fontWeight: 'bold', color: '#4285F4' },
  statsContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  statsTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 16 },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  statCard: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statIcon: { marginBottom: 8 },
  statLabel: { fontSize: 12, color: '#666', textAlign: 'center', marginBottom: 4 },
  statValue: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  scheduleContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  scheduleTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 8 },
  scheduleSubtitle: { fontSize: 14, color: '#666', marginBottom: 20 },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 12 },
  datesContainer: { flexDirection: 'row', marginBottom: 24 },
  dateCard: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dateCardSelected: { backgroundColor: '#4285F4', borderColor: '#4285F4' },
  dayText: { fontSize: 12, color: '#666', marginBottom: 4 },
  dayTextSelected: { color: '#fff' },
  dateText: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 4 },
  dateTextSelected: { color: '#fff' },
  slotsText: { fontSize: 10, color: '#4285F4' },
  timeSlotsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  timeSlot: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minWidth: 80,
    alignItems: 'center',
  },
  timeSlotSelected: { backgroundColor: '#4285F4', borderColor: '#4285F4' },
  timeSlotText: { fontSize: 14, color: '#333', fontWeight: '500' },
  timeSlotTextSelected: { color: '#fff' },
  bottomContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 8,
  },
  bookButton: {
    backgroundColor: '#F97316',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  
});
