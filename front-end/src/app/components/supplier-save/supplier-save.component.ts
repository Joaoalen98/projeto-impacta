import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { SupplierDTO } from '../../interfaces/supplier-dto';

@Component({
  selector: 'app-supplier-save',
  templateUrl: './supplier-save.component.html',
  styleUrl: './supplier-save.component.scss'
})
export class SupplierSaveComponent {

  id: number = 0;
  form: FormGroup = new FormBuilder().group({
    name: ['', Validators.required],
    document: ['', Validators.required],
  });


  public get name() {
    return this.form.get('name');
  }

  public get document() {
    return this.form.get('document');
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
        this.findSupplierById(p['id']);
      }
    });
  }

  findSupplierById(id: number) {
    this.apiService.findSupplierById(id)
      .subscribe({
        next: (res) => {
          this.name?.setValue(res.name);
          this.document?.setValue(res.document);
        },
        error: (res) => {

        }
      });
  }

  saveSupplier() {
    const supplier: SupplierDTO = {
      id: this.id,
      name: this.name?.value,
      document: this.document?.value
    };

    if (this.id === 0) {
      this.apiService.createSupplier(supplier)
        .subscribe({
          next: (res) => {
            this.savedSuccessfully();
          },
          error: (res) => {

          }
        });
    } else {
      this.apiService.updateSupplier(supplier, this.id)
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
    this.router.navigate(['/fornecedores']);
  }
}
