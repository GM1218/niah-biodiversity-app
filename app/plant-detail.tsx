import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image, Dimensions } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { RecordsStore } from '../src/store/recordsStore';

const { width } = Dimensions.get('window');

export default function PlantDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const id = (params.id as string) || '';
  const matched = RecordsStore.getRecords().find(
    (r) => r.recordId.toUpperCase() === id.toUpperCase() || r.id === id || r.scientificName.toLowerCase() === (params.name as string)?.toLowerCase()
  );

  const plantName = matched?.scientificName || (params.name as string) || (id ? `Tag ID: ${id}` : 'Unidentified Specimen');
  const commonName = matched?.commonName || (params.commonName as string) || 'Field Specimen';
  const family = matched?.family || (params.family as string) || 'Sarawak Flora';
  const location = matched?.locationName || (params.location as string) || 'Niah National Park';
  const gps = matched?.gpsCoordination || (params.gps as string) || '3.2247° N, 113.7631° E';
  const photoUri = matched?.photoUri || (params.photoUri as string) || '';
  const morphology = matched?.morphology || 'Documented field observation with recorded taxonomy and GPS location.';
  const notes = matched?.notes || 'Specimen recorded via Niah Ground-Truth mobile monitoring.';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        {/* Top Hero Specimen Photo */}
        <View style={styles.heroImageContainer}>
          <TouchableOpacity onPress={() => router.back()} style={styles.floatingBackBtn}>
            <Text style={styles.floatingBackChevron}>‹</Text>
          </TouchableOpacity>

          {photoUri ? (
            <Image
              source={{ uri: photoUri }}
              style={styles.heroPhoto}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholderContainer}>
              <Text style={{ fontSize: 64 }}>🌿</Text>
              <Text style={styles.placeholderText}>No photo attached</Text>
            </View>
          )}
        </View>

        {/* Content Body */}
        <View style={styles.sheetBody}>
          <Text style={styles.speciesTitle}>{plantName}</Text>
          <Text style={styles.taxonomy}>{commonName} · {family}</Text>

          <View style={styles.statusPill}>
            <Text style={styles.statusPillText}>• Field Documented</Text>
          </View>

          <Text style={styles.sectionHeader}>DESCRIPTION & MORPHOLOGY</Text>
          <Text style={styles.paragraph}>{morphology}</Text>

          {notes ? (
            <>
              <Text style={styles.sectionHeader}>ADDITIONAL NOTES</Text>
              <Text style={styles.paragraph}>{notes}</Text>
            </>
          ) : null}

          <Text style={styles.sectionHeader}>LOCATION</Text>
          <Text style={styles.locationText}>📍 {location} · {gps}</Text>

          <TouchableOpacity
            style={styles.viewQrBtn}
            activeOpacity={0.85}
            onPress={() => router.push({ pathname: '/plant-qr', params: { scientificName: plantName, recordId: id || matched?.recordId || 'NP-2026-0000' } } as any)}
          >
            <Text style={styles.viewQrBtnText}>View QR code</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F3F6F4' },
  heroImageContainer: {
    width: width,
    height: 260,
    backgroundColor: '#264635',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroPhoto: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#A9C4B2',
    fontSize: 13,
    marginTop: 8,
    fontWeight: '500',
  },
  floatingBackBtn: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  floatingBackChevron: { color: '#FFFFFF', fontSize: 26, fontWeight: '700', marginTop: -2 },
  sheetBody: { paddingHorizontal: 22, paddingVertical: 20 },
  speciesTitle: { fontSize: 23, fontWeight: '700', color: '#1E2B22' },
  taxonomy: { fontSize: 13.5, color: '#68776D', marginTop: 4 },
  statusPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#E7F4EB',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 14,
    marginVertical: 14,
  },
  statusPillText: { color: '#2A7E46', fontSize: 12.5, fontWeight: '700' },
  sectionHeader: { fontSize: 11.5, fontWeight: '800', color: '#7D8C81', letterSpacing: 0.9, marginTop: 16, marginBottom: 6 },
  paragraph: { fontSize: 13.5, color: '#2B392F', lineHeight: 21 },
  locationText: { fontSize: 13.5, fontWeight: '600', color: '#264635', marginTop: 2 },
  viewQrBtn: {
    backgroundColor: '#264635',
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 20,
  },
  viewQrBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
});