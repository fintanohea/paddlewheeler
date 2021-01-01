import { Side } from './Side'
import { Modifier } from './Modifier'

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
  selectedSide?: Side;
  modifiers?: Modifier[];
}
