import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { loadProducts } from 'src/app/store/actions/product/product.actions';
import { categoriesSelector } from 'src/app/store/selectors/category/category.selectors';
import { Category } from '../../../../../shared/models/category.model';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  $categories: Observable<Category[]>
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
    ) { 
    this.$categories = this.store.select(categoriesSelector)
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params , 'inside categories-list ');
    this.store.dispatch(loadProducts({data: params.categories}));
    })

  }

}