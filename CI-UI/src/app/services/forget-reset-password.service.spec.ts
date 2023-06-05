import { TestBed } from '@angular/core/testing';

import { ForgetResetPasswordService } from './forget-reset-password.service';

describe('ForgetResetPasswordService', () => {
  let service: ForgetResetPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgetResetPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
