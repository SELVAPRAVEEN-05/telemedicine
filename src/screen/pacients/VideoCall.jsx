import React, { useEffect, useState } from "react";
import { View, Alert, TouchableOpacity, Platform } from "react-native";
import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
} from "@zegocloud/zego-uikit-prebuilt-call-rn";
import { useNavigation } from "@react-navigation/native";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions";
import Icon from "react-native-vector-icons/Feather";

const VideoCall = () => {
  const navigation = useNavigation();
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        const camera =
          Platform.OS === "ios"
            ? PERMISSIONS.IOS.CAMERA
            : PERMISSIONS.ANDROID.CAMERA;
        const mic =
          Platform.OS === "ios"
            ? PERMISSIONS.IOS.MICROPHONE
            : PERMISSIONS.ANDROID.RECORD_AUDIO;

        const results = await Promise.all([check(camera), check(mic)]);

        if (results.every((s) => s === RESULTS.GRANTED)) {
          setPermissionsGranted(true);
        } else {
          const statuses = await Promise.all([request(camera), request(mic)]);
          if (statuses.every((s) => s === RESULTS.GRANTED)) {
            setPermissionsGranted(true);
          } else {
            Alert.alert(
              "Permissions required",
              "Camera and Microphone are needed for video calls"
            );
          }
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestPermissions();
  }, []);

  if (!permissionsGranted) return null;

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={{ padding: 10 }}>
        <Icon
          name="arrow-left"
          size={24}
          color={"#000"}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </TouchableOpacity>
            <ZegoUIKitPrebuiltCall
  appID={1440274673}
  appSign="1b1cf233143c7dc298b354c1e8962b409b3fd4b6de7ef988c4e4c7b516d06213"
  userID={"user1"}
  userName={"tvk"}
  callID={"12345678"}
  config={{
    ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
    onHangUp: () => {
      // Small delay ensures the call SDK finishes cleanup
      setTimeout(() => {
        navigation.navigate("UpcomingEvents"); 
        // Or if you want to reset stack:
        // navigation.reset({ index: 0, routes: [{ name: "UpcomingEvents" }] });
      }, 300);
    },
  }}
/>


    </View>
  );
};

export default VideoCall;
