import { createFetcher } from './fetcher.js';
import { MarketsResource } from './resources/markets.js';
import { BetsResource } from './resources/bets.js';
import { ClaimsResource } from './resources/claims.js';
import { UsersResource } from './resources/users.js';
import { PlatformResource } from './resources/platform.js';

export interface PredictStackClientOptions {
  baseUrl: string;
}

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
