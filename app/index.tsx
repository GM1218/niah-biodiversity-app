import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Required Fields', 'Please enter your Staff ID/email and password.');
      return;
    }
    router.replace('/(tabs)/home' as any);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container} bounces={false}>
          <View style={styles.logoWrapper}>
            <View style={styles.leafIconContainer}>
              <View style={styles.leafLeft} />
              <View style={styles.leafRight} />
              <View style={styles.leafStem} />
            </View>
          </View>

          <Text style={styles.title}>Niah Ground-Truth</Text>
          <Text style={styles.subtitle}>Biodiversity documentation system</Text>

          <View style={styles.form}>
            <Text style={styles.fieldLabel}>Staff ID or email</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. sfc.botanist@..."
              placeholderTextColor="#9AA59D"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />

            <Text style={styles.fieldLabel}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#9AA59D"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.loginBtn} activeOpacity={0.85} onPress={handleLogin}>
              <Text style={styles.loginBtnText}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/forgot-password' as any)} style={styles.forgotBtn}>
              <Text style={styles.forgotBtnText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footerNote}>
            No account? Contact your Conservation Officer to be registered on the system.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F3F6F4' },
  container: { flexGrow: 1, paddingHorizontal: 24, justifyContent: 'center', paddingVertical: 40 },
  logoWrapper: { alignItems: 'center', marginBottom: 20 },
  leafIconContainer: { width: 90, height: 60, position: 'relative', alignItems: 'center', justifyContent: 'center' },
  leafLeft: { position: 'absolute', left: 10, bottom: 8, width: 36, height: 48, backgroundColor: '#264635', borderTopLeftRadius: 36, borderBottomRightRadius: 36, transform: [{ rotate: '-25deg' }] },
  leafRight: { position: 'absolute', right: 10, bottom: 8, width: 36, height: 48, borderWidth: 3.5, borderColor: '#264635', backgroundColor: 'transparent', borderTopRightRadius: 36, borderBottomLeftRadius: 36, transform: [{ rotate: '25deg' }] },
  leafStem: { position: 'absolute', bottom: 0, width: 4, height: 16, backgroundColor: '#264635', borderRadius: 2 },
  title: { fontSize: 24, fontWeight: '700', color: '#1E2B22', textAlign: 'center', letterSpacing: -0.3 },
  subtitle: { fontSize: 13.5, color: '#68776D', textAlign: 'center', marginTop: 4, marginBottom: 32 },
  form: { width: '100%' },
  fieldLabel: { fontSize: 13, color: '#3A483E', fontWeight: '600', marginBottom: 6 },
  input: { backgroundColor: '#FFFFFF', height: 50, borderRadius: 14, paddingHorizontal: 16, fontSize: 14, color: '#1E2B22', borderWidth: 1, borderColor: '#DEE4DF', marginBottom: 18 },
  loginBtn: { backgroundColor: '#264635', height: 52, borderRadius: 26, justifyContent: 'center', alignItems: 'center', marginTop: 8 },
  loginBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '700', letterSpacing: 0.8 },
  forgotBtn: { alignSelf: 'center', marginTop: 20 },
  forgotBtnText: { color: '#264635', fontSize: 13.5, fontWeight: '600' },
  footerNote: { textAlign: 'center', color: '#7D8C81', fontSize: 12, lineHeight: 18, marginTop: 44, paddingHorizontal: 16 },
});