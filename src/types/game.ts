export interface ThrowResult {
  score: number;
  multiplier: 1 | 2 | 3;
  timestamp: Date;
}

export interface Game {
  id: string;
  startedAt: Date;
  endedAt?: Date;
  throws: ThrowResult[];
  totalScore: number;
}