import { Component, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { MatSidenav } from '@angular/material/sidenav';
import { ProductsService } from 'src/app/services/products-service/products.service'
import { Product } from 'src/app/models/Product'
import { Category } from 'src/app/models/Category'
import { Vendor } from 'src/app/models/Vendor'
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

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
  viewType: string = 'table'
  category: Category
  @ViewChild('sidenav') sidenav: MatSidenav;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    router.events.subscribe((val) => {
      //if new category is selected it should call for new products
      val instanceof NavigationEnd ? this.makeGetProductsCall() : null
    });
  }

  ngOnInit() {
    this.setUpNavigation()
  }

  setUpNavigation = async () => {
    this.productsService.getCategories()
      .pipe(
        catchError(err => of([]))
      )
      .subscribe(
        res => {
          this.categories = res
          this.setSelectedNav(this.categories[0])
          this.makeGetProductsCall()
        },
        err => console.log(err),
        () => console.log("DONE")
      )
  }

  makeGetProductsCall() {
    const categoryInURL: string = this.getCategoryInURL()
    this.category = this.categories.filter(c => c.slug == categoryInURL)[0]

    this.category
      ? this.getProductsByCategory(this.category.id)
      : this.getProductsByCategory()
  }

  getCategoryInURL(): string {
    let categoryInURL: string

    this.route.paramMap.subscribe(
      params => categoryInURL = params.get("category")
    )

    return categoryInURL
  }

  getAllProducts() {
    this.isLoadingProducts(true)

    this.productsService.getAllProducts()
      .pipe(
        catchError(err => of([]))
      )
      .subscribe(
        res => {
          this.setLoadedProducts(res)
          this.displayedProducts = res
        },
        err => {
          console.log(err)
          this.setLoadedProducts([])
        },
        () => {
          this.isLoadingProducts(false)
        }
      )
  }

  getProductsByCategory(category?: string) {
    this.isLoadingProducts(true)

    this.productsService.getProductsByCategory(category)
      .pipe(
        catchError(err => of([]))
      )
      .subscribe(
        res => {
          this.setLoadedProducts(res)
          this.displayedProducts = res
        },
        err => {
          this.setLoadedProducts([])
          console.log(err)
        },
        () => {
          this.isLoadingProducts(false)
          this.getVendors(category)
        }
      )
  }

  getVendors(category?: string) {
    this.loadingVendors = true

    this.productsService.getVendors(category)
      .pipe(
        catchError(err => of([]))
      )
      .subscribe(
        res => {
          this.vendors = res
        },
        err => {
          console.log(err)
          this.vendors = []
        },
        () => this.loadingVendors = false
      )
  }

  filterByVendor() {
    this.selectedVendor === "all"
      ? this.displayedProducts = this.products
      : this.displayedProducts = this.products.filter(p => p.vendor === this.selectedVendor)
  }

  isLoadingProducts(isLoading: boolean) {
    this.loadingProducts = isLoading
  }

  setLoadedProducts(loadedProducts: Product[]) {
    this.products = loadedProducts
  }

  setSelectedNav(category: Category) {
    this.selectedNav = category.slug
  }

  closeSideNav() {
    this.sidenav.close();
  }

  toggleView(selectedViewType: string) {
    this.viewType = selectedViewType
  }
}
