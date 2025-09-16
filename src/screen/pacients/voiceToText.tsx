// // App.js
// import React, { useEffect, useState } from 'react';
// import {
//   ActivityIndicator,
//   FlatList,
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import Tts from 'react-native-tts';

// const GEMINI_API_KEY = 'AIzaSyBwIFSpYKs3YIKvGp1a20Jf5C7g65zRHgc'; // replace with your key
// const GEMINI_URL =
//   'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// export default function App() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     Tts.setDefaultLanguage('ta-IN');
//     Tts.setDefaultRate(0.5);
//     Tts.setDefaultPitch(1.1);
//     Tts.voices().then(voices => console.log('Available TTS voices:', voices));
//   }, []);

//   const speakText = text => {
//     Tts.stop();
//     Tts.speak(text);
//   };

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = {
//       id: Date.now().toString(),
//       role: 'user',
//       content: input.trim(),
//     };
//     setMessages(prev => [...prev, userMessage]);
//     setInput('');
//     setLoading(true);

//     try {
//       const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           contents: [
//             {
//               role: 'user',
//               parts: [
//                 {
//                   text:
//                     'Give only in tamil translated language. ' +
//                     'You are a tamil healthcare assistant. give response in tamil language. ' +
//                     'When the user describes symptoms, respond in simple points:\n' +
//                     '• List possible common causes (easy to understand).\n' +
//                     'give in points in numbers' +
//                     '• Suggest the type of doctor they should consult (e.g., General Physician, Cardiologist, Dermatologist).\n' +
//                     'User: ' +
//                     userMessage.content,
//                 },
//               ],
//             },
//           ],
//         }),
//       });

//       const data = await response.json();
//       console.log('Gemini response:', data);

//       let replyText =
//         data.candidates?.[0]?.content?.parts?.[0]?.text ||
//         data.error?.message ||
//         'No response from Gemini.';

//       const botMessage = {
//         id: (Date.now() + 1).toString(),
//         role: 'assistant',
//         content: replyText,
//       };
//       setMessages(prev => [...prev, botMessage]);
//       speakText(replyText);
//     } catch (err) {
//       console.error('Error:', err);
//       const errorMsg = 'Network error: ' + err.message;
//       setMessages(prev => [
//         ...prev,
//         {
//           id: (Date.now() + 2).toString(),
//           role: 'assistant',
//           content: errorMsg,
//         },
//       ]);
//       speakText(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderItem = ({ item }) => (
//     <View
//       style={[
//         styles.bubble,
//         item.role === 'user' ? styles.userBubble : styles.botBubble,
//       ]}
//     >
//       <Text style={styles.message}>{item.content}</Text>
//       {item.role === 'assistant' && (
//         <TouchableOpacity
//           style={styles.speakBtn}
//           onPress={() => speakText(item.content)}
//         >
//           <Text style={styles.speakText}>🔊</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         data={messages}
//         keyExtractor={item => item.id}
//         renderItem={renderItem}
//         contentContainerStyle={{ padding: 12 }}
//       />

//       <View style={styles.inputRow}>
//         <TextInput
//           style={styles.input}
//           placeholder="Describe your symptoms..."
//           value={input}
//           onChangeText={setInput}
//           editable={!loading}
//         />
//         <TouchableOpacity
//           style={styles.sendBtn}
//           onPress={sendMessage}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.sendText}>Send</Text>
//           )}
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   bubble: {
//     marginVertical: 6,
//     padding: 12,
//     borderRadius: 18,
//     maxWidth: '75%',
//     shadowColor: '#000',
//     color: '#fff',
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   userBubble: {
//     alignSelf: 'flex-end',
//     backgroundColor: '#FFA726', // bright orange
//     color: '#fff',
//     borderBottomRightRadius: 4,
//   },
//   botBubble: {
//     alignSelf: 'flex-start',
//     backgroundColor: '#fff',
//     borderLeftWidth: 2,
//     borderLeftColor: '#FFA726', // orange accent border
//     borderBottomLeftRadius: 4,
//   },
//   message: {
//     fontSize: 16,
//     lineHeight: 22,
//     color: '#333',
//     flex: 1,
//   },
//   speakBtn: {
//     marginLeft: 8,
//     padding: 4,
//   },
//   speakText: {
//     fontSize: 18,
//     color: '#FFA726',
//   },
//   inputRow: {
//     flexDirection: 'row',
//     padding: 10,
//     borderTopWidth: 1,
//     borderColor: '#ddd',
//     backgroundColor: '#fff',
//     alignItems: 'center',
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#FFA726', // orange border
//     borderRadius: 25,
//     paddingHorizontal: 15,
//     paddingVertical: 8,
//     fontSize: 16,
//     backgroundColor: '#FFF8E1', // very light orange
//     color: '#333',
//   },
//   sendBtn: {
//     marginLeft: 8,
//     backgroundColor: '#FF9800', // deep orange
//     borderRadius: 25,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   sendText: {
//     color: '#fff',
//     fontWeight: '700',
//     fontSize: 16,
//   },
// });

// App.js
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Tts from 'react-native-tts';

const GEMINI_API_KEY = 'AIzaSyBwIFSpYKs3YIKvGp1a20Jf5C7g65zRHgc';
const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Set TTS for Kannada
    Tts.setDefaultLanguage('kn-IN');
    Tts.setDefaultRate(0.5);
    Tts.setDefaultPitch(1.1);
    Tts.voices().then(voices => console.log('Available TTS voices:', voices));
  }, []);

  const speakText = text => {
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
                    'Give only in Kannada translated language. ' +
                    'You are a Kannada healthcare assistant. Respond in Kannada. ' +
                    'When the user describes symptoms, respond in simple points:\n' +
                    '• List possible common causes (easy to understand).\n' +
                    '• Suggest the type of doctor they should consult (e.g., General Physician, Cardiologist, Dermatologist).\n' +
                    'User: ' +
                    userMessage.content,
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
      <Text style={styles.message}>{item.content}</Text>
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

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 12 }}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Describe your symptoms..."
          value={input}
          onChangeText={setInput}
          editable={!loading}
        />
        <TouchableOpacity
          style={styles.sendBtn}
          onPress={sendMessage}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.sendText}>Send</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  bubble: {
    marginVertical: 6,
    padding: 12,
    borderRadius: 18,
    maxWidth: '75%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#ffe0b2',
    borderBottomRightRadius: 4,
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderLeftWidth: 2,
    borderLeftColor: '#ff9800',
    borderBottomLeftRadius: 4,
  },
  message: { fontSize: 16, lineHeight: 22, color: '#333', flex: 1 },
  speakBtn: { marginLeft: 8, padding: 4 },
  speakText: { fontSize: 18, color: '#ff9800' },
  inputRow: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ffb74d',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  sendBtn: {
    marginLeft: 8,
    backgroundColor: '#ff9800',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  sendText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
