import { useMemo, useState } from "react";
import { FlatList, Modal, Pressable, Text, View } from "react-native";
import { CategoryVM } from "../types/categories.vm";

type Props = {
  categories: CategoryVM[];
  value?: string;
  onChange: (slug: string) => void;
  placeholder?: string;
  title?: string;
};

export default function CategoriesFilter({
  categories,
  value,
  onChange,
  placeholder = "Selecciona categoría",
  title = "Categorías",
}: Props) {
  const [open, setOpen] = useState(false);
  const selectedLabel = useMemo(
    () => categories.find((cat) => cat.slug === value)?.name ?? placeholder,
    [categories, value, placeholder]
  );

  return (
    <View>
      <Pressable
        onPress={() => setOpen(true)}
        className="flex-row items-center justify-between px-3 py-2 rounded-xl border border-gray-300 bg-white"
      >
        <Text className={`text-sm ${value ? "text-gray-900" : "text-gray-400"}`}>{selectedLabel}</Text>
        <Text className="ml-2 text-gray-500">▼</Text>
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable className="flex-1 bg-black/40" onPress={() => setOpen(false)}>
          <View className="mt-auto bg-white rounded-t-2xl p-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-base font-semibold">{title}</Text>
              <Pressable onPress={() => setOpen(false)} className="px-2 py-1">
                <Text className="text-sm text-gray-500">Cerrar</Text>
              </Pressable>
            </View>
            <FlatList
              data={categories}
              keyExtractor={(it) => it.slug}
              className="max-h-80"
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    onChange(item.slug);
                    setOpen(false);
                  }}
                  className="px-3 py-3 rounded-xl flex-row justify-between items-center active:bg-gray-100"
                >
                  <Text className="text-sm">{item.name}</Text>
                  {item.slug === value && <Text className="text-sm text-green-600">✓</Text>}
                </Pressable>
              )}
              ItemSeparatorComponent={() => <View className="h-px bg-gray-100" />}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
