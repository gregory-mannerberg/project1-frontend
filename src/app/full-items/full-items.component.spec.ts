import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullItemsComponent } from './full-items.component';

describe('FullItemsComponent', () => {
  let component: FullItemsComponent;
  let fixture: ComponentFixture<FullItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
