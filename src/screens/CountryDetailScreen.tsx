// CountryDetailScreen: Shows detailed info for a selected country
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountryDetail, clearCountryDetail } from '../store/countrySlice';
import { RootState, AppDispatch } from '../store';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorNotification from '../components/ErrorNotification';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/AppNavigator';

interface CountryDetail {
  flags?: { png?: string; svg?: string };
  name?: { common: string };
  capital?: string[];
  region?: string;
  subregion?: string;
  population?: number;
  languages?: { [key: string]: string };
}

const CountryDetailScreen = () => {
  // Redux dispatch and navigation params
  const dispatch = useDispatch<AppDispatch>();
  const route = useRoute<RouteProp<RootStackParamList, 'CountryDetail'>>();
  const { code } = route.params;
  // Select country detail, loading, and error from Redux
  const { countryDetail, loading, error } = useSelector((state: RootState) => state.country);
  const detail = countryDetail as CountryDetail | null;

  // Fetch country detail on mount, clear on unmount
  useEffect(() => {
    dispatch(fetchCountryDetail(code));
    return () => {
      dispatch(clearCountryDetail());
    };
  }, [dispatch, code]);

  // Show loading or error if needed
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorNotification message={error} />;
  if (!detail) return null;

  // Format languages
  const languages = detail.languages ? Object.values(detail.languages).join(', ') : 'N/A';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        {/* Country flag */}
        <Image source={{ uri: detail.flags?.png || detail.flags?.svg }} style={styles.flag} />
        {/* Country name */}
        <Text style={styles.name}>{detail.name?.common}</Text>
        {/* Country details */}
        <View style={styles.detailRow}><Text style={styles.label}>Capital: </Text><Text style={styles.value}>{detail.capital?.[0] || 'N/A'}</Text></View>
        <View style={styles.detailRow}><Text style={styles.label}>Region: </Text><Text style={styles.value}>{detail.region}</Text></View>
        <View style={styles.detailRow}><Text style={styles.label}>Subregion: </Text><Text style={styles.value}>{detail.subregion || 'N/A'}</Text></View>
        <View style={styles.detailRow}><Text style={styles.label}>Population: </Text><Text style={styles.value}>{detail.population?.toLocaleString()}</Text></View>
        <View style={styles.detailRow}><Text style={styles.label}>Languages: </Text><Text style={styles.value}>{languages}</Text></View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f5f8ff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  flag: {
    width: 140,
    height: 90,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#f0f0f0',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#222',
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
    color: '#444',
    fontSize: 16,
    minWidth: 100,
  },
  value: {
    fontWeight: 'normal',
    color: '#222',
    fontSize: 16,
    flexShrink: 1,
  },
});

export default CountryDetailScreen; 