import { useLocalSearchParams } from "expo-router";
import HomeScreen from "../(home)/index";

export default function CategoryScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  return <HomeScreen initialCategory={slug ?? "all"} />;
}