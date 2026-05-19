import { createFetcher } from './fetcher.js';
import { MarketsResource } from './resources/markets.js';
import { BetsResource } from './resources/bets.js';
import { ClaimsResource } from './resources/claims.js';
import { UsersResource } from './resources/users.js';
import { PlatformResource } from './resources/platform.js';

/**
 * Configuration options for the PredictStack SDK client.
 */
export interface PredictStackClientOptions {
  baseUrl: string;
  /** Request timeout in milliseconds. Defaults to 30000 (30 seconds). */
  timeout?: number;
}

/**
 * Main client for interacting with the PredictStack prediction market platform.
 * Provides access to markets, bets, claims, users, and platform resources.
 *
 * @example
 * ```typescript
 * const client = new PredictStackClient({
 *   baseUrl: 'https://api.predictstack.com'
 * });
 * const markets = await client.markets.list();
 * ```
 */
export class PredictStackClient {
  readonly markets: MarketsResource;
  readonly bets: BetsResource;
  readonly claims: ClaimsResource;
  readonly users: UsersResource;
  readonly platform: PlatformResource;

  constructor(options: PredictStackClientOptions) {
    const fetch = createFetcher(options.baseUrl);
    this.markets = new MarketsResource(fetch);
    this.bets = new BetsResource(fetch);
    this.claims = new ClaimsResource(fetch);
    this.users = new UsersResource(fetch);
    this.platform = new PlatformResource(fetch);
  }
}

//
