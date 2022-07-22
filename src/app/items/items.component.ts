import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Item[] = [];

  dialog: boolean = false;

  item: Item = {} as Item;

  selectedItems: Item[] = [];

  isNew: boolean = false;

  constructor(private itemService: ItemService) { 
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.itemService.findAll().subscribe(items =>
      this.items = items);
  }

  openNew() {
    this.item = {} as Item;
    this.isNew = true;
    this.dialog = true;
  }

  deleteSelectedItems() {
    this.itemService.delete(this.selectedItems).subscribe((x) => {this.findAll()});
  }

  deleteItem(item: Item) {
    this.itemService.delete([item]).subscribe((x) => {this.findAll()});
  }

  edit(item: Item) {
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
      this.itemService.save(this.item).subscribe(item =>
        this.items.push(item));
    } else {
      this.itemService.update(this.item).subscribe((x) => {
        this.itemService.findById(this.item.id).subscribe(item => {
          let i = this.items.findIndex((it) => it.id === item.id);
          this.items[i] = item;
        });
      });    
    }
    this.dialog = false;
  }

}
