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
  name?: string;
  flag?: string;
  capital?: string;
  region?: string;
  subregion?: string;
  population?: number;
  languages?: string[];
  currencies?: string[];
  borders?: string[];
  area?: number;
  cca2?: string;
  cca3?: string;
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

  // Format fields
  const languages = detail.languages ? detail.languages.join(', ') : 'N/A';
  const currencies = detail.currencies ? detail.currencies.join(', ') : 'N/A';
  const borders = detail.borders && detail.borders.length > 0 ? detail.borders.join(', ') : 'N/A';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        {/* Country flag */}
        <Image source={{ uri: detail.flag }} style={styles.flag} />
        {/* Country name */}
        <Text style={styles.name}>{detail.name}</Text>
        {/* Country details */}
        <View style={styles.detailRow}><Text style={styles.label}>Capital: </Text><Text style={styles.value}>{detail.capital || 'N/A'}</Text></View>
        <View style={styles.detailRow}><Text style={styles.label}>Region: </Text><Text style={styles.value}>{detail.region || 'N/A'}</Text></View>
        <View style={styles.detailRow}><Text style={styles.label}>Subregion: </Text><Text style={styles.value}>{detail.subregion || 'N/A'}</Text></View>
        <View style={styles.detailRow}><Text style={styles.label}>Population: </Text><Text style={styles.value}>{detail.population?.toLocaleString() || 'N/A'}</Text></View>
        <View style={styles.detailRow}><Text style={styles.label}>Area: </Text><Text style={styles.value}>{detail.area ? `${detail.area.toLocaleString()} km²` : 'N/A'}</Text></View>
        <View style={styles.detailRow}><Text style={styles.label}>Languages: </Text><Text style={styles.value}>{languages}</Text></View>
        <View style={styles.detailRow}><Text style={styles.label}>Currencies: </Text><Text style={styles.value}>{currencies}</Text></View>
        <View style={styles.detailRow}><Text style={styles.label}>Borders: </Text><Text style={styles.value}>{borders}</Text></View>
        <View style={styles.detailRow}><Text style={styles.label}>CCA2: </Text><Text style={styles.value}>{detail.cca2 || 'N/A'}</Text></View>
        <View style={styles.detailRow}><Text style={styles.label}>CCA3: </Text><Text style={styles.value}>{detail.cca3 || 'N/A'}</Text></View>
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