import { Component, OnInit } from '@angular/core';
import { ItemTypeService } from '../services/item-type.service';
import { ItemType } from '../models/item-type';

@Component({
  selector: 'app-item-types',
  templateUrl: './item-types.component.html',
  styleUrls: ['./item-types.component.css']
})
export class ItemTypesComponent implements OnInit {

  itemTypes: ItemType[] = [];

  dialog: boolean = false;

  itemType: ItemType = {} as ItemType;

  selectedItemTypes: ItemType[] = [];

  isNew: boolean = false;

  constructor(private itemTypeService: ItemTypeService) { 
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.itemTypeService.findAll().subscribe(itemTypes =>
      this.itemTypes = itemTypes);
  }

  openNew() {
    this.itemType = {} as ItemType;
    this.isNew = true;
    this.dialog = true;
  }

  deleteSelectedItemTypes() {
    this.itemTypeService.delete(this.selectedItemTypes).subscribe((x) => {this.findAll()});
  }

  deleteItemType(itemType: ItemType) {
    this.itemTypeService.delete([itemType]).subscribe((x) => {this.findAll()});
  }

  edit(itemType: ItemType) {
    this.itemType = {...itemType};
    this.dialog = true;
    this.isNew = false;
  }

  hideDialog() {
    this.dialog = false;
    this.isNew = false;
  }

  saveItemType() {
    if (this.isNew) {
      this.itemTypeService.save(this.itemType).subscribe(itemType =>
        this.itemTypes.push(itemType));
    } else {
      this.itemTypeService.update(this.itemType).subscribe((x) => {
        this.itemTypeService.findById(this.itemType.id).subscribe(itemType => {
          let i = this.itemTypes.findIndex((it) => it.id === itemType.id);
          this.itemTypes[i] = itemType;
        });
      });    
    }
    this.dialog = false;
  }

}
