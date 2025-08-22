export type ReviewDTO = {
  rating: number;
  comment: string;
  date: string;          
  reviewerName: string;
  reviewerEmail: string;
};

export type DimensionsDTO = {
  width: number;
  height: number;
  depth: number;
};

export type MetaDTO = {
  createdAt: string;     
  updatedAt: string;     
  barcode: string;
  qrCode: string;
};

export type ProductDTO = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: DimensionsDTO;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string; 
  reviews: ReviewDTO[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: MetaDTO;
  thumbnail: string;
  images: string[];
};

export type ProductsListDTO = {
  products: ProductDTO[];
  total: number;
  skip: number;
  limit: number;
};
