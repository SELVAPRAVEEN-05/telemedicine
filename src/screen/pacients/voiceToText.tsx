import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Voice, {
  SpeechResultsEvent,
  SpeechErrorEvent,
} from '@react-native-voice/voice';

export default function VoiceToText() {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);

  // ✅ Ask for microphone permission
  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          {
            title: 'Microphone Permission',
            message:
              'This app needs access to your microphone for speech recognition.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } catch (err) {
        console.warn('Permission error:', err);
      }
    } else {
      // iOS automatically asks via Info.plist
      setHasPermission(true);
    }
  };

  useEffect(() => {
    requestPermission();

    Voice.onSpeechStart = () => setIsRecording(true);
    Voice.onSpeechEnd = () => setIsRecording(false);

    Voice.onSpeechError = (e: SpeechErrorEvent) =>
      setError(e.error?.message || 'Speech error occurred');

    Voice.onSpeechResults = (e: SpeechResultsEvent) =>
      setResult(e.value?.[0] || '');

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startRecording = async () => {
    if (!hasPermission) {
      setError('Microphone permission not granted');
      return;
    }
    try {
      setError('');
      await Voice.start('en-US');
    } catch (e: any) {
      setError(e.message || 'Failed to start recording');
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
    } catch (e: any) {
      setError(e.message || 'Failed to stop recording');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Voice to Text</Text>

      <Text style={{ fontSize: 16, color: error ? '#FF3B30' : '#34C759' }}>
        {error || result}
      </Text>

      <TouchableOpacity
        disabled={!hasPermission}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <Text
          style={{
            fontSize: 16,
            color: !hasPermission
              ? '#999'
              : isRecording
              ? '#FF3B30'
              : '#34C759',
          }}
        >
          {!hasPermission
            ? 'Permission required'
            : isRecording
            ? 'Listening...'
            : 'Press the button to start'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
