import React, { useState } from "react";
import { View, Text, Button, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";

const TranslatorExample = () => {
  const [translated, setTranslated] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const translate = async (text: string, targetLang: string) => {
    setLoading(true);
    try {
      // Call MyMemory API
      const res = await axios.get("https://api.mymemory.translated.net/get", {
        params: {
          q: text,
          langpair: `en|${targetLang}`, // English → target language
        },
      });

      // Extract translated text
      const translatedText = res.data.responseData.translatedText;
      setTranslated(translatedText);
    } catch (err: any) {
      console.error("Translation error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const doctorName = "Dr .Selva praveen";

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Doctor Name:</Text>
      <Text style={styles.name}>{doctorName}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Translate to Hindi" onPress={() => translate(doctorName, "hi")} />
        <Button title="Translate to Punjabi" onPress={() => translate(doctorName, "pa")} />
      </View>

      {loading && <ActivityIndicator size="large" color="blue" />}
      {translated && (
        <Text style={styles.translated}>Translated: {translated}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  translated: {
    fontSize: 18,
    marginTop: 10,
    color: "green",
  },
});

export default TranslatorExample;
