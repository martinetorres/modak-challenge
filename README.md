# Modak challenge - Products list and details

## How to execute the project

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npm run android
   ```

Note: the app should work in iOS too, but I couldn't test it because I don't have a device. Some features don't work with Expo Go (Push notifications, pickers).

## Architecture decisions

The app uses a Clean-Lite + MVVM pattern. 

### Rules

- UI never consumes DTOs. UI only receives ViewModels (VMs). Use mappers to transform DTO → VM.
- Data-fetching hooks (React Query) are used only in screen/container components (router screens), not inside presentational UI components.

### Layers

- View: React Native components (screens + presentational components).
- ViewModel: Hooks that fetch/cache data and return VMs (plus the VM types).
- Mapper: Pure functions DTO → VM (formatting, defaults, flags).
- API: Feature API modules that call the backend and return DTOs (uses a shared apiClient).
- Shared: apiClient (HTTP), small utilities.

### Data flow

View (Screen) → use... Hook → API (DTO) → Mapper → VM → View (UI)

## Deeplinks and notifications

In the product details screen, I added two buttons: Quick reminder and Test category deeplink.

If you press Quick reminder, a push notification will pop in 6 seconds, with a deeplink to this product screen.

Something similar will happen if you click "Test category deeplink". In this case home screen will be initialized with the products category.

## APK

[Download APK](https://drive.google.com/file/d/1zT5xQn5rBzdhpWYx4y_9eM3y-g6n-Ax7/view?usp=drive_link)
