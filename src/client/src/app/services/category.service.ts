import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Category } from '../../../../shared/models/category.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private api: ApiService) 
  { }

  getCategories() {
    return this.api.get<{data: Category[]}>('categories').pipe(map(res => res.data));
  }

  createCategory(category: Category) {
    console.log("new category data in services: ", category);
    return this.api.post<Category,Category>('create-category',category);
  }
}
