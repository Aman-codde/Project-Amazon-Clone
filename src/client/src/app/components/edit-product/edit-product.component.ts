import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { AppState } from 'src/app/store';
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
  updateProductCategoryForm: FormGroup;
  categories$: Observable<Category[]>;
  updateProduct$: Observable<Product | null>;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private store: Store<AppState>,
    private router: Router
  ) 
  { 
    this.updateProductCategoryForm = this.fb.group({
      categoryIdArray: this.fb.array([])
    });

    this.categories$ = this.store.select(categoriesSelector);

    this.updateProduct$ = this.store.select(selectedProductToUpdateSelector);
  }

  ngOnInit(): void {
  }

  onCheckboxChange(e:any) {
    console.log(e.target.value);

    const categoryIdArray: FormArray = this.updateProductCategoryForm.get('categoryIdArray') as FormArray;
    if(e.target.checked) {
      categoryIdArray.push(new FormControl(e.target.value));
    }
    else {
      let i: number = 0;
      categoryIdArray.controls.forEach((item) => {
        if(item.value == e.target.value) {
          categoryIdArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  addProductCategory(product: Product) {
    console.log(" Product ",product._id);
    console.log("-------->",this.updateProductCategoryForm.value,)
    this.productService.addCategoriesToProduct(product,this.updateProductCategoryForm.value);
  }

  backToProductList() {
    this.router.navigate(['update-products']);
  }

}


