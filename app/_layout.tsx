import { themeColors } from '@/utils/colors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import 'react-native-reanimated';
import "../global.css";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [queryClient] = useState(() => new QueryClient());

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  const headerStyle = { backgroundColor: themeColors.secondaryBg };

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen 
          name="(home)/index" 
          options={{ 
            headerShown: true, 
            title: 'Modak challenge',
            headerStyle: headerStyle
          }} 
        />
        <Stack.Screen 
          name="product/[id]" 
          options={{
            title: 'Product',
            headerStyle: headerStyle
          }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </QueryClientProvider>
  );
}
