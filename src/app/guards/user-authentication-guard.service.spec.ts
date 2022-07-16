import { TestBed } from '@angular/core/testing';

import { UserAuthenticationGuardService } from './user-authentication-guard.service';

describe('UserAuthenticationGuardService', () => {
  let service: UserAuthenticationGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAuthenticationGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
