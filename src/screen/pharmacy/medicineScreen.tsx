import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { pharmacyStyles as styles } from '../../styles/pharmacyStyles';

interface Medicine {
  id: string;
  name: string;
  stock: number;
  price: number;
  category: string;
}

const SAMPLE_MEDICINES: Medicine[] = [
  {
    id: '1',
    name: 'Paracetamol 500mg',
    stock: 150,
    price: 25.5,
    category: 'Pain Relief',
  },
  {
    id: '2',
    name: 'Amoxicillin 250mg',
    stock: 85,
    price: 180.0,
    category: 'Antibiotic',
  },
  {
    id: '3',
    name: 'Aspirin 100mg',
    stock: 200,
    price: 15.75,
    category: 'Pain Relief',
  },
  {
    id: '4',
    name: 'Cetirizine 10mg',
    stock: 0,
    price: 45.25,
    category: 'Allergy',
  },
  {
    id: '5',
    name: 'Omeprazole 20mg',
    stock: 60,
    price: 120.0,
    category: 'Gastric',
  },
  {
    id: '6',
    name: 'Ibuprofen 400mg',
    stock: 0,
    price: 32.0,
    category: 'Pain Relief',
  },
];

export default function MedicineScreen() {
  const [medicines, setMedicines] = useState<Medicine[]>(SAMPLE_MEDICINES);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDropdownVisible, setFilterDropdownVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (selectedFilter === 'available') {
      return matchesSearch && medicine.stock > 0;
    } else if (selectedFilter === 'unavailable') {
      return matchesSearch && medicine.stock === 0;
    }
    return matchesSearch;
  });

  const handleMedicinePress = (medicine: Medicine) => {
    Alert.alert(
      'Medicine Details',
      `Name: ${medicine.name}\nStock: ${medicine.stock} units\nPrice: ₹${medicine.price}\nCategory: ${medicine.category}`,
      [
        { text: 'Update Stock', onPress: () => console.log('Update stock') },
        { text: 'Edit Price', onPress: () => console.log('Edit price') },
        { text: 'Cancel', style: 'cancel' },
      ],
    );
  };

  const addNewMedicine = () => {
    Alert.prompt(
      'Add New Medicine',
      'Enter medicine name:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Next',
          onPress: (medicineName?: string) => {
            if (medicineName && medicineName.trim()) {
              addMedicineStep2(medicineName.trim());
            } else {
              Alert.alert('Error', 'Please enter a valid medicine name');
            }
          },
        },
      ],
      'plain-text',
    );
  };

  const addMedicineStep2 = (name: string) => {
    Alert.prompt(
      'Add Stock & Price',
      `Medicine: ${name}\nEnter stock quantity:`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Next',
          onPress: (stock?: string) => {
            const stockNum = parseInt(stock || '0');
            if (stockNum >= 0) {
              addMedicineStep3(name, stockNum);
            } else {
              Alert.alert('Error', 'Please enter a valid stock number');
            }
          },
        },
      ],
      'plain-text',
    );
  };

  const addMedicineStep3 = (name: string, stock: number) => {
    Alert.prompt(
      'Add Price',
      `Medicine: ${name}\nStock: ${stock}\nEnter price (₹):`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Add Medicine',
          onPress: (price?: string) => {
            const priceNum = parseFloat(price || '0');
            if (priceNum > 0) {
              const newMedicine: Medicine = {
                id: (medicines.length + 1).toString(),
                name: name,
                stock: stock,
                price: priceNum,
                category: 'General', // Default category
              };
              setMedicines([...medicines, newMedicine]);
              Alert.alert('Success', 'Medicine added successfully!');
            } else {
              Alert.alert('Error', 'Please enter a valid price');
            }
          },
        },
      ],
      'plain-text',
    );
  };

  const getFilterDisplayText = () => {
    switch (selectedFilter) {
      case 'available':
        return 'Available';
      case 'unavailable':
        return 'Unavailable';
      default:
        return 'All';
    }
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setFilterDropdownVisible(false);
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.title}>Medicine Inventory</Text>

      {/* Search Bar */}
      <View style={{ marginBottom: 20 }}>
        <TextInput
          style={{
            backgroundColor: '#fff',
            borderRadius: 8,
            paddingHorizontal: 15,
            paddingVertical: 12,
            borderWidth: 1,
            borderColor: '#e0e0e0',
            fontSize: 16,
          }}
          placeholder="Search medicines..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      <View style={[styles.content, { paddingTop: 20, paddingBottom: 15 }]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* Filter Dropdown */}
            <View style={{ position: 'relative', marginRight: 20 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#f0f0f0',
                  paddingHorizontal: 30,
                  paddingVertical: 8,
                  borderRadius: 6,
                  borderWidth: 1,
                  borderColor: '#e0e0e0',
                  flexDirection: 'row',
                  alignItems: 'center',
                  minWidth: 100,
                }}
                onPress={() => setFilterDropdownVisible(!filterDropdownVisible)}
              >
                <Text style={{ fontSize: 12, color: '#666', marginRight: 5 }}>
                  {getFilterDisplayText()}
                </Text>
                <Text style={{ fontSize: 10, color: '#666' }}>▼</Text>
              </TouchableOpacity>

              {filterDropdownVisible && (
                <View
                  style={{
                    position: 'absolute',
                    top: 40,
                    left: 0,
                    right: 0,
                    backgroundColor: '#fff',
                    borderRadius: 6,
                    borderWidth: 1,
                    borderColor: '#e0e0e0',
                    elevation: 3,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    zIndex: 1000,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: '#f0f0f0',
                    }}
                    onPress={() => handleFilterSelect('all')}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: selectedFilter === 'all' ? '#FF6B00' : '#666',
                      }}
                    >
                      All
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: '#f0f0f0',
                    }}
                    onPress={() => handleFilterSelect('available')}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color:
                          selectedFilter === 'available' ? '#FF6B00' : '#666',
                      }}
                    >
                      Available
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 12,
                      paddingVertical: 10,
                    }}
                    onPress={() => handleFilterSelect('unavailable')}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color:
                          selectedFilter === 'unavailable' ? '#FF6B00' : '#666',
                      }}
                    >
                      Unavailable
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Add Button */}
            <TouchableOpacity
              style={{
                backgroundColor: '#FF6B00',
                paddingHorizontal: 25,
                paddingVertical: 10,
                borderRadius: 6,
              }}
              onPress={addNewMedicine}
            >
              <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>
                + Add
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredMedicines.length > 0 ? (
            filteredMedicines.map(medicine => (
              <TouchableOpacity
                key={medicine.id}
                style={styles.medicineItem}
                onPress={() => handleMedicinePress(medicine)}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.medicineName}>{medicine.name}</Text>
                    <Text style={styles.medicineStock}>
                      Stock: {medicine.stock} units • ₹{medicine.price}
                    </Text>
                    <Text style={{ fontSize: 12, color: '#999', marginTop: 2 }}>
                      {medicine.category}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor:
                        medicine.stock < 50 ? '#FFE5E5' : '#E5F5E5',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '600',
                        color: medicine.stock < 50 ? '#D32F2F' : '#388E3C',
                      }}
                    >
                      {medicine.stock < 50 ? 'Low Stock' : 'In Stock'}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                No medicines found matching "{searchQuery}"
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
