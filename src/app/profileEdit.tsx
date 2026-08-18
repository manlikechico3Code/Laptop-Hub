import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
    Alert,
    Image,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function ProfileEditScreen() {
  const router = useRouter();
  const { user, profile, updateProfile } = useAuth();

  const [fullName, setFullName] = useState(profile?.name ?? "");
  const [location, setLocation] = useState(profile?.location ?? "");
  const [phone, setPhone] = useState(profile?.phone ?? "");
  const [loading, setLoading] = useState(false);

  const initials = useMemo(() => {
    const value = fullName || user?.email || "User";
    return (
      value
        .split(/[\s@.]+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() || "")
        .join("") || "U"
    );
  }, [fullName, user?.email]);

  const handleSave = async () => {
    const trimmedName = fullName.trim();
    const trimmedLocation = location.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName) {
      Alert.alert("Name required", "Please enter your full name.");
      return;
    }

    try {
      setLoading(true);
      const { error } = await updateProfile({
        name: trimmedName,
        location: trimmedLocation || null,
        phone: trimmedPhone || null,
      });

      if (error) {
        throw error;
      }

      Alert.alert("Success", "Your profile has been updated.");
      router.back();
    } catch (error: any) {
      Alert.alert(
        "Update failed",
        error?.message || "Something went wrong while saving your profile.",
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
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.eyebrow}>Profile</Text>
            <Text style={styles.title}>Edit profile</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Live</Text>
          </View>
        </View>

        <View style={styles.topCard}>
          <View style={styles.avatarWrap}>
            {profile?.avatar_url ? (
              <Image
                source={{ uri: profile.avatar_url }}
                style={styles.avatar}
              />
            ) : (
              <View style={styles.avatarFallback}>
                <Text style={styles.avatarText}>{initials}</Text>
              </View>
            )}
          </View>

          <Text style={styles.nameText}>
            {fullName || user?.email || "Your Name"}
          </Text>
          <Text style={styles.emailText}>
            {user?.email || "No email connected"}
          </Text>
        </View>

        <View style={styles.formCard}>
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Full name</Text>
            <TextInput
              style={styles.input}
              value={fullName}
              onChangeText={setFullName}
              placeholder="John Smith"
              placeholderTextColor="#9aa4b2"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholder="Lagos, Nigeria"
              placeholderTextColor="#9aa4b2"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Phone number</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="+234 800 000 0000"
              placeholderTextColor="#9aa4b2"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <View style={styles.buttonRow}>
          <Pressable style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>

          <Pressable
            style={[styles.saveButton, loading && styles.saveButtonDisabled]}
            onPress={handleSave}
            disabled={loading}
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
    backgroundColor: "#f4f7fb",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 26,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  eyebrow: {
    color: "#4f46e5",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.1,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  title: {
    color: "#111827",
    fontSize: 30,
    fontWeight: "800",
  },
  badge: {
    backgroundColor: "#EAFBF5",
    borderColor: "#A7E4C8",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    color: "#0F8F68",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  topCard: {
    backgroundColor: "#ffffff",
    borderRadius: 26,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
    marginBottom: 18,
  },
  avatarWrap: {
    width: 94,
    height: 94,
    borderRadius: 47,
    overflow: "hidden",
    marginBottom: 14,
    borderWidth: 3,
    borderColor: "#E2A281",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  avatarFallback: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E2A281",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "800",
  },
  nameText: {
    color: "#111827",
    fontSize: 22,
    fontWeight: "800",
  },
  emailText: {
    color: "#667085",
    fontSize: 14,
    marginTop: 6,
  },
  formCard: {
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 18,
    shadowColor: "#101828",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
  fieldGroup: {
    marginBottom: 18,
  },
  label: {
    color: "#6b7280",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: "#111827",
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 22,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
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
    backgroundColor: "#E2A281",
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: "#E2A281",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 3,
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
  },
});
