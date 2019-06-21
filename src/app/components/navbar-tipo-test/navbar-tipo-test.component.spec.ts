import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarTipoTestComponent } from './navbar-tipo-test.component';

describe('NavbarTipoTestComponent', () => {
  let component: NavbarTipoTestComponent;
  let fixture: ComponentFixture<NavbarTipoTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarTipoTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarTipoTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
