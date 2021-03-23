import { TestBed } from '@angular/core/testing';

import { DiscordTokenService } from './discord-token.service';

describe('DiscordTokenService', () => {
  let service: DiscordTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscordTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
