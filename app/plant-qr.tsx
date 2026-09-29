import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function PlantQRScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const scientificName = (params.scientificName as string) || 'Rafflesia tuan-mudae';
  const recordId = (params.recordId as string) || 'NP-2026-0417';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backTouch}>
          <Text style={styles.backChevron}>‹</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={styles.speciesHeading}>{scientificName}</Text>
        <Text style={styles.recordSub}>Record ID: {recordId}</Text>

        <View style={styles.qrCard}>
          <View style={styles.qrPatternBox}>
            <View style={styles.qrCornerTL} />
            <View style={styles.qrCornerTR} />
            <View style={styles.qrCornerBL} />
            <View style={styles.qrCenterGrid} />
          </View>
          <Text style={styles.qrInstructions}>
            Attach a printed copy of this code near the plant. Scanning it will show this record's details.
          </Text>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.pillBtn} activeOpacity={0.8} onPress={() => Alert.alert('Saved', 'Saved QR code to device gallery.')}>
            <Text style={styles.pillBtnText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pillBtn} activeOpacity={0.8} onPress={() => Alert.alert('Share', 'Share QR tag export file.')}>
            <Text style={styles.pillBtnText}>Share</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.printBtn} activeOpacity={0.85} onPress={() => Alert.alert('Print Tag', 'Dispatching print job to mobile field printer...')}>
          <Text style={styles.printBtnText}>Print</Text>
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
  speciesHeading: { fontSize: 22, fontWeight: '700', color: '#1E2B22', textAlign: 'center' },
  recordSub: { fontSize: 13, color: '#68776D', textAlign: 'center', marginTop: 4, marginBottom: 20 },
  qrCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 24, alignItems: 'center', borderWidth: 1, borderColor: '#DEE4DF', marginBottom: 20 },
  qrPatternBox: { width: 190, height: 190, backgroundColor: '#F0F4F2', borderRadius: 12, position: 'relative', marginBottom: 18, justifyContent: 'center', alignItems: 'center' },
  qrCornerTL: { position: 'absolute', top: 16, left: 16, width: 44, height: 44, borderWidth: 7, borderColor: '#1E2B22' },
  qrCornerTR: { position: 'absolute', top: 16, right: 16, width: 44, height: 44, borderWidth: 7, borderColor: '#1E2B22' },
  qrCornerBL: { position: 'absolute', bottom: 16, left: 16, width: 44, height: 44, borderWidth: 7, borderColor: '#1E2B22' },
  qrCenterGrid: { width: 40, height: 40, backgroundColor: '#1E2B22' },
  qrInstructions: { fontSize: 12, color: '#68776D', textAlign: 'center', lineHeight: 18, paddingHorizontal: 12 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  pillBtn: { flex: 1, backgroundColor: '#FFFFFF', height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginHorizontal: 4, borderWidth: 1.2, borderColor: '#DEE4DF' },
  pillBtnText: { color: '#1E2B22', fontSize: 14, fontWeight: '700' },
  printBtn: { backgroundColor: '#264635', height: 52, borderRadius: 26, justifyContent: 'center', alignItems: 'center' },
  printBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
});