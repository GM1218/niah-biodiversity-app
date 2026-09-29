import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function SaveConfirmScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const scientificName = (params.scientificName as string) || 'Rafflesia tuan-mudae';
  const commonName = (params.commonName as string) || 'Corpse flower';
  const family = (params.family as string) || 'Rafflesiaceae';
  const locationName = (params.locationName as string) || 'West trail junction';
  const gpsCoordination = (params.gpsCoordination as string) || '3.2247° N, 113.7631° E';
  const recordId = (params.recordId as string) || 'NP-2026-0417';
  const photoUri = (params.photoUri as string) || '';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headline}>Record Saved</Text>
        <Text style={styles.subheadline}>Your field observation has been recorded successfully</Text>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.thumbWrapper}>
              {photoUri ? (
                <Image source={{ uri: photoUri }} style={styles.thumbImage} />
              ) : (
                <Text style={{ fontSize: 26 }}>🌺</Text>
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardSpecies}>{scientificName}</Text>
              <Text style={styles.cardFamily}>{commonName} · {family}</Text>
            </View>
          </View>

          <View style={styles.hairline} />

          <View style={styles.metaRow}>
            <Text style={styles.metaIcon}>📍</Text>
            <Text style={styles.metaText}>{locationName} · {gpsCoordination}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaIcon}>🕒</Text>
            <Text style={styles.metaText}>14 Sep 2026, 3:42 PM</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaIcon}>#</Text>
            <Text style={[styles.metaText, { fontWeight: '700' }]}>Record ID: {recordId}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.generateBtn}
          activeOpacity={0.85}
          onPress={() => router.push({ pathname: '/plant-qr', params: { scientificName, recordId } } as any)}
        >
          <Text style={styles.generateBtnText}>Generate QR code</Text>
        </TouchableOpacity>

        <View style={styles.twinActionRow}>
          <TouchableOpacity style={styles.pillAction} activeOpacity={0.8} onPress={() => router.push('/new-record' as any)}>
            <Text style={styles.pillActionText}>Add another record</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pillAction} activeOpacity={0.8} onPress={() => router.replace('/(tabs)/home' as any)}>
            <Text style={styles.pillActionText}>Back to home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F3F6F4' },
  container: { flex: 1, paddingHorizontal: 24, justifyContent: 'center' },
  headline: { fontSize: 24, fontWeight: '700', color: '#1E2B22', textAlign: 'center' },
  subheadline: { fontSize: 13.5, color: '#68776D', textAlign: 'center', marginTop: 6, marginBottom: 28 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 20, borderWidth: 1, borderColor: '#DEE4DF', marginBottom: 24 },
  cardHeader: { flexDirection: 'row', alignItems: 'center' },
  thumbWrapper: { width: 52, height: 52, borderRadius: 12, backgroundColor: '#E4ECE6', justifyContent: 'center', alignItems: 'center', marginRight: 14, overflow: 'hidden' },
  thumbImage: { width: '100%', height: '100%' },
  cardSpecies: { fontSize: 17, fontWeight: '700', color: '#1E2B22' },
  cardFamily: { fontSize: 13, color: '#68776D', marginTop: 3 },
  hairline: { height: 1, backgroundColor: '#EFF2F0', marginVertical: 16 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  metaIcon: { fontSize: 14, width: 22, color: '#68776D' },
  metaText: { fontSize: 13, color: '#3A483E' },
  generateBtn: { backgroundColor: '#264635', height: 52, borderRadius: 26, justifyContent: 'center', alignItems: 'center', marginBottom: 14 },
  generateBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  twinActionRow: { flexDirection: 'row', justifyContent: 'space-between' },
  pillAction: { flex: 1, backgroundColor: '#FFFFFF', height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginHorizontal: 4, borderWidth: 1.2, borderColor: '#DEE4DF' },
  pillActionText: { color: '#1E2B22', fontSize: 13, fontWeight: '700' },
});