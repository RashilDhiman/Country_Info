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
  flags: { png?: string; svg?: string };
  name: { common: string };
  population: number;
}

const CountryListScreen = () => {
  // Navigation and Redux state
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'CountryList'>>();
  const { searchResults, loading, error } = useSelector((state: RootState) => state.country);

  // Render each country as a CountryCard
  const renderItem = ({ item }: { item: CountryItem }) => (
    <TouchableOpacity onPress={() => navigation.navigate('CountryDetail', { code: item.cca3 })}>
      <CountryCard flagUrl={item.flags?.png || item.flags?.svg} name={item.name?.common} population={item.population} />
    </TouchableOpacity>
  );

  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorNotification message={error} />;

  // Show message 
  if (!searchResults || (Array.isArray(searchResults) && searchResults.length === 0)) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Country Results</Text>
        <Text style={styles.emptyText}>No countries found. Try a different search.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Country Results</Text>
      
      <FlatList
        data={searchResults as CountryItem[]}
        keyExtractor={(item) => item.cca3}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f8ff',
    paddingHorizontal: 0,
    paddingTop: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#222',
    letterSpacing: 0.5,
  },
  listContent: {
    padding: 8,
    paddingBottom: 32,
    width: '100%',
  },
  emptyText: {
    marginTop: 32,
    color: '#888',
    fontSize: 16,
  },
});

export default CountryListScreen; 