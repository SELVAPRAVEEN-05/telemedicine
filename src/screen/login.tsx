import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import * as Keychain from 'react-native-keychain';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import { RootStackParamList } from '../route/appNavigator';
import { LoginStyles as styles } from '../styles/login';
type LoginNav = NativeStackNavigationProp<RootStackParamList>;

export default function Login() {
  const [phone, setPhone] = useState('');

  const [otp, setOtp] = useState('');
  const navigation = useNavigation<LoginNav>();

  const handleSendOTP = async () => {
    if (!phone) {
      Alert.alert('Error', 'Please enter OTP');
      return;
    }

    try {
      const res = await axios.post(
        'https://telemedicine-server-o5tc.onrender.com/patient/request-otp',
        { phone },
      );
      if (res.status === 200) {
        Alert.alert('OTP Send successful');
        // Navigate or continue flow here
      } else {
        Alert.alert('Error', res.data?.message || 'Invalid OTP');
      }
    } catch (err: any) {
      Alert.alert('Error', 'Failed to verify OTP');
      console.log('Verify OTP error:', err.message);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || !phone) {
      Alert.alert('Error', 'Please enter both Mobile Number and OTP');
      return;
    }
    const payload = {
      phoneNumber: phone,
      code: otp,
    };

    try {
      const res = await axios.post(
        'https://telemedicine-server-o5tc.onrender.com/patient/verify-otp',
        payload,
      );

      if (res.status === 200) {
        // try {
        //   await Keychain.setGenericPassword('jwt', res?.data?.token);
        //   console.log('✅ Token saved securely in Android Keystore');
        // } catch (err) {
        //   console.log('❌ Error saving token:', err);
        // }

        navigation.replace('PatienrtLayout');
      } else {
        Alert.alert('Error', res.data?.message || 'Invalid OTP');
      }
    } catch (err: any) {
      Alert.alert('Error', 'Failed to verify OTP');
      console.log('Verify OTP error:', err.message);
    }
  };

  return (
    <View style={styles.gradient}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.card}>
          <Text style={styles.heading}>🔐 Login</Text>

          {/* Phone + Get OTP */}
          <View style={styles.row}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 10 }]}
              placeholder="Mobile Number"
              keyboardType="phone-pad"
              maxLength={10}
              value={phone}
              onChangeText={text => {
                const cleaned = text.replace(/[^0-9]/g, '');
                setPhone(cleaned);
              }}
            />
            <TouchableOpacity
              style={styles.smallButton}
              onPress={handleSendOTP}
            >
              <Text style={styles.smallButtonText}>Get OTP</Text>
            </TouchableOpacity>
          </View>

          {/* OTP input boxes */}
          <View style={styles.otpRow}>
            <TextInput
              style={[styles.input, { flex: 1, marginRight: 10 }]}
              placeholder="Enter OTP"
              keyboardType="number-pad"
              maxLength={6} // change to 6 if your OTP is 6 digits
              value={otp}
              onChangeText={setOtp}
            />
          </View>

          {/* Login Button */}
          <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.line} />
          </View>

          {/* Google Button */}
          <TouchableOpacity style={styles.googleButton}>
            <Text style={styles.googleText}>🌐 Continue with Google</Text>
          </TouchableOpacity>

          {/* Create Account Link */}
          <View style={styles.signupRow}>
            <Text style={styles.signupText}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.signupLink}>Create New Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
