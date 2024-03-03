import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductSaveComponent } from './components/product-save/product-save.component';
import { SupplierListComponent } from './components/supplier-list/supplier-list.component';
import { SupplierSaveComponent } from './components/supplier-save/supplier-save.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'produtos',
    pathMatch: 'full'
  },
  {
    path: 'produtos',
    component: ProductListComponent
  },
  {
    path: 'produtos/adicionar',
    component: ProductSaveComponent
  },
  {
    path: 'fornecedores',
    component: SupplierListComponent
  },
  {
    path: 'fornecedores/adicionar',
    component: SupplierSaveComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
