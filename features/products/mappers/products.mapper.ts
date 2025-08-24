import type { ProductDTO, ProductsListDTO } from "../types/products.dto";
import type { ProductCardVM, ProductDetailVM } from "../types/products.vm";

const fmtUSD = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

export const dtoToCardVM = (d: ProductDTO): ProductCardVM => {
  const stock = d.stock ?? 0;
  return {
    id: String(d.id),
    title: (d.title ?? "").trim(),
    priceFormatted: fmtUSD(Number(d.price) || 0),
    thumbnailUrl: d.thumbnail ?? d.images?.[0] ?? null,
  };
};

export const dtoToDetailVM = (d: ProductDTO): ProductDetailVM => {
  const stock = d.stock ?? 0;
  const images = (d.images ?? []).filter(Boolean);
  return {
    id: String(d.id),
    availabilityStatus: (d.availabilityStatus ?? '').trim(),
    title: (d.title ?? "").trim(),
    description: (d.description ?? "").trim(),
    priceFormatted: fmtUSD(Number(d.price) || 0),
    rating: d.rating,
    brand: d.brand ?? "Unknown",
    categoryLabel: d.category,
    images: images.length ? images : (d.thumbnail ? [d.thumbnail] : []),
    shippingInformation: (d.shippingInformation).trim(),
    warrantyInformation: d.warrantyInformation,
    discountPercentage: d.discountPercentage || 0
  };
};

export const dtoListToCardVMList = (res: ProductsListDTO) => ({
  items: res.products.map(dtoToCardVM),
  total: res.total,
  skip: res.skip,
  limit: res.limit,
});
