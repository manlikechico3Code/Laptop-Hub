import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/utils/supabase";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
    Alert,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function EditEmailScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email ?? "");
  const [loading, setLoading] = useState(false);

  const currentEmail = user?.email ?? "No email set";

  const isValidEmail = useMemo(() => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }, [email]);

  const hasChanges = email.trim().toLowerCase() !== currentEmail.toLowerCase();

  const handleSave = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      Alert.alert("Email required", "Please enter your email address.");
      return;
    }

    if (!isValidEmail) {
      Alert.alert("Invalid email", "Please enter a valid email format.");
      return;
    }

    if (!hasChanges) {
      Alert.alert("No changes", "Your email is already up to date.");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({ email: trimmedEmail });

      if (error) {
        throw error;
      }

      Alert.alert(
        "Email update started",
        "We sent a confirmation link to your new email address. Please verify it to finish updating.",
      );
      router.back();
    } catch (error: any) {
      Alert.alert(
        "Unable to update email",
        error?.message || "Something went wrong while updating your email.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Secure</Text>
          </View>
        </View>

        <View style={styles.heroCard}>
          <Text style={styles.heading}>Edit email</Text>
          <Text style={styles.subheading}>
            Keep your account secure and update the address used for important
            notifications.
          </Text>

          <View style={styles.infoCard}>
            <Text style={styles.label}>Current email</Text>
            <Text style={styles.currentEmail}>{currentEmail}</Text>
          </View>

          <View style={styles.inputWrap}>
            <Text style={styles.label}>New email</Text>
            <TextInput
              style={[
                styles.input,
                email.length > 0 && !isValidEmail && styles.inputError,
              ]}
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor="#9aa4b2"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          {email.length > 0 && !isValidEmail ? (
            <Text style={styles.helperText}>
              Please enter a valid email address.
            </Text>
          ) : (
            <Text style={styles.helperTextMuted}>
              A confirmation link will be sent after you save.
            </Text>
          )}
        </View>

        <View style={styles.buttonRow}>
          <Pressable style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>

          <Pressable
            style={[
              styles.saveButton,
              (!hasChanges || !isValidEmail || loading) &&
                styles.saveButtonDisabled,
            ]}
            disabled={!hasChanges || !isValidEmail || loading}
            onPress={handleSave}
          >
            <Text style={styles.saveText}>
              {loading ? "Saving..." : "Save changes"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f6fb",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  topBar: {
    alignItems: "flex-start",
    marginBottom: 14,
  },
  badge: {
    backgroundColor: "#E8F4FF",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#CFE6FF",
  },
  badgeText: {
    color: "#0a66c2",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  heroCard: {
    backgroundColor: "#ffffff",
    borderRadius: 28,
    padding: 22,
    shadowColor: "#101828",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 6,
  },
  heading: {
    color: "#111827",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 8,
  },
  subheading: {
    color: "#667085",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 22,
  },
  infoCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#eef2f7",
    padding: 16,
    marginBottom: 18,
  },
  label: {
    color: "#6b7280",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.7,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  currentEmail: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "600",
  },
  inputWrap: {
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: "#111827",
    fontSize: 16,
  },
  inputError: {
    borderColor: "#ef4444",
    backgroundColor: "#fff4f4",
  },
  helperText: {
    color: "#dc2626",
    fontSize: 12,
    marginTop: 6,
  },
  helperTextMuted: {
    color: "#6b7280",
    fontSize: 12,
    marginTop: 6,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 22,
  },
  cancelButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  cancelText: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "700",
  },
  saveButton: {
    flex: 1.4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E2A281",
    borderRadius: 14,
    paddingVertical: 15,
    shadowColor: "#E2A281",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.26,
    shadowRadius: 12,
    elevation: 3,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
  },
});
