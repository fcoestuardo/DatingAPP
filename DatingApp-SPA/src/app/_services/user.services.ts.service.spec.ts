/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { User.services.tsService } from './user.services.ts.service';

describe('Service: User.services.ts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [User.services.tsService]
    });
  });

  it('should ...', inject([User.services.tsService], (service: User.services.tsService) => {
    expect(service).toBeTruthy();
  }));
});
