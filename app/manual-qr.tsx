import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { RecordsStore } from '../src/store/recordsStore';

export default function ManualQREntryScreen() {
  const router = useRouter();
  const [code, setCode] = useState('');

  const handleLookup = () => {
    if (!code.trim()) {
      Alert.alert('Required', 'Please enter a record code.');
      return;
    }
    const cleanCode = code.trim().toUpperCase();
    const match = RecordsStore.getRecords().find((r) => r.recordId.toUpperCase() === cleanCode);

    if (match) {
      router.push({
        pathname: '/plant-detail',
        params: {
          name: match.scientificName,
          commonName: match.commonName,
          family: match.family,
          location: match.locationName,
          gps: match.gpsCoordination,
          photoUri: match.photoUri || '',
          id: match.recordId,
        },
      } as any);
    } else {
      router.push({
        pathname: '/plant-detail',
        params: {
          name: 'Rafflesia tuan-mudae',
          commonName: 'Corpse flower',
          family: 'Rafflesiaceae',
          location: 'West trail junction',
          gps: '3.2247° N, 113.7631° E',
          id: cleanCode,
        },
      } as any);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backTouch}>
          <Text style={styles.backChevron}>‹</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Enter Code Manually</Text>
        <Text style={styles.subtitle}>
          Type the plant record code found on the tag if the QR code can't be scanned.
        </Text>

        <Text style={styles.label}>Record code</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. NP-2026-0417"
          placeholderTextColor="#9AA59D"
          value={code}
          onChangeText={setCode}
          autoCapitalize="characters"
        />

        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            ⓘ The record code is usually printed below the QR code on the physical plant tag.
          </Text>
        </View>

        <TouchableOpacity style={styles.lookupBtn} activeOpacity={0.85} onPress={handleLookup}>
          <Text style={styles.lookupBtnText}>Look up record</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>OR</Text>

        <TouchableOpacity onPress={() => router.replace('/scan-qr' as any)}>
          <Text style={styles.scanLink}>Scan QR code instead</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F3F6F4' },
  header: { paddingHorizontal: 16, paddingTop: 10 },
  backTouch: { width: 36, height: 36, justifyContent: 'center' },
  backChevron: { fontSize: 28, color: '#1E2B22' },
  container: { flex: 1, paddingHorizontal: 24, justifyContent: 'center', marginTop: -20 },
  title: { fontSize: 24, fontWeight: '700', color: '#1E2B22', textAlign: 'center' },
  subtitle: { fontSize: 13.5, color: '#68776D', textAlign: 'center', marginTop: 6, marginBottom: 24, lineHeight: 19 },
  label: { fontSize: 13, color: '#3A483E', fontWeight: '600', marginBottom: 6 },
  input: { backgroundColor: '#FFFFFF', height: 50, borderRadius: 14, paddingHorizontal: 16, fontSize: 14, color: '#1E2B22', borderWidth: 1, borderColor: '#DEE4DF', marginBottom: 12 },
  infoCard: { backgroundColor: '#EBF1ED', borderRadius: 12, padding: 12, marginBottom: 24 },
  infoText: { fontSize: 12.5, color: '#3A483E', lineHeight: 18 },
  lookupBtn: { backgroundColor: '#264635', height: 52, borderRadius: 26, justifyContent: 'center', alignItems: 'center' },
  lookupBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  orText: { textAlign: 'center', color: '#88988D', fontWeight: '700', fontSize: 12, marginVertical: 20 },
  scanLink: { textAlign: 'center', color: '#264635', fontWeight: '700', fontSize: 14 },
});