import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ProductDto } from '../../interfaces/product-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierDTO } from '../../interfaces/supplier-dto';
import { FileSelectEvent, FileUpload, FileUploadEvent } from 'primeng/fileupload';
import { ProductImageDTO } from '../../interfaces/product-image-dto';
import { Stepper } from 'primeng/stepper';

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

  @ViewChild('stepper')
  stepper!: Stepper;

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
          console.log(res);
        }
      });
  }

  findAllProductImages() {
    this.apiService.getProductImages(this.id)
      .subscribe({
        next: (res) => {
          this.images = res;
          console.log(res);
        },
        error: (res) => {
          console.log(res);
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

  savedSuccessfully() {
    this.router.navigate(['/produtos']);
  }

  onUpload(event: FileSelectEvent) {
    this.imagesToUpload.push(...event.files);
    this.fileUpload.files = [];
    console.log(this.imagesToUpload);


  }

  getFileUrl(file: File): string {
    return window.URL.createObjectURL(file);
  }

  removeFileToUpload(lastModified: number) {
    this.imagesToUpload = this.imagesToUpload.filter(i => i.lastModified !== lastModified);
  }

  saveProductImages() {
    const form = new FormData();
    this.imagesToUpload.forEach(im => {
      form.append('images', im);
    });

    this.apiService.uploadImages(form, this.id)
      .subscribe({
        next: (res) => {
          this.imagesToUpload = [];
          this.findAllProductImages();
        },
        error: (err) => {
          console.log(err);
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
