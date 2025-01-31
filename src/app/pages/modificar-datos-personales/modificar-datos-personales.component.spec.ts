import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarDatosPersonalesComponent } from './modificar-datos-personales.component';

describe('ModificarDatosPersonalesComponent', () => {
  let component: ModificarDatosPersonalesComponent;
  let fixture: ComponentFixture<ModificarDatosPersonalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarDatosPersonalesComponent]
    });
    fixture = TestBed.createComponent(ModificarDatosPersonalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
