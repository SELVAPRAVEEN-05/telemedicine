import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleGetOtp = () => {
    setOtpSent(true);
    // Call backend to send OTP
  };

  return (
    <View style={styles.gradient}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.card}>
          <Text style={styles.heading}>🔐 Login</Text>
          <Text style={styles.subHeading}>Welcome Back! Please sign i</Text>

          <TextInput
            style={styles.input}
            placeholderTextColor={"black"}
            placeholder="+91 Mobile Number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          {!otpSent && (
            <TouchableOpacity style={styles.button} onPress={handleGetOtp}>
              <View
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Get OTP</Text>
              </View>
            </TouchableOpacity>
          )}

          {otpSent && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                keyboardType="number-pad"
                value={otp}
                onChangeText={setOtp}
              />
              <TouchableOpacity style={styles.button}>
                <View
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>Verify & Login</Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FF6B00",
    textAlign: "center",
  },
  subHeading: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#FFB366",
    borderRadius: 12,
    padding: 14,
    marginBottom: 15,
    backgroundColor: "#FFF",
  },
  button: {
    borderRadius: 25,
    overflow: "hidden",
    marginBottom: 10,
  },
  buttonGradient: {
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "#FF6B00",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
