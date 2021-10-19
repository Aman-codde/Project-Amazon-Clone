import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { createProduct } from 'src/app/store/actions/product/product.actions';

@Component({
  selector: 'app-product-input',
  templateUrl: './product-input.component.html',
  styleUrls: ['./product-input.component.scss']
})
export class ProductInputComponent implements OnInit {
  addProductForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>) 
  { 
    this.addProductForm = this.fb.group({
      product_name : ['', Validators.required],
      price: [0, Validators.required],
      quantity: [0, Validators.required],
      imgUrl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  addProduct() {
    this.store.dispatch(createProduct({data: this.addProductForm.value}));
    this.addProductForm.reset();
  }
}
