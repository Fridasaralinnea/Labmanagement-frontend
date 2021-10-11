import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyequiComponent } from './my-equi.component';

describe('MyequiComponent', () => {
  let component: MyequiComponent;
  let fixture: ComponentFixture<MyequiComponent>;

  beforeEach(async(() => {
    await TestBed.configureTestingModule({
      declarations: [ MyequiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyequiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
