import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { RecordsStore } from '../src/store/recordsStore';

const { width } = Dimensions.get('window');

export default function ScanQRScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [torch, setTorch] = useState(false);

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  const handleBarcodeScanned = ({ data }: { type: string; data: string }) => {
    if (scanned) return;
    setScanned(true);

    const scannedText = data.trim();
    const existing = RecordsStore.getRecords();

    // Check if the QR belongs to a locally created record ID or scientific name
    const matchedRecord = existing.find(
      (r) =>
        r.recordId.toUpperCase() === scannedText.toUpperCase() ||
        r.scientificName.toLowerCase() === scannedText.toLowerCase()
    );

    if (matchedRecord) {
      router.push({
        pathname: '/plant-detail',
        params: { id: matchedRecord.recordId },
      } as any);
    } else {
      // Passes the actual scanned payload
      router.push({
        pathname: '/plant-detail',
        params: {
          id: scannedText,
          name: scannedText,
          commonName: 'Scanned Tag',
          family: 'External / New QR Tag',
        },
      } as any);
    }
  };

  if (!permission) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.permissionText}>Initializing camera...</Text>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backBtnText}>‹ Back</Text>
          </TouchableOpacity>
          <Text style={styles.screenHeading}>Scan QR code</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.permissionBox}>
          <Text style={styles.permissionText}>Camera access is required to scan QR tags.</Text>
          <TouchableOpacity style={styles.grantBtn} onPress={requestPermission}>
            <Text style={styles.grantBtnText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        enableTorch={torch}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
      />

      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.screenHeading}>Scan QR code</Text>
        <TouchableOpacity onPress={() => setTorch(!torch)} style={styles.torchBtn}>
          <Text style={styles.torchText}>{torch ? '🔦 On' : '🔦 Off'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.instruction}>Point camera at the QR tag</Text>

      <View style={styles.scannerWrapper}>
        <View style={styles.targetFrame}>
          <View style={[styles.corner, styles.tl]} />
          <View style={[styles.corner, styles.tr]} />
          <View style={[styles.corner, styles.bl]} />
          <View style={[styles.corner, styles.br]} />
        </View>
      </View>

      <View style={styles.bottomControls}>
        {scanned && (
          <TouchableOpacity style={styles.rescanBtn} activeOpacity={0.85} onPress={() => setScanned(false)}>
            <Text style={styles.rescanBtnText}>Tap to Scan Again</Text>
          </TouchableOpacity>
        )}

        <View style={styles.fallbackRow}>
          <TouchableOpacity
            style={styles.subBtn}
            onPress={() => Alert.alert('Upload', 'Select QR photo from gallery.')}
          >
            <Text style={styles.subBtnText}>Upload from device</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.subBtn} onPress={() => router.push('/manual-qr' as any)}>
            <Text style={styles.subBtnText}>Enter manually</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
    alignItems: 'center',
    zIndex: 10,
  },
  backBtn: { padding: 4 },
  backBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  screenHeading: { color: '#FFFFFF', fontSize: 18, fontWeight: '700' },
  torchBtn: { padding: 4 },
  torchText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  instruction: { color: '#C2D1C7', textAlign: 'center', marginTop: 10, fontSize: 14, zIndex: 10 },
  scannerWrapper: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  targetFrame: {
    width: width * 0.68,
    height: width * 0.68,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    position: 'relative',
  },
  corner: { position: 'absolute', width: 22, height: 22, borderColor: '#4CAF50' },
  tl: { top: -2, left: -2, borderTopWidth: 4, borderLeftWidth: 4 },
  tr: { top: -2, right: -2, borderTopWidth: 4, borderRightWidth: 4 },
  bl: { bottom: -2, left: -2, borderBottomWidth: 4, borderLeftWidth: 4 },
  br: { bottom: -2, right: -2, borderBottomWidth: 4, borderRightWidth: 4 },
  bottomControls: { paddingHorizontal: 22, paddingBottom: 40, zIndex: 10 },
  rescanBtn: {
    backgroundColor: '#264635',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 14,
  },
  rescanBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
  fallbackRow: { flexDirection: 'row', justifyContent: 'space-between' },
  subBtn: {
    flex: 1,
    paddingVertical: 13,
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  subBtnText: { color: '#FFFFFF', fontSize: 12.5, fontWeight: '600' },
  permissionBox: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  permissionText: { color: '#FFFFFF', fontSize: 14, textAlign: 'center', marginBottom: 20 },
  grantBtn: { backgroundColor: '#264635', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 24 },
  grantBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
});