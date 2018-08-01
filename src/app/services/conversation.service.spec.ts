import { TestBed, inject } from '@angular/core/testing';

import { ConversationService } from './conversation.service';

describe('ConversationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConversationService]
    });
  });

  it('should be created', inject([ConversationService], (service: ConversationService) => {
    expect(service).toBeTruthy();
  }));
});
