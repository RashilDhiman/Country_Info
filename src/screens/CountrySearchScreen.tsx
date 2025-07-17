// CountrySearchScreen: Allows user to search for countries by name
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries, fetchCountryDetail, clearError } from '../store/countrySlice';
import { RootState, AppDispatch } from '../store';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorNotification from '../components/ErrorNotification';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

const CountrySearchScreen = () => {
  
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'name' | 'code'>('name');
  
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'CountrySearch'>>();
  
  const { loading, error } = useSelector((state: RootState) => state.country);

 
  const handleSearch = async () => {
    if (!query.trim()) return;
    if (searchType === 'name') {
      const result = await dispatch(fetchCountries(query));
      if (fetchCountries.fulfilled.match(result)) {
        navigation.navigate('CountryList');
      }
    } else {
      const result = await dispatch(fetchCountryDetail(query.toUpperCase()));
      if (fetchCountryDetail.fulfilled.match(result)) {
        navigation.navigate('CountryDetail', { code: query.toUpperCase() });
      }
    }
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Country Info</Text>
      <View style={styles.toggleWrapper}>
        <Text
          style={[styles.toggleButton, searchType === 'name' && styles.toggleActive]}
          onPress={() => setSearchType('name')}
        >
          Search by Name
        </Text>
        <Text
          style={[styles.toggleButton, searchType === 'code' && styles.toggleActive]}
          onPress={() => setSearchType('code')}
        >
          Search by Code
        </Text>
      </View>
      <TextInput
        placeholder={searchType === 'name' ? 'Search country by name' : 'Search country by code (e.g. IN)'}
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        onFocus={() => dispatch(clearError())}
        placeholderTextColor="#888"
        accessibilityLabel="Country search input"
        autoCapitalize={searchType === 'code' ? 'characters' : 'none'}
      />
      
      <View style={styles.buttonWrapper}>
        <Button title="Search" onPress={handleSearch} color="#007AFF" accessibilityLabel="Search for country" />
      </View>
      
      {loading && <LoadingSpinner />}
      
      {error && <ErrorNotification message={error} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f5f8ff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#222',
    letterSpacing: 1,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#b3c6e0',
    borderRadius: 10,
    padding: 14,
    marginBottom: 18,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#222',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  buttonWrapper: {
    width: '100%',
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
  },
  toggleWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    backgroundColor: '#eaf0fa',
    borderRadius: 8,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 10,
    color: '#1a237e',
    fontWeight: 'bold',
    fontSize: 16,
    borderRadius: 6,
    marginHorizontal: 2,
    backgroundColor: '#eaf0fa',
  },
  toggleActive: {
    backgroundColor: '#b3c6e0',
    color: '#fff',
  },
});

export default CountrySearchScreen; 