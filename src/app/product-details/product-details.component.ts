import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';

import { Product } from '../products';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {

  product: Product | undefined;
  /* ... */

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));

    // Find the product that correspond with the id provided in route.
    const productId = this.route.snapshot.paramMap.get('productId');
    this.http
      .get<Product>(`https://fakestoreapi.com/products/${productId}`)
      .subscribe((product) => {
        this.product = product;
      });
  }
}