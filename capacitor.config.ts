import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.adukkala.aismartchef",
  appName: "Adukkala",
  webDir: "dist",
  plugins: {
    AdMob: {
      // Google AdMob application ID
      appId: "ca-app-pub-7586299603676169~4218898836",
      initializeForTesting: false,
    },
  },
};

export default config;
