import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Produtos',
        icon: 'pi pi-fw pi-box',
        routerLink: ['/produtos']
      },
      {
        label: 'Fornecedores',
        icon: 'pi pi-fw pi-users',
        routerLink: ['/fornecedores']
      },
    ];
  }

}
