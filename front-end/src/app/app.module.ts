import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductSaveComponent } from './components/product-save/product-save.component';
import { HttpClientModule } from '@angular/common/http';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';

import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './components/menu/menu.component';
import { SupplierListComponent } from './components/supplier-list/supplier-list.component';
import { SupplierSaveComponent } from './components/supplier-save/supplier-save.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductSaveComponent,
    MenuComponent,
    SupplierListComponent,
    SupplierSaveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    MenubarModule
  ],
  providers: [
    provideClientHydration(),
    importProvidersFrom(HttpClientModule)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
