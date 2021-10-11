import { TestBed } from '@angular/core/testing';

import { AdminequiService } from './admin-equi.service';

describe('AdminequiService', () => {
  let service: AdminequiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminequiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
