import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products-service/products.service';

export interface DialogData {
  product: Product;
}

@Component({
  selector: 'app-products-list-item',
  templateUrl: './products-list-item.component.html',
  styleUrls: ['./products-list-item.component.scss']
})
export class ProductsListItemComponent implements OnInit {
  @Input() product: Product;
  @Output() isLoading = new EventEmitter<boolean>();
  @Output() loadedProducts = new EventEmitter<Product[]>();

  constructor(
    private productsService: ProductsService,
    public dialog: MatDialog
  ) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(ProductsListItemDialog, {
      width: '250px',
      data: {product: this.product}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  getProduct(id) {
    this.isLoading.emit(true)

    this.productsService.getProduct(id)
    .subscribe(ps => {
      this.loadedProducts.emit([ps]);
    })

    this.isLoading.emit(false)    
  }

  modifyProduct(id) {
    this.isLoading.emit(true)

    this.productsService.modifyProduct(id)
    .subscribe(ps => {
      this.loadedProducts.emit(ps);
    })

    this.isLoading.emit(false) 
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'products-list-item-dialog',
  templateUrl: 'products-list-item-dialog.html',
})
export class ProductsListItemDialog {

  constructor(
    public dialogRef: MatDialogRef<ProductsListItemDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
