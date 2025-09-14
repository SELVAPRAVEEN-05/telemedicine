import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../route/appNavigator';
import { aiCheckerStyles as styles } from '../../styles/aiCheckerStyles';

type AiCheckerNav = NativeStackNavigationProp<RootStackParamList>;

interface Symptom {
  id: string;
  name: string;
  emoji: string;
  category: string;
}

interface AnalysisResult {
  riskLevel: 'low' | 'moderate' | 'high';
  confidence: number;
  recommendations: string[];
  possibleConditions: string[];
  urgency: 'routine' | 'urgent' | 'emergency';
}

const SYMPTOMS: Symptom[] = [
  { id: '1', name: 'Fever', emoji: '🤒', category: 'general' },
  { id: '2', name: 'Headache', emoji: '🤕', category: 'neurological' },
  { id: '3', name: 'Cough', emoji: '😷', category: 'respiratory' },
  { id: '4', name: 'Sore Throat', emoji: '😣', category: 'respiratory' },
  { id: '5', name: 'Nausea', emoji: '🤢', category: 'digestive' },
  { id: '6', name: 'Stomach Pain', emoji: '😖', category: 'digestive' },
  { id: '7', name: 'Fatigue', emoji: '😴', category: 'general' },
  { id: '8', name: 'Dizziness', emoji: '😵', category: 'neurological' },
  { id: '9', name: 'Chest Pain', emoji: '💔', category: 'cardiac' },
  { id: '10', name: 'Shortness of Breath', emoji: '😤', category: 'respiratory' },
  { id: '11', name: 'Joint Pain', emoji: '🦴', category: 'musculoskeletal' },
  { id: '12', name: 'Skin Rash', emoji: '🔴', category: 'dermatological' },
  { id: '13', name: 'Eye Irritation', emoji: '👁️', category: 'ophthalmological' },
  { id: '14', name: 'Back Pain', emoji: '🏃', category: 'musculoskeletal' },
  { id: '15', name: 'Runny Nose', emoji: '👃', category: 'respiratory' },
  { id: '16', name: 'Muscle Ache', emoji: '💪', category: 'musculoskeletal' },
];

