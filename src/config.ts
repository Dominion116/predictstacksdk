/**
 * Fetch configuration and utilities
 */

export interface FetchConfig {
  timeout: number;
  maxRetries: number;
}

export const DEFAULT_FETCH_CONFIG: FetchConfig = {
  timeout: 30000,
  maxRetries: 3,
};

/**
 * Merge user config with defaults
 */
export function mergeFetchConfig(userConfig?: Partial<FetchConfig>): FetchConfig {
  return {
    ...DEFAULT_FETCH_CONFIG,
    ...userConfig,
  };
}
