import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilTestComponent } from './perfil-test.component';

describe('PerfilTestComponent', () => {
  let component: PerfilTestComponent;
  let fixture: ComponentFixture<PerfilTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
