import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
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
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) 
  { 
    this.categories$ = this.categoryService.getCategories();

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
    return this.categoryService.createCategory(this.addCategoryForm.value).subscribe();
  }

}
