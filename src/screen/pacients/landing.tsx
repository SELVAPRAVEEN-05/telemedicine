import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../../route/appNavigator';
import { Landingstyles as styles } from '../../styles/landingStyles';

type LandingScreenProp = NativeStackNavigationProp<RootStackParamList>;

export default function Landing() {
  const navigation = useNavigation<LandingScreenProp>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Hero Illustration */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/doctor.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Content Section */}
      <View style={styles.contentSection}>
        {/* Title & Subtitle */}
        <Text style={styles.title}>Village Health Connect</Text>
        <Text style={styles.subtitle}>
          Your trusted healthcare companion. Book appointments, consult with
          certified doctors, and manage your health from anywhere.
        </Text>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>🏥</Text>
            <Text style={styles.featureText}>Find nearby hospitals</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>👨‍⚕️</Text>
            <Text style={styles.featureText}>Consult certified doctors</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>📱</Text>
            <Text style={styles.featureText}>24/7 online support</Text>
          </View>
        </View>

        {/* Buttons */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('RoleSelectionScreen')}
        >
          <Text style={styles.primaryText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('RoleSelectionScreen')}
        >
          <Text style={styles.secondaryText}>Log In</Text>
        </TouchableOpacity>

        {/* Footer Text */}
        <Text style={styles.footerText}>
          Connecting rural communities with quality healthcare
        </Text>
      </View>
    </ScrollView>
  );
}
