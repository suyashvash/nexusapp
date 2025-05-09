# NexusCard App

NexusCard is a professional networking app that allows users to create and share digital business cards, analyze profile matches with job descriptions, and generate personalized cold emails.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Installation](#installation)
- [Running the App](#running-the-app)
  - [iOS](#ios)
  - [Android](#android)
- [Project Structure](#project-structure)
- [Features](#features)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or newer)
- npm (v8 or newer) or Yarn (v1.22 or newer)
- For iOS:
  - macOS
  - Xcode (14.0 or newer)
  - CocoaPods (1.11 or newer)
- For Android:
  - Android Studio
  - JDK 11
  - Android SDK Platform 33

## Environment Setup

### iOS Setup

1. Install Xcode from the Mac App Store
2. Install CocoaPods:
   ```bash
   sudo gem install cocoapods
   ```
3. Install Xcode Command Line Tools:
   ```bash
   xcode-select --install
   ```

### Android Setup

1. Install Android Studio
2. Set up the Android SDK
3. Configure environment variables:
   - Set ANDROID_HOME to your Android SDK location
   - Add platform-tools to your PATH

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd nexusapp
   ```

2. Install dependencies:
   ```bash
   npm install
   # or with yarn
   yarn install
   ```

3. Install iOS pods (iOS only):
   ```bash
   cd ios && pod install && cd ..
   ```

4. Create a file named `GoogleService-Info.plist` in the `ios` directory with your Firebase iOS configuration.

5. Ensure the Firebase configuration in `src/configs/firebase/index.ts` matches your Firebase project.

## Running the App

### iOS

1. Start Metro Bundler:
   ```bash
   npx react-native start
   ```

2. In a new terminal, build and run the app:
   ```bash
   npx react-native run-ios
   ```

   To specify a simulator:
   ```bash
   npx react-native run-ios --simulator="iPhone 14 Pro"
   ```

### Android

1. Start an Android emulator or connect a device

2. Start Metro Bundler:
   ```bash
   npx react-native start
   ```

3. In a new terminal, build and run the app:
   ```bash
   npx react-native run-android
   ```

## Project Structure

