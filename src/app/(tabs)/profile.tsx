import { useAuth } from "@/contexts/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Colors } from '@/constants/theme';
import {
  faBell,
  faMessage,
  faChartBar,
  faGear,
  faPencil,
  faPhone,
  faPlaneCircleCheck,
  faCircleCheck,
  faHouse,
  faMagnifyingGlass,
  faPlus,
  faUser,
  faLink,
} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={require("@/assets/images/emma.jpeg")}
              style={styles.avatar}
            />
          </View>
          <Text style={styles.profileName}>{user?.name || "User"}</Text>
          <Text style={styles.profileEmail}></Text>
        </View>
        <View style={styles.cardContainier}>
          <TouchableOpacity style={styles.menuRow}>
            <View style={styles.menuLeft}>
              <FontAwesomeIcon icon={faLink} style={styles.uniCodeIcon} />
              <Text style={styles.menuText}>Link Account</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainier}>
          <TouchableOpacity style={styles.menuRow}>
            <View style={styles.menuLeft}>
              <FontAwesomeIcon icon={faMessage} style={styles.uniCodeIcon} />
              <Text style={styles.menuText}>Email</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainier}>
          <TouchableOpacity style={styles.menuRow}>
            <View style={styles.menuLeft}>
              <FontAwesomeIcon icon={faChartBar} style={styles.uniCodeIcon} />
              <Text style={styles.menuText}>Sales</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainier}>
          <TouchableOpacity style={styles.menuRow}>
            <View style={styles.menuLeft}>
              <FontAwesomeIcon icon={faGear} style={styles.uniCodeIcon} />
              <Text style={styles.menuText}>Setting</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainier}>
          <TouchableOpacity style={styles.menuRow}>
            <View style={styles.menuLeft}>
              <FontAwesomeIcon icon={faPencil} style={styles.uniCodeIcon} />
              <Text style={styles.menuText}>Edit Profile</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.cardContainier}>
          <TouchableOpacity style={styles.menuRow}>
            <View style={styles.menuLeft}>
              <FontAwesomeIcon icon={faPhone} style={styles.uniCodeIcon} />
              <Text style={styles.menuText}>Phone</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Pressable style={styles.cardContainier} onPress={handleLogout}>
          <TouchableOpacity style={styles.menuRow}>
            <View style={styles.menuLeft}>
              <FontAwesomeIcon icon={faCircleCheck } style={styles.uniCodeIcon} />
              <Text style={styles.menuText}>Verify</Text>
            </View>
          </TouchableOpacity>
        </Pressable>
        <View>
           <Pressable style={{ marginTop: 20, padding: 10, backgroundColor: 'red', borderRadius: 5, alignItems: "center" }}
              onPress={handleLogout}>
              <Text style={{ color: 'white' }}>Logout</Text>
          </Pressable>

        </View>
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
});
