import { fmtDate, fmtUSD } from "@/utils/formatters";
import type { ProductDTO, ProductsListDTO } from "../types/products.dto";
import type { ProductCardVM, ProductDetailVM } from "../types/products.vm";

export const dtoToCardVM = (d: ProductDTO): ProductCardVM => {
  const stock = d.stock ?? 0;
  return {
    id: String(d.id),
    title: (d.title ?? "").trim(),
    priceFormatted: fmtUSD(Number(d.price) || 0),
    thumbnailUrl: d.thumbnail ?? d.images?.[0] ?? null,
    rating: (Math.round(d.rating * 10) / 10).toString(),
    discountPercentage: d.discountPercentage.toString() || '',
    previousPriceFormatted: fmtUSD(Number(d.price) + Number(d.price) * d.discountPercentage / 100 || 0)
  };
};

export const dtoToDetailVM = (d: ProductDTO): ProductDetailVM => {
  const images = (d.images ?? []).filter(Boolean);
  return {
    id: String(d.id),
    availabilityStatus: (d.availabilityStatus ?? '').trim(),
    title: (d.title ?? "").trim(),
    description: (d.description ?? "").trim(),
    priceFormatted: fmtUSD(Number(d.price) || 0),
    rating: d.rating,
    brand: d.brand ?? "None",
    categoryLabel: d.category.charAt(0).toUpperCase() + d.category.slice(1),
    images: images.length ? images : (d.thumbnail ? [d.thumbnail] : []),
    shippingInformation: (d.shippingInformation).trim(),
    warrantyInformation: d.warrantyInformation,
    discountPercentage: d.discountPercentage || 0,
    previousPriceFormatted: fmtUSD(Number(d.price) + Number(d.price) * d.discountPercentage / 100 || 0),
    reviews: d.reviews
      .map(item => ({comment: item.comment, rating: item.rating, date: fmtDate(item.date), reviewer: item.reviewerName}))
      .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
  };
};

export const dtoListToCardVMList = (res: ProductsListDTO) => ({
  items: res.products.map(dtoToCardVM),
  total: res.total,
  skip: res.skip,
  limit: res.limit,
});
