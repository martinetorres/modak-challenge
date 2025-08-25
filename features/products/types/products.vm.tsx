export type ProductCardVM = {
  id: string;
  title: string;
  priceFormatted: string;
  thumbnailUrl: string | null;
  rating: string;
  discountPercentage: string;
  previousPriceFormatted: string;
};

export type ReviewVM = {
  rating: number;
  comment: string;
  date: string;     
  reviewer: string;     
};

export type ProductDetailVM = {
  id: string;
  title: string;
  description: string;
  priceFormatted: string;
  rating: number;
  brand: string;
  categoryLabel: string;
  availabilityStatus: string;
  images: string[];
  shippingInformation: string;
  warrantyInformation: string;
  discountPercentage: number;
  previousPriceFormatted: string;
  reviews: ReviewVM[]
};