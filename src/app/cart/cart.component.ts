import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  items = this.cartService.getItems();

  checkoutForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    address: ['', Validators.required],
    paymentMethod: [''],
    agreeToTerms: [false, Validators.requiredTrue]
  });

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {}

  borrarProducto(index: number) {
    this.cartService.borrarProducto(index);
  }

  onSubmit(): void {
    // Process checkout data here
    this.items = this.cartService.clearCart();
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
  }

  
  
}
