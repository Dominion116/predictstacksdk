import type { Fetcher } from '../fetcher.js';
import type {
  Market,
  ListMarketsFilters,
  MarketOdds,
  MarketQuotes,
} from '../types.js';

export class MarketsResource {
  constructor(private readonly fetch: Fetcher) {}

  async list(filters: ListMarketsFilters = {}): Promise<Market[]> {
    const params = new URLSearchParams();
    if (filters.limit !== undefined) params.set('limit', String(filters.limit));
    if (filters.status) params.set('status', filters.status);
    if (filters.creator) params.set('creator', filters.creator);
    if (filters.sort) params.set('sort', filters.sort);
    if (filters.dateFrom) params.set('dateFrom', filters.dateFrom);
    if (filters.dateTo) params.set('dateTo', filters.dateTo);
    const qs = params.toString();
    const data = await this.fetch<{ markets: Market[] }>(`/api/markets${qs ? `?${qs}` : ''}`);
    return data.markets;
  }

  async get(contractMarketId: number): Promise<Market> {
    const data = await this.fetch<{ market: Market }>(`/api/markets/contract/${contractMarketId}`);
    return data.market;
  }

  async getById(backendId: string): Promise<Market> {
    const data = await this.fetch<{ market: Market }>(`/api/markets/${backendId}`);
    return data.market;
  }

  async getByRef(ref: string): Promise<Market> {
    const data = await this.fetch<{ market: Market }>(`/api/markets/ref/${encodeURIComponent(ref)}`);
    return data.market;
  }

  async getOdds(contractMarketId: number): Promise<MarketOdds> {
    return this.fetch<MarketOdds>(`/api/markets/${contractMarketId}/odds`);
  }

  async getQuotes(contractMarketId: number): Promise<MarketQuotes> {
    return this.fetch<MarketQuotes>(`/api/markets/${contractMarketId}/quotes`);
  }

  async getNextId(): Promise<number> {
    const data = await this.fetch<{ contractMarketId: number }>('/api/markets/next-id');
    return data.contractMarketId;
  }
}
