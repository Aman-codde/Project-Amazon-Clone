import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserInputComponent } from './components/user-input/user-input.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import * as fromUser from './store/reducers/user/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/user/user.effects';
import { PageUsersComponent } from './pages/page-users/page-users.component';
import { ProductInputComponent } from './components/product-input/product-input.component';
import { ProductEffects } from './store/effects/product/product.effects';
import * as fromProduct from './store/reducers/product/product.reducer';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { CategoryEffects } from './store/effects/category/category.effects';
import * as fromCategory from './store/reducers/category/category.reducer';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { CartEffects } from './store/effects/cart/cart.effects';
import * as fromCart from './store/reducers/cart/cart.reducer';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UserInputComponent,
    PageUsersComponent,
    ProductInputComponent,
    ProductsListComponent,
    ProductDetailsComponent,
    CategoriesListComponent,
    CartListComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forFeature(fromUser.userFeatureKey, fromUser.reducer),
    EffectsModule.forRoot([UserEffects, ProductEffects, CategoryEffects, CartEffects]),
    StoreModule.forFeature(fromProduct.productFeatureKey, fromProduct.reducer),
    StoreModule.forFeature(fromCategory.categoryFeatureKey, fromCategory.reducer),
    StoreModule.forFeature(fromCart.cartFeatureKey, fromCart.reducer),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
