import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscribaniasPublicaComponent } from './escribanias-publica.component';

describe('EscribaniasPublicaComponent', () => {
  let component: EscribaniasPublicaComponent;
  let fixture: ComponentFixture<EscribaniasPublicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscribaniasPublicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscribaniasPublicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
