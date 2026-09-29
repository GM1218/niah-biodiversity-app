import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSendLink = () => {
    if (!email.trim()) {
      Alert.alert('Required', 'Please enter your registered email address.');
      return;
    }
    setSent(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backChevron}>‹</Text>
      </TouchableOpacity>

      <View style={styles.container}>
        {!sent ? (
          <>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>
              Enter your registered email. We'll send a link to reset your password.
            </Text>

            <Text style={styles.fieldLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. sfc-botanist@..."
              placeholderTextColor="#9AA59D"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.85} onPress={handleSendLink}>
              <Text style={styles.primaryBtnText}>Send reset link</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.sentWrapper}>
            <View style={styles.envelopeIconBox}>
              <Text style={{ fontSize: 44 }}>✉️</Text>
            </View>
            <Text style={styles.title}>Check your inbox</Text>
            <Text style={styles.subtitle}>
              We've sent a reset link to {email}
            </Text>
            <TouchableOpacity
              style={styles.primaryBtn}
              activeOpacity={0.85}
              onPress={() => router.push('/change-password' as any)}
            >
              <Text style={styles.primaryBtnText}>Set new password</Text>
            </TouchableOpacity>
          </View>
        )}
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
  subtitle: { fontSize: 13.5, color: '#68776D', textAlign: 'center', marginTop: 8, marginBottom: 28, lineHeight: 20, paddingHorizontal: 10 },
  fieldLabel: { fontSize: 13, color: '#3A483E', fontWeight: '600', marginBottom: 6 },
  input: { backgroundColor: '#FFFFFF', height: 50, borderRadius: 14, paddingHorizontal: 16, fontSize: 14, color: '#1E2B22', borderWidth: 1, borderColor: '#DEE4DF', marginBottom: 22 },
  primaryBtn: { backgroundColor: '#264635', height: 52, borderRadius: 26, justifyContent: 'center', alignItems: 'center' },
  primaryBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700' },
  sentWrapper: { alignItems: 'center' },
  envelopeIconBox: { width: 88, height: 88, borderRadius: 44, backgroundColor: '#E5ECE7', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
});