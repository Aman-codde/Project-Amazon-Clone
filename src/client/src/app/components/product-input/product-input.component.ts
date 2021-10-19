import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-input',
  templateUrl: './product-input.component.html',
  styleUrls: ['./product-input.component.scss']
})
export class ProductInputComponent implements OnInit {
  addProductForm: FormGroup;

  constructor(private fb: FormBuilder) 
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

}
