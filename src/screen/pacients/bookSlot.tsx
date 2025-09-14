import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../route/appNavigator"; 
import { bookSLotstyles as styles } from '../../styles/bookSlot';

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
type AppointmentNavProp = StackNavigationProp<RootStackParamList, "bookSlot">;

const DoctorBookingScreen: React.FC = () => {
  const route = useRoute<AppointmentRouteProp>();
  const navigation = useNavigation<AppointmentNavProp>();
  const { params } = route;
  const { doctors } = params;

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
      {/* Back Button + Header */}
      

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 40 }}>
        <TouchableOpacity
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate('PatientDashboard');
            }
          }}
        >
          <Image
            source={require("../../assets/icons/left-arrow.png")}
            style={{
              width: 30,
              height: 30,
              marginBottom: 0,
              marginRight: 10,
              marginLeft:10,
              resizeMode: "contain",
            }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Book Appointment</Text>
      </View> 
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
            <View style={styles.specialityContainer}>
              <Icon name="briefcase" size={16} color="#FF6B35" />
              <Text style={styles.specialityText}>Specialized in {doctor.speciality}</Text>
            </View>

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

            <View style={styles.infoRow}>
              <Icon name="clock" size={14} color="#666" />
              <Text style={styles.infoText}>{doctor.experience}</Text>
            </View>

            <View style={styles.infoRow}>
              <Icon name="dollar-sign" size={14} color="#666" />
              <Text style={styles.infoText}>Finance Management, Credit Advise +2 more</Text>
            </View>

            <View style={styles.infoRow}>
              <Icon name="globe" size={14} color="#666" />
              <Text style={styles.infoText}>{doctor.languages.join(', ')}</Text>
            </View>

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

          <View style={{ marginVertical: 20, paddingBottom: 10 }}>
            <View style={{ marginBottom: 16, paddingBottom: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: '600', color: '#1a1a1a' }}>
                  Available dates
                </Text>
                <View style={{ flexDirection: 'row', borderRadius: 20, gap: 8, padding: 2 }}>
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
              contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
              style={{ flexGrow: 0, paddingBottom: 10 }}
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
                  <Text style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: selectedDate === dateItem.date ? '#fff' : '#666',
                    marginBottom: 4,
                    textTransform: 'uppercase'
                  }}>
                    {dateItem.day}
                  </Text>
                  <View style={{ height: 50, display: 'flex', justifyContent: 'center' }}>
                    <Text style={{
                      fontSize: 16,
                      fontWeight: '700',
                      color: selectedDate === dateItem.date ? '#fff' : '#1a1a1a',
                      marginBottom: 8
                    }}>
                      {dateItem.date}
                    </Text>
                  </View>
                  <View style={{ width: '100%', alignItems: 'center' }}>
                    <View style={{
                      backgroundColor: selectedDate === dateItem.date ? 'rgba(255, 255, 255, 0.2)' : '#f0f9ff',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: selectedDate === dateItem.date ? 'rgba(255, 255, 255, 0.3)' : '#e0f2fe'
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
                style={[styles.timeSlot, selectedTime === time && styles.timeSlotSelected]}
                onPress={() => handleTimeSelect(time)}
              >
                <Text style={[styles.timeSlotText, selectedTime === time && styles.timeSlotTextSelected]}>
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
