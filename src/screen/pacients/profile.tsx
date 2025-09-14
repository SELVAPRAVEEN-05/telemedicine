import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function Profile() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile Page</Text>
      <MaterialIcons name="account-circle" size={80} color="#FF6B00" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 20, marginBottom: 10 },
});
