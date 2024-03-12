import { NgModule, Provider, importProvidersFrom } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductSaveComponent } from './components/product-save/product-save.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertsHttpInterceptor } from './interceptors/alerts-http.interceptor';

const alertsHttpInterceptor: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AlertsHttpInterceptor,
  multi: true
};

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductSaveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    CardModule,
    InputTextModule,
  ],
  providers: [
    provideClientHydration(),
    importProvidersFrom(HttpClientModule),
    alertsHttpInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
