import { themeColors } from '@/utils/colors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-reanimated';
import "../global.css";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [queryClient] = useState(() => new QueryClient());

  const headerStyle = { backgroundColor: themeColors.secondaryBg };

  return (
    <QueryClientProvider client={queryClient}>
      {!loaded ?
        <View>
          <ActivityIndicator size='large' />
        </View>
        : (
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
          <Stack.Screen 
            name="category/[slug]" 
            options={{ 
              headerShown: true, 
              title: 'Modak challenge',
              headerStyle: headerStyle
            }} 
          />
        </Stack>
        )
      } 
      <StatusBar style="auto" />
    </QueryClientProvider>
  );
}
