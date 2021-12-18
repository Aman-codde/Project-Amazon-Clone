import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { AppState } from 'src/app/store';
import { createCategory } from 'src/app/store/actions/category/category.actions';
import { categoriesSelector } from 'src/app/store/selectors/category/category.selectors';
import { Category } from '../../../../../shared/models/category.model';

@Component({
  selector: 'app-add-new-category',
  templateUrl: './add-new-category.component.html',
  styleUrls: ['./add-new-category.component.scss']
})
export class AddNewCategoryComponent implements OnInit {
  categories$: Observable<Category[]>;
  addCategoryForm: FormGroup

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router
  ) 
  { 
    this.categories$ = this.store.select(categoriesSelector);
    
    this.addCategoryForm = this.fb.group({
      category_name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      parent_category: ['']
    });
  }

  ngOnInit(): void {
  }

  changeCategory(e: any) {
    console.log("dropdown value selected: ",e.target.value);
  }

  addNewCategory() {
    this.store.dispatch(createCategory({data: this.addCategoryForm.value}));
    this.addCategoryForm.reset();
  }

  backToCreateProductPage() {
    this.router.navigate(['/add-product']);
  }

}
