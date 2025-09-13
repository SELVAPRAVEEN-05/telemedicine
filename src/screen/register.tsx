import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../route/appNavigator";


type RegisterProps = NativeStackNavigationProp<RootStackParamList, "Register">;

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    dob: '',
    gender: '',
    phone: '',
    password: '',
    address: '',
    language: '',
  });

  const navigation = useNavigation<RegisterProps>();

  const genders = ['Male', 'Female', 'Other'];
  const languages = ['Punjabi', 'Tamil', 'Hindi', 'English'];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Registerg</Text>

      {/* Full Name */}
      <TextInput
        style={styles.input}
        placeholderTextColor={'black'}
        placeholder="Full Name"
        value={form.name}
        onChangeText={name => setForm({ ...form, name })}
      />

      {/* DOB */}
      <TextInput
        placeholderTextColor={'black'}
        style={styles.input}
        placeholder="Date of Birth (DD/MM/YYYY)"
        value={form.dob}
        onChangeText={dob => setForm({ ...form, dob })}
      />

      {/* Gender Buttons */}
      <View style={styles.row}>
        {genders.map(g => (
          <TouchableOpacity
            key={g}
            style={[
              styles.optionButton,
              form.gender === g && styles.optionSelected,
            ]}
            onPress={() => setForm({ ...form, gender: g })}
          >
            <Text
              style={[
                styles.optionText,
                form.gender === g && styles.optionTextSelected,
              ]}
            >
              {g}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Mobile Number */}
      <TextInput
        placeholderTextColor={'black'}
        style={styles.input}
        placeholder="Mobile Number"
        keyboardType="phone-pad"
        value={form.phone}
        onChangeText={phone => setForm({ ...form, phone })}
      />

      {/* Password */}
      <TextInput
        placeholderTextColor={'black'}
        style={styles.input}
        placeholder="Password (Optional)"
        secureTextEntry
        value={form.password}
        onChangeText={password => setForm({ ...form, password })}
      />

      {/* Address */}
      <TextInput
        placeholderTextColor={'black'}
        style={styles.input}
        placeholder="Address / Village Name"
        value={form.address}
        onChangeText={address => setForm({ ...form, address })}
      />

      {/* Language Buttons */}
      <View style={styles.row}>
        {languages.map(lang => (
          <TouchableOpacity
            key={lang}
            style={[
              styles.optionButton,
              form.language === lang && styles.optionSelected,
            ]}
            onPress={() => setForm({ ...form, language: lang })}
          >
            <Text
              style={[
                styles.optionText,
                form.language === lang && styles.optionTextSelected,
              ]}
            >
              {lang}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Register Button */}
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitText}>Register</Text>
      </TouchableOpacity>

      {/* Login link */}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginLink}>
          Already have an account?{' '}
          <Text style={{ color: '#009688' }}>Login</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
    gap: 10,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
    backgroundColor: '#f9f9f9',
  },
  optionSelected: {
    backgroundColor: '#009688',
    borderColor: '#009688',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  optionTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#00c389',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 15,
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
  },
});
