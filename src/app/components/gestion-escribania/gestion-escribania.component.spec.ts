import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEscribaniaComponent } from './gestion-escribania.component';

describe('GestionEscribaniaComponent', () => {
  let component: GestionEscribaniaComponent;
  let fixture: ComponentFixture<GestionEscribaniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionEscribaniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionEscribaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
