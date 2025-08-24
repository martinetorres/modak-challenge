import { ProductDetails } from "@/features/products/ui/ProductDetails";

export default function ProductDetailsScreen() {
    const product = {  
        id: '1',
        title: 'Product 1',
        description: 'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
        priceFormatted: '$19,90',
        rating: 2.8,
        brand: 'Nike',
        categoryLabel: 'Shoes',
        availabilityStatus: 'In stock',
        images: [
            'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
            'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
            'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp'
        ],
        shippingInformation: 'Ships in 3-5 business days',
        warrantyInformation: '1 week warranty',
        discountPercentage: 10.2
    };
    
    return(
        <ProductDetails product={product} />
    )
}