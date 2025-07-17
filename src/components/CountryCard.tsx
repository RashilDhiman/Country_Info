import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface CountryCardProps {
  flagUrl?: string;
  name: string;
  population: number;
}

const CountryCard: React.FC<CountryCardProps> = ({ flagUrl, name, population }) => (
  <View style={styles.card}>
    {flagUrl ? (
      <Image source={{ uri: flagUrl }} style={styles.flag} />
    ) : (
      <View style={[styles.flag, { backgroundColor: '#eee' }]} />
    )}
    <View style={styles.info}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.population}>Population: {population.toLocaleString()}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#fff', borderRadius: 8, marginVertical: 6, elevation: 2 },
  flag: { width: 48, height: 32, borderRadius: 4, marginRight: 12 },
  info: { flex: 1 },
  name: { fontWeight: 'bold', fontSize: 16 },
  population: { color: '#555' },
});

export default CountryCard; 