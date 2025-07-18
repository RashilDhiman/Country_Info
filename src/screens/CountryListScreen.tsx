// CountryListScreen: Displays a list of countries matching the search
import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import CountryCard from '../components/CountryCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorNotification from '../components/ErrorNotification';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

interface CountryItem {
  cca3: string;
  flag?: string;
  name: string;
  population: number;
}

const CountryListScreen = () => {
  // Navigation and Redux state
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'CountryList'>>();
  const { searchResults, loading, error } = useSelector((state: RootState) => state.country);

  // Render each country as a CountryCard
  const renderItem = ({ item }: { item: CountryItem }) => (
    <TouchableOpacity onPress={() => navigation.navigate('CountryDetail', { code: item.cca3 })}>
      <CountryCard flagUrl={item.flag} name={item.name} population={item.population} />
    </TouchableOpacity>
  );

  
  if (loading) return <LoadingSpinner />;
  if (error && (error === 'No countries found.' || error === 'Country not found.')) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🔍</Text>
        <Text style={styles.emptyTitle}>No Country Found</Text>
        <Text style={styles.emptyText}>We couldn't find any country matching your search.</Text>
      </View>
    );
  }
  if (error) return <ErrorNotification message={error} />;

  // Show message 
  if (!searchResults || (Array.isArray(searchResults) && searchResults.length === 0)) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🌍</Text>
        <Text style={styles.emptyTitle}>No Results</Text>
        <Text style={styles.emptyText}>No countries found. Try a different search.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌏 Country Results</Text>
      <FlatList
        data={searchResults as CountryItem[]}
        keyExtractor={(item) => item.cca3}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf0fa',
    paddingHorizontal: 0,
    paddingTop: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#1a237e',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  listContent: {
    padding: 12,
    paddingBottom: 40,
    width: '100%',
  },
  separator: {
    height: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eaf0fa',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 6,
  },
  emptyText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    maxWidth: 260,
  },
});

export default CountryListScreen; 