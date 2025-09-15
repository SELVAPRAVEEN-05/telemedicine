import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  ListRenderItem,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

// ✅ Import your typed routes
import { RootStackParamList } from '../../route/appNavigator';
import { consultDoctorstyles as styles } from '../../styles/consultDoctorStyle';
import { loadToken } from '../../services';

// ✅ Navigation type for this screen
type ConsultDoctorNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ConsultDoctor'
>;

// Doctor interface
interface Doctor {
  id: string;
  name: string;
  speciality: string;
  qualifications: string;
  bio: string;
  profileImage: ImageSourcePropType;
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

// Props for DoctorCard
interface DoctorCardProps extends Doctor {
  onPress: () => void;
}

// ✅ Doctor Card Component
const DoctorCard: React.FC<DoctorCardProps> = ({
  id,
  name,
  speciality,
  profileImage,
  rating,
  experience,
  availableTimes,
  isActive,
  totalCalls,
  credits,
  languages,
  qualifications,
  bio,
  consultationFee,
  callDuration,
}) => {
  const navigation = useNavigation<ConsultDoctorNavigationProp>();

  const token_global = loadToken();
  console.log(token_global);
  useEffect(() => {
    const token = loadToken();

    if (!token) {
      navigation.navigate('Login');
    }
  }, []);

  return (
    <View style={styles.doctorCard}>
      {/* Doctor Image */}
      <View style={styles.imageSection}>
        <Image source={profileImage} style={styles.profileImage} />
      </View>

      {/* Doctor Info */}
      <View style={styles.infoContainer}>
        <View style={styles.specialitySection}>
          <Icon name="briefcase" size={16} color="#FF6B35" />
          <Text style={styles.specialityText}>Specialized in {speciality}</Text>
        </View>

        {/* Name + Status */}
        <View style={styles.nameSection}>
          <Text style={styles.doctorName}>{name}</Text>
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: isActive ? '#4CAF50' : '#FFA726' },
              ]}
            />
            <Text
              style={[
                styles.statusText,
                { color: isActive ? '#4CAF50' : '#FFA726' },
              ]}
            >
              {isActive ? 'Available Now' : 'In another Call'}
            </Text>
          </View>
        </View>

        {/* Experience and Calls */}
        <View style={styles.statsSection}>
          <Text style={styles.statsText}>
            {experience} | {totalCalls} Calls Attended
          </Text>
        </View>

        {/* Languages */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Icon name="globe" size={14} color="#666" />
            <Text style={styles.infoText}>{languages.join(', ')}</Text>
          </View>
        </View>

        {/* Credits + Book Button */}
        <View style={styles.actionSection}>
          <View style={styles.creditsSection}>
            <Text style={styles.creditsLabel}>{credits} credits</Text>
            <Text style={styles.creditsRate}>
              {Math.floor(credits * 0.7)} Credits /Min
            </Text>
          </View>
          <TouchableOpacity
            style={styles.callButton}
            onPress={() => navigation.navigate('bookSlot', { doctors: { id } })}
          >
            <Text style={styles.callButtonText}>Book Appointment</Text>
          </TouchableOpacity>
        </View>

        {/* Rating Badge */}
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>{rating}</Text>
          <Icon name="star" size={12} color="#fff" />
        </View>
      </View>
    </View>
  );
};

// ✅ Main Screen
const ConsultDoctor: React.FC = () => {
  const navigation = useNavigation<ConsultDoctorNavigationProp>();

  const doctors: Doctor[] = [
    {
      id: '1',
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
    },
    {
      id: '2',
      name: 'Michael Lee',
      speciality: 'Finance Management',
      qualifications: 'MBA Accounting, CPA',
      bio: '12+ years of expertise in financial planning and corporate finance.',
      profileImage: require('../../assets/Images/image1.png'),
      consultationFee: 600,
      availableTimes: ['9:00 AM', '11:00 AM', '3:00 PM', '6:00 PM'],
      experience: '12 Years Experience',
      totalCalls: 120,
      callDuration: '200 Mins',
      rating: 4.7,
      isActive: false,
      languages: ['English', 'Tamil'],
      credits: 38,
      creditsPerMin: 30,
    },
    {
      id: '3',
      name: 'Emily Davis',
      speciality: 'Investment Advisory',
      qualifications: 'MBA Finance, CFA, CFP',
      bio: 'Helping clients achieve their investment goals with 18 years of experience.',
      profileImage: require('../../assets/Images/image1.png'),
      consultationFee: 750,
      availableTimes: ['8:30 AM', '10:00 AM', '1:00 PM', '4:30 PM'],
      experience: '18 Years Experience',
      totalCalls: 200,
      callDuration: '350 Mins',
      rating: 4.9,
      isActive: true,
      languages: ['English', 'Hindi'],
      credits: 52,
      creditsPerMin: 40,
    },
  ];

  const renderDoctor: ListRenderItem<Doctor> = ({ item }) => (
    <DoctorCard {...item} onPress={() => console.log('Selected:', item.name)} />
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* Header */}
      <View style={styles.headerSection}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* Back Arrow */}
          <TouchableOpacity
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate('PatientDashboard'); // fallback
              }
            }}
          >
            <Icon
              name="arrow-left"
              size={26}
              style={{ marginBottom: 15, marginRight: 10 }}
              color="#000000"
            />
          </TouchableOpacity>

          <Text style={styles.header}>Find Your Expert</Text>
        </View>

        {/* Search Bar */}
        <View
          style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}
        >
          {/* Search Box */}
          <View style={[styles.searchContainer, { flex: 1, marginRight: 10 }]}>
            <Icon
              name="search"
              size={20}
              color="#FF6B35"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search experts, specialities..."
              placeholderTextColor="#999"
            />
          </View>

          {/* Filter Icon */}
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: '#F8F9FA',
              borderRadius: 8,
            }}
          >
            <Icon name="filter" size={22} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Doctor List */}
      <FlatList
        scrollEnabled={false}
        data={doctors}
        renderItem={renderDoctor}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </ScrollView>
  );
};

export default ConsultDoctor;
