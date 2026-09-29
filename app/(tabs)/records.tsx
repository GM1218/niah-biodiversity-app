import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { RecordsStore, PlantRecord } from '../../src/store/recordsStore';

export default function RecordsScreen() {
  const router = useRouter();
  const [records, setRecords] = useState<PlantRecord[]>(RecordsStore.getRecords());
  const [selectedTab, setSelectedTab] = useState<'All' | 'Synced' | 'Pending' | 'Failed'>('All');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const unsubscribe = RecordsStore.subscribe(() => {
      setRecords([...RecordsStore.getRecords()]);
    });
    return unsubscribe;
  }, []);

  const countAll = records.length;
  const countSynced = records.filter((r) => r.status === 'Synced').length;
  const countPending = records.filter((r) => r.status === 'Pending').length;
  const countFailed = records.filter((r) => r.status === 'Failed').length;

  const filteredRecords = records.filter((r) => {
    const matchesTab = selectedTab === 'All' ? true : r.status === selectedTab;
    const matchesQuery = r.scientificName.toLowerCase().includes(query.toLowerCase());
    return matchesTab && matchesQuery;
  });

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Synced':
        return { bg: '#E7F4EB', text: '#2A7E46' };
      case 'Pending':
        return { bg: '#FEF5E7', text: '#D97706' };
      case 'Failed':
        return { bg: '#FDE8E8', text: '#E02424' };
      default:
        return { bg: '#EFF2F0', text: '#55655B' };
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>My Records</Text>

        <TextInput
          style={styles.searchBar}
          placeholder="Search my records"
          placeholderTextColor="#9AA59D"
          value={query}
          onChangeText={setQuery}
        />

        <View style={styles.tabBar}>
          {(['All', 'Synced', 'Pending', 'Failed'] as const).map((tab) => {
            const count = tab === 'All' ? countAll : tab === 'Synced' ? countSynced : tab === 'Pending' ? countPending : countFailed;
            const isActive = selectedTab === tab;
            return (
              <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab)} style={[styles.tabItem, isActive && styles.activeTabBorder]}>
                <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
                  {tab} ({count})
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {filteredRecords.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No records found</Text>
          </View>
        ) : (
          <FlatList
            data={filteredRecords}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 24 }}
            renderItem={({ item }) => {
              const { bg, text } = getStatusStyles(item.status);
              return (
                <TouchableOpacity
                  style={styles.recordCard}
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
                  <View style={{ flex: 1 }}>
                    <Text style={styles.recordSpecies}>{item.scientificName}</Text>
                    <Text style={styles.recordMeta}>{item.locationName} · {item.createdAt}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: bg }]}>
                    <Text style={[styles.statusBadgeText, { color: text }]}>{item.status}</Text>
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
  safeArea: { flex: 1, backgroundColor: '#F3F6F4' },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 16 },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#1E2B22', marginBottom: 14 },
  searchBar: { backgroundColor: '#FFFFFF', height: 46, borderRadius: 12, paddingHorizontal: 14, fontSize: 13.5, color: '#1E2B22', borderWidth: 1, borderColor: '#DEE4DF', marginBottom: 14 },
  tabBar: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#DEE4DF', marginBottom: 16 },
  tabItem: { paddingBottom: 10, paddingHorizontal: 4 },
  activeTabBorder: { borderBottomWidth: 2.5, borderBottomColor: '#264635' },
  tabLabel: { fontSize: 13, color: '#68776D', fontWeight: '500' },
  activeTabLabel: { color: '#264635', fontWeight: '700' },
  recordCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', paddingVertical: 14, paddingHorizontal: 16, borderRadius: 14, marginBottom: 10, borderWidth: 1, borderColor: '#E8EFEA' },
  recordSpecies: { fontSize: 15, fontWeight: '700', color: '#1E2B22' },
  recordMeta: { fontSize: 12.5, color: '#68776D', marginTop: 4 },
  statusBadge: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 20 },
  statusBadgeText: { fontSize: 11.5, fontWeight: '700' },
  emptyContainer: { alignItems: 'center', marginTop: 60 },
  emptyText: { color: '#88988D', fontSize: 14, fontWeight: '500' },
});