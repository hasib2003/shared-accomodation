import { TestBed } from '@angular/core/testing';

import { SpaceItemService } from './space-item.service';

describe('SpaceItemService', () => {
  let service: SpaceItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpaceItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
