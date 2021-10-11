import { TestBed } from '@angular/core/testing';

import { StudequiService } from './stud-equi.service';

describe('StudequiService', () => {
  let service: StudequiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudequiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
