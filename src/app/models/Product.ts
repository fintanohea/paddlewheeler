import { Side } from './Side'

export interface Product {
  id: string;
  name: string;
  price: number;
  url: string;
  slug: string;
  image?: string;
  images: string[];
  description?: string;
  body?: string;
  vendor?: string;
  sides?: Side[];
}
