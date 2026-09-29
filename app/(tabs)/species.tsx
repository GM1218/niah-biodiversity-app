import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

const SPECIES_CATALOGUE = [
  { id: '1', scientificName: 'Shorea platyclados', location: '2.3km trail, Niah', status: 'Vulnerable' },
  { id: '2', scientificName: 'Nepenthes ampullaria', location: 'Cave entrance area', status: 'Least Concern' },
  { id: '3', scientificName: 'Rafflesia tuan-mudae', location: 'West trail junction', status: 'Endangered' },
  { id: '4', scientificName: 'Dipterocarpus caudatus', location: 'Keruing', status: 'Critically Endangered' },
  { id: '5', scientificName: 'Nepenthes ampullaria', location: '2.3km trail, Niah', status: 'Least Concern' },
  { id: '6', scientificName: 'Shorea platyclados', location: '2.3km trail, Niah', status: 'Vulnerable' },
];

export default function SpeciesScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Species Reference</Text>

        <TextInput
          style={styles.searchBar}
          placeholder="Search species"
          placeholderTextColor="#9AA59D"
          value={query}
          onChangeText={setQuery}
        />

        <View style={styles.filterRow}>
          <TouchableOpacity style={styles.filterChip}><Text style={styles.chipText}>Category ▾</Text></TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}><Text style={styles.chipText}>Location ▾</Text></TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}><Text style={styles.chipText}>Conservation Status ▾</Text></TouchableOpacity>
        </View>

        <FlatList
          data={SPECIES_CATALOGUE.filter((s) => s.scientificName.toLowerCase().includes(query.toLowerCase()))}
          keyExtractor={(item, index) => item.id + index}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.7}
              onPress={() => router.push({ pathname: '/plant-detail', params: { name: item.scientificName, location: item.location } } as any)}
            >
              <View>
                <Text style={styles.itemTitle}>{item.scientificName}</Text>
                <Text style={styles.itemSub}>{item.location}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F3F6F4' },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 16 },
  header: { fontSize: 24, fontWeight: '700', color: '#1E2B22', marginBottom: 14 },
  searchBar: { backgroundColor: '#FFFFFF', height: 46, borderRadius: 12, paddingHorizontal: 14, fontSize: 13.5, color: '#1E2B22', borderWidth: 1, borderColor: '#DEE4DF', marginBottom: 12 },
  filterRow: { flexDirection: 'row', marginBottom: 16 },
  filterChip: { backgroundColor: '#E3ECE5', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, marginRight: 8 },
  chipText: { fontSize: 12, color: '#264635', fontWeight: '600' },
  card: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 16, borderRadius: 14, marginBottom: 10, borderWidth: 1, borderColor: '#E8EFEA' },
  itemTitle: { fontSize: 16, fontWeight: '700', color: '#1E2B22' },
  itemSub: { fontSize: 13, color: '#68776D', marginTop: 4 },
  chevron: { fontSize: 24, color: '#88988D', fontWeight: '300' },
});