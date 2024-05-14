import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasUsuarioComponent } from './canvas-usuario.component';

describe('CanvasUsuarioComponent', () => {
  let component: CanvasUsuarioComponent;
  let fixture: ComponentFixture<CanvasUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CanvasUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CanvasUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
