import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ProductDto } from '../../interfaces/product-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierDTO } from '../../interfaces/supplier-dto';
import { FileSelectEvent, FileUpload } from 'primeng/fileupload';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { TabView } from 'primeng/tabview';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-product-save',
  templateUrl: './product-save.component.html',
  styleUrl: './product-save.component.scss'
})
export class ProductSaveComponent implements OnInit {

  id: number = 0;
  form: FormGroup = new FormBuilder().group({
    name: [this.product?.name, Validators.required],
    description: [this.product?.description, Validators.required],
    price: [this.product?.price, Validators.required],
    stock: [this.product?.stock, Validators.required],
    supplierId: [this.product?.supplierId],
  });

  product?: ProductDto;
  suppliers: SupplierDTO[] = [];
  imagesToUpload: File[] = [];
  baseImageUrl: string = environment.API_URL + "api/v1/products/images/";
  imageUploadProgress = 0;

  @ViewChild('fileUpload')
  fileUpload!: FileUpload;

  @ViewChild('tabView')
  tabView!: TabView;

  public get name() {
    return this.form.get('name');
  }

  public get description() {
    return this.form.get('description');
  }

  public get price() {
    return this.form.get('price');
  }

  public get stock() {
    return this.form.get('stock');
  }

  public get supplierId() {
    return this.form.get('supplierId');
  }

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(p => {
      this.id = parseInt(p['id']);
      this.findAllSuppliers();
    });
  }

  findAllSuppliers() {
    this.apiService.findAllSuppliers()
      .subscribe({
        next: (res) => {
          this.suppliers = res;

          if (this.id !== 0) {
            this.findProductById(this.id);
          }
        },
        error: (res) => {

        }
      });
  }

  findProductById(id: number) {
    this.apiService.findProductById(id)
      .subscribe({
        next: (res) => {
          this.product = res;
          this.name?.setValue(res.name);
          this.description?.setValue(res.description);
          this.price?.setValue(res.price);
          this.stock?.setValue(res.stock);
          this.supplierId?.setValue(res.supplierId);
        },
        error: (res) => {

        }
      });
  }

  saveProduct() {
    const product: ProductDto = {
      id: this.id,
      name: this.name?.value,
      description: this.description?.value,
      price: this.price?.value.toString().replace(',', '.'),
      stock: this.stock?.value.toString().replace(',', '.'),
      supplierId: this.supplierId?.value,
    };

    if (this.id === 0) {
      this.apiService.createProduct(product)
        .subscribe({
          next: (res) => {
            this.id = res.id;
          },
          error: (res) => {

          }
        });
    } else {
      this.apiService.updateProduct(product, this.id)
        .subscribe({
          next: (res) => {

          },
          error: (res) => {

          }
        });
    }
  }

  onSelectFiles(event: FileSelectEvent) {
    this.imagesToUpload.push(...event.files);
    this.fileUpload.files = [];
  }

  getFileUrl(file: File): string {
    return window.URL.createObjectURL(file);
  }

  removeFileToUpload(lastModified: number) {
    this.imagesToUpload = this.imagesToUpload.filter(i => i.lastModified !== lastModified);
  }

  saveProductImages() {
    if (this.id === 0) {
      alert('Salve o dados do produto antes de fazer o upload das imagens');
      return;
    }

    const form = new FormData();
    this.imagesToUpload.forEach(im => {
      form.append('images', im);
    });

    this.apiService.uploadImages(form, this.id)
      .subscribe({
        next: (res: HttpEvent<Object>) => {
          if (res.type === HttpEventType.Response) {
            this.imagesToUpload = [];
            this.imageUploadProgress = 0;
            this.findProductById(this.id);
          } else if (res.type === HttpEventType.UploadProgress) {
            this.imageUploadProgress = Math.round((res.loaded * 100) / res.total!);
          } else if (res.type === HttpEventType.Sent) {

          }
        },
        error: (err) => {

        }
      });
  }

  deleteProductImage(productImageId: number) {
    this.apiService.deleteProductImage(productImageId)
      .subscribe({
        next: (res) => {
          this.product!.images = this.product?.images?.filter(i => i.id !== productImageId);
        },
        error: (res) => {

        }
      });
  }
}
