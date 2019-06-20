import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscribanoTestComponent } from './escribano-test.component';

describe('EscribanoTestComponent', () => {
  let component: EscribanoTestComponent;
  let fixture: ComponentFixture<EscribanoTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscribanoTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscribanoTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
