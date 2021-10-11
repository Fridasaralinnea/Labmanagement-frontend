import { TestBed } from '@angular/core/testing';

import { MyequiService } from './my-equi.service';

describe('MyequiService', () => {
  let service: MyequiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyequiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
