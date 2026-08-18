import { useRouter } from "expo-router";
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

const verificationSteps = [
  {
    id: "email",
    label: "Email address",
    status: "Verified",
    detail: "notifications@laptophub.com",
    accent: "#1F9D77",
    soft: "#EAFBF5",
    action: "View",
  },
  {
    id: "phone",
    label: "Phone number",
    status: "Pending",
    detail: "+1 (415) 555-0147",
    accent: "#F59E0B",
    soft: "#FFF7E8",
    action: "Verify",
  },
  {
    id: "bank",
    label: "Bank account",
    status: "Unverified",
    detail: "Account details not linked",
    accent: "#2563EB",
    soft: "#EEF4FF",
    action: "Link",
  },
];

export default function VerifyScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerWrap}>
          <Text style={styles.eyebrow}>Account security</Text>
          <Text style={styles.title}>Verify your account</Text>
          <Text style={styles.subtitle}>
            Complete your verification to unlock payouts, updates, and trusted
            transactions.
          </Text>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <View>
              <Text style={styles.progressLabel}>Verification progress</Text>
              <Text style={styles.progressValue}>67%</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Secure</Text>
            </View>
          </View>

          <View style={styles.progressBarBg}>
            <View style={styles.progressBarFill} />
          </View>

          <View style={styles.summaryRow}>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryNumber}>2</Text>
              <Text style={styles.summaryLabel}>Verified</Text>
            </View>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryNumber}>1</Text>
              <Text style={styles.summaryLabel}>Pending</Text>
            </View>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryNumber}>3</Text>
              <Text style={styles.summaryLabel}>Total</Text>
            </View>
          </View>
        </View>

        <View style={styles.listWrap}>
          {verificationSteps.map((item) => (
            <View key={item.id} style={styles.verificationCard}>
              <View style={styles.cardHeader}>
                <View
                  style={[
                    styles.iconWrap,
                    {
                      backgroundColor: item.soft,
                      borderColor: item.accent + "33",
                    },
                  ]}
                >
                  <Text style={[styles.iconText, { color: item.accent }]}>
                    {item.id === "email"
                      ? "✉"
                      : item.id === "phone"
                        ? "☎"
                        : "🏦"}
                  </Text>
                </View>

                <View style={styles.cardTextWrap}>
                  <Text style={styles.cardTitle}>{item.label}</Text>
                  <Text style={styles.cardDetail}>{item.detail}</Text>
                </View>

                <View
                  style={[styles.statusBadge, { backgroundColor: item.soft }]}
                >
                  <Text style={[styles.statusText, { color: item.accent }]}>
                    {item.status}
                  </Text>
                </View>
              </View>

              <Pressable
                style={[styles.actionButton, { backgroundColor: item.accent }]}
              >
                <Text style={styles.actionText}>{item.action}</Text>
              </Pressable>
            </View>
          ))}
        </View>

        <Pressable style={styles.primaryButton} onPress={() => router.back()}>
          <Text style={styles.primaryButtonText}>Back to profile</Text>
        </Pressable>
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
    paddingTop: 24,
    paddingBottom: 40,
  },
  headerWrap: {
    marginBottom: 18,
  },
  eyebrow: {
    color: "#4f46e5",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.1,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  title: {
    color: "#111827",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 8,
  },
  subtitle: {
    color: "#667085",
    fontSize: 15,
    lineHeight: 22,
    maxWidth: 420,
  },
  heroCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
    marginBottom: 18,
  },
  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  progressLabel: {
    color: "#6b7280",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  progressValue: {
    color: "#111827",
    fontSize: 30,
    fontWeight: "800",
    marginTop: 4,
  },
  badge: {
    backgroundColor: "#EAFBF5",
    borderColor: "#A7E4C8",
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    color: "#0F8F68",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  progressBarBg: {
    height: 10,
    borderRadius: 999,
    backgroundColor: "#edf2f7",
    overflow: "hidden",
  },
  progressBarFill: {
    width: "67%",
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#E2A281",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  summaryBox: {
    flex: 1,
    backgroundColor: "#f8fafc",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    marginHorizontal: 4,
  },
  summaryNumber: {
    color: "#111827",
    fontSize: 22,
    fontWeight: "800",
  },
  summaryLabel: {
    color: "#6b7280",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 2,
    textTransform: "uppercase",
  },
  listWrap: {
    gap: 14,
  },
  verificationCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#101828",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    marginRight: 12,
  },
  iconText: {
    fontSize: 24,
  },
  cardTextWrap: {
    flex: 1,
  },
  cardTitle: {
    color: "#111827",
    fontSize: 17,
    fontWeight: "700",
  },
  cardDetail: {
    color: "#667085",
    fontSize: 13,
    marginTop: 4,
  },
  statusBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginLeft: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.7,
    textTransform: "uppercase",
  },
  actionButton: {
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "800",
  },
  primaryButton: {
    marginTop: 22,
    backgroundColor: "#111827",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
  },
});
