import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Product } from 'src/app/models/Product';
import { Side } from 'src/app/models/Side';
import { Modifier } from 'src/app/models/Modifier';
import { ProductsService } from 'src/app/services/products-service/products.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit,  AfterViewInit{
  productIdToGet: string = this.route.snapshot.paramMap.get("id")
  product: Product
  loading: boolean = false
  sides: Side[]
  modifiers: Modifier[]
  selectSide: string = "None"
  sidesLabel: string = "Sides"
  customSides: string = "Black|Brown|Gold"
  textarea = "textarea"
  textarealabel = "Side"
  readonly = "readonly"

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.loading = true

    this.productsService.getProduct(this.productIdToGet)
    .subscribe(
      p => {
        this.product = p
        this.sides = this.product.sides
        this.modifiers = this.product.modifiers
        this.loading = false
      },
      err => console.log(err),
      () => console.log("DONE")
    )

  }

  ngAfterViewInit() {
    document.addEventListener('snipcart.ready', function() {
      console.log(this.product)
      
    });
  }

  sideSelection(side: Side) {
    this.selectSide = side.title
    this.product.selectedSide = side
    // this.product.price = this.product.price + 1
  }

  test(product: Product) {
    
    console.log(
      product.selectedSide
    )
    
    // Snipcart.api.cart.items.add(product)
    //   .then( res => console.log(res))
    //   .catch( err => console.log(err))
  }



}
