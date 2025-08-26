import * as Notifications from "expo-notifications";
import { Alert, Linking, Platform } from "react-native";

export async function setupAndroidChannel() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
    });
  }
}

export async function ensurePermissionOnTap(): Promise<boolean> {
  const p = await Notifications.getPermissionsAsync();
  if (p.status === "granted") return true;
  const req = await Notifications.requestPermissionsAsync();
  if (req.status === "granted") return true;
  Alert.alert(
    "Enable notifications",
    "We need permissions in order to remind you to buy this product.",
    [
      { text: "Open settings", onPress: () => Linking.openSettings?.() },
      { text: "Cancel", style: "cancel" },
    ]
  );
  return false;
}

export async function scheduleLocalInMinutes(minutes: number, title: string, body: string, data?: Record<string, any>) {
  const ok = await ensurePermissionOnTap();
  if (!ok) return null;
  const when = new Date(Date.now() + minutes * 60 * 1000);
  return Notifications.scheduleNotificationAsync({
    content: { title, body, data },
    trigger: { 
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: Math.max(1, Math.round((when.getTime() - Date.now()) / 1000)), 
    },
  });
}