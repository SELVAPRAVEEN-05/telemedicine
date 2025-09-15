import { StyleSheet } from "react-native";

export const SearchMedicine = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  backButton: {
    fontSize:30,
    marginRight: 15,
    marginBottom:10
  },
  backButtonText: {
    color: "#FF6B00",
    fontSize: 16,
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  pharmacyInfo: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  pharmacyImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  pharmacyDetails: {
    flex: 1,
    gap: 5,
  },
  pharmacyName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 5,
  },
  pharmacyAddress: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  pharmacyHours: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  searchSection: {
    padding: 10,
    backgroundColor: "#fff",
    display: "flex",
    paddingLeft: 15,
    paddingRight: 15,
  },
  searchInput: {
    height: 45,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#f8f9fa",
  },

  // SELECTION SUMMARY STYLES
  selectionSummary: {
    backgroundColor: "#E8F5E8",
    padding: 15,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  selectionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2E7D32",
    textAlign: "center",
  },

  medicinesList: {
    flex: 1,
    padding: 20,
  },
  resultsCount: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
    fontWeight: "500",
  },
  medicineRow: {
    display:"flex", 
    flexDirection:"row",
    alignItems:"center",
    backgroundColor: "#fff",
    gap:10,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedMedicineRow: {
    backgroundColor: "#E3F2FD",
    borderWidth: 2,
    borderColor: "#2196F3",
  },
  medicineInfo: {
    flex: 1,
  },
  medicineName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 5,
  },
  medicineGeneric: {
    fontSize: 14,
    color: "#666",
    marginBottom: 3,
  },
  medicineBrand: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  medicineDetails: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  medicineStock: {
    fontSize: 12,
    color: "#666",
    marginRight: 10,
    marginBottom: 5,
  },
  medicineCategory: {
    fontSize: 12,
    color: "#FF6B00",
    backgroundColor: "#FFF3E0",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 5,
  },
  medicinePrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FF6B00",
    marginTop: 8,
  },

  // DOSAGE SELECTION STYLES
  dosageHeader: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
    marginTop: 15,
  },
  dosageContainer: {
    flexDirection: "row",
    paddingVertical: 5,
  },
  dosageCard: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    minWidth: 100,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e9ecef",
    position: "relative",
  },
  selectedDosageCard: {
    backgroundColor: "#E3F2FD",
    borderColor: "#2196F3",
    borderWidth: 2,
  },
  dosageText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FF6B00",
    marginBottom: 4,
  },
  selectedDosageText: {
    color: "#2196F3",
  },
  dosageType: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  dosagePrice: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },

  // COUNT CONTROLS STYLES
  countControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  countButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
  },
  countButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 16,
  },
  countText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: "center",
  },

  // ADD TO CART BUTTON STYLES
  cartButtonContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  addToCartButton: {
    backgroundColor: "#FF6B00",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#FF6B00",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  addToCartButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  noResults: {
    alignItems: "center",
    paddingVertical: 50,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginBottom: 10,
  },
  noResultsSubText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  ratioOuter: {
  width: 20,
  height: 20,
  borderRadius: 10,
  borderWidth: 2,
  borderColor: "#007AFF",
  alignItems: "center",
  justifyContent: "center",
  marginLeft: 10,
},
ratioInner: {
  width: 10,
  height: 10,
  borderRadius: 5,
  backgroundColor: "#007AFF",
},


});