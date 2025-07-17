import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CountrySearchScreen from '../screens/CountrySearchScreen';
import CountryListScreen from '../screens/CountryListScreen';
import CountryDetailScreen from '../screens/CountryDetailScreen';

export type RootStackParamList = {
  CountrySearch: undefined;
  CountryList: undefined;
  CountryDetail: { code: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="CountrySearch">
      <Stack.Screen name="CountrySearch" component={CountrySearchScreen} />
      <Stack.Screen name="CountryList" component={CountryListScreen} />
      <Stack.Screen name="CountryDetail" component={CountryDetailScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator; 