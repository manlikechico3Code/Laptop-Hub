import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
} from "react-native";
import {
  DollarSign,
  Laptop,
  ShoppingBag,
  Plus,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react-native";

// Mock Initial Data
const INITIAL_SALES = [
  {
    id: "1",
    date: "Aug 18, 2026",
    customer: "Chidi O.",
    item: "MacBook Air M2",
    price: "₦550,000",
    status: "Paid",
  },
  {
    id: "2",
    date: "Aug 17, 2026",
    customer: "Amina K.",
    item: "Dell XPS 15",
    price: "₦320,000",
    status: "Paid",
  },
  {
    id: "3",
    date: "Aug 15, 2026",
    customer: "Bola T.",
    item: "Daily Driver Pro",
    price: "₦320,000",
    status: "Pending",
  },
];

export default function SalesRecordScreen() {
  const [sales, setSales] = useState(INITIAL_SALES);
  const [modalVisible, setModalVisible] = useState(false);

  // Form States
  const [customer, setCustomer] = useState("");
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");

  const handleAddSale = () => {
    if (!customer || !item || !price) return;

    const newSale = {
      id: String(sales.length + 1),
      date: new Date().toISOString().split("T")[0],
      customer,
      item,
      price: `₦${Number(price).toLocaleString()}`,
      status: "Paid",
    };

    setSales([newSale, ...sales]);
    setModalVisible(false);
    setCustomer("");
    setItem("");
    setPrice("");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Sales Ledger</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Plus color="#FFF" size={20} />
            <Text style={styles.addButtonText}>New Sale</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Analytics Cards */}
          <View style={styles.metricsContainer}>
            <View style={styles.card}>
              <DollarSign color="#074a23" size={24} />
              <Text style={styles.cardLabel}>Gross Revenue</Text>
              <Text style={styles.cardValue}>₦1,190,000</Text>
              <Text style={styles.trendText}>▲ +12% this week</Text>
            </View>

            <View style={styles.card}>
              <ShoppingBag color="#109648" size={24} />
              <Text style={styles.cardLabel}>Units Sold</Text>
              <Text style={styles.cardValue}>{sales.length} Laptops</Text>
              <Text style={styles.trendText}>Target: 20</Text>
            </View>
          </View>

          {/* Sales List */}
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {sales.map((item) => (
            <View key={item.id} style={styles.saleRow}>
              <View style={styles.saleLeft}>
                <View style={styles.iconWrapper}>
                  <Laptop color="#00C853" size={20} />
                </View>
                <View>
                  <Text style={styles.customerText}>{item.customer}</Text>
                  <Text style={styles.itemText}>
                    {item.item} • {item.date}
                  </Text>
                </View>
              </View>
              <View style={styles.saleRight}>
                <Text style={styles.priceText}>{item.price}</Text>
                <Text
                  style={[
                    styles.statusText,
                    item.status === "Paid"
                      ? styles.statusPaid
                      : styles.statusPending,
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Add Sale Modal Form */}
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Record New Sale</Text>

              <TextInput
                style={styles.input}
                placeholder="Customer Name"
                value={customer}
                onChangeText={setCustomer}
              />
              <TextInput
                style={styles.input}
                placeholder="Laptop Model (e.g. MacBook Air)"
                value={item}
                onChangeText={setItem}
              />
              <TextInput
                style={styles.input}
                placeholder="Price amount (Numbers only)"
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
              />

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.submitBtn}
                  onPress={handleAddSale}
                >
                  <Text style={styles.submitBtnText}>Submit Entry</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#1A1A1A" },
  addButton: {
    backgroundColor: "#00C853",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
  },
  addButtonText: { color: "#FFF", fontWeight: "600", marginLeft: 6 },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  card: {
    backgroundColor: "#FFF",
    width: "48%",
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  cardLabel: { color: "#666", fontSize: 12, marginTop: 8, marginBottom: 4 },
  cardValue: { fontSize: 18, fontWeight: "bold", color: "#1A1A1A" },
  trendText: {
    color: "#00C853",
    fontSize: 11,
    marginTop: 4,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1A1A1A",
    marginBottom: 15,
  },
  saleRow: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  saleLeft: { flexDirection: "row", alignItems: "center" },
  iconWrapper: {
    backgroundColor: "#E8F5E9",
    padding: 10,
    borderRadius: 10,
    marginRight: 12,
  },
  customerText: { fontSize: 15, fontWeight: "600", color: "#1A1A1A" },
  itemText: { fontSize: 13, color: "#666", marginTop: 2 },
  saleRight: { alignItems: "flex-end" },
  priceText: { fontSize: 15, fontWeight: "bold", color: "#1A1A1A" },
  statusText: { fontSize: 12, marginTop: 4, fontWeight: "500" },
  statusPaid: { color: "#00C853" },
  statusPending: { color: "#FF9100" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFF",
    width: "85%",
    borderRadius: 20,
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#1A1A1A",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  cancelBtn: { paddingVertical: 10, paddingHorizontal: 20, marginRight: 10 },
  cancelBtnText: { color: "#666", fontWeight: "600" },
  submitBtn: {
    backgroundColor: "#00C853",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  submitBtnText: { color: "#FFF", fontWeight: "600" },
});
