export interface Market {
  id: string;
  contractMarketId: number;
  question: string;
  description: string;
  category: string;
  imageUrl: string | null;
  resolveTimeIso: string;
  resolveBlock: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  status: 'active' | 'resolved' | 'cancelled';
  winningOutcome: boolean | null;
  yesPoolMicro: number;
  noPoolMicro: number;
  totalBets: number;
  marketRef: string;
  contractTxId: string | null;
  resolutionTxId: string | null;
}

export interface Bet {
  id: string;
  userAddress: string;
  marketId: string;
  contractMarketId: number;
  amountMicro: number;
  feeMicro: number;
  outcome: boolean;
  status: 'intent' | 'confirmed' | 'failed';
  txId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Position {
  userAddress: string;
  marketId: string;
  contractMarketId: number;
  yesAmountMicro: number;
  noAmountMicro: number;
  totalWageredMicro: number;
  claimableAmountMicro: number;
  claimed: boolean;
  lastBetAt: string | null;
}

export interface Claim {
  id: string;
  userAddress: string;
  contractMarketId: number;
  marketId: string;
  type: 'winnings' | 'refund';
  txId: string;
  amountMicro: number;
  createdAt: string;
}

export interface User {
  address: string;
  joinedAt: string;
  updatedAt: string;
  totalInvestedMicro: number;
  totalClaimedMicro: number;
  totalProfitMicro: number;
  activePredictions: number;
  resolvedPredictions: number;
  winCount: number;
  lossCount: number;
  pendingClaimCount: number;
  totalBets: number;
  marketIds: number[];
}

export interface LeaderboardEntry {
  address: string;
  totalProfit: number;
  winRate: number;
  totalBets: number;
  rank: number;
}

export interface BetIntentPayload {
  userAddress: string;
  contractMarketId: number;
  amountMicro: number;
  outcome: boolean;
}

export interface BetIntentResponse {
  betId: string;
  contractCall: {
    contractAddress: string;
    contractName: string;
    functionName: string;
    args: {
      marketId: number;
      outcome: boolean;
      amountMicro: number;
      maxAcceptedPriceBps: number;
    };
    postConditionAmountMicro: number;
  };
}

export interface BetConfirmPayload {
  betId: string;
  txId: string;
}

export interface ClaimConfirmPayload {
  userAddress: string;
  contractMarketId: number;
  txId: string;
  type?: 'winnings' | 'refund';
}

export interface PlatformConfig {
  network: string;
  contractAddress: string;
  contractName: string;
  platformFeeMicro: number;
}

export interface PlatformStats {
  totalMarkets: number;
  totalVolumeMicro: number;
  totalFeesCollectedMicro: number;
  totalUsers: number;
  activeMarkets: number;
}

export interface ListMarketsFilters {
  limit?: number;
  status?: 'active' | 'resolved' | 'cancelled';
  creator?: string;
  sort?: 'newest' | 'volume' | 'ending';
  dateFrom?: string;
  dateTo?: string;
}

export interface MarketOdds {
  yes: number;
  no: number;
}

export interface MarketQuotes {
  slippagePreview: number;
}

export interface DashboardPosition {
  market: Market;
  position: Position;
}

export interface UserDashboard {
  summary: User;
  positions: DashboardPosition[];
}
