import type { Fetcher } from '../fetcher.js';
import type { PlatformConfig, PlatformStats, LeaderboardEntry } from '../types.js';

export class PlatformResource {
  constructor(private readonly fetch: Fetcher) {}

  async getConfig(): Promise<PlatformConfig> {
    return this.fetch<PlatformConfig>('/api/config');
  }

  async getStats(): Promise<PlatformStats> {
    return this.fetch<PlatformStats>('/api/platform/stats');
  }

  async getLeaderboard(limit = 15): Promise<LeaderboardEntry[]> {
    const data = await this.fetch<{ leaderboard: LeaderboardEntry[] }>(
      `/api/leaderboard?limit=${limit}`,
    );
    return data.leaderboard ?? [];
  }
}

  /**
   * Check if the platform API is healthy and responsive
   */
  async health(): Promise<boolean> {
    try {
      await this.fetch('/api/health');
      return true;
    } catch {
      return false;
    }
  }
