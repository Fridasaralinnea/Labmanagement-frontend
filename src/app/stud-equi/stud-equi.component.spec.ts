import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudequiComponent } from './stud-equi.component';

describe('StudequiComponent', () => {
  let component: StudequiComponent;
  let fixture: ComponentFixture<StudequiComponent>;

  beforeEach(async(() => {
    await TestBed.configureTestingModule({
      declarations: [ StudequiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudequiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
