import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ErrorNotificationProps {
  message: string;
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({ message }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { backgroundColor: '#ffcccc', padding: 12, borderRadius: 8, marginVertical: 8 },
  text: { color: '#b00020', fontWeight: 'bold' },
});

export default ErrorNotification; 