/**
 * Type guards and utility functions for type checking
 */

import type { Market, Bet, User } from './types.js';

/**
 * Check if an object is a valid Market
 */
export function isMarket(value: unknown): value is Market {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'question' in value &&
    'status' in value
  );
}

/**
 * Check if an object is a valid Bet
 */
export function isBet(value: unknown): value is Bet {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'userAddress' in value &&
    'marketId' in value
  );
}

/**
 * Check if an object is a valid User
 */
export function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'address' in value &&
    'username' in value
  );
}
