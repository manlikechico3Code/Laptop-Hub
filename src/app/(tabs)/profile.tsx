import { useAuth } from "@/contexts/AuthContext";
import { getPublicImageUrl, uploadImage } from "@/utils/supabase";
import {
  faChartBar,
  faCircleCheck,
  faGear,
  faLink,
  faMessage,
  faPencil,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { user, profile, logout, updateProfile } = useAuth();
  const router = useRouter();
  const [uploading, setUploading] = useState(false);

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  const handlePickProfileImage = async () => {
    if (!user) {
      Alert.alert("Error", "Please log in to update your profile picture");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled || !result.assets?.[0]?.uri) {
      return;
    }

    const fileUri = result.assets[0].uri;
    const fileName = `${user.id}/profile-${Date.now()}.jpg`;

    try {
      setUploading(true);
      const { data, error } = await uploadImage(fileUri, fileName);

      if (error || !data?.path) {
        throw new Error("Failed to upload profile image");
      }

      const publicUrl = getPublicImageUrl(data.path);
      const { error: profileError } = await updateProfile({
        avatar_url: publicUrl,
      });

      if (profileError) {
        console.error(
          "Error updating profile:",
          JSON.stringify(profileError, null, 2),
        );
        throw profileError;
      }

      Alert.alert("Success", "Profile image updated");
    } catch (error: any) {
      Alert.alert(
        "Upload failed",
        error?.message || "Unable to save profile image",
      );
    } finally {
      setUploading(false);
    }
  };

  const getInitials = (value: string) => {
    if (!value) {
      return "U";
    }

    return (
      value
        .split(/[\s@.]+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() || "")
        .join("") || "U"
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileSection}>
          <Pressable onPress={handlePickProfileImage} disabled={uploading}>
            <View style={styles.avatarContainer}>
              {profile?.avatar_url ? (
                <Image
                  source={{ uri: profile.avatar_url }}
                  style={styles.avatar}
                />
              ) : (
                <View style={styles.avatarFallback}>
                  <Text style={styles.avatarFallbackText}>
                    {getInitials(profile?.name || user?.email || "User")}
                  </Text>
                </View>
              )}
            </View>
          </Pressable>
          <Text style={styles.profileName}>
            {profile?.name || user?.email || "User"}
          </Text>
          <Text style={styles.profileEmail}>{user?.email || "No email"}</Text>
          {uploading && (
            <Text style={styles.uploadingText}>Uploading image...</Text>
          )}
        </View>

        <Pressable
          style={styles.cardContainier}
          onPress={() => router.push("/links" as any)}
        >
          <View style={styles.menuLeft}>
            <FontAwesomeIcon icon={faLink} style={styles.uniCodeIcon} />
            <Text style={styles.menuText}>Link Account</Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.cardContainier}
          onPress={() => router.push("/email")}
        >
          <View style={styles.menuRow}>
            <View style={styles.menuLeft}>
              <FontAwesomeIcon icon={faMessage} style={styles.uniCodeIcon} />
              <Text style={styles.menuText}>Email</Text>
            </View>
          </View>
        </Pressable>

        <Pressable
          style={styles.cardContainier}
          onPress={() => router.push("/sales")}
        >
          <View style={styles.menuRow}>
            <View style={styles.menuLeft}>
              <FontAwesomeIcon icon={faChartBar} style={styles.uniCodeIcon} />
              <Text style={styles.menuText}>Sales</Text>
            </View>
          </View>
        </Pressable>

        <View style={styles.cardContainier}>
          <TouchableOpacity style={styles.menuRow}>
            <View style={styles.menuLeft}>
              <FontAwesomeIcon icon={faGear} style={styles.uniCodeIcon} />
              <Text style={styles.menuText}>Settings</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Pressable
          style={styles.cardContainier}
          onPress={() => router.push("/profileEdit")}
        >
          <View style={styles.menuRow}>
            <View style={styles.menuLeft}>
              <FontAwesomeIcon icon={faPencil} style={styles.uniCodeIcon} />
              <Text style={styles.menuText}>Edit Profile</Text>
            </View>
          </View>
        </Pressable>

        <View style={styles.cardContainier}>
          <TouchableOpacity style={styles.menuRow}>
            <View style={styles.menuLeft}>
              <FontAwesomeIcon icon={faPhone} style={styles.uniCodeIcon} />
              <Text style={styles.menuText}>Phone</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Pressable
          style={styles.cardContainier}
          onPress={() => router.push("/verify")}
        >
          <View style={styles.menuRow}>
            <View style={styles.menuLeft}>
              <FontAwesomeIcon
                icon={faCircleCheck}
                style={styles.uniCodeIcon}
              />
              <Text style={styles.menuText}>Verify</Text>
            </View>
          </View>
        </Pressable>

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 32,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: "#6b7280",
  },
  profileSection: {
    alignItems: "center",
    marginVertical: 24,
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: "#E2A281",
    padding: 3,
    marginBottom: 12,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
  },
  avatarFallback: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
    backgroundColor: "#F3E2D7",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarFallbackText: {
    color: "#7A4A2B",
    fontSize: 24,
    fontWeight: "700",
  },
  profileName: {
    color: "#161010",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  profileEmail: {
    color: "#6b7280",
    fontSize: 16,
  },
  uploadingText: {
    marginTop: 8,
    fontSize: 12,
    color: "#6b7280",
  },
  cardContainier: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  uniCodeIcon: {
    fontSize: 15,
    color: "#1C1C1E",
    fontWeight: "500",
    marginLeft: 14,
  },
  menuText: {
    fontSize: 15,
    color: "#1C1C1E",
    fontWeight: "500",
    marginLeft: 14,
  },
  logoutButton: {
    marginTop: 20,
    marginHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#dc2626",
    borderRadius: 12,
    alignItems: "center",
  },
  logoutText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
});
