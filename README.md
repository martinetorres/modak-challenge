# Modak challenge - Products list and details

## How to execute the project

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

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

## Deeplinks

In order to test the deeplinks in Android, execute the following commands:

``` npx uri-scheme open "modakchallenge://category/tablets" --android ```

``` npx uri-scheme open "modakchallenge://product/2" --android ```