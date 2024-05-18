import { Component, OnInit } from '@angular/core';
import { ProductDto } from '../../interfaces/product-dto';
import { ApiService } from '../../services/api.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {

  products: ProductDto[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAllProducts();
  }

  findAllProducts() {
    this.apiService.findAllProducts()
      .subscribe({
        next: (res) => {
          this.products = res;
        },
        error: (res) => {
          console.log(res);
        }
      });
  }

  deleteProduct(id: number) {
    if (confirm('Tem certeza que deseja deletar este produto?')) {
      this.apiService.deleteProduct(id)
        .subscribe({
          next: (res) => {
            this.products = this.products.filter(p => p.id !== id);

            setTimeout(() => {
              alert('Produto deletado com sucesso');
            }, 500);
          },
          error: (res) => {
            alert('Erro ao deletar produto');
          }
        });
    }
  }

  navigateToProductSave(id: number) {
    this.router.navigate(
      ['/produtos', 'adicionar'],
      { queryParams: { id: id }},
    );
  }

}
