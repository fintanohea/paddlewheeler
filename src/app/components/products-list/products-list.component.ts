import { Component, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute } from "@angular/router";
import { MatSidenav } from '@angular/material/sidenav';
import { ProductsService } from 'src/app/services/products-service/products.service'
import { Product } from 'src/app/models/Product'
import { Category } from 'src/app/models/Category'
import { Vendor } from 'src/app/models/Vendor'

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  categories: Category[] = []
  products: Product[] = []
  displayedProducts: Product[] = []
  vendors: Vendor[] = []
  loadingProducts = false
  loadingCatagories = false
  loadingVendors = false
  selectedNav: string = 'all'
  selectedVendor: string = 'all'
  @ViewChild('sidenav') sidenav: MatSidenav;
  category: string
  viewType: string = 'table'

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.category = params.get("category") // Subscription param
      this.getProductsByCategory(this.category)
    })

    this.category 
      ? this.getProductsByCategory(this.category)
      : this.getAllProducts()

    this.getAllCategories()

    this.getVendors()
  }

  getAllProducts() {
    this.loadingProducts = true

    this.productsService.getAllProducts()
      .subscribe(products => {
        this.loadingProducts = false
        this.products = products
        this.displayedProducts = products
      })
  }

  getAllCategories() {
    this.loadingCatagories = true

    this.productsService.getCategories()
      .subscribe(categories => {
        this.loadingCatagories = false
        this.categories = categories
      })
  }

  isLoadingFromProduct(isLoading: boolean) {
    this.loadingProducts = isLoading
  }

  loadedProducts(loadedProducts: Product[]) {
    this.products = loadedProducts
  }

  getProductsByCategory(category: string) {
    this.loadingProducts = true

    this.productsService.getProductsByCategory(category)
      .subscribe(products => {
        this.loadingProducts = false
        this.products = products
        this.displayedProducts = products
      })

    this.getVendors(category)  
  }

  getVendors(category?: string) {
    this.loadingVendors = true

    this.productsService.getVendors(category)
      .subscribe(vendors => {
        this.vendors = vendors
        this.loadingVendors = false
      })
  }

  setActive(link: string){
    this.selectedNav = link
  }

  filterByVendor(){
    this.selectedVendor === "all" 
      ? this.displayedProducts = this.products
      : this.displayedProducts = this.products.filter( p => p.vendor === this.selectedVendor ) 
  }

  closeSideNav() {
    this.sidenav.close();
  }

  toggleView(selectedViewType: string) {
    this.viewType = selectedViewType
  }
}
