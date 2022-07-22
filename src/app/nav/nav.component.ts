import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  items: MenuItem[];

  constructor() { 
    this.items = [
      {
        label: 'Warehouses',
        routerLink: ['/warehouses']
      },
      {
        label: 'Items',
        items: [
          {label: 'Basic View', routerLink: ['/items']},
          {label: 'Detailed View', routerLink: ['/items-detailed']}
        ]
      },
      {
        label: 'Item Types',
        routerLink: ['/item-types']
      }
    ];
  }

  ngOnInit(): void {
    
  }

}
