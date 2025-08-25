import { Picker } from "@react-native-picker/picker";
import { CategoryVM } from "../types/categories.vm";

type Props = {
  categories: CategoryVM[];
  value?: string;
  onChange: (slug: string) => void;
  placeholder?: string;
};

export default function CategoriesFilterNative({
  categories,
  value,
  onChange,
  placeholder = "All categories",
}: Props) {
  const hasValue = categories.some((i) => i.slug === value);
  return (
    <Picker
      selectedValue={hasValue ? value : "all"}
      onValueChange={(v) => {
        if (v) onChange(String(v));
      }}
      mode='dialog'
    >
      <Picker.Item label={placeholder} value="all" />
      {categories.map(({ slug, name }) => (
        <Picker.Item key={slug} label={name} value={slug} />
      ))}
    </Picker>
  );
}
