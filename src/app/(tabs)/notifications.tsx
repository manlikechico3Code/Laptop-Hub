import { Image } from "expo-image";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CampusHubScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.pageContent}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            <Text style={styles.title}>Digital Info</Text>
            <Text style={styles.subtitle}>
              See what is happening now in digital Space
            </Text>
          </View>
          <View style={styles.card}>
            {/* Local image example - replace with your asset name */}
            <View style={styles.imageContainer}>
              <Image
                source={require("@/assets/images/alexanderwang.jpeg")}
                style={styles.avatar}
                contentFit="cover"
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>Alexander Wang at Meta.</Text>
              <Text style={styles.textBlock}>
                Meta brought Alexandr Wang on board in mid-2025 after investing $14.3B in Scale AI.
                 He’s now
              </Text>
              <Text style={styles.cardMeta}>Business • 5 min read</Text>
            </View>
          </View>
          <View style={styles.card}>
            {/* Local image example - replace with your asset name */}
            <View style={styles.imageContainer}>
              <Image
                source={require("@/assets/images/business.jpeg")}
                style={styles.avatar}
                contentFit="cover"
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>Your customers are online.</Text>
              <Text style={styles.textBlock}>
                Your growth should be too. Use our marketing, sales, and
                analytics tools to attract new buyers and keep existing ones
                engaged.
              </Text>
              <Text style={styles.cardMeta}>Business • 5 min read</Text>
            </View>
          </View>
          <View style={styles.card}>
            {/* Local image example - replace with your asset name */}
            <View style={styles.imageContainer}>
              <Image
                source={require("@/assets/images/more.jpeg")}
                style={styles.avatar}
                contentFit="cover"
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>Grow business with AI.</Text>
              <Text style={styles.textBlock}>
                Your growth should be too. Use our marketing, sales, and
                analytics tools to attract new buyers and keep existing ones
                engaged.
              </Text>
              <Text style={styles.cardMeta}>Business • 5 min read</Text>
            </View>
          </View>
          <View style={styles.card}>
            {/* Local image example - replace with your asset name */}
            <View style={styles.imageContainer}>
              <Image
                source={require("@/assets/images/flutterwave.jpeg")}
                style={styles.avatar}
                contentFit="cover"
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>Flutterwave’s potential IPO sparks questions about Nigeria’s market readiness and exit options.</Text>
              <Text style={styles.textBlock}>
                A Flutterwave IPO could be the boost Nigeria’s stock exchange needs to attract younger investors
              </Text>
              <Text style={styles.cardMeta}>Business • 5 min read</Text>
            </View>
          </View>
          <View style={styles.card}>
            {/* Local image example - replace with your asset name */}
            <View style={styles.imageContainer}>
              <Image
                source={require("@/assets/images/ceo.jpeg")}
                style={styles.avatar}
                contentFit="cover"
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>Nigeria’s Iyin Aboyeji, Elon Musk listed among global serial unicorn founders.</Text>
              <Text style={styles.textBlock}>
                Your growth should be too. Use our marketing, sales, and
                analytics tools to attract new buyers and keep existing ones
                engaged.
              </Text>
              <Text style={styles.cardMeta}>Business • 5 min read</Text>
            </View>
          </View>
          <View style={styles.card}>
            {/* Local image example - replace with your asset name */}
            <View style={styles.imageContainer}>
              <Image
                source={require("@/assets/images/trump.jpeg")}
                style={styles.avatar}
                contentFit="cover"
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>Donald Trump's tech policies focus on protecting American</Text>
              <Text style={styles.textBlock}>
                Trump has threatened to impose up to 100% retaliatory tariffs on any country that introduces taxes specifically targeting American technology companies.
              </Text>   
              <Text style={styles.cardMeta}>Business • 5 min read</Text>
            </View>
          </View>
          <View style={styles.card}>
            {/* Local image example - replace with your asset name */}
            <View style={styles.imageContainer}>
              <Image
                source={require("@/assets/images/tesla.jpeg")}
                style={styles.avatar}
                contentFit="cover"
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>Tesla Stock (TSLA) Rallies on Analyst Upgrade, 71% Price Target Boost</Text>
              <Text style={styles.textBlock}>
                Tesla stock (TSLA) is rallying on Thursday after Wedbush analyst Dan Ives upgraded the electric vehicle maker to outperform from neutral and raised his price target to $400 from $233.
              </Text>
              <Text style={styles.cardMeta}>Business • 5 min read</Text>
            </View>
          </View>
          <View style={styles.card}>
            {/* Local image example - replace with your asset name */}
            <View style={styles.imageContainer}>
              <Image
                source={require("@/assets/images/paystack.jpeg")}
                style={styles.avatar}
                contentFit="cover"
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>Paystack secures $8m Series A Funding</Text>
              <Text style={styles.textBlock}>
                Paystack provides powerful APIs to help developers quickly build modern payments experiences online.
                 With only a few lines of code, developers can create custom checkout experiences, build automated recurring billing systems for subscription products,
                  instantly send bulk transfers to any bank account in Nigeria, verify the identity of customers through five different verification APIs, and much more.
              </Text>
              <Text style={styles.cardMeta}>Business • 5 min read</Text>
            </View>
          </View>
          <View style={styles.card}>
            {/* Local image example - replace with your asset name */}
            <View style={styles.imageContainer}>
              <Image
                source={require("@/assets/images/marrk.jpeg")}
                style={styles.avatar}
                contentFit="cover"
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>Are Elon Musk and Zuckerberg friends?</Text>
              <Text style={styles.textBlock}>
                Meta brought Alexandr Wang on board in mid-2025 after investing $14.3B in Scale AI
              </Text>
              <Text style={styles.cardMeta}>Business • 5 min read</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 13,
    fontWeight: "300",
    color: "#111827",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22,
    color: "#6b7280",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  card: {
    width: "100%",
    maxWidth: 760,
    alignSelf: "center",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#ffffff",
    borderColor: "#e5e7eb",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
    marginVertical: 20,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    maxHeight: 320,
    backgroundColor: "#1D9E75",
    overflow: "hidden",
  },
  textContainer: {
    backgroundColor: "#ffffff",
    padding: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },
  textBlock: {
    color: "#374151",
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 14,
  },
  cardMeta: {
    color: "#6b7280",
    fontSize: 13,
  },

  pageContent: {
    flex: 1,
    width: "100%",
    maxWidth: 800, // Cap width on tablets/web
    paddingHorizontal: 16,
    paddingTop: 8,
  },

  scrollView: {
    flex: 1,
    width: "100%",
    maxWidth: 800, // Cap width on tablets/web
    paddingHorizontal: 10,
  },
});
