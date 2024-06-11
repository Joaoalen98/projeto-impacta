import { Component, OnInit } from '@angular/core';
import { SupplierDTO } from '../../interfaces/supplier-dto';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrl: './supplier-list.component.scss'
})
export class SupplierListComponent implements OnInit {

  suppliers: SupplierDTO[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAllSuppliers();
  }

  findAllSuppliers() {
    this.apiService.findAllSuppliers()
      .subscribe({
        next: (res) => {
          this.suppliers = res;
        },
        error: (res) => {
        }
      });
  }

  deleteSupplier(id: number) {
    if (confirm('Tem certeza que deseja deletar este fornecedor?')) {
      this.apiService.deleteSupplier(id)
        .subscribe({
          next: (res) => {
            this.suppliers = this.suppliers.filter(p => p.id !== id);

            setTimeout(() => {
              alert('Fornecedor deletado com sucesso');
            }, 500);
          },
          error: (res) => {
            
          }
        });
    }
  }

  navigateToSupplierSave(id: number) {
    this.router.navigate(
      ['/fornecedores', 'adicionar'],
      { queryParams: { id: id }},
    );
  }
}
