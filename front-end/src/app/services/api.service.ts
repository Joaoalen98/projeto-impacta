import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductDto } from '../interfaces/product-dto';
import { SupplierDTO } from '../interfaces/supplier-dto';
import { ProductImageDTO } from '../interfaces/product-image-dto';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url: string = environment.API_URL;

  constructor(private http: HttpClient) { }

  findAllProducts() {
    return this.http.get<ProductDto[]>(this.url + 'api/v1/products');
  }

  findProductById(id: number) {
    return this.http.get<ProductDto>(this.url + `api/v1/products/${id}`);
  }

  createProduct(product: ProductDto) {
    return this.http.post<ProductDto>(this.url + 'api/v1/products', product);
  }

  updateProduct(product: ProductDto, id: number) {
    return this.http.put<any>(this.url + `api/v1/products/${id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete<any>(this.url + `api/v1/products/${id}`);
  }


  findAllSuppliers() {
    return this.http.get<SupplierDTO[]>(this.url + 'api/v1/suppliers');
  }

  findSupplierById(id: number) {
    return this.http.get<SupplierDTO>(this.url + `api/v1/suppliers/${id}`);
  }

  createSupplier(product: SupplierDTO) {
    return this.http.post<any>(this.url + 'api/v1/suppliers', product);
  }

  updateSupplier(product: SupplierDTO, id: number) {
    return this.http.put<any>(this.url + `api/v1/suppliers/${id}`, product);
  }

  deleteSupplier(id: number) {
    return this.http.delete<any>(this.url + `api/v1/suppliers/${id}`);
  }

  uploadImages(form: FormData, productId: number) {
    return this.http.post<any>(this.url + `api/v1/products/${productId}/images`, form, {
      observe: 'events',
      reportProgress: true
    });
  }

  getProductImages(productId: number) {
    return this.http.get<ProductImageDTO[]>(this.url + `api/v1/products/images/${productId}`)
  }

  deleteProductImage(productImageId: number) {
    return this.http.delete<any>(this.url + `api/v1/products/images/${productImageId}`);
  }
}
