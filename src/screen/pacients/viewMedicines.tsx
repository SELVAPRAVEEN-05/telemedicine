import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootStackParamList } from '../../route/appNavigator';
import { ViewMedicineStyles as styles } from '../../styles/ViewMedicineStyles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const pharmacies = [
  {
    id: '1',
    name: 'LifeCare Pharmacy',
    status: 'Open',
    openUntil: '9 PM',
    address: '123 Health Street, Medical District',
    phone: '+1 234-567-8900',
    image:
      'https://www.nationalhealthexecutive.com/sites/nhe/files/styles/banner/public/2023-12/Pharmacy%20concept.jpg?itok=Eh9DOKi4',
  },
  {
    id: '2',
    name: 'HealthPlus Chemist',
    status: 'Closed',
    openUntil: '10 PM',
    address: '456 Wellness Ave, Downtown',
    phone: '+1 234-567-8901',
    image:
      'https://www.nationalhealthexecutive.com/sites/nhe/files/styles/banner/public/2023-12/Pharmacy%20concept.jpg?itok=Eh9DOKi4',
  },
  {
    id: '3',
    name: 'MediMart',
    status: 'Open',
    openUntil: '8 PM',
    address: '789 Care Road, Suburb',
    phone: '+1 234-567-8902',
    image: 'https://placehold.co/100x80?text=MediMart',
  },
  {
    id: '4',
    name: 'Wellness Pharmacy',
    status: 'Closed',
    openUntil: '11 PM',
    address: '321 Medicine Lane, Central',
    phone: '+1 234-567-8903',
    image: 'https://placehold.co/100x80?text=Wellness',
  },
];

export default function ViewMedicines() {
  const navigation = useNavigation<NavigationProp>();
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<string>('All');
  const [filteredData, setFilteredData] = useState(pharmacies);

  const applyFilters = (text: string, filterOption: string) => {
    let results = pharmacies.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );

    if (filterOption !== 'All') {
      results = results.filter(item => item.status === filterOption);
    }

    setFilteredData(results);
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    applyFilters(text, filter);
  };

  const handleFilterChange = (value: string) => {
    setFilter(value);
    applyFilters(search, value);
  };

  const handlePharmacyPress = (pharmacy: any) => {
    navigation.navigate('PharmacyDetails', { pharmacy });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Search + Filter */}
        <View style={styles.searchFilterRow}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search pharmacies..."
            value={search}
            onChangeText={handleSearch}
            placeholderTextColor="#999"
          />

          <View style={styles.filterBox}>
            <Picker
              selectedValue={filter}
              style={styles.filterPicker}
              onValueChange={(itemValue: string) =>
                handleFilterChange(itemValue)
              }
              mode="dropdown"
            >
              <Picker.Item label="All" value="All" />
              <Picker.Item label="Open" value="Open" />
              <Picker.Item label="Closed" value="Closed" />
            </Picker>
          </View>
        </View>

        {/* Scrollable List */}
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {filteredData.length > 0 ? (
            filteredData.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() => handlePharmacyPress(item)}
                activeOpacity={0.7}
              >
                {/* Status Row */}
                <View style={styles.statusRow}>
                  <View
                    style={{
                      backgroundColor:
                        item.status === 'Open' ? '#c6edc8ff' : '#fbdeddff',
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <View
                      style={[
                        styles.statusDot,
                        {
                          backgroundColor:
                            item.status === 'Open' ? '#4caf50ff' : '#F44336',
                        },
                      ]}
                    />
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color: item.status === 'Open' ? '#4CAF50' : '#F44336',
                        },
                      ]}
                    >
                      {item.status}
                    </Text>
                  </View>
                  <Text style={styles.tapHint}>Tap to view medicines →</Text>
                </View>

                {/* Pharmacy Info */}
                <View style={styles.infoRow}>
                  <View style={styles.textContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.open}>Open until {item.openUntil}</Text>
                    <Text style={styles.address}>{item.address}</Text>
                  </View>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={styles.noResultsText}>No pharmacies found</Text>
              <Text style={styles.noResultsSubText}>
                Try adjusting your search or filter criteria
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
