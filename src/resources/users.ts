import type { Fetcher } from '../fetcher.js';
import type { Position, UserDashboard } from '../types.js';

export class UsersResource {
  constructor(private readonly fetch: Fetcher) {}

  async getDashboard(address: string): Promise<UserDashboard> {
    return this.fetch<UserDashboard>(`/api/users/${encodeURIComponent(address)}/dashboard`);
  }

  async getPosition(address: string, contractMarketId: number): Promise<Position | null> {
    try {
      const data = await this.fetch<{ position: Position }>(
        `/api/users/${encodeURIComponent(address)}/positions/${contractMarketId}`,
      );
      return data.position ?? null;
    } catch {
      return null;
    }
  }

  async getMarkets(address: string): Promise<number[]> {
    const data = await this.fetch<{ marketIds: number[] }>(
      `/api/users/${encodeURIComponent(address)}/markets`,
    );
    return data.marketIds ?? [];
  }
}
