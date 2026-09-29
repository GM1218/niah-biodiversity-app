import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#F3F6F4" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#F3F6F4' } }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="change-password" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="new-record" />
        <Stack.Screen name="save-confirm" />
        <Stack.Screen name="scan-qr" />
        <Stack.Screen name="manual-qr" />
        <Stack.Screen name="plant-qr" />
        <Stack.Screen name="plant-detail" />
      </Stack>
    </>
  );
}