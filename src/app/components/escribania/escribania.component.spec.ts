import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscribaniaComponent } from './escribania.component';

describe('EscribaniaComponent', () => {
  let component: EscribaniaComponent;
  let fixture: ComponentFixture<EscribaniaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscribaniaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscribaniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
