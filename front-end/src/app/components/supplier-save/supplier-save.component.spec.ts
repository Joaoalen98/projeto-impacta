import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierSaveComponent } from './supplier-save.component';

describe('SupplierSaveComponent', () => {
  let component: SupplierSaveComponent;
  let fixture: ComponentFixture<SupplierSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupplierSaveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SupplierSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
