import { Image } from "expo-image";
import { cssInterop } from "nativewind";
import { useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, useWindowDimensions, View } from "react-native";

cssInterop(Image, { className: "style" });

type Props = {
  images: string[];
  height?: number;
  dotActiveColor?: string;
  dotColor?: string;
  onIndexChange?: (i: number) => void;
};

export default function ImageSlider({
  images,
  height = 350,
  dotActiveColor = "#111",
  dotColor = "#E5E7EB",
  onIndexChange,
}: Props) {
  const { width: screenW } = useWindowDimensions();
  const [w, setW] = useState(0);
  const [index, setIndex] = useState(0);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!w) return;
    const i = Math.round(e.nativeEvent.contentOffset.x / w);
    if (i !== index) {
      setIndex(i);
      onIndexChange?.(i);
    }
  };

  if (!images?.length) return null;

  return (
    <View className="relative" style={{ height }} onLayout={(e) => setW(e.nativeEvent.layout.width || screenW)}>
      <ScrollView
        horizontal
        pagingEnabled
        snapToInterval={w || 1}
        snapToAlignment="start"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        className="flex-1"
      >
        {images.map((uri, i) => (
          <View key={uri + i} style={{ width: w || screenW }} className="h-full">
            <Image source={{ uri }} className="w-full h-full" contentFit="cover" />
          </View>
        ))}
      </ScrollView>
      
      {images.length > 1 &&
        <View className="absolute bottom-0 left-0 right-0 flex-row justify-center">
          {images.map((_, i) => (
            <View
              key={i}
              className="w-2 h-2 rounded-full mx-1"
              style={{ backgroundColor: i === index ? dotActiveColor : dotColor }}
            />
          ))}
        </View>
      }
    </View>
  );
}
