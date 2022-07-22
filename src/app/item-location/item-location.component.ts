import { Component, OnInit } from '@angular/core';
import { Warehouse } from '../models/warehouse';
import { Location } from '../models/location';
import { LocationService } from '../services/location.service';
import { WarehouseService } from '../services/warehouse.service';
import { Item } from '../models/item';
import { Input } from '@angular/core';

@Component({
  selector: 'app-item-location',
  templateUrl: './item-location.component.html',
  styleUrls: ['./item-location.component.css']
})
export class ItemLocationComponent implements OnInit {

  @Input() item: Item = {} as Item;

  warehouse: Warehouse = {} as Warehouse;

  location: Location = {} as Location;

  data: any = {};

  constructor(private locationService: LocationService,
    private warehouseService: WarehouseService) { }

  ngOnInit(): void {
    if (this.item) {
      this.locationService.findById(this.item.locationId).subscribe(location => {
        this.location = location;
        this.warehouseService.findById(this.location.id).subscribe(warehouse => {
          this.warehouse = warehouse;
          this.data.warehouseId = this.location.warehouseId;
          this.data.locationId = this.location.id;
          this.data.row = this.location.row;
          this.data.block = this.location.block;
          this.data.shelf = this.location.shelf;
          this.data.address = this.warehouse.address;
          this.data.city = this.warehouse.city;
          this.data.state = this.warehouse.state;
          this.data.country = this.warehouse.country;
          this.data.postalCode = this.warehouse.postalCode;
        });
      });
    }
  }



}
