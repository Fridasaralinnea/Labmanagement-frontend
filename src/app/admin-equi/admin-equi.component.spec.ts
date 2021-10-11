import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminequiComponent } from './admin-equi.component';

describe('AdminequiComponent', () => {
  let component: AdminequiComponent;
  let fixture: ComponentFixture<AdminequiComponent>;

  beforeEach(async(() => {
    await TestBed.configureTestingModule({
      declarations: [ AdminequiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminequiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
