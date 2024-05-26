import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesFacturaComponent } from './detalles-factura.component';

describe('DetallesFacturaComponent', () => {
  let component: DetallesFacturaComponent;
  let fixture: ComponentFixture<DetallesFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetallesFacturaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallesFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
