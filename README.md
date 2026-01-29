# Todo App with Biometric Authentication

A React Native todo app that keeps your tasks secure with fingerprint or Face ID authentication. Built with Expo and Redux Toolkit.

## What's This About?

Ever wanted a simple todo app that doesn't let anyone peek at your tasks? This app requires biometric authentication (fingerprint on Android, Face ID/Touch ID on iOS) before you can add, edit, or delete todos. Once you authenticate, you're good for the rest of the session.

## Features

- **Biometric Security** - Your todos are protected by fingerprint or face recognition
- **Session-Based Auth** - Authenticate once, stay unlocked until you close the app
- **Full CRUD Operations** - Create, view, edit, and delete todos
- **Clean UI** - Simple, intuitive interface with modal-based forms
- **Cross-Platform** - Works on both iOS and Android

## Tech Stack

- React Native with Expo
- Redux Toolkit for state management
- expo-local-authentication for biometrics
- TypeScript
- Jest for testing

## Project Structure

```
src/
├── components/     # Reusable UI components (atoms, molecules)
├── screens/        # App screens
├── redux/          # Store, slices, and state logic
├── utils/          # Auth helpers
└── types/          # TypeScript definitions
```

## Getting Started

### Prerequisites

- Node.js (v16 or later recommended)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator

### Installation

```bash
# Clone the repo
git clone <your-repo-url>
cd Todo_list_reactnative_auth

# Install dependencies
npm install

# Start the app
npm start
```

Then press `i` for iOS simulator or `a` for Android emulator.

### Running on a Physical Device

For biometric authentication to work properly, you'll want to test on a real device:

```bash
# Install Expo Go on your phone, then:
npm start

# Scan the QR code with your phone
```

## Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage
```

The test suite covers:
- Redux slice actions and auth-gated thunks
- Biometric authentication utilities
- Component rendering

## How It Works

1. **First Action** - When you try to add, edit, or delete a todo, the app prompts for biometric authentication
2. **Authentication** - Use your fingerprint or face to verify it's you
3. **Session Unlocked** - Once authenticated, all subsequent actions work without re-prompting
4. **App Restart** - Closing the app resets the session, requiring fresh authentication next time

## Good to Know

- Todos are stored in memory only (they won't persist after closing the app)
- If biometrics aren't set up on your device, you'll be prompted to enable them in settings
- The app follows atomic design principles for component organization

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start the Expo development server |
| `npm run android` | Run on Android emulator |
| `npm run ios` | Run on iOS simulator |
| `npm test` | Run the test suite |
| `npm run lint` | Check code style |

## Contributing

Feel free to open issues or submit PRs. The codebase is set up with ESLint and Prettier for consistent code style.

## License

MIT
