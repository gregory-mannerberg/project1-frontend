import { Component, OnInit } from '@angular/core';
import { FullItem } from '../models/full-item';
import { ItemTypeService } from '../services/item-type.service';

import { ItemService } from '../services/item.service';
import { ItemType } from '../models/item-type';
import { Item } from '../models/item';


@Component({
  selector: 'app-full-items',
  templateUrl: './full-items.component.html',
  styleUrls: ['./full-items.component.css']
})
export class FullItemsComponent implements OnInit {

  items: FullItem[] = [];

  dialog: boolean = false;

  item: FullItem = {} as FullItem;

  selectedItems: FullItem[] = [];

  isNew: boolean = false;

  constructor(private itemService: ItemService, private itemTypeService: ItemTypeService) { 
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.itemService.findAll().subscribe((items) => {
      let fullitems: FullItem[] = [];
      items.forEach(item => {
        let fullitem: FullItem = {} as FullItem;
        fullitem.id = item.id;
        fullitem.amount = item.amount;
        fullitem.datePurchased = item.datePurchased;
        fullitem.purchasePrice = item.purchasePrice;
        fullitem.itemTypeId = item.itemTypeId;
        fullitem.locationId = item.locationId;
        this.itemTypeService.findById(item.itemTypeId).subscribe((itemType) => {
          fullitem.name = itemType.name;
          fullitem.unit = itemType.unit;
          fullitem.color = itemType.color;
          fullitem.manufacturer = itemType.manufacturer;
          fullitems.push(fullitem);
        });
      });
      this.items = fullitems;
    });
  }

  fullToBasic(fullitem: FullItem): Item {
    return {
      id: fullitem.id,
      amount: fullitem.amount,
      datePurchased: fullitem.datePurchased,
      purchasePrice: fullitem.purchasePrice,
      itemTypeId: fullitem.itemTypeId,
      locationId: fullitem.locationId};
  }

  composeFull(item: Item, itemType: ItemType): FullItem {
    return {
      id: item.id,
      name: itemType.name,
      amount: item.amount,
      unit: itemType.unit,
      color: itemType.color,
      manufacturer: itemType.manufacturer,
      datePurchased: item.datePurchased,
      purchasePrice: item.purchasePrice,
      itemTypeId: itemType.id,
      locationId: item.locationId
    }
  }

  openNew() {
    this.item = {} as FullItem;
    this.isNew = true;
    this.dialog = true;
  }

  deleteSelectedItems() {
    let items = this.selectedItems.map(this.fullToBasic, this.selectedItems);
    this.itemService.delete(items).subscribe((x) => {this.findAll()});
  }

  deleteItem(item: FullItem) {
    this.itemService.delete([item]).subscribe((x) => {this.findAll()});
  }

  edit(item: FullItem) {
    this.item = {...item};
    this.dialog = true;
    this.isNew = false;
  }

  hideDialog() {
    this.dialog = false;
    this.isNew = false;
  }

  saveItem() {
    if (this.isNew) {
      this.itemService.save(this.fullToBasic(this.item)).subscribe(item => {
        this.itemTypeService.findById(item.itemTypeId).subscribe(itemType => {
          this.items.push(this.composeFull(item, itemType));
        });
      });
    } else {
      this.itemService.update(this.fullToBasic(this.item)).subscribe((x) => {
        this.itemService.findById(this.item.id).subscribe(item => {
          this.itemTypeService.findById(item.itemTypeId).subscribe(itemType => {
            let i = this.items.findIndex((it) => it.id === item.id);
            this.items[i] = this.composeFull(item, itemType);
          });
        });
      });    
    }
    this.dialog = false;
  }

}
