import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ImageSourcePropType,
  ListRenderItem,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import axios from "axios";
import { RootStackParamList } from "../../route/appNavigator";
import { consultDoctorstyles as styles } from "../../styles/consultDoctorStyle";

// ✅ Navigation type
type ConsultDoctorNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ConsultDoctor"
>;

// Doctor interface (frontend props)
interface Doctor {
  id: string;
  name: string;
  speciality: string;
  qualifications: string;
  bio: string;
  profileImage: string | ImageSourcePropType;
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
  isActive,
  totalCalls,
  creditsPerMin,
  languages,
}) => {
  const navigation = useNavigation<ConsultDoctorNavigationProp>();

  return (
    <View style={styles.doctorCard}>
      {/* Doctor Image */}
      <View style={styles.imageSection}>
        {typeof profileImage === "string" ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Image source={profileImage} style={styles.profileImage} />
        )}
      </View>

      {/* Doctor Info */}
      <View style={styles.infoContainer}>
        <View style={styles.specialitySection}>
          <Icon name="briefcase" size={16} color="#FF6B35" />
          <Text style={styles.specialityText}>Specialized in {speciality || "N/A"}</Text>
        </View>

        {/* Name + Status */}
        <View style={styles.nameSection}>
          <Text style={styles.doctorName}>{name || "Unknown"}</Text>
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: isActive ? "#4CAF50" : "#FFA726" },
              ]}
            />
            <Text
              style={[
                styles.statusText,
                { color: isActive ? "#4CAF50" : "#FFA726" },
              ]}
            >
              {isActive ? "Available Now" : "In another Call"}
            </Text>
          </View>
        </View>

        {/* Experience and Calls */}
        <View style={styles.statsSection}>
          <Text style={styles.statsText}>
            {experience || "No Experience"} | {totalCalls} Calls Attended
          </Text>
        </View>

        {/* Languages */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Icon name="globe" size={14} color="#666" />
            <Text style={styles.infoText}>
              {languages.length > 0 ? languages.join(", ") : "Not Specified"}
            </Text>
          </View>
        </View>

        {/* Credits + Book Button */}
        <View style={styles.actionSection}>
          <View style={styles.creditsSection}>
            <Text style={styles.creditsRate}>{creditsPerMin} Credits /Min</Text>
          </View>
          <TouchableOpacity
            style={styles.callButton}
            onPress={() => navigation.navigate("bookSlot", { doctors: { id } })}
          >
            <Text style={styles.callButtonText}>Book Appointment</Text>
          </TouchableOpacity>
        </View>

        {/* Rating Badge */}
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
          <Icon name="star" size={12} color="#fff" />
        </View>
      </View>
    </View>
  );
};

// ✅ Main Screen
const ConsultDoctor: React.FC = () => {
  const navigation = useNavigation<ConsultDoctorNavigationProp>();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Yzc4YWZiN2YyZWNlNjdkNzU3NjkzYiIsInJvbGUiOiJwYXRpZW50IiwiaWF0IjoxNzU3OTExNTM5LCJleHAiOjE3NTk2Mzk1Mzl9.1zHdKhPPp6268ttD052wxCMS_LDpgrU7h36_jaOVOpM";

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(
        "https://telemedicine-server-o5tc.onrender.com/doctor/get-all-doctors",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const mappedDoctors: Doctor[] = res.data.map((doc: any) => ({
        id: doc.id,
        name: doc.name || "Unknown Doctor",
        speciality: doc.specialization || "N/A",
        qualifications: "", 
        bio: "", 
        profileImage: doc.profileImage || require("../../assets/Images/image1.png"),
        consultationFee: 0, 
        availableTimes: [], 
        experience: doc.experience || "Not specified",
        totalCalls: doc.callsAttended || 0,
        callDuration: "", 
        rating: doc.rating || 0,
        isActive: doc.status === "Available",
        languages: doc.languages || [],
        credits: 0, // Not provided
        creditsPerMin: doc.creditsPerMinute || 0,
      }));

      setDoctors(mappedDoctors);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };

  const renderDoctor: ListRenderItem<Doctor> = ({ item }) => (
    <DoctorCard {...item} onPress={() => console.log("Selected:", item.name)} />
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      {/* Header */}
      <View style={styles.headerSection}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* Back Arrow */}
          <TouchableOpacity
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate("PatientDashboard"); // fallback
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
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
          <View style={[styles.searchContainer, { flex: 1, marginRight: 10 }]}>
            <Icon name="search" size={20} color="#FF6B35" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search experts, specialities..."
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: "#F8F9FA",
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
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </ScrollView>
  );
};

export default ConsultDoctor;
