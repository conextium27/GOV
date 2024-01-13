import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDataSalesComponent } from './table-data-sales.component';

describe('TableDataSalesComponent', () => {
  let component: TableDataSalesComponent;
  let fixture: ComponentFixture<TableDataSalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableDataSalesComponent]
    });
    fixture = TestBed.createComponent(TableDataSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
