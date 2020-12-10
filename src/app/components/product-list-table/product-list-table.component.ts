import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products-service/products.service';

@Component({
  selector: 'app-product-list-table',
  templateUrl: './product-list-table.component.html',
  styleUrls: ['./product-list-table.component.scss']
})
export class ProductListTableComponent implements OnInit {
  @Input() displayedProducts: Product[]
  displayedColumns: string[] = ['name', 'description', 'price']

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
  }

}
