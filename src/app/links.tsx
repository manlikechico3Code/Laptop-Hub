import {
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const socialLinks = [
  {
    id: "facebook",
    name: "Facebook",
    handle: "@laptopHub",
    description: "Follow our latest updates and design inspiration.",
    tint: "#1877F2",
    softTint: "#EAF3FF",
    badge: "f",
    url: "https://www.facebook.com/",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    handle: "+123 456 7890",
    description: "Chat with us for quick support and order updates.",
    tint: "#25D366",
    softTint: "#EAFBF1",
    badge: "W",
    url: "https://wa.me/1234567890",
  },
  {
    id: "telegram",
    name: "Telegram",
    handle: "@laptopHubChat",
    description: "Join our channel for announcements and deals.",
    tint: "#2AABEE",
    softTint: "#EAF7FF",
    badge: "T",
    url: "https://t.me/laptopHubChat",
  },
];

export default function LinksScreen() {
  const openLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.headerWrap}>
          <Text style={styles.eyebrow}>Connect with us</Text>
          <Text style={styles.title}>Stay in touch</Text>
          <Text style={styles.subtitle}>
            Message us on your favorite platform and get the latest updates
            faster.
          </Text>
        </View>

        <View style={styles.cardList}>
          {socialLinks.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.card, { borderColor: item.tint + "33" }]}
              activeOpacity={0.9}
              onPress={() => openLink(item.url)}
            >
              <View style={styles.cardTop}>
                <View
                  style={[
                    styles.iconWrap,
                    {
                      backgroundColor: item.softTint,
                      borderColor: item.tint + "33",
                    },
                  ]}
                >
                  <Text style={[styles.iconText, { color: item.tint }]}>
                    {item.badge}
                  </Text>
                </View>

                <View style={styles.cardTextWrap}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardHandle}>{item.handle}</Text>
                </View>
              </View>

              <Text style={styles.cardDescription}>{item.description}</Text>

              <View
                style={[styles.actionButton, { backgroundColor: item.tint }]}
              >
                <Text style={styles.actionText}>Open</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 40,
  },
  headerWrap: {
    marginBottom: 22,
  },
  eyebrow: {
    color: "#4f46e5",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  title: {
    color: "#101828",
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
  cardList: {
    gap: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    padding: 18,
    shadowColor: "#101828",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 4,
  },
  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  iconWrap: {
    width: 54,
    height: 54,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  iconText: {
    fontSize: 26,
    fontWeight: "800",
  },
  cardTextWrap: {
    flex: 1,
  },
  cardTitle: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "700",
  },
  cardHandle: {
    color: "#667085",
    fontSize: 13,
    marginTop: 4,
    fontWeight: "500",
  },
  cardDescription: {
    color: "#475467",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 18,
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    paddingVertical: 12,
  },
  actionText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },
});
