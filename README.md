# @predictstack/sdk

Official JavaScript / TypeScript SDK for the [PredictStack](https://predictstack.onrender.com) prediction market platform built on Stacks.

## Installation

```bash
npm install @predictstack/sdk
```

## Quick Start

```typescript
import { PredictStackClient } from '@predictstack/sdk';

const client = new PredictStackClient({
  baseUrl: 'https://predictstack.onrender.com',
});

// List active markets sorted by volume
const markets = await client.markets.list({ status: 'active', sort: 'volume' });
console.log(markets[0].question);

// Get platform stats
const stats = await client.platform.getStats();
console.log(`Total volume: ${stats.totalVolumeMicro / 1_000_000} STX`);
```

## API Reference

### `new PredictStackClient(options)`

| Option | Type | Description |
|--------|------|-------------|
| `baseUrl` | `string` | Backend URL, e.g. `https://predictstack.onrender.com` |

---

### `client.markets`

```typescript
// List markets (all filters optional)
const markets = await client.markets.list({
  status: 'active',           // 'active' | 'resolved' | 'cancelled'
  sort: 'volume',             // 'newest' | 'volume' | 'ending'
  limit: 20,
  creator: 'SP1ABC...',
  dateFrom: '2025-01-01',
  dateTo: '2025-12-31',
});

// Get by on-chain market ID
const market = await client.markets.get(1);

// Get by backend UUID
const market = await client.markets.getById('mkt_abc123');

// Get by market ref slug
const market = await client.markets.getByRef('will-btc-hit-100k');

// Get current yes/no odds (basis points, e.g. 5500 = 55%)
const odds = await client.markets.getOdds(1);
// { yes: 5500, no: 4500 }

// Get slippage preview for a potential bet
const quotes = await client.markets.getQuotes(1);
// { slippagePreview: 0 }

// Get next available market ID from the contract
const nextId = await client.markets.getNextId();
```

---

### `client.bets`

Placing a bet is a two-step flow: create an intent → sign on-chain → confirm.

```typescript
// Step 1: Create bet intent — backend records it and returns contract call details
const intent = await client.bets.createIntent({
  userAddress: 'SP1ABC...',     // user's mainnet STX address
  contractMarketId: 1,
  amountMicro: 50_000,          // 0.05 STX in micro-STX
  outcome: true,                // true = YES, false = NO
});

// intent.contractCall contains everything needed for the wallet:
// { contractAddress, contractName, functionName, args, postConditionAmountMicro }

// Step 2: Pass intent.contractCall to Leather / Xverse wallet for signing
// (wallet-specific — not part of this SDK)
const txId = '0xabc...'; // received from wallet after broadcast

// Step 3: Confirm — backend updates state
const result = await client.bets.confirm({
  betId: intent.betId,
  txId,
});
// { success: true, position: Position }
```

---

### `client.claims`

```typescript
// After calling claim-winnings or claim-refund on-chain via your wallet:
const result = await client.claims.confirm({
  userAddress: 'SP1ABC...',
  contractMarketId: 1,
  txId: '0xabc...',
  type: 'winnings',   // 'winnings' | 'refund' (default: 'winnings')
});
// { success: true, amountMicro: 150000 }
```

---

### `client.users`

```typescript
// Full dashboard: user stats + all positions with market data
const dashboard = await client.users.getDashboard('SP1ABC...');
// { summary: User, positions: [{ market, position }, ...] }

// Single position on a market
const position = await client.users.getPosition('SP1ABC...', 1);
// { yesAmountMicro, noAmountMicro, totalWageredMicro, claimed, ... } | null

// Markets the user has bet on (array of contractMarketId)
const marketIds = await client.users.getMarkets('SP1ABC...');
// [1, 3, 7]
```

---

### `client.platform`

```typescript
// Network / contract configuration
const config = await client.platform.getConfig();
// { network: 'mainnet', contractAddress: 'SP...', contractName: '...', platformFeeMicro: 10000 }

// Global platform statistics
const stats = await client.platform.getStats();
// { totalMarkets, totalVolumeMicro, totalFeesCollectedMicro, totalUsers, activeMarkets }

// Leaderboard (default top 15)
const board = await client.platform.getLeaderboard(10);
// [{ address, totalProfit, winRate, totalBets, rank }, ...]
```

---

## Error Handling

```typescript
import { PredictStackClient, PredictStackError } from '@predictstack/sdk';

try {
  const market = await client.markets.get(9999);
} catch (err) {
  if (err instanceof PredictStackError) {
    console.error(err.status);  // e.g. 404
    console.error(err.message); // e.g. 'Market not found'
    console.error(err.body);    // raw response body
  }
}
```

---

## TypeScript Types

All types are exported from the package root:

```typescript
import type {
  Market,
  Bet,
  Position,
  Claim,
  User,
  LeaderboardEntry,
  BetIntentPayload,
  BetIntentResponse,
  BetConfirmPayload,
  ClaimConfirmPayload,
  PlatformConfig,
  PlatformStats,
  ListMarketsFilters,
  MarketOdds,
  MarketQuotes,
  UserDashboard,
} from '@predictstack/sdk';
```

---

## Mainnet vs Testnet

Point `baseUrl` at whichever backend is deployed:

| Network | URL |
|---------|-----|
| Mainnet | `https://predictstack.onrender.com` |
| Local dev | `http://localhost:4000` |

The SDK itself is network-agnostic — it talks to the backend, which handles the Stacks node connection.

---

## License

MIT
