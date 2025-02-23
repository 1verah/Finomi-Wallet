import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Tipos para las transacciones
interface Transaction {
  id: string;
  description: string;
  amount: string;
  date: string;
  time: string;
  type: 'income' | 'expense' | 'savings';
  emoji?: string;
}

const mockTransactions: Transaction[] = [
  { id: '1', description: 'Compra de Supermercado', amount: '-$61,920 CLP', date: '17 Sep 2023', time: '11:11 AM', type: 'expense', emoji: '🛒' },
  { id: '2', description: 'Porcentaje de Sueldo', amount: '+$540,000 CLP', date: '16 Sep 2023', time: '16:08 PM', type: 'income', emoji: '💰' },
  { id: '3', description: 'Ahorro para viajes', amount: '+$230,000 CLP', date: '15 Sep 2023', time: '11:11 AM', type: 'savings', emoji: '✈️' },
  // Agrega más transacciones según necesites
];

// Componente principal de la pantalla Wallet
const WalletScreen: React.FC = () => {
  // Renderiza cada transacción en la lista
  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionAvatar}>
        <Text style={styles.transactionEmoji}>{item.emoji}</Text>
      </View>
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionDescription}>{item.description}</Text>
        <Text style={styles.transactionDate}>{`${item.date}, ${item.time}`}</Text>
      </View>
      <Text style={[styles.transactionAmount, item.type === 'expense' ? styles.expense : styles.income]}>
        {item.amount}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Encabezado con título y avatares */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Family's Wallet</Text>
        <View style={styles.headerAvatars}>
          <Image source={require('../assets/avatar1.png')} style={styles.avatar} />
          <Image source={require('../assets/avatar2.png')} style={styles.avatar} />
          <Image source={require('../assets/avatar3.png')} style={styles.avatar} />
        </View>
      </View>

      {/* Balance total */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>$24 986</Text>
      </View>

      {/* Botones de transacciones */}
      <View style={styles.transactionButtons}>
        <TouchableOpacity style={styles.transactionButton}>
          <Ionicons name="add-circle" size={40} color="#007AFF" />
          <Text style={styles.transactionButtonLabel}>Ingreso</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.transactionButton}>
          <Ionicons name="remove-circle" size={40} color="#FF3B30" />
          <Text style={styles.transactionButtonLabel}>Gasto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.transactionButton}>
          <Ionicons name="wallet" size={40} color="#34C759" />
          <Text style={styles.transactionButtonLabel}>Ahorro</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de transacciones recientes */}
      <View style={styles.transactionsHeader}>
        <Text style={styles.transactionsTitle}>Recent transactions</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={mockTransactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        style={styles.transactionsList}
      />
    </View>
  );
};

// Estilos para los componentes
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#007AFF' },
  headerAvatars: { flexDirection: 'row' },
  avatar: { width: 32, height: 32, borderRadius: 16, marginLeft: 5 },
  balanceContainer: { alignItems: 'center', marginBottom: 20 },
  balanceLabel: { fontSize: 16, color: '#666' },
  balanceAmount: { fontSize: 32, fontWeight: 'bold', color: '#000' },
  transactionButtons: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  transactionButton: { alignItems: 'center' },
  transactionButtonLabel: { fontSize: 14, color: '#666', marginTop: 5 },
  transactionsHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  transactionsTitle: { fontSize: 18, fontWeight: 'bold' },
  viewAll: { fontSize: 14, color: '#007AFF' },
  transactionsList: { flex: 1 },
  transactionItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  transactionAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  transactionEmoji: { fontSize: 20 },
  transactionDetails: { flex: 1 },
  transactionDescription: { fontSize: 16, fontWeight: '500' },
  transactionDate: { fontSize: 12, color: '#666' },
  transactionAmount: { fontSize: 16, fontWeight: '500' },
  expense: { color: '#FF3B30' },
  income: { color: '#000' },
});

export default WalletScreen;