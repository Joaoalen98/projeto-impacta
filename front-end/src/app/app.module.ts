import { NgModule, Provider, importProvidersFrom } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductSaveComponent } from './components/product-save/product-save.component';
import { AlertsHttpInterceptor } from './interceptors/alerts-http.interceptor';
import { MenuComponent } from './components/menu/menu.component';
import { SupplierListComponent } from './components/supplier-list/supplier-list.component';
import { SupplierSaveComponent } from './components/supplier-save/supplier-save.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { PanelModule } from 'primeng/panel';
import { GalleriaModule } from 'primeng/galleria';
import { StepperModule } from 'primeng/stepper';
import { TabViewModule } from 'primeng/tabview';
import { ProgressBarModule } from 'primeng/progressbar';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const alertsHttpInterceptor: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AlertsHttpInterceptor,
  multi: true
};

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
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    MenubarModule,
    DropdownModule,
    FileUploadModule,
    PanelModule,
    GalleriaModule,
    StepperModule,
    TabViewModule,
    ProgressBarModule
  ],
  providers: [
    provideClientHydration(),
    importProvidersFrom(HttpClientModule),
    alertsHttpInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
