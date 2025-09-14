import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  ImageSourcePropType,
  ListRenderItem,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../route/appNavigator";

type DashboardNav = NativeStackNavigationProp<RootStackParamList>;
const { width } = Dimensions.get('window');


interface Doctor {
  id: string;
  name: string;
  speciality: string;
  qualifications: string;
  bio: string;
  profileImage: ImageSourcePropType;
  consultationFee: number;
  availableTimes: string[];   // array instead of single string
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

// Doctor Card Component
const DoctorCard: React.FC<DoctorCardProps> = ({
  id,
name,
speciality,
profileImage,
rating,
experience,
availableTimes,   // array instead of single string
isActive,         // replaces isOnline
onPress,
totalCalls,       // replaces callsAttended
credits,
creditsPerMin,
languages,
qualifications,
bio,
consultationFee,
callDuration

}) => {
  const navigation = useNavigation<DashboardNav>(); // ✅ inside component

  return (
    <View style={styles.doctorCard}>
      {/* Doctor Image */}
      <View style={styles.imageSection}>
        <Image source={profileImage} style={styles.profileImage} />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.specialitySection}>
          <Icon name="briefcase" size={16} color="#FF6B35" />
          <Text style={styles.specialityText}>Specialized in {speciality}</Text>
        </View>

        {/* Doctor Name and Status */}
        <View style={styles.nameSection}>
          <Text style={styles.doctorName}>{name}</Text>
          <View style={styles.statusContainer}>
            <View style={[styles.statusDot, { backgroundColor: isActive ? '#4CAF50' : '#FFA726' }]} />
            <Text style={[styles.statusText, { color: isActive ? '#4CAF50' : '#FFA726' }]}>
              {isActive ? 'Available Now' : 'In another Call'}
            </Text>
          </View>
        </View>

        {/* Experience and Calls */}
        <View style={styles.statsSection}>
          <Text style={styles.statsText}>
            {experience} Experience | {totalCalls} Calls Attended
          </Text>
        </View>

        {/* Languages */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Icon name="globe" size={14} color="#666" />
            <Text style={styles.infoText}>{languages.join(', ')}</Text>
          </View>
        </View>

        {/* Credits and Book Button */}
        <View style={styles.actionSection}>
          <View style={styles.creditsSection}>
            <Text style={styles.creditsLabel}>{credits} credits</Text>
            <Text style={styles.creditsRate}>{Math.floor(credits * 0.7)} Credits /Min</Text>
          </View>
          <TouchableOpacity
            style={styles.callButton}
            onPress={() => navigation.navigate("bookSlot", { doctors: {
     id,
  } })}
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

const ConsultDoctor: React.FC = () => {
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
    <DoctorCard {...item} onPress={() => console.log("Selected:", item.name)} />
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      {/* Header */}
      <View style={styles.headerSection}>
        <Text style={styles.header}>Find Your Expert</Text>
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#FF6B35" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search experts, specialities..."
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.filterButton}>
            <Icon name="filter" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Doctor List */}
      <FlatList
        scrollEnabled={false}
        data={doctors}
        renderItem={renderDoctor}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </ScrollView>
  );
};

export default ConsultDoctor;

// styles remain unchanged


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#FFF8F3',
  },
  headerSection: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    marginBottom: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0000',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 10,
    padding: 8,
    marginLeft: 8,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  doctorCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 20,
    elevation: 6,
    shadowColor: '#FF6B35',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    // position: 'relative',
    overflow: 'hidden',
  },
  infoContainer:{
    position: 'relative'
  },
  imageSection: {
    height: 200,
    position: 'relative',
    backgroundColor: '#F5F5F5',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  topRatedBadge: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  topRatedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  heartButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  ratingBadge: {
    position: 'absolute',
    top: 55,
    right: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 7,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 3,
  },
  specialitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  specialityText: {
    fontSize: 14,
    color: '#FF6B35',
    marginLeft: 8,
    fontWeight: '500',
  },
  nameSection: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  doctorName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
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
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  statsSection: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  statsText: {
    fontSize: 14,
    color: '#666',
  },
  infoSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  moreText: {
    color: '#FF6B35',
    fontWeight: '500',
  },
  actionSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  creditsSection: {
    flex: 1,
  },
  creditsLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  creditsRate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4285F4',
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  callButton: {
    backgroundColor: '#F97316',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  callButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});