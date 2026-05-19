import type { Fetcher } from '../fetcher.js';
import type {
  BetIntentPayload,
  BetIntentResponse,
  BetConfirmPayload,
  Position,
} from '../types.js';

export class BetsResource {
  constructor(private readonly fetch: Fetcher) {}

  async createIntent(payload: BetIntentPayload): Promise<BetIntentResponse> {
    return this.fetch<BetIntentResponse>('/api/bets/intents', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async confirm(payload: BetConfirmPayload): Promise<{ success: boolean; position: Position }> {
    return this.fetch<{ success: boolean; position: Position }>('/api/bets/confirm', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }
}
