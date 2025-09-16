import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; // ✅ import AsyncStorage

const LANGUAGE_KEY = "appLanguage"; // same key used in dashboard
  

import Icon from 'react-native-vector-icons/Feather';

// ✅ Import your typed routes
import { RootStackParamList } from '../../route/appNavigator';
import { consultDoctorstyles as styles } from '../../styles/consultDoctorStyle';

// ✅ Navigation type for this screen
type ConsultDoctorNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ConsultDoctor'
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
}

// Props for DoctorCard
interface DoctorCardProps extends Doctor {
  onPress: () => void;
}
const translations: Record<string, any> = {
  English: {
  header: "Find Your Expert",
  searchPlaceholder: "Search experts, specialities...",
  bookAppointment: "Book Appointment",
  availableNow: "Available Now",
  inAnotherCall: "In another Call",
  specializedIn: "Specialized in",
  callsAttended: "Calls Attended",
  creditsPerMin: "Credits /Min",
  notSpecified: "Not Specified",
  noExperience: "No Experience",
  yearsExperience: "Years of Experience",
  consultationFee: "Consultation Fee",
  payAndConnect: "Pay & Connect",
  English: "English",
  Hindi: "Hindi",
  Punjabi: "Punjabi",
  Tamil: "Tamil",
    Cardiology: "Cardiology",
  Dermatology: "Dermatology",
  Orthopedics: "Orthopedics",
},

हिंदी: {
  header: "अपने विशेषज्ञ को खोजें",
  searchPlaceholder: "विशेषज्ञों, विशेषज्ञता खोजें...",
  bookAppointment: "अपॉइंटमेंट बुक करें",
  availableNow: "उपलब्ध",
  inAnotherCall: "अन्य कॉल में",
  specializedIn: "विशेषज्ञता",
  callsAttended: "कॉल्स पूरी की",
  creditsPerMin: "क्रेडिट्स /मिनट",
  notSpecified: "निर्दिष्ट नहीं",
  noExperience: "अनुभव नहीं",
  yearsExperience: "अनुभव के वर्ष",
  consultationFee: "परामर्श शुल्क",
  payAndConnect: "भुगतान करें और जुड़ें",
  English: "अंग्रेज़ी",
  Hindi: "हिंदी",
  Punjabi: "पंजाबी",
  Tamil: "तमिल",
    Cardiology: "हृदय रोग विशेषज्ञ",
  Dermatology: "त्वचा रोग विशेषज्ञ",
  Orthopedics: "हड्डी रोग विशेषज्ञ",
},

ਪੰਜਾਬੀ: {
  header: "ਆਪਣਾ ਵਿਸ਼ੇਸ਼ਗਿਆ ਤਲਾਸ਼ੋ",
  searchPlaceholder: "ਵਿਸ਼ੇਸ਼ਗਿਆ, ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਖੋਜੋ...",
  bookAppointment: "ਬੁਕਿੰਗ ਕਰੋ",
  availableNow: "ਹੁਣ ਉਪਲਬਧ",
  inAnotherCall: "ਹੋਰ ਕਾਲ 'ਚ",
  specializedIn: "ਮਾਹਿਰਤਾ",
  callsAttended: "ਕਾਲਾਂ ਕੀਤੀਆਂ",
  creditsPerMin: "ਕ੍ਰੈਡਿਟ /ਮਿੰਟ",
  notSpecified: "ਨਿਰਧਾਰਿਤ ਨਹੀਂ",
  noExperience: "ਕੋਈ ਤਜਰਬਾ ਨਹੀਂ",
  yearsExperience: "ਅਨੁਭਵ ਦੇ ਸਾਲ",
  consultationFee: "ਸਲਾਹ ਫੀਸ",
  payAndConnect: "ਭੁਗਤਾਨ ਕਰੋ ਅਤੇ ਜੁੜੋ",
  English: "ਅੰਗਰੇਜ਼ੀ",
  Hindi: "ਹਿੰਦੀ",
  Punjabi: "ਪੰਜਾਬੀ",
  Tamil: "ਤਮਿਲ",
    Cardiology: "ਦਿਲ ਦੇ ਰੋਗ ਵਿਸ਼ੇਸ਼ਗਿਆ",
  Dermatology: "ਚਮੜੀ ਵਿਸ਼ੇਸ਼ਗਿਆ",
  Orthopedics: "ਹੱਡੀਆਂ ਦੇ ਰੋਗ ਵਿਸ਼ੇਸ਼ਗਿਆ",  
},

தமிழ்: {
  header: "உங்கள் நிபுணரை கண்டறியவும்",
  searchPlaceholder: "நிபுணர்கள், நிபுணத்துவங்களை தேடவும்...",
  bookAppointment: "நியமனத்தை பதிவு செய்க",
  availableNow: "இப்போது கிடைக்கிறது",
  inAnotherCall: "மற்றொரு அழைப்பில்",
  specializedIn: "திறமை",
  callsAttended: "அழைப்புகள்",
  creditsPerMin: "கிரெடிட்ஸ் /நிமிடம்",
  notSpecified: "சொல்லப்படவில்லை",
  noExperience: "அனுபவம் இல்லை",
  yearsExperience: "அனுபவ ஆண்டுகள்",
  consultationFee: "கட்டணம்",
  payAndConnect: "இணைக்கவும்",
  English: "ஆங்கிலம்",
  Hindi: "ஹிந்தி",
  Punjabi: "பஞ்சாபி",
  Tamil: "தமிழ்",
    Cardiology: "இதய நோய் நிபுணர்",
  Dermatology: "தோல் நோய் நிபுணர்",
  Orthopedics: "எலும்பியல் நிபுணர்",
},

};

