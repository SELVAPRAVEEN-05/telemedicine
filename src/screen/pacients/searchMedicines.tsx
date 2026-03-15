import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { RootStackParamList } from "../../route/appNavigator";
import { SearchMedicine as styles } from '../../styles/SearchMedicine';


type PharmacyDetailsRouteProp = RouteProp<RootStackParamList>;
type PharmacyDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList>;

type Props = {
  route: PharmacyDetailsRouteProp;
  navigation: PharmacyDetailsNavigationProp;
};

interface Medicine {
  id: string;
  name: string;
  type: string;
  price: string;
  stock: number;
  category: string;
}

interface SelectedMedicine {
  id: string;
  name: string;
  price: string;
  category: string;
  count: number;
}

// Medicine list
const medicinesData: Medicine[] = [
  { id: "1", name: "Paracetamol", type: "Tablet", price: "$5.99", stock: 45, category: "Pain Relief" },
  { id: "3", name: "Ibuprofen", type: "Tablet", price: "$7.25", stock: 67, category: "Anti-inflammatory" },
  { id: "4", name: "Lisinopril", type: "Tablet", price: "$15.80", stock: 31, category: "Blood Pressure" },
  { id: "5", name: "Metformin", type: "Tablet", price: "$18.30", stock: 19, category: "Diabetes" },
  { id: "6", name: "Cetirizine", type: "Tablet", price: "$9.75", stock: 52, category: "Allergy" },
];

