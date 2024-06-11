import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ProductDto } from '../../interfaces/product-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierDTO } from '../../interfaces/supplier-dto';
import { FileSelectEvent, FileUpload } from 'primeng/fileupload';
import { ProductImageDTO } from '../../interfaces/product-image-dto';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { TabView } from 'primeng/tabview';
import { setTimeout } from 'node:timers/promises';

@Component({
  selector: 'app-product-save',
  templateUrl: './product-save.component.html',
  styleUrl: './product-save.component.scss'
})
export class ProductSaveComponent implements OnInit {

  id: number = 0;
  form: FormGroup = new FormBuilder().group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: ['', Validators.required],
    stock: ['', Validators.required],
    supplierId: [''],
  });

  images: ProductImageDTO[] = [];
  suppliers: SupplierDTO[] = [];
  imagesToUpload: File[] = [];

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
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(p => {
      this.id = parseInt(p['id']);
      this.findAllSuppliers();
      this.findAllProductImages();
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

  findAllProductImages() {
    this.apiService.getProductImages(this.id)
      .subscribe({
        next: (res) => {
          this.images = res;
        },
        error: (res) => {
        }
      });
  }

  findProductById(id: number) {
    this.apiService.findProductById(id)
      .subscribe({
        next: (res) => {
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

  onUpload(event: FileSelectEvent) {
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
            this.findAllProductImages();
          } else if (res.type === HttpEventType.UploadProgress) {
            (Math.round(res.loaded * 100) / res.total!);
          }
        },
        error: (err) => {
          (err);
        }
      });
  }

  deleteProductImage(productImageId: number) {
    this.apiService.deleteProductImage(productImageId)
      .subscribe({
        next: (res) => {
          this.images = this.images.filter(i => i.id !== productImageId);
        },
        error: (res) => {

        }
      });
  }
}
