import { Component, OnInit } from '@angular/core';
import { WarehouseService } from '../services/warehouse.service';
import { Warehouse } from '../models/warehouse';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css']
})
export class WarehousesComponent implements OnInit {

  warehouses: Warehouse[] = [];

  dialog: boolean = false;

  warehouse: Warehouse = {} as Warehouse;

  selectedWarehouses: Warehouse[] = [];

  isNew: boolean = false;

  constructor(private warehouseService: WarehouseService) { 
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.warehouseService.findAll().subscribe(warehouses =>
      this.warehouses = warehouses);
  }

  openNew() {
    this.warehouse = {} as Warehouse;
    this.isNew = true;
    this.dialog = true;
  }

  deleteSelectedWarehouses() {
    this.warehouseService.delete(this.selectedWarehouses).subscribe((x) => {this.findAll()});
  }

  deleteWarehouse(warehouse: Warehouse) {
    this.warehouseService.delete([warehouse]).subscribe((x) => {this.findAll()});
  }

  edit(warehouse: Warehouse) {
    this.warehouse = {...warehouse};
    this.dialog = true;
    this.isNew = false;
  }

  hideDialog() {
    this.dialog = false;
    this.isNew = false;
  }

  saveWarehouse() {
    if (this.isNew) {
      this.warehouseService.save(this.warehouse).subscribe(warehouse =>
        this.warehouses.push(warehouse));
    } else {
      this.warehouseService.update(this.warehouse).subscribe((x) => {
        this.warehouseService.findById(this.warehouse.id).subscribe(wh => {
          let i = this.warehouses.findIndex((w) => w.id === wh.id);
          this.warehouses[i] = wh;
        });
      });    
    }
    this.dialog = false;
  }

}
