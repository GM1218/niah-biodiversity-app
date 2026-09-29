import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { RecordsStore, PlantRecord } from '../../src/store/recordsStore';

export default function HomeScreen() {
  const router = useRouter();
  // Starts with only user-created records from the store (empty initially)
  const [records, setRecords] = useState<PlantRecord[]>(RecordsStore.getRecords());
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Listens for records saved via New Record
    const unsubscribe = RecordsStore.subscribe(() => {
      setRecords([...RecordsStore.getRecords()]);
    });
    return unsubscribe;
  }, []);

  const filteredRecords = records.filter(
    (item) =>
      item.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.locationName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Synced':
        return { bg: '#ADCBB6', text: '#20402C' };
      case 'Pending':
        return { bg: '#F8DB96', text: '#7C4A03' };
      case 'Failed':
        return { bg: '#F8B4B4', text: '#771D1D' };
      default:
        return { bg: '#DDE5E0', text: '#3E5044' };
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F6F8F6" />
      <View style={styles.container}>
        {/* Top Header: Logo + Title */}
        <View style={styles.topHeader}>
          <View style={styles.leafLogo}>
            <View style={styles.leafLeftSolid} />
            <View style={styles.leafRightOutline}>
              <View style={styles.leafVein} />
            </View>
          </View>
          <Text style={styles.brandTitle}>Niah Ground-Truth</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search species"
            placeholderTextColor="#8C9A91"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Twin Large Action Cards */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.bigCard, styles.scanCard]}
            activeOpacity={0.85}
            onPress={() => router.push('/scan-qr' as any)}
          >
            <View style={styles.qrIconShape}>
              <View style={[styles.qrCorner, styles.qrTL]} />
              <View style={[styles.qrCorner, styles.qrTR]} />
              <View style={[styles.qrCorner, styles.qrBL]} />
              <View style={[styles.qrCorner, styles.qrBR]} />
              <View style={styles.qrCenterDot} />
            </View>
            <Text style={styles.bigCardText}>Scan QR</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.bigCard, styles.newRecordCard]}
            activeOpacity={0.85}
            onPress={() => router.push('/new-record' as any)}
          >
            <View style={styles.plusIconShape}>
              <View style={styles.plusV} />
              <View style={styles.plusH} />
            </View>
            <Text style={styles.bigCardText}>New Record</Text>
          </TouchableOpacity>
        </View>

        {/* Section Header */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Recent Records</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/records' as any)}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {/* Renders only when records are added, otherwise empty state */}
        {filteredRecords.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyTitle}>No records logged yet</Text>
            <Text style={styles.emptySubtitle}>
              Tap "New Record" above to document your first plant observation.
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredRecords}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => {
              const badge = getStatusStyle(item.status);
              return (
                <TouchableOpacity
                  style={styles.pillCard}
                  activeOpacity={0.7}
                  onPress={() =>
                    router.push({
                      pathname: '/plant-detail',
                      params: {
                        name: item.scientificName,
                        commonName: item.commonName,
                        family: item.family,
                        location: item.locationName,
                        gps: item.gpsCoordination,
                        photoUri: item.photoUri || '',
                        id: item.recordId,
                      },
                    } as any)
                  }
                >
                  <View style={styles.cardLeft}>
                    <Text style={styles.speciesName}>{item.scientificName}</Text>
                    <Text style={styles.locationSubtitle}>{item.locationName}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: badge.bg }]}>
                    <Text style={[styles.statusBadgeText, { color: badge.text }]}>
                      {item.status}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F8F6',
  },
  container: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 16,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 6,
  },
  leafLogo: {
    width: 48,
    height: 34,
    position: 'relative',
    marginRight: 12,
  },
  leafLeftSolid: {
    position: 'absolute',
    left: 2,
    bottom: 2,
    width: 24,
    height: 32,
    backgroundColor: '#274431',
    borderTopLeftRadius: 24,
    borderBottomRightRadius: 24,
    transform: [{ rotate: '-28deg' }],
  },
  leafRightOutline: {
    position: 'absolute',
    right: 2,
    bottom: 2,
    width: 24,
    height: 32,
    borderWidth: 2.8,
    borderColor: '#274431',
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 24,
    transform: [{ rotate: '28deg' }],
    justifyContent: 'center',
    alignItems: 'center',
  },
  leafVein: {
    width: 1.8,
    height: 24,
    backgroundColor: '#274431',
  },
  brandTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#213B2A',
    letterSpacing: -0.4,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    height: 54,
    borderRadius: 27,
    paddingHorizontal: 18,
    marginBottom: 20,
    borderWidth: 1.2,
    borderColor: '#E6ECE8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 1,
  },
  searchIcon: {
    fontSize: 16,
    color: '#8C9A91',
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1E2B22',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  bigCard: {
    flex: 1,
    height: 150,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  scanCard: {
    backgroundColor: '#DDEAE2',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#D0E0D6',
  },
  newRecordCard: {
    backgroundColor: '#EEF4F0',
    marginLeft: 10,
    borderWidth: 1,
    borderColor: '#E2ECE5',
  },
  bigCardText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#233F2E',
    marginTop: 14,
  },
  qrIconShape: {
    width: 38,
    height: 38,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrCorner: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderColor: '#264431',
  },
  qrTL: { top: 0, left: 0, borderTopWidth: 3, borderLeftWidth: 3 },
  qrTR: { top: 0, right: 0, borderTopWidth: 3, borderRightWidth: 3 },
  qrBL: { bottom: 0, left: 0, borderBottomWidth: 3, borderLeftWidth: 3 },
  qrBR: { bottom: 0, right: 0, borderBottomWidth: 3, borderRightWidth: 3 },
  qrCenterDot: {
    width: 8,
    height: 8,
    backgroundColor: '#264431',
    borderRadius: 1.5,
  },
  plusIconShape: {
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  plusV: {
    position: 'absolute',
    width: 2.5,
    height: 36,
    backgroundColor: '#385744',
    borderRadius: 1.5,
  },
  plusH: {
    position: 'absolute',
    width: 36,
    height: 2.5,
    backgroundColor: '#385744',
    borderRadius: 1.5,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#213B2A',
  },
  seeAllText: {
    fontSize: 13,
    color: '#526659',
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 24,
  },
  pillCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingVertical: 18,
    paddingHorizontal: 22,
    borderRadius: 28,
    marginBottom: 12,
    borderWidth: 1.2,
    borderColor: '#E7EEE9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  cardLeft: {
    flex: 1,
    paddingRight: 10,
  },
  speciesName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22382A',
    marginBottom: 4,
  },
  locationSubtitle: {
    fontSize: 13,
    color: '#6F8074',
  },
  statusBadge: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  statusBadgeText: {
    fontSize: 13,
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    paddingHorizontal: 20,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#22382A',
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#718377',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 18,
  },
});