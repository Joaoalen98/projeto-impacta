import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ProductDto } from '../../interfaces/product-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    stock: ['', Validators.required]
  });


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

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(p => {
      console.log(p);

      if (p['id'] != '0') {
        this.id = p['id'];
        this.findProductById(p['id']);
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
      price: this.price?.value,
      stock: this.stock?.value
    };

    if (this.id === 0) {
      this.apiService.createProduct(product)
        .subscribe({
          next: (res) => {
            this.savedSuccessfully();
          },
          error: (res) => {

          }
        });
    } else {
      this.apiService.updateProduct(product, this.id)
        .subscribe({
          next: (res) => {
            this.savedSuccessfully();
          },
          error: (res) => {

          }
        });
    }
  }

  savedSuccessfully() {
    this.router.navigate(['/produtos']);
  }
}
