import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultOrdersComponent } from './consult-orders.component';

describe('ConsultOrdersComponent', () => {
  let component: ConsultOrdersComponent;
  let fixture: ComponentFixture<ConsultOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultOrdersComponent]
    });
    fixture = TestBed.createComponent(ConsultOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
