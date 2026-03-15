import React, { useEffect, useState } from "react";
import { View, PermissionsAndroid, Platform, Alert } from "react-native";
import { ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG } from "@zegocloud/zego-uikit-prebuilt-call-rn";

const VideoCall = () => {
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === "android") {
        try {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ]);

          const cameraGranted =
            granted["android.permission.CAMERA"] === PermissionsAndroid.RESULTS.GRANTED;
          const micGranted =
            granted["android.permission.RECORD_AUDIO"] === PermissionsAndroid.RESULTS.GRANTED;

          if (cameraGranted && micGranted) {
            setPermissionsGranted(true);
          } else {
            Alert.alert("Permissions required", "Camera and Microphone are needed for video calls");
          }
        } catch (err) {
          console.warn(err);
        }
      } else {
        setPermissionsGranted(true); // iOS handled via Info.plist
      }
    };

    requestPermissions();
  }, []);

  if (!permissionsGranted) return null;

  return (
    <View style={{ flex: 1 }}>
      <ZegoUIKitPrebuiltCall
        appID={1440274673} // Replace with your AppID
        appSign="1b1cf233143c7dc298b354c1e8962b409b3fd4b6de7ef988c4e4c7b516d06213" // Replace with your AppSign
        userID={"user1"} // must be unique
        userName={"tvk"}
        callID={"12345678"} // must match between participants
        config={ONE_ON_ONE_VIDEO_CALL_CONFIG}
      />
    </View>
  );
};

export default VideoCall;
