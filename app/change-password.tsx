import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function ChangePasswordScreen() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Required Fields', 'Please fill in both password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Mismatch', 'Passwords do not match.');
      return;
    }
    Alert.alert('Success', 'Password has been reset successfully.', [
      { text: 'Log In', onPress: () => router.replace('/' as any) },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backChevron}>‹</Text>
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.title}>Set new password</Text>
        <Text style={styles.subtitle}>Choose a password to secure your account.</Text>

        <Text style={styles.fieldLabel}>New password</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor="#9AA59D"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <Text style={styles.fieldLabel}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor="#9AA59D"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.85} onPress={handleResetPassword}>
          <Text style={styles.primaryBtnText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F3F6F4' },
  backBtn: { paddingHorizontal: 20, paddingTop: 12 },
  backChevron: { fontSize: 32, color: '#1E2B22' },
  container: { flex: 1, paddingHorizontal: 24, justifyContent: 'center', marginTop: -40 },
  title: { fontSize: 24, fontWeight: '700', color: '#1E2B22', textAlign: 'center' },
  subtitle: { fontSize: 13.5, color: '#68776D', textAlign: 'center', marginTop: 6, marginBottom: 28 },
  fieldLabel: { fontSize: 13, color: '#3A483E', fontWeight: '600', marginBottom: 6 },
  input: { backgroundColor: '#FFFFFF', height: 50, borderRadius: 14, paddingHorizontal: 16, fontSize: 14, color: '#1E2B22', borderWidth: 1, borderColor: '#DEE4DF', marginBottom: 18 },
  primaryBtn: { backgroundColor: '#264635', height: 52, borderRadius: 26, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  primaryBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
});