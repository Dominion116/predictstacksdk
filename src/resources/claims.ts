import type { Fetcher } from '../fetcher.js';
import type { ClaimConfirmPayload } from '../types.js';

export class ClaimsResource {
  constructor(private readonly fetch: Fetcher) {}

  async confirm(payload: ClaimConfirmPayload): Promise<{ success: boolean; amountMicro: number }> {
    return this.fetch<{ success: boolean; amountMicro: number }>('/api/claims/confirm', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }
}
