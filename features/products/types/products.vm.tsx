export type ProductCardVM = {
  id: string;
  title: string;
  priceFormatted: string;
  thumbnailUrl: string | null;
};

export type ProductDetailVM = {
  id: string;
  title: string;
  description: string;
  priceFormatted: string;
  ratingText: string;
  brand: string;
  categoryLabel: string;
  stockText: string;
  images: string[];
};