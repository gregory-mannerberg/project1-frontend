import { Component, OnInit } from '@angular/core';
import { Warehouse } from '../models/warehouse';
import { Location } from '../models/location';
import { LocationService } from '../services/location.service';
import { WarehouseService } from '../services/warehouse.service';
import { Item } from '../models/item';
import { Input } from '@angular/core';
import { FullLocation } from '../models/full-location';

@Component({
  selector: 'app-item-location',
  templateUrl: './item-location.component.html',
  styleUrls: ['./item-location.component.css']
})
export class ItemLocationComponent implements OnInit {

  @Input() item: Item = {} as Item;

  warehouse: Warehouse = {} as Warehouse;

  location: Location = {} as Location;

  fullLocation: FullLocation = {} as FullLocation;

  constructor(private locationService: LocationService,
    private warehouseService: WarehouseService) { }

  ngOnInit(): void {
    if (this.item) {
      this.locationService.findById(this.item.locationId).subscribe(location => {
        this.location = location;
        this.warehouseService.findById(this.location.id).subscribe(warehouse => {
          this.warehouse = warehouse;
          this.fullLocation = this.composeFullLocation(warehouse, location);
          console.log(warehouse);
          console.log(location);
          console.log(this.fullLocation);
        });
      });
    }
  }

  composeFullLocation(warehouse: Warehouse, location: Location): FullLocation {
    let fl: FullLocation = {} as FullLocation;
    fl.warehouseId = location.warehouseId;
    fl.locationId = location.id;
    fl.row = location.row;
    fl.block = location.block;
    fl.shelf = location.shelf;
    fl.address = warehouse.address;
    fl.city = warehouse.city;
    fl.state = warehouse.state;
    fl.country = warehouse.country;
    fl.postalCode = warehouse.postalCode;
    return fl;
  }



}