const specialityTranslations:any = {
  English: {
    Cardiology: "Cardiology",
    Dermatology: "Dermatology",
    Orthopedics: "Orthopedics",
  },
  हिंदी: {
    Cardiology: "हृदय रोग विशेषज्ञ",
    Dermatology: "त्वचा रोग विशेषज्ञ",
    Orthopedics: "हड्डी रोग विशेषज्ञ",
  },
  ਪੰਜਾਬੀ: {
    Cardiology: "ਦਿਲ ਦੇ ਰੋਗ ਵਿਸ਼ੇਸ਼ਗਿਆ",
    Dermatology: "ਚਮੜੀ ਵਿਸ਼ੇਸ਼ਗਿਆ",
    Orthopedics: "ਹੱਡੀਆਂ ਦੇ ਰੋਗ ਵਿਸ਼ੇਸ਼ਗਿਆ",
  },
  தமிழ்: {
    Cardiology: "இதய நோய் நிபுணர்",
    Dermatology: "தோல் நோய் நிபுணர்",
    Orthopedics: "எலும்பியல் நிபுணர்",
  },
};


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
   const [selectedLanguage, setSelectedLanguage] = useState("English");
  const t = translations[selectedLanguage];
    const [translated, setTranslated] = useState<string | null>(null);
    const [lang,setlang] = useState("en");

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const lang = await AsyncStorage.getItem(LANGUAGE_KEY);
        if (lang) setSelectedLanguage(lang);
      } catch (err) {
        console.error(err);
      }
    };
    loadLanguage();
  }, []);

   

//   const [translatedName, setTranslatedName] = useState(name);

// useEffect(() => {
//   const translateName = async () => {
//     try {
//       const targetLangMap: Record<string, string> = {
//         English: "en",
//         हिंदी: "hi",
//         ਪੰਜਾਬੀ: "pa",
//         தமிழ்: "ta",
//       };
//       const targetLang = targetLangMap[selectedLanguage] || "en";

//       const res = await axios.get("https://api.mymemory.translated.net/get", {
//         params: { q: name, langpair: `en|${targetLang}` },
//       });

//       const translatedText = res.data.responseData.translatedText;
//       setTranslatedName(translatedText);
//     } catch (err) {
//       console.error("Translation error:", err);
//     }
//   };

//   translateName();
// }, [name, selectedLanguage]);

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
        {/* Speciality */}
        <View style={styles.specialitySection}>
          <Icon name="briefcase" size={16} color="#FF6B35" />
          <Text>
            {t.specializedIn} :  { speciality 
      ? specialityTranslations[selectedLanguage]?.[speciality] || speciality 
      : t.notSpecified }
</Text>
        </View>

        {/* Name + Status */}
        <View style={styles.nameSection}>
          {/* <Text style={styles.doctorName}>{translatedName}</Text> */}
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
              {isActive ? t.availableNow : t.inAnotherCall}
            </Text>
          </View>
        </View>

        {/* Experience & Calls */}
        <Text style={styles.statsText}>
          {experience} {t.yearsExperience} | {totalCalls} {t.callsAttended}
        </Text>

        {/* Languages */}
        <View style={styles.infoRow}>
          <Icon name="globe" size={14} color="#666" />
         <Text style={styles.infoText}>
  {languages.length > 0
    ? languages
        .map((lang) => translations[selectedLanguage][lang] || lang)
        .join(", ")
    : t.notSpecified}
</Text>
        </View>

        {/* Payment + Book Button */}
        {/* <View style={styles.actionSection}>


           <TouchableOpacity
            style={styles.callButton}
            onPress={() => navigation.navigate("bookSlot", { doctors: { id } })}
          >
             <Text style={styles.callButtonText}>{t.bookAppointment}</Text>
          </TouchableOpacity>
        </View> */}
        <View style={styles.actionSection}>
          <View>
            <Text style={styles.feeLabel}>{t.consultationFee}</Text>
            <Text style={styles.feeAmount}>₹{consultationFee}</Text>
          </View>
          <TouchableOpacity style={styles.callButton}>
            <Text style={styles.callButtonText}>{t.payAndConnect}</Text>
          </TouchableOpacity>
        </View>

        {/* Rating */}
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
   const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
    const t = translations[selectedLanguage];
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4Yzc4YWZiN2YyZWNlNjdkNzU3NjkzYiIsInJvbGUiOiJwYXRpZW50IiwiaWF0IjoxNzU3OTExNTM5LCJleHAiOjE3NTk2Mzk1Mzl9.1zHdKhPPp6268ttD052wxCMS_LDpgrU7h36_jaOVOpM";

  useEffect(() => {
    fetchDoctors();

    const loadLanguage = async () => {
      try {
        const lang = await AsyncStorage.getItem(LANGUAGE_KEY);
        if (lang) {
          setSelectedLanguage(lang);
          console.log("Selected Language from storage 1:", lang); // ✅ print to console
        }
      } catch (err) {
        console.error("Error loading language:", err);
      }
    };

    loadLanguage();
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
        consultationFee: 0||doc.creditsPerMinute, 
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
    <DoctorCard {...item} onPress={() => console.log('Selected:', item.name)} />
  );

  return (
     <View style={styles.container} >
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
      <ScrollView>
             <FlatList
        scrollEnabled={false}
        data={doctors}
        renderItem={renderDoctor}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
      </ScrollView>
     
      
    </View>
  );
};

export default ConsultDoctor;
 