export default function AiChecker() {
  const navigation = useNavigation<AiCheckerNav>();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [customSymptoms, setCustomSymptoms] = useState('');
  const [severity, setSeverity] = useState<'mild' | 'moderate' | 'severe'>('mild');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId) 
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const analyzeSymptoms = async () => {
    if (selectedSymptoms.length === 0 && !customSymptoms.trim()) {
      Alert.alert('No Symptoms Selected', 'Please select at least one symptom or describe your symptoms to continue.');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const result = generateAnalysis();
      setAnalysisResult(result);
      setIsAnalyzing(false);
    }, 2000);
  };

  const generateAnalysis = (): AnalysisResult => {
    const selectedSymptomNames = selectedSymptoms.map(id => 
      SYMPTOMS.find(s => s.id === id)?.name
    ).filter(Boolean);

    // Simple rule-based analysis for demonstration
    let riskLevel: 'low' | 'moderate' | 'high' = 'low';
    let urgency: 'routine' | 'urgent' | 'emergency' = 'routine';
    let recommendations: string[] = [];
    let possibleConditions: string[] = [];

    const hasCardiacSymptoms = selectedSymptomNames.some(name => 
      ['Chest Pain', 'Shortness of Breath'].includes(name!)
    );
    const hasRespiratorySymptoms = selectedSymptomNames.some(name => 
      ['Cough', 'Sore Throat', 'Shortness of Breath', 'Runny Nose'].includes(name!)
    );
    const hasDigestiveSymptoms = selectedSymptomNames.some(name => 
      ['Nausea', 'Stomach Pain'].includes(name!)
    );
    const hasFever = selectedSymptomNames.includes('Fever');

    if (hasCardiacSymptoms && severity === 'severe') {
      riskLevel = 'high';
      urgency = 'emergency';
      possibleConditions = ['Cardiac Emergency', 'Heart Attack', 'Angina'];
      recommendations = [
        'Seek immediate emergency medical attention',
        'Call emergency services (911) immediately',
        'Do not drive yourself to the hospital',
        'Take prescribed heart medications if available'
      ];
    } else if (hasFever && selectedSymptoms.length >= 3) {
      riskLevel = 'moderate';
      urgency = 'urgent';
      possibleConditions = ['Viral Infection', 'Bacterial Infection', 'Flu'];
      recommendations = [
        'Schedule an appointment with your doctor within 24-48 hours',
        'Stay hydrated and get plenty of rest',
        'Monitor your temperature regularly',
        'Avoid contact with others to prevent spread'
      ];
    } else if (hasRespiratorySymptoms) {
      riskLevel = severity === 'severe' ? 'moderate' : 'low';
      urgency = severity === 'severe' ? 'urgent' : 'routine';
      possibleConditions = ['Common Cold', 'Upper Respiratory Infection', 'Allergies'];
      recommendations = [
        'Rest and stay hydrated',
        'Use over-the-counter medications as needed',
        'Gargle with warm salt water for sore throat',
        'Consider seeing a doctor if symptoms worsen'
      ];
    } else if (hasDigestiveSymptoms) {
      riskLevel = 'low';
      possibleConditions = ['Gastroenteritis', 'Food Poisoning', 'Indigestion'];
      recommendations = [
        'Stay hydrated with small sips of water',
        'Follow the BRAT diet (Bananas, Rice, Applesauce, Toast)',
        'Avoid dairy and fatty foods',
        'See a doctor if symptoms persist for more than 2 days'
      ];
    } else {
      possibleConditions = ['Minor Ailment', 'Stress-related symptoms'];
      recommendations = [
        'Monitor your symptoms',
        'Get adequate rest and maintain good hygiene',
        'Stay hydrated and eat nutritious foods',
        'Consider lifestyle factors that may be contributing'
      ];
    }

    return {
      riskLevel,
      confidence: Math.floor(Math.random() * 30) + 70, // 70-99%
      recommendations,
      possibleConditions,
      urgency
    };
  };

  const resetAnalysis = () => {
    setSelectedSymptoms([]);
    setCustomSymptoms('');
    setSeverity('mild');
    setAnalysisResult(null);
  };

  const handleConsultDoctor = () => {
    navigation.navigate('ConsultDoctor' as any);
  };

  const handleEmergency = () => {
    Alert.alert(
      'Emergency Services',
      'If this is a medical emergency, please call your local emergency number immediately.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call Emergency', onPress: () => console.log('Call emergency services') }
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>AI Symptom Checker</Text>
        <Text style={styles.subtitle}>
          Get preliminary health insights based on your symptoms
        </Text>
      </View>

      {/* Disclaimer */}
      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          ⚠️ This is not a substitute for professional medical advice. 
          Always consult with a healthcare provider for proper diagnosis and treatment.
        </Text>
      </View>

      {!analysisResult ? (
        <>
          {/* Symptom Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Your Symptoms</Text>
            <View style={styles.symptomsGrid}>
              {SYMPTOMS.map(symptom => (
                <TouchableOpacity
                  key={symptom.id}
                  style={[
                    styles.symptomCard,
                    selectedSymptoms.includes(symptom.id) && styles.symptomCardSelected
                  ]}
                  onPress={() => toggleSymptom(symptom.id)}
                >
                  <Text style={styles.symptomEmoji}>{symptom.emoji}</Text>
                  <Text style={[
                    styles.symptomText,
                    selectedSymptoms.includes(symptom.id) && styles.symptomTextSelected
                  ]}>
                    {symptom.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Custom Symptoms Input */}
            <View style={styles.customInputContainer}>
              <Text style={styles.customInputLabel}>
                Describe any other symptoms:
              </Text>
              <TextInput
                style={styles.customInput}
                multiline
                placeholder="Describe any additional symptoms you're experiencing..."
                value={customSymptoms}
                onChangeText={setCustomSymptoms}
                placeholderTextColor="#9CA3AF"
              />
            </View>
          </View>

          {/* Severity Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>How severe are your symptoms?</Text>
            <View style={styles.severityButtons}>
              {(['mild', 'moderate', 'severe'] as const).map(level => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.severityButton,
                    severity === level && styles.severityButtonSelected,
                    severity === level && level === 'mild' && styles.severityButtonMild,
                    severity === level && level === 'moderate' && styles.severityButtonModerate,
                    severity === level && level === 'severe' && styles.severityButtonSevere,
                  ]}
                  onPress={() => setSeverity(level)}
                >
                  <Text style={[
                    styles.severityText,
                    severity === level && styles.severityTextSelected,
                    severity === level && level === 'mild' && styles.severityTextMild,
                    severity === level && level === 'moderate' && styles.severityTextModerate,
                    severity === level && level === 'severe' && styles.severityTextSevere,
                  ]}>
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Analyze Button */}
          <TouchableOpacity
            style={[
              styles.analyzeButton,
              (selectedSymptoms.length === 0 && !customSymptoms.trim()) && styles.analyzeButtonDisabled
            ]}
            onPress={analyzeSymptoms}
            disabled={isAnalyzing || (selectedSymptoms.length === 0 && !customSymptoms.trim())}
          >
            <Text style={styles.analyzeButtonText}>
              {isAnalyzing ? 'Analyzing Symptoms...' : 'Analyze Symptoms'}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <AnalysisResults 
          result={analysisResult}
          onConsultDoctor={handleConsultDoctor}
          onEmergency={handleEmergency}
          onReset={resetAnalysis}
        />
      )}
    </ScrollView>
  );
}

