import { TestBed } from '@angular/core/testing';

import { UpdateqaService } from './updateqa.service';

describe('UpdateqaService', () => {
  let service: UpdateqaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateqaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
