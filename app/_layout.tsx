import { useNotificationObserver } from '@/features/products/hooks/useNotificationObserver';
import { setupAndroidChannel } from '@/lib/localNotifications';
import { themeColors } from '@/utils/colors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import { router, Stack, useRootNavigationState } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-reanimated';
import "../global.css";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [queryClient] = useState(() => new QueryClient());

  const headerStyle = { backgroundColor: themeColors.secondaryBg };
  const [pendingDest, setPendingDest] = useState<string | null>(null);
  const navState = useRootNavigationState()

  useEffect(() => {
    setupAndroidChannel();
  }, []);

  useNotificationObserver(setPendingDest, true);

  useEffect(() => {
      if (!pendingDest) return;
      if (!loaded || !navState?.key) return; 

      if (pendingDest.includes("://")) {
        import("expo-linking").then(({ default: Linking }) => Linking.openURL(pendingDest));
      } else {
        router.push(pendingDest as any);
      }
      setPendingDest(null);
  }, [pendingDest, loaded, navState?.key, router]);

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
