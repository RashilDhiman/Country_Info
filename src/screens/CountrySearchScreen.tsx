// CountrySearchScreen: Allows user to search for countries by name
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries, clearError } from '../store/countrySlice';
import { RootState, AppDispatch } from '../store';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorNotification from '../components/ErrorNotification';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

const CountrySearchScreen = () => {
  
  const [query, setQuery] = useState('');
  
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'CountrySearch'>>();
  
  const { loading, error } = useSelector((state: RootState) => state.country);

 
  const handleSearch = async () => {
    if (!query.trim()) return;
    const result = await dispatch(fetchCountries(query));
    if (fetchCountries.fulfilled.match(result)) {
      navigation.navigate('CountryList');
    }
  };

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Country Info</Text>
      
      <TextInput
        placeholder="Search country"
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        onFocus={() => dispatch(clearError())}
        placeholderTextColor="#888"
        accessibilityLabel="Country search input"
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
});

export default CountrySearchScreen; 