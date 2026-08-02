# Adukkala — AI Smart Chef

Adukkala is a multilingual (Malayalam / English / Hindi) Kerala kitchen
companion: recipes, an AI fridge scanner, ingredient substitutes, festival
specials, a cooking community and voice assistance.

## Development

Requires Node.js and Bun (or npm).

```sh
bun install
bun run dev
```

## Build

```sh
bun run build
```

## Mobile (APK)

```sh
bun run build
npx cap sync android
npx cap open android
```

App ID: `com.adukkala.aismartchef`

## In-app updates

New releases are published to the `app_versions` table (version name, version
code, APK URL, release notes, mandatory flag). The app checks it on start and
offers an in-app download when a newer version code is published. Bump
`APP_VERSION_CODE` in `src/lib/app-version.ts` for every release build.