interface AnalysisResultsProps {
  result: AnalysisResult;
  onConsultDoctor: () => void;
  onEmergency: () => void;
  onReset: () => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  result,
  onConsultDoctor,
  onEmergency,
  onReset
}) => {
  return (
    <View style={styles.resultContainer}>
      <Text style={styles.resultTitle}>Analysis Results</Text>
      
      {/* Risk Level */}
      <View style={[
        styles.riskLevel,
        result.riskLevel === 'low' && styles.riskLevelLow,
        result.riskLevel === 'moderate' && styles.riskLevelModerate,
        result.riskLevel === 'high' && styles.riskLevelHigh,
      ]}>
        <Text style={[
          styles.riskText,
          result.riskLevel === 'low' && styles.riskTextLow,
          result.riskLevel === 'moderate' && styles.riskTextModerate,
          result.riskLevel === 'high' && styles.riskTextHigh,
        ]}>
          {result.riskLevel.toUpperCase()} RISK
        </Text>
        <Text style={[
          styles.riskDescription,
          result.riskLevel === 'low' && styles.riskDescriptionLow,
          result.riskLevel === 'moderate' && styles.riskDescriptionModerate,
          result.riskLevel === 'high' && styles.riskDescriptionHigh,
        ]}>
          Confidence: {result.confidence}%
        </Text>
      </View>

      {/* Possible Conditions */}
      <Text style={styles.recommendationsTitle}>Possible Conditions:</Text>
      {result.possibleConditions.map((condition, index) => (
        <View key={index} style={styles.recommendation}>
          <Text style={styles.recommendationBullet}>•</Text>
          <Text style={styles.recommendationText}>{condition}</Text>
        </View>
      ))}

      {/* Recommendations */}
      <Text style={styles.recommendationsTitle}>Recommendations:</Text>
      {result.recommendations.map((rec, index) => (
        <View key={index} style={styles.recommendation}>
          <Text style={styles.recommendationBullet}>•</Text>
          <Text style={styles.recommendationText}>{rec}</Text>
        </View>
      ))}

      {/* Action Buttons */}
      {result.urgency === 'emergency' && (
        <TouchableOpacity style={styles.emergencyButton} onPress={onEmergency}>
          <Text style={styles.emergencyButtonText}>🚨 EMERGENCY HELP</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.consultButton} onPress={onConsultDoctor}>
        <Text style={styles.consultButtonText}>
          📞 Consult a Doctor
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetButton} onPress={onReset}>
        <Text style={styles.resetButtonText}>Start New Analysis</Text>
      </TouchableOpacity>
    </View>
  );
};
