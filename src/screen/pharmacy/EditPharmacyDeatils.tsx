import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { pharmacyStyles as styles } from '../../styles/pharmacyStyles';

interface Medicine {
  id: string;
  name: string;
  stock: number;
  price: number;
  category: string;
  manufacturer?: string;
  expiryDate?: string;
  description?: string;
}

interface EditMedicineScreenProps {
  route: {
    params: {
      medicine: Medicine;
      onSave: (medicine: Medicine) => void;
    };
  };
  navigation: any;
}

export default function EditMedicineScreen({ route, navigation }: EditMedicineScreenProps) {
  const { medicine, onSave } = route.params;
  
  const [formData, setFormData] = useState({
    name: medicine.name || '',
    stock: medicine.stock?.toString() || '',
    price: medicine.price?.toString() || '',
    category: medicine.category || '',
    manufacturer: medicine.manufacturer || '',
    expiryDate: medicine.expiryDate || '',
    description: medicine.description || '',
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Medicine name is required';
    }

    if (!formData.stock.trim()) {
      newErrors.stock = 'Stock quantity is required';
    } else if (isNaN(Number(formData.stock)) || parseInt(formData.stock) < 0) {
      newErrors.stock = 'Please enter a valid stock quantity';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    } else if (isNaN(Number(formData.price)) || parseFloat(formData.price) < 0) {
      newErrors.price = 'Please enter a valid price';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      const updatedMedicine: Medicine = {
        ...medicine,
        name: formData.name.trim(),
        stock: parseInt(formData.stock),
        price: parseFloat(formData.price),
        category: formData.category.trim(),
        manufacturer: formData.manufacturer.trim(),
        expiryDate: formData.expiryDate.trim(),
        description: formData.description.trim(),
      };

      // Call the onSave callback to update the medicine in the parent component
      if (onSave) {
        onSave(updatedMedicine);
      }

      Alert.alert(
        'Success',
        'Medicine details updated successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancel Changes',
      'Are you sure you want to cancel? All changes will be lost.',
      [
        {
          text: 'Keep Editing',
          style: 'cancel',
        },
        {
          text: 'Cancel',
          style: 'destructive',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.editHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleCancel}
        >
          <Icon name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.editHeaderTitle}>Edit Medicine</Text>
        
      </View>

      <ScrollView style={styles.editContainer} showsVerticalScrollIndicator={false}>
        {/* Medicine Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Medicine Name *</Text>
          <TextInput
            style={[
              styles.textInput,
              errors.name && styles.inputError,
            ]}
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="Enter medicine name"
            placeholderTextColor="#999"
          />
          {errors.name && (
            <Text style={styles.errorText}>{errors.name}</Text>
          )}
        </View>

        {/* Stock Quantity */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Stock Quantity *</Text>
          <TextInput
            style={[
              styles.textInput,
              errors.stock && styles.inputError,
            ]}
            value={formData.stock}
            onChangeText={(text) => setFormData({ ...formData, stock: text })}
            placeholder="Enter stock quantity"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
          {errors.stock && (
            <Text style={styles.errorText}>{errors.stock}</Text>
          )}
        </View>

        {/* Price */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Price (₹) *</Text>
          <TextInput
            style={[
              styles.textInput,
              errors.price && styles.inputError,
            ]}
            value={formData.price}
            onChangeText={(text) => setFormData({ ...formData, price: text })}
            placeholder="Enter price"
            placeholderTextColor="#999"
            keyboardType="decimal-pad"
          />
          {errors.price && (
            <Text style={styles.errorText}>{errors.price}</Text>
          )}
        </View>

        {/* Category */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Category *</Text>
          <TextInput
            style={[
              styles.textInput,
              errors.category && styles.inputError,
            ]}
            value={formData.category}
            onChangeText={(text) => setFormData({ ...formData, category: text })}
            placeholder="Enter category"
            placeholderTextColor="#999"
          />
          {errors.category && (
            <Text style={styles.errorText}>{errors.category}</Text>
          )}
        </View>
        {/* Expiry Date */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Expiry Date</Text>
          <TextInput
            style={styles.textInput}
            value={formData.expiryDate}
            onChangeText={(text) => setFormData({ ...formData, expiryDate: text })}
            placeholder="MM/YYYY"
            placeholderTextColor="#999"
          />
        </View>

        {/* Description */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Description</Text>
          <TextInput
            style={[styles.textInput, styles.textArea]}
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            placeholder="Enter medicine description"
            placeholderTextColor="#999"
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={handleCancel}
          >
            <Text style={[styles.buttonText, styles.cancelButtonText]}>
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.saveActionButton]}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}