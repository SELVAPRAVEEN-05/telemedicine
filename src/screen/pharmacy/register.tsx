// PharmacyRegisterScreen.tsx
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../../route/appNavigator';
type LoginNav = NativeStackNavigationProp<RootStackParamList>;

const PharmacyRegisterScreen = () => {
  const navigations = useNavigation<LoginNav>();

  const [form, setForm] = useState({
    pharmacyName: '',
    ownerName: '',
    licenseNumber: '',
    phone: '',
    address: '',
    email: '',
    password: '',
  });

  const handleChange = (field: string, value: string) =>
    setForm({ ...form, [field]: value });

  const handleRegister = () => {
    console.log('Register Data:', form);
  };

  const handleGooglePress = () => {
    console.log('Google button tapped - UI only');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Icon
          name="local-pharmacy"
          size={50}
          color="#FF7A00"
          style={styles.icon}
        />
        <Text style={styles.title}>Pharmacy Registration</Text>

        <TextInput
          style={styles.input}
          placeholderTextColor="black"
          placeholder="Pharmacy Name"
          value={form.pharmacyName}
          onChangeText={text => handleChange('pharmacyName', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Owner Name"
          placeholderTextColor="black"
          value={form.ownerName}
          onChangeText={text => handleChange('ownerName', text)}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="black"
          placeholder="License Number"
          value={form.licenseNumber}
          onChangeText={text => handleChange('licenseNumber', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          placeholderTextColor="black"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={text => handleChange('phone', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          placeholderTextColor="black"
          value={form.address}
          onChangeText={text => handleChange('address', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="black"
          keyboardType="email-address"
          value={form.email}
          onChangeText={text => handleChange('email', text)}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="black"
          placeholder="Password"
          secureTextEntry
          value={form.password}
          onChangeText={text => handleChange('password', text)}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigations.navigate('PharmacyDashboard')}
        >
          <Text style={styles.buttonText}>Register Pharmacy</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        {/* Google Sign-In Button - UI Only */}
        <TouchableOpacity style={styles.googleButton}>
          <Text style={styles.googleText}>🌐 Continue with Google</Text>
        </TouchableOpacity>

        {/* Create Account Link */}
        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Don’t have an account? </Text>
          <TouchableOpacity
            onPress={() => navigations.navigate('PharmacyLoginScreen')}
          >
            <Text style={styles.signupLink}>Create New Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFF8F0',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#FF7A00',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF7A00',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFB566',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#FF7A00',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  googleButton: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  googleText: { fontSize: 16, color: '#333', fontWeight: 'bold' },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  signupText: {
    fontSize: 14,
    color: '#666',
  },
  signupLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF6B00',
  },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 20 },
  line: { flex: 1, height: 1, backgroundColor: '#ccc' },
  orText: { marginHorizontal: 10, color: '#666', fontWeight: 'bold' },
});

export default PharmacyRegisterScreen;
