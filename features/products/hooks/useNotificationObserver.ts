import * as Notifications from "expo-notifications";
import { useEffect, useRef } from "react";

const handledIds = new Set<string>();

function toDest(data: any): string | null {
  if (!data) return null;
  if (data.url) return String(data.url);
  if (data.route === "product" && data.id != null) return `/product/${String(data.id)}`;
  if (data.route === "category" && data.slug) return `/category/${String(data.slug)}`;
  return null;
}

export function useNotificationObserver(
  onNavigate: (dest: string) => void,
  enabled = true
) {
  const navigatingRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const handle = (resp: Notifications.NotificationResponse) => {
      const id = resp.notification.request.identifier;
      if (handledIds.has(id) || navigatingRef.current) return;

      const dest = toDest(resp.notification.request.content.data);
      if (!dest) return;

      handledIds.add(id);
      navigatingRef.current = true;
      onNavigate(dest);
      setTimeout(() => (navigatingRef.current = false), 800);
    };

    let cancelled = false;
    (async () => {
      for (let i = 0; i < 8 && !cancelled; i++) {
        const pending = await Notifications.getLastNotificationResponseAsync();
        if (pending?.notification) {
          handle(pending);
          break;
        }
        await new Promise((r) => setTimeout(r, 500));
      }
    })();

    const sub = Notifications.addNotificationResponseReceivedListener(handle);
    return () => {
      cancelled = true;
      sub.remove();
    };
  }, [onNavigate, enabled]);
}
