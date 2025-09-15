import React, { useState, useRef, useEffect } from 'react';
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
import axios from 'axios';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';



const { width } = Dimensions.get('window');

type AppointmentRouteProp = RouteProp<RootStackParamList, "bookSlot">;
type AppointmentNavProp = StackNavigationProp<RootStackParamList, "bookSlot">;

const DoctorBookingScreen: React.FC = () => {
  const route = useRoute<AppointmentRouteProp>();
  const navigation = useNavigation<AppointmentNavProp>();
  const { params } = route;
  const { doctors } = params;

  const [doctorData, setDoctorData] = useState<any>(null);
  const [slots, setSlots] = useState<any[]>([]);
  const [selectedTime, setSelectedTime] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [dates, setDates] = useState<string[]>([]);

  const scrollRef = useRef<ScrollView>(null);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Yzc4YWZiN2YyZWNlNjdkNzU3NjkzYiIsInJvbGUiOiJwYXRpZW50IiwiaWF0IjoxNzU3OTExNTM5LCJleHAiOjE3NTk2Mzk1Mzl9.1zHdKhPPp6268ttD052wxCMS_LDpgrU7h36_jaOVOpM";

  // Fetch doctor + slots
  const getDoctor = async () => {
    try {
      const res = await axios.get(
        `https://telemedicine-server-o5tc.onrender.com/doctor/get-doctor-by-id/${doctors.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDoctorData(res.data.doctor);

      // collect unique dates
      const uniqueDates:any = [
        ...new Set(res.data.slots.map((slot: any) => slot.date)),
      ];
      setDates(uniqueDates);
      setSelectedDate(uniqueDates.length > 0 ? uniqueDates[0] : null);
      setSlots(res.data.slots || []);
    } catch (err) {
      console.error("Error fetching doctor:", err);
    }
  };

  useEffect(() => {
    getDoctor();
  }, []);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setBookingSuccess(false);
  };

  const handleBookAppointment = () => {
    if (!selectedTime) {
      Alert.alert("Select a slot", "Please select a slot before booking.");
      return;
    }
    Alert.alert(
      "Booking Confirmed",
      `Your appointment is booked on ${selectedDate} at ${selectedTime}`
    );
  };

  // If data not loaded yet
  if (!doctorData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading doctor details...</Text>
      </View>
    );
  }
const scrollBy = (offset: number) => {
  if (scrollRef.current) {
    scrollRef.current.scrollTo({
      x: (scrollRef.current as any)?.contentOffset?.x + offset || offset,
      animated: true,
    });
  }
};

const scrollLeft = () => scrollBy(-120); // move left by 120px
const scrollRight = () => scrollBy(120); // move right by 120px

  // ✅ Format date with day name
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const dayName = date.toLocaleDateString("en-US", { weekday: "short" }); // Mon, Tue, Wed
  const dayNumMonth = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  }); // e.g. 16 Sep

  return { dayName, dayNumMonth };
};


  // Filter slots for selected date
  const filteredSlots = selectedDate
    ? slots.filter(
        (slot) => slot.date === selectedDate && !slot.is_booked
      )
    : [];

 const categorizeSlots = (slots: any[]) => {
  const morning: any[] = [];
  const afternoon: any[] = [];
  const evening: any[] = [];

  slots.forEach((slot) => {
    const hour = parseInt(slot.start_time.split(":")[0], 10);
    if (hour < 12) {
      morning.push(slot);
    } else if (hour >= 12 && hour < 18) {
      afternoon.push(slot);
    } else {
      evening.push(slot);
    }
  });

  return { morning, afternoon, evening };
};

const { morning, afternoon, evening } = categorizeSlots(filteredSlots);


 
    

  return (
    <View style={styles.container}>
      <Text>
        Book Appointment
      </Text>
      {/* Header */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Profile */}
        <View style={styles.profileCard}>
          <LinearGradient
            colors={["#FFA500", "#FF7F50", "#eea185ff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              height: 90,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 30,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}
          >
            <Image source={{ uri: doctorData.profileImage }} style={styles.profileImage} />
            <View style={styles.ratingBadge}>
              <Icon name="star" size={12} color="#fff" />
              <Text style={styles.ratingText}>{doctorData.rating || 0}</Text>
            </View>
          </LinearGradient>

          <View style={{ padding: 20 }}>
            <Text style={styles.doctorName}>{doctorData.name}</Text>
            <Text style={styles.infoText}>Doctor ID: {doctorData.doctor_id}</Text>
            <Text style={styles.infoText}>
              Status: {doctorData.status === "Available" ? "🟢 Available" : "🔴 Busy"}
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Overall Stats</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Icon name="phone" size={20} color="#FF6B35" />
              <Text>Calls Attended</Text>
              <Text>{doctorData.callsAttended}</Text>
            </View>
            <View style={styles.statCard}>
              <Icon name="clock" size={20} color="#FF6B35" />
              <Text>Total Duration</Text>
              <Text>{doctorData.totalCallDuration} mins</Text>
            </View>
          </View>
        </View>
      

        {/* Dates */}
       {/* Dates */}
<View
  style={{
    marginHorizontal: 16,
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderRadius: 16,
  }}
>
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 10,
    }}
  >
    <Text style={styles.sectionTitle}>Available Dates</Text>

    {/* Left / Right buttons */}
    <View style={{ flexDirection: "row", gap: 8 }}>
      <TouchableOpacity
        onPress={scrollLeft}
        style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: "#f0f0f0",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon name="chevron-left" size={20} color="#333" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={scrollRight}
        style={{
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: "#f0f0f0",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon name="chevron-right" size={20} color="#333" />
      </TouchableOpacity>
    </View>
  </View>

  {/* ScrollView with ref */}
  <ScrollView
    ref={scrollRef}
    horizontal
    showsHorizontalScrollIndicator={false}
    style={{
      marginVertical: 10,
      paddingVertical: 5,
    }}
    contentContainerStyle={{
      paddingHorizontal: 10,
      alignItems: "center",
    }}
  >
    {dates.map((date, idx) => {
      const { dayName, dayNumMonth } = formatDate(date);
      return (
        <TouchableOpacity
          key={idx}
          style={{
            height: 110,
            width: 80,
            marginHorizontal: 10,
            borderRadius: 15,
            backgroundColor: selectedDate === date ? "#007AFF" : "#f8f9fa",
            borderWidth: 1,
            borderColor: selectedDate === date ? "#007AFF" : "#e9ecef",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3,
            alignItems: "center",
          }}
          onPress={() => {
            setSelectedDate(date);
            setSelectedTime(null);
          }}
        >
          {/* Day (Mon, Tue) */}
          <Text
            style={{
              color: selectedDate === date ? "#fff" : "#495057",
              fontWeight: "600",
              fontSize: 14,
              marginTop: 8,
              marginBottom: 17,
            }}
          >
            {dayName}
          </Text>

          {/* Date (16 Sep) */}
          <Text
            style={{
              color: selectedDate === date ? "#fff" : "#495057",
              fontWeight: selectedDate === date ? "bold" : "600",
              fontSize: 14,
              textAlign: "center",
            }}
          >
            {dayNumMonth}
          </Text>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
 <Text style={styles.sectionTitle}>Available Slots</Text>

// Enhanced Available Slots Section
<View style={{
  marginHorizontal: 16,
  backgroundColor: "#fff",
  marginTop: 20,
 
  borderRadius: 16,
}}>
  
  {/* Header with icon */}
  <View style={{
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  }}>
    <View style={{
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#007AFF15",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    }}>
      <Icon name="clock" size={20} color="#007AFF" />
    </View>
    <Text style={[styles.sectionTitle, { 
      fontSize: 18, 
      fontWeight: "700",
      color: "#1a1a1a",
      marginBottom: 0,
    }]}>
      Available Time Slots
    </Text>
  </View>

  {/* Morning Slots */}
  {morning.length > 0 && (
    <View style={{ marginBottom: 24 }}>
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
      }}>
        <View style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: "#FFB800",
          marginRight: 10,
        }} />
        <Icon name="sunrise" size={16} color="#FFB800" style={{ marginRight: 6 }} />
        <Text style={{
          fontSize: 16,
          fontWeight: "600",
          color: "#333",
        }}>
          Morning (6:00 AM - 12:00 PM)
        </Text>
      </View>
      
      <View style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
      }}>
        {morning.map((slot, index) => (
          <TouchableOpacity
            key={`morning-${index}`}
            style={{
              paddingVertical: 14,
              paddingHorizontal: 18,
              borderRadius: 25,
              backgroundColor: selectedTime === slot.start_time ? "#007AFF" : "#fff",
              borderWidth: 2,
              borderColor: selectedTime === slot.start_time ? "#007AFF" : "#e8f4fd",
              shadowColor: selectedTime === slot.start_time ? "#007AFF" : "#000",
              shadowOffset: { width: 0, height: selectedTime === slot.start_time ? 4 : 2 },
              shadowOpacity: selectedTime === slot.start_time ? 0.3 : 0.08,
              shadowRadius: selectedTime === slot.start_time ? 8 : 4,
              elevation: selectedTime === slot.start_time ? 6 : 2,
              minWidth: 100,
              alignItems: "center",
              transform: selectedTime === slot.start_time ? [{ scale: 1.02 }] : [{ scale: 1 }],
            }}
            onPress={() => setSelectedTime(slot.start_time)}
          >
            <Text style={{
              color: selectedTime === slot.start_time ? "#fff" : "#007AFF",
              fontWeight: selectedTime === slot.start_time ? "700" : "600",
              fontSize: 13,
              textAlign: "center",
            }}>
              {slot.start_time}
            </Text>
            <Text style={{
              color: selectedTime === slot.start_time ? "#fff" : "#007AFF",
              fontSize: 10,
              marginTop: 2,
              opacity: 0.8,
            }}>
              {slot.end_time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )}

  {/* Afternoon Slots */}
  {afternoon.length > 0 && (
    <View style={{ marginBottom: 24 }}>
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
      }}>
        <View style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: "#FF6B35",
          marginRight: 10,
        }} />
        <Icon name="sun" size={16} color="#FF6B35" style={{ marginRight: 6 }} />
        <Text style={{
          fontSize: 16,
          fontWeight: "600",
          color: "#333",
        }}>
          Afternoon (12:00 PM - 6:00 PM)
        </Text>
      </View>
      
      <View style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
      }}>
        {afternoon.map((slot, index) => (
          <TouchableOpacity
            key={`afternoon-${index}`}
            style={{
              paddingVertical: 14,
              paddingHorizontal: 18,
              borderRadius: 25,
              backgroundColor: selectedTime === slot.start_time ? "#FF6B35" : "#fff",
              borderWidth: 2,
              borderColor: selectedTime === slot.start_time ? "#FF6B35" : "#ffeee8",
              shadowColor: selectedTime === slot.start_time ? "#FF6B35" : "#000",
              shadowOffset: { width: 0, height: selectedTime === slot.start_time ? 4 : 2 },
              shadowOpacity: selectedTime === slot.start_time ? 0.3 : 0.08,
              shadowRadius: selectedTime === slot.start_time ? 8 : 4,
              elevation: selectedTime === slot.start_time ? 6 : 2,
              minWidth: 100,
              alignItems: "center",
              transform: selectedTime === slot.start_time ? [{ scale: 1.02 }] : [{ scale: 1 }],
            }}
            onPress={() => setSelectedTime(slot.start_time)}
          >
            <Text style={{
              color: selectedTime === slot.start_time ? "#fff" : "#FF6B35",
              fontWeight: selectedTime === slot.start_time ? "700" : "600",
              fontSize: 13,
              textAlign: "center",
            }}>
              {slot.start_time}
            </Text>
            <Text style={{
              color: selectedTime === slot.start_time ? "#fff" : "#FF6B35",
              fontSize: 10,
              marginTop: 2,
              opacity: 0.8,
            }}>
              {slot.end_time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )}

  {/* Evening Slots */}
  {evening.length > 0 && (
    <View style={{ marginBottom: 12 }}>
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
      }}>
        <View style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: "#6C5CE7",
          marginRight: 10,
        }} />
        <Icon name="sunset" size={16} color="#6C5CE7" style={{ marginRight: 6 }} />
        <Text style={{
          fontSize: 16,
          fontWeight: "600",
          color: "#333",
        }}>
          Evening (6:00 PM - 10:00 PM)
        </Text>
      </View>
      
      <View style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
      }}>
        {evening.map((slot, index) => (
          <TouchableOpacity
            key={`evening-${index}`}
            style={{
              paddingVertical: 14,
              paddingHorizontal: 18,
              borderRadius: 25,
              backgroundColor: selectedTime === slot.start_time ? "#6C5CE7" : "#fff",
              borderWidth: 2,
              borderColor: selectedTime === slot.start_time ? "#6C5CE7" : "#f0efff",
              shadowColor: selectedTime === slot.start_time ? "#6C5CE7" : "#000",
              shadowOffset: { width: 0, height: selectedTime === slot.start_time ? 4 : 2 },
              shadowOpacity: selectedTime === slot.start_time ? 0.3 : 0.08,
              shadowRadius: selectedTime === slot.start_time ? 8 : 4,
              elevation: selectedTime === slot.start_time ? 6 : 2,
              minWidth: 100,
              alignItems: "center",
              transform: selectedTime === slot.start_time ? [{ scale: 1.02 }] : [{ scale: 1 }],
            }}
            onPress={() => setSelectedTime(slot.start_time)}
          >
            <Text style={{
              color: selectedTime === slot.start_time ? "#fff" : "#6C5CE7",
              fontWeight: selectedTime === slot.start_time ? "700" : "600",
              fontSize: 13,
              textAlign: "center",
            }}>
              {slot.start_time}
            </Text>
            <Text style={{
              color: selectedTime === slot.start_time ? "#fff" : "#6C5CE7",
              fontSize: 10,
              marginTop: 2,
              opacity: 0.8,
            }}>
              {slot.end_time}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )}

  {/* No slots available */}
  {morning.length === 0 && afternoon.length === 0 && evening.length === 0 && (
    <View style={{
      alignItems: "center",
      paddingVertical: 40,
      paddingHorizontal: 20,
    }}>
      <View style={{
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#f8f9fa",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
      }}>
        <Icon name="calendar-x" size={32} color="#adb5bd" />
      </View>
      <Text style={{
        fontSize: 16,
        fontWeight: "600",
        color: "#6c757d",
        marginBottom: 8,
        textAlign: "center",
      }}>
        No Slots Available
      </Text>
      <Text style={{
        fontSize: 14,
        color: "#adb5bd",
        textAlign: "center",
        lineHeight: 20,
      }}>
        Please select a different date to view available time slots
      </Text>
    </View>
  )}

  {/* Selected slot info */}
  {selectedTime && (
    <View style={{
      marginTop: 20,
      padding: 16,
      backgroundColor: "#f8fff8",
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#28a745",
      flexDirection: "row",
      alignItems: "center",
    }}>
      <View style={{
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#28a745",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
      }}>
        <Icon name="check" size={16} color="#fff" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{
          fontSize: 14,
          fontWeight: "600",
          color: "#28a745",
          marginBottom: 2,
        }}>
          Selected Time Slot
        </Text>
        <Text style={{
          fontSize: 13,
          color: "#666",
        }}>
          {formatDate(selectedDate).dayName}, {formatDate(selectedDate).dayNumMonth} at {selectedTime}
        </Text>
      </View>
    </View>
  )}
</View>

</View>

      </ScrollView>
       <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookAppointment}>
          <Text style={styles.bookButtonText}>
            {selectedDate && selectedTime
              ? `Book ${formatDate(selectedDate)} at ${selectedTime}`
              : "Select a date & slot"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default DoctorBookingScreen
