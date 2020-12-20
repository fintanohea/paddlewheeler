import { Injectable } from '@angular/core';
import { Product } from '../../models/Product';
import { Category } from '../../models/Category';
import { Vendor } from '../../models/Vendor';
import { Side } from '../../models/Side';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }

  getAllProducts(start?: string, end?: string): Observable<Product[]> {
    return this.http.get<Product[]>('/.netlify/functions/getProducts', {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        'start': start,
        'end': end
      }
    });
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>('/.netlify/functions/getProduct', {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        'id': id
      }
    });
  }

  getProductByTitle(title: string): Observable<Product> {
    return this.http.get<Product>('/.netlify/functions/getProductByTitle', {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        'title': title
      }
    });
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('/.netlify/functions/getCategories', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  getSides(sides: string[]): Observable<Side[]> {
    return this.http.get<Side[]>('/.netlify/functions/getSides', {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        'sides': sides
      }
    });
  }

  getVendors(category: string): Observable<Vendor[]> {
    return this.http.get<Vendor[]>('/.netlify/functions/getVendors', {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        'category': category
      }
    });
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>('/.netlify/functions/getProductsByCategory', {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        'category': category
      }
    });
  }

  modifyProduct(id: string): Observable<Product[]> {
    return this.http.get<Product[]>('/.netlify/functions/modifyProduct', {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        'id': id
      }
    });
  }
}
