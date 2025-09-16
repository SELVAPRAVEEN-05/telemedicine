import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Tts from 'react-native-tts';

const LANGUAGE_KEY = 'appLanguage';
const { width, height } = Dimensions.get('window');

const GEMINI_API_KEY = 'AIzaSyBwIFSpYKs3YIKvGp1a20Jf5C7g65zRHgc';
const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

const translations: Record<any, any> = {
  en: {
    title: 'Healthcare Assistant',
    subtitle:
      "Describe your symptoms and I'll help you understand possible causes and suggest which doctor to consult.",
  },
  hi: {
    title: 'स्वास्थ्य सहायक',
    subtitle:
      'अपने लक्षण बताएं और मैं आपको संभावित कारण समझाने और किस डॉक्टर से परामर्श करना चाहिए यह सुझाव दूंगा।',
  },
  ta: {
    title: 'சுகாதார உதவியாளர்',
    subtitle:
      'உங்கள் அறிகுறிகளை விவரிக்கவும், சாத்தியமான காரணங்களை விளக்கி எந்த மருத்துவரை அணுக வேண்டும் என்று பரிந்துரைப்பேன்.',
  },
  pa: {
    title: 'ਹੈਲਥਕੇਅਰ ਸਹਾਇਕ',
    subtitle:
      'ਆਪਣੇ ਲੱਛਣਾਂ ਬਾਰੇ ਦੱਸੋ ਅਤੇ ਮੈਂ ਤੁਹਾਨੂੰ ਸੰਭਾਵਿਤ ਕਾਰਨਾਂ ਬਾਰੇ ਸਮਝਾਵਾਂਗਾ ਅਤੇ ਕਿਹੜੇ ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ ਕਰਨੀ ਹੈ, ਇਹ ਸੁਝਾਅ ਦੇਵਾਂਗਾ।',
  },
};

// Doctor Icon Component
const DoctorIcon = () => (
  <View style={styles.doctorIconContainer}>
    <View style={styles.doctorIcon}>
      <Text style={styles.doctorEmoji}>👨‍⚕️</Text>
    </View>
    <Text style={styles.welcomeTitle}>Healthcare Assistant</Text>
    <Text style={styles.welcomeSubtitle}>
      Describe your symptoms and I'll help you understand possible causes and
      suggest which doctor to consult.
    </Text>
  </View>
);

export default function App() {
  const [messages, setMessages] = useState<any>([]);
  const [input, setInput] = useState<any>('');
  const [loading, setLoading] = useState<any>(false);
  const [appLanguage, setAppLanguage] = useState<string>('en');

  useEffect(() => {
    // Load stored language
    const loadLanguage = async () => {
      const lang = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (lang) {
        setAppLanguage(lang);
        configureTTS(lang);
      }
    };
    loadLanguage();
  }, []);

  // Configure TTS based on language
  const configureTTS = (lang: string) => {
    let voiceLang = 'en-US'; // fallback
    if (lang === 'ta') voiceLang = 'ta-IN';
    if (lang === 'hi') voiceLang = 'hi-IN';
    if (lang === 'te') voiceLang = 'te-IN';
    if (lang === 'ml') voiceLang = 'ml-IN';
    if (lang === 'kn') voiceLang = 'kn-IN';

    Tts.setDefaultLanguage(voiceLang);
    Tts.setDefaultRate(0.5);
    Tts.setDefaultPitch(1.1);
  };

  const speakText: any = (text: string) => {
    Tts.stop();
    Tts.speak(text);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [
                {
                  text:
                    `Give the response ONLY in ${appLanguage} language. ` +
                    `You are a healthcare assistant. ` +
                    `When the user describes symptoms, respond in simple points:\n` +
                    `1. List possible common causes.\n` +
                    `2. Suggest the type of doctor they should consult.\n` +
                    `User: ${userMessage.content}`,
                },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      console.log('Gemini response:', data);

      let replyText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        data.error?.message ||
        'No response from Gemini.';

      const botMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: replyText,
      };
      setMessages(prev => [...prev, botMessage]);
      speakText(replyText);
    } catch (err) {
      console.error('Error:', err);
      const errorMsg = 'Network error: ' + err.message;
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: 'assistant',
          content: errorMsg,
        },
      ]);
      speakText(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.bubble,
        item.role === 'user' ? styles.userBubble : styles.botBubble,
      ]}
    >
      <Text
        style={[
          styles.message,
          item.role === 'user' ? styles.userMessage : styles.botMessage,
        ]}
      >
        {item.content}
      </Text>
      {item.role === 'assistant' && (
        <TouchableOpacity
          style={styles.speakBtn}
          onPress={() => speakText(item.content)}
        >
          <Text style={styles.speakText}>🔊</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderEmptyComponent = () => <DoctorIcon />;

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Health Assistant</Text>
          <View style={styles.headerIcon}>
            <Text style={styles.headerEmoji}>🏥</Text>
          </View>
        </View>

        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={[
            styles.messagesList,
            messages.length === 0 && styles.emptyMessagesList,
          ]}
          ListEmptyComponent={renderEmptyComponent}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.inputContainer}>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Describe your symptoms..."
              placeholderTextColor="#999"
              value={input}
              onChangeText={setInput}
              editable={!loading}
              multiline={true}
              maxLength={500}
            />
            <TouchableOpacity
              style={[styles.sendBtn, loading && styles.sendBtnDisabled]}
              onPress={sendMessage}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.sendText}>📤</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#FFE0B2',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#E65100',
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerEmoji: {
    fontSize: 20,
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexGrow: 1,
  },
  emptyMessagesList: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  doctorIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    flex: 1,
  },
  doctorIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFE0B2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#FF9800',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  doctorEmoji: {
    fontSize: 60,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#F57C00',
    textAlign: 'center',
    marginBottom: 12,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 280,
  },
  bubble: {
    marginVertical: 4,
    padding: 16,
    borderRadius: 20,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF9800',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderLeftWidth: 4,
    borderLeftColor: '#FF6F00',
    borderBottomLeftRadius: 4,
  },
  message: {
    fontSize: 16,
    lineHeight: 22,
    flex: 1,
  },
  userMessage: {
    color: '#fff',
    fontWeight: '500',
  },
  botMessage: {
    color: '#333',
  },
  speakBtn: {
    marginLeft: 8,
    padding: 8,
    borderRadius: 16,
    backgroundColor: '#FFF3E0',
  },
  speakText: {
    fontSize: 16,
    color: '#FF6F00',
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#FFCC80',
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 16 : 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  inputRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'flex-end',
    maxHeight: 100,
  },
  input: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#FFCC80',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#FFF8E1',
    color: '#333',
    maxHeight: 80,
    minHeight: 48,
  },
  sendBtn: {
    marginLeft: 10,
    backgroundColor: '#FF6F00',
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6F00',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  sendBtnDisabled: {
    backgroundColor: '#FFCC80',
    shadowOpacity: 0.1,
  },
  sendText: {
    fontSize: 20,
  },
});
