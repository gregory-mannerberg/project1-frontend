import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullItemsComponent } from './full-items/full-items.component';
import { ItemTypesComponent } from './item-types/item-types.component';
import { ItemsComponent } from './items/items.component';
import { WarehousesComponent } from './warehouses/warehouses.component';

const routes: Routes = [
  { path: 'warehouses', component: WarehousesComponent},
  { path: 'items', component: ItemsComponent},
  { path: 'item-types', component: ItemTypesComponent},
  { path: '', redirectTo: '/items', pathMatch: 'full'},
  { path: 'items-detailed', component: FullItemsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