export default function PharmacyDetailsScreen({ route, navigation }: Props) {
  const { pharmacy } = route.params as { pharmacy: any };
  const [searchText, setSearchText] = useState("");
  const [medicines, setMedicines] = useState<Medicine[]>(medicinesData);
  const [Select, setSelect] = useState(false);
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>(medicinesData);
  const [selectedMedicines, setSelectedMedicines] = useState<SelectedMedicine[]>([]);

  useEffect(() => {
    filterMedicines(searchText);
  }, [searchText, medicines]);

  const filterMedicines = (text: string) => {
    const filtered = medicines.filter(medicine =>
      medicine.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredMedicines(filtered);
  };

  // 🟢 Add/increase medicine selection
  const toggleMedicineSelect = (medicine: Medicine) => {
    const exists = selectedMedicines.find(item => item.id === medicine.id);

    if (exists) {
      if (medicine.stock > 0) {
        // Increase count
        const updatedSelected = selectedMedicines.map(item =>
          item.id === medicine.id ? { ...item, count: item.count + 1 } : item
        );
        setSelectedMedicines(updatedSelected);

        // Decrease stock
        const updatedMedicines = medicines.map(m =>
          m.id === medicine.id ? { ...m, stock: m.stock - 1 } : m
        );
        setMedicines(updatedMedicines);
      }
    } else {
      if (medicine.stock > 0) {
        setSelectedMedicines([...selectedMedicines, {
          id: medicine.id,
          name: medicine.name,
          price: medicine.price,
          category: medicine.category,
          count: 1,
        }]);

        const updatedMedicines = medicines.map(m =>
          m.id === medicine.id ? { ...m, stock: m.stock - 1 } : m
        );
        setMedicines(updatedMedicines);
      }
    }
  };

  // 🟢 Decrease medicine count
  const decreaseMedicineCount = (medicineId: string) => {
    const selected = selectedMedicines.find(item => item.id === medicineId);
    if (!selected) return;

    if (selected.count === 1) {
      setSelectedMedicines(selectedMedicines.filter(item => item.id !== medicineId));
    } else {
      const updatedSelected = selectedMedicines.map(item =>
        item.id === medicineId ? { ...item, count: item.count - 1 } : item
      );
      setSelectedMedicines(updatedSelected);
    }

    const updatedMedicines = medicines.map(m =>
      m.id === medicineId ? { ...m, stock: m.stock + 1 } : m
    );
    setMedicines(updatedMedicines);
  };

  // 🟢 Total Calculation
  const calculateTotal = () => {
    return selectedMedicines.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * item.count);
    }, 0).toFixed(2);
  };

  // 🟢 Confirm Order
  const handleAddToOrder = () => {
    if (selectedMedicines.length === 0) {
      Alert.alert("No Selection", "Please select at least one medicine to add to your order.");
      return;
    }

    const totalAmount = calculateTotal();

    Alert.alert(
      "Order Confirmation",
      `Order Summary:
• ${selectedMedicines.length} item(s)
• Pharmacy: ${pharmacy.name}`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reserved Medicine",
          onPress: () => {
            Alert.alert(
              "Reserved",
              "Your order has been successfully placed. You will receive a confirmation shortly.",
              [
                {
                  text: "OK",
                  onPress: () => {
                    setSelectedMedicines([]);
                    setMedicines(medicinesData); // reset stock
                  }
                }
              ]
            );
          }
        }
      ]
    );
  };

  // 🟢 Medicine Row
  const MedicineRow = ({ medicine }: { medicine: Medicine }) => {
    const selectedItem = selectedMedicines.find(item => item.id === medicine.id);
    const isSelected = !!selectedItem;

    return (
      <View style={styles.medicineRow}>
        <TouchableOpacity
          style={styles.medicineInfo}
          onPress={() => {
            toggleMedicineSelect(medicine);
          }}
          disabled={medicine.stock === 0}
        >
          <Text style={styles.medicineName}>{medicine.name}</Text>
          <Text style={styles.medicineStock}>Stock: {medicine.stock}</Text>
        </TouchableOpacity>

        {/* Radio button */}



        {/* Count controls */}
        {isSelected && (
          <View style={styles.countControls}>
            <TouchableOpacity
              style={styles.countButton}
              onPress={() => decreaseMedicineCount(medicine.id)}
            >
              <Text style={styles.countButtonText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.countText}>{selectedItem.count}</Text>
            <TouchableOpacity
              style={styles.countButton}
              onPress={() => toggleMedicineSelect(medicine)}
              disabled={medicine.stock === 0}
            >
              <Text style={styles.countButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity onPress={() => {
          toggleMedicineSelect(medicine);

        }}>
          <View style={styles.ratioOuter}>
            {isSelected && <View style={styles.ratioInner} />}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}

      <View
          style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}
        >
          <TouchableOpacity
            onPress={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            }}
          >
            <Icon
              name="arrow-left"
              size={26}
              style={{ marginLeft: 15, marginTop: 5, marginRight: 10 }}
              color="#000000"
            />
          </TouchableOpacity>

          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Available Medicines
          </Text>
        </View>

      {/* Pharmacy Info */}
      <View style={styles.pharmacyInfo}>
        <Image source={{ uri: pharmacy.image }} style={styles.pharmacyImage} />
        <View style={styles.pharmacyDetails}>
          <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
          <Text style={styles.pharmacyAddress}>{pharmacy.address}</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search medicines..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#999"
        />
      </View>

      {/* Selection Summary */}
      {selectedMedicines.length > 0 && (
        <View style={styles.selectionSummary}>
          <Text style={styles.selectionText}>
            {selectedMedicines.length} item(s) selected
          </Text>
        </View>
      )}

      {/* Medicines List */}
      <ScrollView style={styles.medicinesList} showsVerticalScrollIndicator={false}>
        <Text style={styles.resultsCount}>
          {filteredMedicines.length} medicine(s) found
        </Text>

        {filteredMedicines.length > 0 ? (
          filteredMedicines.map((medicine) => (
            <MedicineRow key={medicine.id} medicine={medicine} />
          ))
        ) : (
          <View style={styles.noResults}>
            <Text style={styles.noResultsText}>No medicines found</Text>
            <Text style={styles.noResultsSubText}>
              Try adjusting your search
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Place Order Button */}
      {selectedMedicines.length > 0 && (
        <View style={styles.cartButtonContainer}>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToOrder}
          >
            <Text style={styles.addToCartButtonText}>
              Reserve Medicine
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
