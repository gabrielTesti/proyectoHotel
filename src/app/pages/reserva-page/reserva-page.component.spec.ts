import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaPageComponent } from './reserva-page.component';

describe('ReservaPageComponent', () => {
  let component: ReservaPageComponent;
  let fixture: ComponentFixture<ReservaPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservaPageComponent]
    });
    fixture = TestBed.createComponent(ReservaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
