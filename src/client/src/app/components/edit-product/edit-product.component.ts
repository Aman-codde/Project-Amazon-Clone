import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { updateProduct } from 'src/app/store/actions/product/product.actions';
import { categoriesSelector } from 'src/app/store/selectors/category/category.selectors';
import { selectedProductToUpdateSelector } from 'src/app/store/selectors/product/product.selectors';
import { Category } from '../../../../../shared/models/category.model';
import { Product } from '../../../../../shared/models/product.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  deleteProductCategoryForm: FormGroup;
  updateProductCategoryForm: FormGroup;
  updateProductForm: FormGroup;
  categories$: Observable<Category[]>;
  updateProduct$: Observable<Product | null>;
  showAddForm: boolean = false;
  showDeleteForm: boolean = false;
  showEditForm: boolean = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
  ) 
  { 
    this.updateProductForm = this.fb.group({
      quantity: [0, Validators.required],
    });

    this.updateProductCategoryForm = this.fb.group({
      categories: this.fb.array([], Validators.required)
    });

    this.deleteProductCategoryForm = this.fb.group({
      del_categories: this.fb.array([], Validators.required)
    })    

    this.categories$ = this.store.select(categoriesSelector);

    this.updateProduct$ = this.store.select(selectedProductToUpdateSelector);
  }

  ngOnInit(): void {
  }

  onCheckboxChange(e:any) {
    console.log(e.target.value);

    const categories: FormArray = this.updateProductCategoryForm.get('categories') as FormArray;
    if(e.target.checked) {
      categories.push(new FormControl(e.target.value));
    }
    else {
      let i: number = 0;
      categories.controls.forEach((item) => {
        if(item.value == e.target.value) {
          categories.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  addProductCategory(product: Product) {
    console.log(" Product ",product._id);
    console.log("-------->",this.updateProductCategoryForm.value,)
    this.store.dispatch(updateProduct(
      { data: {...this.updateProductCategoryForm.value},
        p: product
      }
    ))
    this.updateProductCategoryForm.reset();
  }

  onCheckboxChange2(e:any) {
    console.log(e.target.value);

    const del_categories: FormArray = this.deleteProductCategoryForm.get('del_categories') as FormArray;
    if(e.target.checked) {
      del_categories.push(new FormControl(e.target.value));
    }
    else {
      let i: number = 0;
      del_categories.controls.forEach((item) => {
        if(item.value == e.target.value) {
          del_categories.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  deleteProductCategory(product: Product) {
    console.log(" Product ",product._id);
    console.log("-------->",this.deleteProductCategoryForm.value)
    this.store.dispatch(updateProduct(
      {
        data: {...this.deleteProductCategoryForm.value},
        p: product
    }
    ));
    this.deleteProductCategoryForm.reset();
  }

  updateQuantity(product: Product) {
    this.store.dispatch(updateProduct(
      {
        data: {...this.updateProductForm.value},
        p: product
    }
    ));
  }

  backToProductList() {
    this.router.navigate(['update-products']);
  }

  onToggleAdd() {
    this.showAddForm = true;
    this.showDeleteForm = false;
    this.showEditForm = false;
  }

  onToggleDelete() {
    this.showDeleteForm = true;
    this.showAddForm = false;
    this.showEditForm = false;
  }

  onToggleEdit() {
    this.showEditForm = true;
    this.showDeleteForm = false;
    this.showAddForm = false;
  }

}


