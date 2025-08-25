import { useCategories } from "@/features/products/hooks/useCategories";
import { useProducts } from "@/features/products/hooks/useProducts";
import CategoriesFilter from "@/features/products/ui/CategoriesFilter";
import { ProductList } from "@/features/products/ui/ProductList";
import { ActivityIndicator, Text, View } from "react-native";

export default function HomeScreen() {
    const products = useProducts({ limit: 30, skip: 0 });
    const categories = useCategories();

    if (products.isLoading) return <View className="flex-1 items-center justify-center"><ActivityIndicator /></View>;
    if (products.isError) return <View className="p-4"><Text>Ocurrió un error</Text></View>;

    return(
        <View>
            {
                categories.data &&
                <CategoriesFilter categories={categories.data} onChange={() => {}} />
            }
            {products.data?.items &&
                <ProductList products={products.data?.items} />
            }
        </View>
    ) 
}