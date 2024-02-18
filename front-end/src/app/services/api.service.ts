import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductDto } from '../interfaces/product-dto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  findAllProducts() {
    return this.http.get<ProductDto[]>(this.url + 'api/v1/products');
  }

  findProductById(id: number) {
    return this.http.get<ProductDto>(this.url + `api/v1/products/${id}`);
  }

  createProduct(product: ProductDto) {
    return this.http.post<any>(this.url + 'api/v1/products', product);
  }

  updateProduct(product: ProductDto, id: number) {
    return this.http.post<any>(this.url + `api/v1/products/${id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete<any>(this.url + `api/v1/products/${id}`);
  }
}
