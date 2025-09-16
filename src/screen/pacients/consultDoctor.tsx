import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
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
  isActive,
  totalCalls,
  languages,
  consultationFee,
}) => {
  const navigation = useNavigation<ConsultDoctorNavigationProp>();

  return (
    <View style={styles.doctorCard}>
      {/* Doctor Image */}
      <View style={styles.imageSection}>
        <Image source={profileImage} style={styles.profileImage} />
      </View>

      {/* Doctor Info */}
      <View style={styles.infoContainer}>
        {/* Speciality */}
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

        {/* Payment + Book Button */}
        <View style={styles.actionSection}>
          <View>
            <Text style={styles.feeLabel}>Consultation Fee</Text>
            <Text style={styles.feeAmount}>₹{consultationFee}</Text>
          </View>
          <TouchableOpacity style={styles.callButton}>
            <Text style={styles.callButtonText}>Pay & Connect</Text>
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
      name: 'Dr. Nancy John Sarikha',
      speciality: 'Cardiologist',
      qualifications: 'MBBS, MD (Cardiology)',
      bio: 'Experienced cardiologist specializing in preventive heart care, with 5+ years of experience treating patients with cardiovascular diseases.',
      profileImage: require('../../assets/Images/image1.png'),
      consultationFee: 200,
      availableTimes: ['8:00 AM', '9:30 AM', '12:00 PM', '4:00 PM', '5:00 PM'],
      experience: '5 Years Experience',
      totalCalls: 85,
      callDuration: '150 Mins',
      rating: 4.5,
      isActive: true,
      languages: ['Tamil', 'English'],
    },
    {
      id: '2',
      name: 'Dr. Michael Lee',
      speciality: 'General Physician',
      qualifications: 'MBBS, MD (Internal Medicine)',
      bio: 'General physician with 12+ years of expertise in internal medicine, preventive care, and chronic disease management.',
      profileImage: require('../../assets/Images/image1.png'),
      consultationFee: 150,
      availableTimes: ['9:00 AM', '11:00 AM', '3:00 PM', '6:00 PM'],
      experience: '12 Years Experience',
      totalCalls: 120,
      callDuration: '200 Mins',
      rating: 4.7,
      isActive: false,
      languages: ['English', 'Tamil'],
    },
    {
      id: '3',
      name: 'Dr. Emily Davis',
      speciality: 'Pediatrician',
      qualifications: 'MBBS, DCH, MD (Pediatrics)',
      bio: 'Passionate pediatrician helping children stay healthy and supporting parents with expert guidance. 18 years of experience in child care.',
      profileImage: require('../../assets/Images/image1.png'),
      consultationFee: 750,
      availableTimes: ['8:30 AM', '10:00 AM', '1:00 PM', '4:30 PM'],
      experience: '18 Years Experience',
      totalCalls: 250,
      callDuration: '350 Mins',
      rating: 4.9,
      isActive: true,
      languages: ['English', 'Hindi'],
    },
  ];

  const renderDoctor: ListRenderItem<Doctor> = ({ item }) => (
    <DoctorCard {...item} onPress={() => console.log('Selected:', item.name)} />
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerSection}>
        {/* Search Bar */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
              borderWidth: 1,
              borderColor: '#d1d1d1ff',
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
