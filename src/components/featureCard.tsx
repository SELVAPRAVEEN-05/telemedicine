import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import {patientDashboardStyles as styles } from '../styles/patientdashboard';

export const FeatureCard = ({
  title,
  subtitle,
  image,
  bgColor,
  borderColor,
  onPress,
}: any) => (
  <TouchableOpacity
    style={[
      styles.card,
      { backgroundColor: bgColor, borderColor: borderColor },
    ]}
    onPress={onPress}
  >
    <Image source={image} style={styles.cardImage} />
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardSubtitle}>{subtitle}</Text>
  </TouchableOpacity>
);
